import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TenantsScreen from './screens/TenantsScreen';
import AddTenantScreen from './screens/AddTenantScreen';

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
        <Stack.Screen
          name="AddTenant"
          component={AddTenantScreen}
          options={{ title: 'Новый арендатор' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
