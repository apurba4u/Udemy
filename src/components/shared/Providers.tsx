'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
