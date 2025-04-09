import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://192.168.1.39:8082';

export default function PropertiesScreen() {
    const [properties, setProperties] = useState([]);
    const navigation = useNavigation();

    const fetchProperties = async () => {
        try {
            // Исправленная строка:
            const response = await axios.get(`${API_URL}/properties`);
            setProperties(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Button
                title="Add Property"
                onPress={() => navigation.navigate('AddProperty')}
            />
            <FlatList
                data={properties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, marginVertical: 5, backgroundColor: '#f0f0f0' }}>
                        <Text>{item.address}</Text>
                        <Text>Price: ${item.price}/month</Text>
                        <Text>Size: {item.size} sq.m</Text>
                    </View>
                )}
            />
        </View>
    );
}
