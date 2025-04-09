import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Switch, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const API_URL = 'http://192.168.1.39:8082';

export default function PaymentsScreen() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { tenantId } = route.params as { tenantId: number }; // Явное приведение типа

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${API_URL}/payments/${tenantId}`);
      setPayments(response.data);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить платежи');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePayment = async (paymentId: number, paid: boolean) => {
    try {
      await axios.patch(`${API_URL}/payments/${paymentId}`, { paid });
      fetchPayments();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось обновить статус платежа');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayments(); // Добавлен вызов функции
  }, [tenantId]); // Добавлена зависимость

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <View>
              <Text>Сумма: ${item.amount}</Text>
              <Text>Срок: {new Date(item.due_date).toLocaleDateString()}</Text>
              <Text>Статус: {item.paid ? 'Оплачен' : 'Не оплачен'}</Text>
            </View>
            
            <Switch
              value={item.paid}
              onValueChange={(value) => togglePayment(item.id, value)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = {
  paymentItem: {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee'
  }
};

