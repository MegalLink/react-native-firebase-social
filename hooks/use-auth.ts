import { AuthService, SignInData, SignUpData } from '@/services/auth-service';
import { useAuthStore } from '@/store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

/**
 * Hook para registrar un nuevo usuario
 */
export function useSignUp() {
  const { setUser, setError, clearError } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignUpData) => AuthService.signUp(data),
    onSuccess: (user) => {
      setUser(user);
      clearError();
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // Navegar a la pantalla principal después del registro
      // router.replace('/(tabs)' as any);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}

/**
 * Hook para iniciar sesión
 */
export function useSignIn() {
  const { setUser, setError, clearError } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInData) => AuthService.signIn(data),
    onSuccess: (user) => {
      setUser(user);
      clearError();
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // Navegar a la pantalla principal después del login
      // router.replace('/(tabs)' as any);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}

/**
 * Hook para cerrar sesión
 */
export function useSignOut() {
  const { logout, setError } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.signOut(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      router.replace('/(auth)/login' as any);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}
