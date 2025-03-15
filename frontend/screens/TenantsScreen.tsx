import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:8080';
export default function TenantsScreen() {
    const [tenants, setTenants] = useState([]);

    const fetchTenants = async () => {
        try {
            const response = await axios.get(${API_URL}/tenants);
            setTenants(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => { fetchTenants(); }, []);

    return (
        <View style={{ padding: 20 }}>
            <FlatList
                data={tenants}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={{ fontSize: 18 }}>{item.name}</Text>
                )}
            />
        </View>
    );
}