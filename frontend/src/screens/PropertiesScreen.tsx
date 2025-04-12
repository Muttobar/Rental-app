import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties } from '../services/api';

export default function PropertiesScreen({ navigation }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchProperties();
      setProperties(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          {properties.map((property) => (
            <PropertyCard 
              key={property.id}
              property={property}
              onPress={() => navigation.navigate('PaymentDetails', { propertyId: property.id })}
            />
          ))}
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
});
