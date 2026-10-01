import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/lib/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();

  // Já autenticado como admin: segue direto para o painel.
  useEffect(() => {
    if (!isLoadingAuth && isAuthenticated && user?.role === 'admin') {
      navigate(createPageUrl('AdminDashboard'));
    }
  }, [isLoadingAuth, isAuthenticated, user, navigate]);

  const handleLogin = () => navigateToLogin();
  const semPermissao = !isLoadingAuth && isAuthenticated && user?.role !== 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <p className="text-gray-600 text-sm">
            Acesso restrito - Toca Experience
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-6">
              Entre com sua conta autorizada para acessar o painel administrativo.
            </p>
            {semPermissao && (
              <p role="alert" className="text-sm text-red-600 mb-4">
                Esta conta não tem permissão de administrador.
              </p>
            )}

            <Button
              onClick={handleLogin}
              className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
            >
              Entrar com minha conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}