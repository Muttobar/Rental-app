import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';

// Импорты экранов
import PropertiesScreen from './src/screens/PropertiesScreen';
import AddPropertyScreen from './src/screens/AddPropertyScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';

// Типы для навигации
type RootStackParamList = {
  Properties: undefined;
  AddProperty: undefined;
  PaymentDetails: { propertyId: number };
};

type DrawerParamList = {
  MainStack: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();


function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.primary,
      }}
    >
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
        name="PaymentDetails"
        component={PaymentsScreen}
        options={{ title: 'Детали платежей' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: { backgroundColor: theme.colors.background },
            drawerActiveTintColor: theme.colors.primary,
          }}
        >
          <Drawer.Screen
            name="MainStack"
            component={MainStack}
            options={{ title: 'Главная' }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Настройки' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
