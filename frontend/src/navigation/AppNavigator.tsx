// frontend/src/navigation/AppNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PropertiesScreen from '../screens/PropertiesScreen';
import AddPropertyScreen from '../screens/AddPropertyScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Главный стек экранов
function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Properties"
        component={PropertiesScreen}
        options={{ title: 'Помещения' }}
      />
      <Stack.Screen
        name="AddProperty"
        component={AddPropertyScreen}
        options={{ title: 'Добавить помещение' }}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{ title: 'Платежи' }}
      />
    </Stack.Navigator>
  );
}

// Drawer-навигация
export default function AppNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Main"
        component={MainStackNavigator}
        options={{ title: 'Главная' }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Настройки' }}
      />
    </Drawer.Navigator>
  );
}
