import { View, StyleSheet, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Svg, { Line, Path, G, Text as SvgText } from 'react-native-svg';
import { parseISO, format } from 'date-fns';
import  ru  from 'date-fns/locale/ru';
import { theme } from '../theme';

interface Payment {
  paidDate: string;
  amount: number;
}

interface Props {
  data: Payment[];
}

const { width: screenWidth } = Dimensions.get('window');
const CHART_WIDTH = screenWidth - 32;
const CHART_HEIGHT = 300;
const MARGIN = 20;

const PaymentChart: React.FC<Props> = ({ data }) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Нет данных для отображения</Text>
      </View>
    );
  }

  // Преобразование данных
  const dates = data.map(p => parseISO(p.paidDate).getTime());
  const amounts = data.map(p => p.amount);
  
  // Расчет границ
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const minAmount = Math.min(...amounts);
  const maxAmount = Math.max(...amounts);

  // Масштабирование данных
  const scaleX = (date: number) => 
    MARGIN + ((date - minDate) / (maxDate - minDate)) * (CHART_WIDTH - MARGIN * 2);
    
  const scaleY = (amount: number) => 
    CHART_HEIGHT - MARGIN - ((amount - minAmount) / (maxAmount - minAmount)) * (CHART_HEIGHT - MARGIN * 2);

  // Генерация пути для графика
  let path = '';
  data.forEach((p, i) => {
    const x = scaleX(parseISO(p.paidDate).getTime());
    const y = scaleY(p.amount);
    if (i === 0) path += `M ${x} ${y} `;
    else path += `L ${x} ${y} `;
  });

  // Форматирование даты
  const formatDate = (date: number) => 
    format(new Date(date), 'dd MMM yyyy', { locale: ru });

  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {/* Ось X */}
        <Line
          x1={MARGIN}
          y1={CHART_HEIGHT - MARGIN}
          x2={CHART_WIDTH - MARGIN}
          y2={CHART_HEIGHT - MARGIN}
          stroke={theme.colors.primary}
          strokeWidth="1"
        />

        {/* Ось Y */}
        <Line
          x1={MARGIN}
          y1={MARGIN}
          x2={MARGIN}
          y2={CHART_HEIGHT - MARGIN}
          stroke={theme.colors.primary}
          strokeWidth="1"
        />

        {/* График */}
        <Path
          d={path}
          stroke={theme.colors.primary}
          strokeWidth="2"
          fill="none"
        />

        {/* Точки данных */}
        {data.map((p, i) => {
          const x = scaleX(parseISO(p.paidDate).getTime());
          const y = scaleY(p.amount);
          return (
            <G
              key={i}
              onPress={() => setSelectedPoint(i)}
            >
              <Line
                x1={x}
                y1={y - 8}
                x2={x}
                y2={y + 8}
                stroke={theme.colors.primary}
                strokeWidth="2"
              />
              <Line
                x1={x - 8}
                y1={y}
                x2={x + 8}
                y2={y}
                stroke={theme.colors.primary}
                strokeWidth="2"
              />
            </G>
          );
        })}

        {/* Подсказка */}
        {selectedPoint !== null && (
          <G x={scaleX(parseISO(data[selectedPoint].paidDate).getTime())} 
             y={scaleY(data[selectedPoint].amount)}>
            <SvgText
              x={0}
              y={-20}
              fill={theme.colors.primary}
              fontSize="12"
              textAnchor="middle"
            >
              {`${data[selectedPoint].amount}₽`}
              </SvgText>
            <SvgText
              x={0}
              y={-5}
              fill={theme.colors.primary}
              fontSize="12"
              textAnchor="middle"
            >
              {formatDate(parseISO(data[selectedPoint].paidDate).getTime())}
            </SvgText>
          </G>
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: 16,
    marginVertical: 20
  }
});

export default PaymentChart;