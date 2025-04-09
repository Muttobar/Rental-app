// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from './types'; // Добавьте этот файл
import TenantsScreen from './screens/TenantsScreen';
import AddTenantScreen from './screens/AddTenantScreen';
import PropertiesScreen from './screens/PropertiesScreen';
import AddPropertyScreen from './screens/AddPropertyScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import DocumentUploadScreen from './screens/DocumentUploadScreen';

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTintColor: '#212529',
        }}
      >
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
        
        <Stack.Screen
          name="Properties"
          component={PropertiesScreen}
          options={{ title: 'Помещения' }}
        />
        
        <Stack.Screen
          name="AddProperty"
          component={AddPropertyScreen}
          options={{ title: 'Новое помещение' }}
        />
        
        <Stack.Screen
          name="Payments"
          component={PaymentsScreen}
          options={({ route }) => ({ 
            title: `Платежи #${route.params.tenantId}` 
          })}
        />
        
        <Stack.Screen
          name="DocumentUpload"
          component={DocumentUploadScreen}
          options={({ route }) => ({ 
            title: `Документы #${route.params.propertyId}` 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
