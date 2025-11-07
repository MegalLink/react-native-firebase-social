import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366F1',
    secondary: '#EC4899',
    tertiary: '#8B5CF6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F3F4F6',
    onSurface: '#1F2937',
    onSurfaceVariant: '#6B7280',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#818CF8',
    secondary: '#F472B6',
    tertiary: '#A78BFA',
    background: '#111827',
    surface: '#1F2937',
    surfaceVariant: '#374151',
    onSurface: '#F9FAFB',
    onSurfaceVariant: '#D1D5DB',
  },
};
