import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://192.168.1.39:8082';

const styles = {
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold' as 'bold'
  }
};

export default function TenantsScreen() {
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchTenants = async () => {
    try {
      const response = await axios.get(`${API_URL}/tenants`);
      const validatedData = response.data.map(item => ({
        id: item.id || item.ID || Date.now(),
        name: item.name,
        created_at: item.created_at,
      }));
      setTenants(validatedData);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchTenants);
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTenants();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Добавить арендатора"
        onPress={() => navigation.navigate('AddTenant')}
      />
      
      <FlatList
        data={tenants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Button
              title="Платежи"
              onPress={() => navigation.navigate('Payments', { 
                tenantId: item.id
              })}
            />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  ); // <-- Закрывающая скобка для основного View
} // <-- Закрывающая скобка для компонента
