import { AuthService } from '@/services/auth-service';
import { useAuthStore } from '@/store/auth-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

function AuthStateListener({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthStateListener>{children}</AuthStateListener>
    </QueryClientProvider>
  );
}
