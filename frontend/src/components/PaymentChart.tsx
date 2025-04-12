import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory-native';
import { parseISO, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { theme } from '../theme';

interface Payment {
  paidDate: string;
  amount: number;
}

interface Props {
  data: Payment[];
}

const PaymentChart: React.FC<Props> = ({ data }) => {
  // Преобразование данных для графика
  const chartData = data.map(payment => ({
    x: parseISO(payment.paidDate),
    y: payment.amount,
    label: `${format(parseISO(payment.paidDate), 'dd MMM yyyy', { locale: ru })}\nСумма: ${payment.amount}₽`
  }));

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text style={styles.emptyText}>Нет данных для отображения</Text>
      ) : (
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
          height={300}
          padding={{ top: 20, bottom: 50, left: 60, right: 20 }}
        >
          <VictoryAxis
            tickFormat={(x) => format(x, 'MMM', { locale: ru })}
            style={{
              axis: { stroke: theme.colors.primary },
              ticks: { stroke: theme.colors.primary },
              tickLabels: { fill: theme.colors.text }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => `${y}₽`}
            style={{
              axis: { stroke: theme.colors.primary },
              ticks: { stroke: theme.colors.primary },
              tickLabels: { fill: theme.colors.text }
            }}
          />
          <VictoryLine
            data={chartData}
            style={{
              data: { 
                stroke: theme.colors.primary,
                strokeWidth: 2
              }
            }}
            labels={({ datum }) => datum.label}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{
                  fill: theme.colors.surface,
                  stroke: theme.colors.primary
                }}
                flyoutPadding={8}
                cornerRadius={4}
              />
            }
          />
        </VictoryChart>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: 16,
    marginVertical: 20
  }
});

export default PaymentChart;
