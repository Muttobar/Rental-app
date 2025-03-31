import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://192.168.1.39:8082';


export default function TenantsScreen() {
  const [tenants, setTenants] = useState([]);
  const navigation = useNavigation();
  const [refreshKey, setRefreshKey] = useState(0); // Добавьте этот хук

  const fetchTenants = async () => {
      try {
          console.log('Запрос данных...'); // Логирование
          const response = await axios.get(`${API_URL}/tenants`);
          console.log('Получены данные:', response.data); // Логирование
          setTenants(response.data);
      } catch (error) {
          console.error('Ошибка загрузки:', error);
      }
  };

  // Добавьте этот эффект для обновления при возвращении на экран
  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          console.log('Экран получил фокус - обновляем данные'); // Логирование
          fetchTenants();
      });
      return unsubscribe;
  }, [navigation]);

  // Добавьте pull-to-refresh
  const onRefresh = () => {
      console.log('Ручное обновление...'); // Логирование
      setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
      fetchTenants();
  }, [refreshKey]); // Зависимость от refreshKey

  return (
      <View style={{ padding: 20 }}>
          <Button
              title="Добавить арендатора"
              onPress={() => navigation.navigate('AddTenant')}
          />
          
          <FlatList
              data={tenants}
              keyExtractor={(item) => item.ID.toString()}
              renderItem={({ item }) => (
                  <View style={styles.item}>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text>ID: {item.ID}</Text>
                      <Text>Дата: {new Date(item.created_at).toLocaleString()}</Text>
                  </View>
              )}
              refreshing={false}
              onRefresh={onRefresh}
          />
      </View>
  );
}