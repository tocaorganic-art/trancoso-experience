import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Mail, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verificar se é o admin
      if (email === "admin@tocaexperience.com" && password === "TocaAdmin2024!") {
        // Salvar flag de admin no localStorage
        localStorage.setItem("toca_admin", "true");
        toast.success("Login realizado com sucesso!");
        navigate(createPageUrl("AdminDashboard"));
      } else {
        toast.error("Email ou senha incorretos");
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to={createPageUrl("Home")}>
          <Button variant="ghost" className="mb-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Site
          </Button>
        </Link>

        <Card className="shadow-2xl border-2 border-purple-200">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </CardTitle>
            <p className="text-sm text-gray-500">Toca Experience</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tocaexperience.com"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Senha
                </label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center text-xs text-gray-500 mt-4">
                <p>Credenciais padrão:</p>
                <p className="font-mono bg-gray-100 p-2 rounded mt-1">
                  admin@tocaexperience.com
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-600 mt-6">
          Sistema protegido • Apenas administradores autorizados
        </p>
      </div>
    </div>
  );
}