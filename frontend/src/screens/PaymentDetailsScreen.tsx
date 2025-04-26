import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';
import PaymentChart from '../components/PaymentChart';
import { fetchPaymentHistory } from '../services/api';
import { RouteProp } from '@react-navigation/core';
import { RootStackParamList } from '../types';

interface PaymentDetailsScreenProps {
  route: RouteProp<RootStackParamList, 'PaymentDetails'>;
}

export default function PaymentDetailsScreen({ route }: PaymentDetailsScreenProps) {
  const { propertyId } = route.params;
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPaymentHistory(propertyId);
        setPayments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [propertyId]);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          <Title style={styles.title}>История платежей</Title>
          <PaymentChart data={payments} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});