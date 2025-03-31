import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://192.168.1.39:8082';

export default function AddTenantScreen() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/tenants`, { name });
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Имя арендатора"
        value={name}
        onChangeText={setName}
        style={{ 
          borderWidth: 1, 
          borderColor: '#ccc', 
          padding: 10, 
          marginBottom: 20 
        }}
      />
      
      <Button title="Сохранить" onPress={handleSubmit} />
    </View>
  );
}
