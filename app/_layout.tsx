import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'default' : 'fade',
          animationDuration: 300,
        }}
      >
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
