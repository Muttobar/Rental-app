import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Button, 
  TextInput, 
  Snackbar,
  ActivityIndicator 
} from 'react-native-paper';
import { createProperty } from '../services/api';

export default function AddPropertyScreen({ navigation }) {
  // Состояния
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Обработка отправки формы
  const handleSubmit = async () => {
    if (!address.trim() || !price.trim()) {
      setError('Заполните все поля');
      return;
    }

    try {
      setLoading(true);
      await createProperty({ 
        address: address.trim(),
        price: parseFloat(price)
      });
      navigation.goBack();
    } catch (err) {
      setError('Ошибка сервера: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Поле ввода адреса */}
      <TextInput
        label="Адрес помещения"
        mode="outlined"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        placeholder="ул. Примерная, д. 123"
      />

      {/* Поле ввода цены */}
      <TextInput
        label="Стоимость аренды ($)"
        mode="outlined"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholder="1500"
      />

      {/* Кнопка сохранения */}
      <Button
        mode="contained"
        icon="content-save"
        loading={loading}
        onPress={handleSubmit}
        style={styles.button}
        disabled={loading}
      >
        {loading ? 'Сохранение...' : 'Сохранить'}
      </Button>

      {/* Уведомление об ошибке */}
      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        action={{
          label: 'OK',
          onPress: () => setError(''),
        }}
        duration={3000}
      >
        {error}
      </Snackbar>
    </View>
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 8,
  },
});
