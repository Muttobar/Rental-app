import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://192.168.1.39:8082';

export default function AddPropertyScreen() {
  const [address, setAddress] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/properties`, {
        address,
        size: parseFloat(size),
        price: parseFloat(price),
        description
      });
      
      Alert.alert('Успех', 'Помещение добавлено');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось добавить помещение');
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Адрес"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Площадь (м²)"
        value={size}
        onChangeText={setSize}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Цена аренды"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Описание"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 100 }]}
      />
      
      <Button title="Сохранить" onPress={handleSubmit} />
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  }
};
