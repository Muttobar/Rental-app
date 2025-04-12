import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';

// Экран помещений
import PropertiesScreen from './src/screens/PropertiesScreen';
import AddPropertyScreen from './src/screens/AddPropertyScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Типы для навигации
type RootStackParamList = {
  Properties: undefined;
  AddProperty: undefined;
};

type DrawerParamList = {
  MainStack: undefined;
  Settings: undefined;
};

// Создание навигаторов
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

// Главный стек приложения
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
    </Stack.Navigator>
  );
}

// Основной компонент приложения
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
