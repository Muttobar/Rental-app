import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TenantsScreen from './screens/TenantsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Tenants" 
                    component={TenantsScreen} 
                    options={{ title: 'Арендаторы' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
