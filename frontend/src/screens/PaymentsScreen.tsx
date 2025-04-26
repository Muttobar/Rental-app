import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Title, List, Divider, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import PaymentChart from '../components/PaymentChart';
import { fetchPaymentHistory } from '../services/api';
import { theme } from '../theme';
import { format, parseISO } from 'date-fns';
import  ru  from 'date-fns/locale/ru';

interface Payment {
  id: number;
  amount: number;
  paidDate: string;
  dueDate: string;
  paid: boolean;
}

const PaymentsScreen = () => {
  const route = useRoute();
  const { propertyId } = route.params as { propertyId: number };
  
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPaymentHistory(propertyId);
        setPayments(data);
      } catch (err) {
        setError('Ошибка загрузки платежей');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [propertyId]);

  const getStatusColor = (dueDate: string) => {
    const daysLeft = Math.floor(
      (parseISO(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysLeft < 15) return theme.colors.success;
    if (daysLeft < 5) return theme.colors.warning;
    if (daysLeft < 2) return theme.colors.orange;
    return theme.colors.error;
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>История платежей</Title>
      
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          <PaymentChart data={payments} />
          
          <List.Section>
            {payments.map((payment) => (
              <React.Fragment key={payment.id}>
                <List.Item
                  title={`${payment.amount} ₽`}
                  description={format(parseISO(payment.paidDate), 'dd MMMM yyyy', { locale: ru })}
                  left={() => (
                    <List.Icon 
                      icon={payment.paid ? "check-circle" : "alert-circle"}
                      color={payment.paid ? theme.colors.success : getStatusColor(payment.dueDate)}
                    />
                  )}
                />
                <Divider />
              </React.Fragment>
            ))}
          </List.Section>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.primary,
  },
  error: {
    color: theme.colors.error,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PaymentsScreen;
