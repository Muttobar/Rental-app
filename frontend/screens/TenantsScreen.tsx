import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export default function TenantsScreen() {
  const [tenants, setTenants] = useState([]);
  const navigation = useNavigation();

  const fetchTenants = async () => {
    try {
      const response = await axios.get(`${API_URL}/tenants`);
      setTenants(response.data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };

  useEffect(() => { fetchTenants(); }, []);

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
          <View style={{ padding: 10, marginVertical: 5, backgroundColor: '#f0f0f0' }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>Дата регистрации: {new Date(item.created_at).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
