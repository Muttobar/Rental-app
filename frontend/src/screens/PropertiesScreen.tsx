import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import PropertyList from '../components/PropertyList';
import { fetchProperties } from '../services/api';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Property } from '../types';


export default function PropertiesScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Properties'>>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          <PropertyList properties={properties} />
          <Button
            mode="contained"
            icon="plus"
            style={styles.button}
            onPress={() => navigation.navigate('AddProperty')}
          >
            Добавить помещение
          </Button>
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
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  }
});