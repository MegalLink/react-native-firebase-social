import { AnimatedScreen } from '@/components/animated-screen';
import { AuthAvatar } from '@/components/auth-avatar';
import { useSignIn } from '@/hooks/use-auth';
import { useAuthStore } from '@/store/auth-store';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const signInMutation = useSignIn();
  const { error, clearError } = useAuthStore();

  const handleLogin = () => {
    if (!email || !password) {
      return;
    }
    
    signInMutation.mutate(
      { email: email.trim(), password },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 2000);
        },
      }
    );
  };

  return (
    <AnimatedScreen>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6', '#D946EF']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
          {/* Avatar Icon */}
          <AuthAvatar />

          {/* Title */}
          <Text variant="displaySmall" style={styles.title}>
            Bienvenido Ionic Social
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Inicia sesión para continuar
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              right={<TextInput.Icon icon="email-outline" />}
              textColor="#1F2937"
              style={styles.input}
            />

            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              textColor="#1F2937"
              style={styles.input}
            />

            <Text style={styles.forgotPassword}>
              ¿Olvidaste tu contraseña?
            </Text>

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              labelStyle={styles.loginButtonLabel}
              loading={signInMutation.isPending}
              disabled={signInMutation.isPending || !email || !password}
            >
              {signInMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
    <Snackbar
      visible={!!error}
      onDismiss={clearError}
      duration={4000}
      action={{
        label: 'Cerrar',
        onPress: clearError,
      }}
      style={{ backgroundColor: '#EF4444' }}
    >
      {error}
    </Snackbar>
    <Snackbar
      visible={showSuccess}
      onDismiss={() => setShowSuccess(false)}
      duration={2000}
      style={{ backgroundColor: '#10B981' }}
    >
      ¡Inicio de sesión exitoso! 🎉
    </Snackbar>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 48,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    fontSize: 16,
  },
  inputOutline: {
    borderRadius: 12,
    borderWidth: 0,
  },
  forgotPassword: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 25,
    paddingVertical: 8,
    backgroundColor: '#EC4899',
    marginBottom: 24,
  },
  loginButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  registerLink: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
