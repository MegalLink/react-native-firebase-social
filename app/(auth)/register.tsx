import { AnimatedScreen } from '@/components/animated-screen';
import { AuthAvatar } from '@/components/auth-avatar';
import { useSignUp } from '@/hooks/use-auth';
import { useAuthStore } from '@/store/auth-store';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';

export default function RegisterScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const signUpMutation = useSignUp();
  const { error, clearError } = useAuthStore();

  const handleRegister = () => {
    setValidationError('');
    
    // Validaciones
    if (!fullName || !email || !password || !confirmPassword) {
      setValidationError('Por favor, completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    signUpMutation.mutate(
      {
        email: email.trim(),
        password,
        displayName: fullName.trim(),
      },
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
        colors={['#EC4899', '#F472B6', '#FB7185']}
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
          <AuthAvatar showPlus />

          {/* Title */}
          <Text variant="displaySmall" style={styles.title}>
            Crear Cuenta
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Únete a nosotros hoy
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextInput
              label="Nombre completo"
              value={fullName}
              onChangeText={setFullName}
              right={<TextInput.Icon icon="account-outline" />}
              textColor="#1F2937"
              style={styles.input}
            />

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
              style={styles.input}
              textColor="#1F2937"
            />

            <TextInput
              label="Confirmar Contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              style={styles.input}
              textColor="#1F2937"
            />

            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              labelStyle={styles.registerButtonLabel}
              loading={signUpMutation.isPending}
              disabled={signUpMutation.isPending || !fullName || !email || !password || !confirmPassword}
            >
              {signUpMutation.isPending ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login' as any)}>
                <Text style={styles.loginLink}>Inicia sesión aquí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
    <Snackbar
      visible={!!error || !!validationError}
      onDismiss={() => {
        clearError();
        setValidationError('');
      }}
      duration={4000}
      action={{
        label: 'Cerrar',
        onPress: () => {
          clearError();
          setValidationError('');
        },
      }}
      style={{ backgroundColor: '#EF4444' }}
    >
      {error || validationError}
    </Snackbar>
    <Snackbar
      visible={showSuccess}
      onDismiss={() => setShowSuccess(false)}
      duration={2000}
      style={{ backgroundColor: '#10B981' }}
    >
      ¡Registro exitoso! Bienvenido 🎉
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
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 40,
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
  termsText: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  registerButton: {
    borderRadius: 25,
    paddingVertical: 8,
    backgroundColor: '#6366F1',
    marginBottom: 24,
  },
  registerButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  loginLink: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
