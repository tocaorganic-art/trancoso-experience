import React, { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';

// Guard de páginas administrativas: exige sessão Base44 com role "admin".
// A flag antiga em localStorage não concede mais nenhum acesso.
// Observação: este guard controla a interface; a proteção dos dados deve
// continuar sendo feita por RLS nas entidades e checagem no backend.
export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();

  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      navigateToLogin();
    }
  }, [isLoadingAuth, isAuthenticated, navigateToLogin]);

  if (isLoadingAuth || !isAuthenticated) return null;

  if (user?.role !== 'admin') {
    return (
      <div role="alert" className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-2">
          <h1 className="text-xl font-semibold">Acesso restrito</h1>
          <p className="text-sm text-gray-600">
            Esta área é exclusiva para administradores. Entre com uma conta autorizada.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
