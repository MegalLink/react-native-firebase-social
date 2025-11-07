import { AnimatedScreen } from '@/components/animated-screen';
import { AuthAvatar } from '@/components/auth-avatar';
import { useSignUp } from '@/hooks/use-auth';
import { useAuthStore } from '@/store/auth-store';
import { useForm } from '@tanstack/react-form';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const signUpMutation = useSignUp();
  const { error, clearError } = useAuthStore();

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      signUpMutation.mutate(
        {
          email: value.email.trim(),
          password: value.password,
          displayName: value.fullName.trim(),
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
    },
  });

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
            <form.Field
              name="fullName"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'El nombre completo es requerido';
                  if (value.trim().length < 2) {
                    return 'El nombre debe tener al menos 2 caracteres';
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextInput
                    label="Nombre completo"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    right={<TextInput.Icon icon="account-outline" />}
                    textColor="#1F2937"
                    style={styles.input}
                    error={!!field.state.meta.errors.length}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors[0]}</Text>
                  )}
                </View>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'El email es requerido';
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Email inválido';
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextInput
                    label="Email"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    right={<TextInput.Icon icon="email-outline" />}
                    textColor="#1F2937"
                    style={styles.input}
                    error={!!field.state.meta.errors.length}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors[0]}</Text>
                  )}
                </View>
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'La contraseña es requerida';
                  if (value.length < 6) {
                    return 'La contraseña debe tener al menos 6 caracteres';
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextInput
                    label="Contraseña"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    secureTextEntry={!showPassword}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    style={styles.input}
                    textColor="#1F2937"
                    error={!!field.state.meta.errors.length}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors[0]}</Text>
                  )}
                </View>
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{
                onChangeListenTo: ['password'],
                onChange: ({ value, fieldApi }) => {
                  if (!value) return 'Debes confirmar la contraseña';
                  const password = fieldApi.form.getFieldValue('password');
                  if (value !== password) {
                    return 'Las contraseñas no coinciden';
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextInput
                    label="Confirmar Contraseña"
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    secureTextEntry={!showConfirmPassword}
                    right={
                      <TextInput.Icon
                        icon={showConfirmPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    }
                    style={styles.input}
                    textColor="#1F2937"
                    error={!!field.state.meta.errors.length}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text style={styles.errorText}>{field.state.meta.errors[0]}</Text>
                  )}
                </View>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  mode="contained"
                  onPress={() => form.handleSubmit()}
                  style={styles.registerButton}
                  labelStyle={styles.registerButtonLabel}
                  loading={signUpMutation.isPending}
                  disabled={!canSubmit || signUpMutation.isPending}
                >
                  {signUpMutation.isPending ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              )}
            </form.Subscribe>

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
  errorText: {
    color: '#FEE2E2',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 12,
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
