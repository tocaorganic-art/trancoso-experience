import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Server, Lock, Database, Bell, Copy } from "lucide-react";
import { toast } from "sonner";

export default function ProductionGuide() {
  const [checklist, setChecklist] = useState({
    env: false,
    ssl: false,
    backup: false,
    monitoring: false,
    dns: false,
    security: false
  });

  const toggleItem = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para área de transferência!");
  };

  const envTemplate = `# Production Environment Variables
BASE44_APP_ID=seu-app-id
BREVO_API_KEY=sua-chave-brevo
MAILCHIMP_API_KEY=sua-chave-mailchimp
MAILCHIMP_LIST_ID=seu-list-id

# Admin Auth (gerar hash bcrypt)
ADMIN_JWT_SECRET=gerar-segredo-forte-aqui

# Monitoramento (opcional)
SENTRY_DSN=seu-sentry-dsn
GOOGLE_ANALYTICS_ID=seu-ga-id`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-6 h-6" />
            Guia de Deploy em Produção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">
            Siga este checklist para garantir um deploy seguro e confiável do sistema Toca Experience.
          </p>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Environment Variables */}
        <Card className={checklist.env ? 'bg-green-50 border-green-300' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <button onClick={() => toggleItem('env')} className="flex-shrink-0">
                {checklist.env ? 
                  <CheckCircle className="w-6 h-6 text-green-600" /> : 
                  <Circle className="w-6 h-6 text-gray-400" />
                }
              </button>
              Variáveis de Ambiente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Configure todas as secrets necessárias:</p>
              <div className="bg-gray-900 rounded-lg p-3 text-xs text-white font-mono overflow-x-auto">
                <pre>{envTemplate}</pre>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(envTemplate)}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" /> Copiar Template
              </Button>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✅ BREVO_API_KEY - Email marketing</li>
                <li>✅ MAILCHIMP_API_KEY - Newsletter</li>
                <li>⚠️ ADMIN_JWT_SECRET - Gerar novo</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* SSL/HTTPS */}
        <Card className={checklist.ssl ? 'bg-green-50 border-green-300' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <button onClick={() => toggleItem('ssl')} className="flex-shrink-0">
                {checklist.ssl ? 
                  <CheckCircle className="w-6 h-6 text-green-600" /> : 
                  <Circle className="w-6 h-6 text-gray-400" />
                }
              </button>
              <Lock className="w-5 h-5" />
              SSL/HTTPS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Certificado SSL obrigatório:</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🔒 Base44 provê SSL automático</li>
                <li>🔒 Force HTTPS redirect ativo</li>
                <li>🔒 HSTS headers configurados</li>
                <li>🔒 Certificado Let's Encrypt válido</li>
              </ul>
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-gray-700">
                <strong>Teste SSL:</strong><br/>
                <code>curl -I https://seu-dominio.com</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backups */}
        <Card className={checklist.backup ? 'bg-green-50 border-green-300' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <button onClick={() => toggleItem('backup')} className="flex-shrink-0">
                {checklist.backup ? 
                  <CheckCircle className="w-6 h-6 text-green-600" /> : 
                  <Circle className="w-6 h-6 text-gray-400" />
                }
              </button>
              <Database className="w-5 h-5" />
              Backups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Estratégia de backup automático:</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>💾 Base44 realiza backups diários</li>
                <li>💾 Retenção: 30 dias</li>
                <li>💾 Point-in-time recovery disponível</li>
                <li>💾 Exportação manual via dashboard</li>
              </ul>
              <div className="bg-yellow-50 p-3 rounded-lg text-xs text-gray-700">
                <strong>⚠️ Recomendação:</strong> Exportar CSV dos leads semanalmente via AdminDashboard como backup adicional.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring */}
        <Card className={checklist.monitoring ? 'bg-green-50 border-green-300' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <button onClick={() => toggleItem('monitoring')} className="flex-shrink-0">
                {checklist.monitoring ? 
                  <CheckCircle className="w-6 h-6 text-green-600" /> : 
                  <Circle className="w-6 h-6 text-gray-400" />
                }
              </button>
              <Bell className="w-5 h-5" />
              Monitoramento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Ferramentas de monitoramento ativas:</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>📊 Google Analytics - Tráfego</li>
                <li>📊 Meta Pixel - Conversões</li>
                <li>📊 Performance Monitor - Core Web Vitals</li>
                <li>📊 Base44 Dashboard - Uptime/Logs</li>
              </ul>
              <div className="bg-green-50 p-3 rounded-lg text-xs text-gray-700">
                <strong>✅ Alertas configurados:</strong><br/>
                Email para tocaorganic@gmail.com em caso de erros críticos.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DNS */}
        <Card className={checklist.dns ? 'bg-green-50 border-green-300' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <button onClick={() => toggleItem('dns')} className="flex-shrink-0">
                {checklist.dns ? 
                  <CheckCircle className="w-6 h-6 text-green-600" /> : 
                  <Circle className="w-6 h-6 text-gray-400" />
                }
              </button>
              🌐 DNS & Domínio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Configuração de DNS:</p>
              <div className="bg-gray-100 p-3 rounded-lg text-xs font-mono">
                <div className="space-y-1">
                  <div><strong>A Record:</strong> @ → IP-BASE44</div>
                  <div><strong>CNAME:</strong> www → base44.app</div>
                  <div><strong>TXT:</strong> SPF/DKIM para emails</div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                ⏱️ Propagação DNS: 24-48h
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className={checklist.security ? 'bg-green-50 border-green-300' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <button onClick={() => toggleItem('security')} className="flex-shrink-0">
                {checklist.security ? 
                  <CheckCircle className="w-6 h-6 text-green-600" /> : 
                  <Circle className="w-6 h-6 text-gray-400" />
                }
              </button>
              🛡️ Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Medidas de segurança ativas:</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ JWT auth para admin</li>
                <li>✅ Rate limiting no backend</li>
                <li>✅ CORS configurado</li>
                <li>✅ Input sanitization</li>
                <li>✅ LGPD compliance</li>
                <li>✅ Webhook signature validation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">
                Status de Preparação para Produção
              </h3>
              <p className="text-sm text-gray-600">
                {Object.values(checklist).filter(Boolean).length} de {Object.keys(checklist).length} itens completos
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round((Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length) * 100)}%
              </div>
              <p className="text-xs text-gray-500">Pronto</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Revisar todas as variáveis de ambiente</li>
            <li>Testar formulários e automações em staging</li>
            <li>Configurar domínio personalizado</li>
            <li>Executar testes de carga (opcional)</li>
            <li>Deploy final via Base44 Dashboard</li>
            <li>Monitorar logs nas primeiras 24h</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}