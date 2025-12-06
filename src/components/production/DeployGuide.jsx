import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, GitBranch, CheckCircle, Terminal, Globe, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function DeployGuide() {
  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    toast.success("Comando copiado!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            Guia de Deploy - Base44 Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">
            Deploy automatizado via Base44. Seu código é publicado instantaneamente com zero downtime.
          </p>
        </CardContent>
      </Card>

      {/* Step 1: Pre-Deploy Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Passo 1: Pre-Deploy Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">Verifique antes de fazer deploy:</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>✅ Todas as secrets configuradas (BREVO_API_KEY, MAILCHIMP_API_KEY)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>✅ Testes manuais realizados (formulário, chatbot, admin)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>✅ Entities criadas (EventData, AdminUser, ABTest, etc)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>✅ Backend functions testadas (leadNotification, adminAuth, etc)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>✅ Performance validada (Core Web Vitals)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Deploy via Base44 Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-blue-600" />
            Passo 2: Deploy via Base44 Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              A Base44 realiza deploy automático sempre que você salva alterações no editor.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Como funciona:
              </h4>
              <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Você edita arquivos via AI ou Editor</li>
                <li>Base44 automaticamente builda o código</li>
                <li>Deploy é feito em segundos (hot reload)</li>
                <li>Sem necessidade de git push ou CI/CD manual</li>
              </ol>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-green-900 mb-2">✅ Seu app já está em produção!</p>
              <p className="text-sm text-gray-700">
                A Base44 hospeda seu app automaticamente. Acesse via:
              </p>
              <div className="mt-2 p-2 bg-white rounded border border-green-200 font-mono text-xs">
                https://[seu-app-id].base44.app
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Domain Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            Passo 3: Domínio Personalizado (Opcional)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Configure um domínio próprio para seu app:
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-gray-900">Configuração DNS:</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="bg-white p-2 rounded border">
                  <strong>Tipo:</strong> CNAME<br/>
                  <strong>Nome:</strong> www<br/>
                  <strong>Valor:</strong> base44.app
                </div>
                <div className="bg-white p-2 rounded border">
                  <strong>Tipo:</strong> A<br/>
                  <strong>Nome:</strong> @<br/>
                  <strong>Valor:</strong> [IP fornecido pela Base44]
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              ⏱️ Propagação DNS pode levar 24-48 horas
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Post-Deploy Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Passo 4: Monitoramento Pós-Deploy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-3">
              Monitore nas primeiras 24-48 horas:
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-1 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <strong className="text-gray-900">Logs de Erro</strong>
                  <p className="text-gray-600 text-xs">Dashboard Base44 → Logs → Filtrar por "error"</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <strong className="text-gray-900">Formulários</strong>
                  <p className="text-gray-600 text-xs">Testar submissão de leads e verificar emails</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-1 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <strong className="text-gray-900">Analytics</strong>
                  <p className="text-gray-600 text-xs">Google Analytics e Meta Pixel rastreando corretamente</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 rounded-full p-1 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <strong className="text-gray-900">Performance</strong>
                  <p className="text-gray-600 text-xs">Lighthouse score e Core Web Vitals no green</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 5: Rollback Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-red-600" />
            Passo 5: Plano de Rollback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Em caso de problemas críticos:
            </p>
            
            <div className="bg-red-50 p-4 rounded-lg space-y-2 text-sm">
              <p className="font-semibold text-red-900">🚨 Emergência:</p>
              <ol className="text-gray-700 space-y-1 list-decimal list-inside">
                <li>Acesse Base44 Dashboard → Deployments</li>
                <li>Selecione última versão estável</li>
                <li>Clique em "Rollback to this version"</li>
                <li>Deploy automático em ~30 segundos</li>
              </ol>
            </div>

            <p className="text-xs text-gray-500">
              💡 Base44 mantém histórico de todos os deploys para rollback instantâneo
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6 text-center">
          <Rocket className="w-12 h-12 mx-auto mb-3 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            🎉 Pronto para Deploy!
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Seu sistema Toca Experience está configurado e testado. Deploy via Base44 é automático.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            Acessar Base44 Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}