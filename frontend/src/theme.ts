import { DefaultTheme } from 'react-native-paper';
import { API_URL } from '@env';

console.log('API URL:', API_URL);

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    success: '#4CAF50',
    primary: '#000000',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    error: '#D32F2F',
    text: '#212121',
    accent: '#2196F3',
    orange: '#FF9800',
    warning: '#FFC107',
  }
};