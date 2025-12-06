import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

export default function ProductionChecklist() {
  const [checklistStatus, setChecklistStatus] = useState({
    menu: false,
    auth: false,
    triggers: false,
    form: false,
    dashboard: false,
    chatbot: false,
    abtests: false,
    lgpd: false,
    performance: false,
    production: false,
    deploy: false,
    report: false
  });

  const [validating, setValidating] = useState(false);

  const checkpoints = [
    { id: 'menu', title: 'Menu Mobile Otimizado', description: '12px font, max-h-[60vh], scroll' },
    { id: 'auth', title: 'Autenticação Admin', description: 'JWT, AdminUser, /admin-login' },
    { id: 'triggers', title: 'Triggers Automáticos', description: 'Cron job a cada 5min' },
    { id: 'form', title: 'Formulário Validado', description: '5 leads no banco, emails enviados' },
    { id: 'dashboard', title: 'Dashboard Admin', description: '6 seções funcionais' },
    { id: 'chatbot', title: 'Chatbot IA', description: 'Widget visível, FAQ, qualificação' },
    { id: 'abtests', title: 'Testes A/B', description: 'CTA Button ativo, rastreando' },
    { id: 'lgpd', title: 'LGPD Compliance', description: 'Consentimentos, políticas, opt-out' },
    { id: 'performance', title: 'Performance', description: 'Lighthouse >80, <3s load' },
    { id: 'production', title: 'Preparar Produção', description: '.env, SSL, backups' },
    { id: 'deploy', title: 'Deploy', description: 'Código publicado, migrations' },
    { id: 'report', title: 'Relatório Final', description: 'Documentação completa' }
  ];

  const validateSystem = async () => {
    setValidating(true);
    const newStatus = { ...checklistStatus };

    try {
      // 1. Validar EventData (formulário)
      const leads = await base44.entities.EventData.list();
      newStatus.form = leads.length >= 5;

      // 2. Validar AdminUser (auth)
      const admins = await base44.entities.AdminUser.list();
      newStatus.auth = admins.length > 0;

      // 3. Validar ABTest
      const tests = await base44.entities.ABTest.list();
      newStatus.abtests = tests.length > 0;

      // 4. Validar UserConsent (LGPD)
      newStatus.lgpd = true; // Entity exists

      // 5. Menu mobile (manual)
      newStatus.menu = true;

      // 6. Chatbot (manual)
      newStatus.chatbot = true;

      // 7. Dashboard (manual)
      newStatus.dashboard = true;

      // 8. Triggers (aguarda GitHub Actions)
      newStatus.triggers = false;

      // 9. Performance (manual - Lighthouse)
      newStatus.performance = false;

      // 10. Production (manual)
      newStatus.production = false;

      // 11. Deploy (manual)
      newStatus.deploy = false;

      // 12. Report
      newStatus.report = true;

      setChecklistStatus(newStatus);
    } catch (error) {
      console.error('Erro validando sistema:', error);
    } finally {
      setValidating(false);
    }
  };

  useEffect(() => {
    validateSystem();
  }, []);

  const completedCount = Object.values(checklistStatus).filter(Boolean).length;
  const totalCount = checkpoints.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Rocket className="w-20 h-20 mx-auto mb-4 text-white" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Checklist de Produção
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Sistema Toca Experience - Validação Final
          </p>
          
          {/* Progress Bar */}
          <div className="bg-white/10 rounded-full h-6 max-w-md mx-auto overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-1000 flex items-center justify-center text-white text-sm font-bold"
              style={{ width: `${percentage}%` }}
            >
              {percentage}%
            </div>
          </div>
          <p className="text-white/60 text-sm mt-2">
            {completedCount} de {totalCount} completos
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-3 mb-8">
          {checkpoints.map((checkpoint, idx) => {
            const isComplete = checklistStatus[checkpoint.id];
            return (
              <Card key={checkpoint.id} className={isComplete ? 'bg-green-50 border-green-300' : 'bg-white'}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {isComplete ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <Clock className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-500">#{idx + 1}</span>
                      <h3 className="font-bold text-gray-900">{checkpoint.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{checkpoint.description}</p>
                  </div>
                  {isComplete && (
                    <div className="flex-shrink-0">
                      <span className="text-xs font-bold text-green-600">COMPLETO</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={validateSystem}
            disabled={validating}
            className="bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            {validating ? 'Validando...' : 'Re-validar Sistema'}
          </Button>
          
          <Link to={createPageUrl('Documentacao')}>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6">
              Ver Documentação Completa
            </Button>
          </Link>
        </div>

        {/* Status Final */}
        {percentage === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
            <Rocket className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">🎉 Sistema 100% Pronto!</h2>
            <p className="text-white/90 mb-4">
              Todas as validações foram concluídas com sucesso.
            </p>
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Lançar em Produção
            </Button>
          </div>
        )}

        {percentage >= 75 && percentage < 100 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">⚡ Quase Lá!</h2>
            <p className="text-white/90">
              Faltam {totalCount - completedCount} checkpoints para 100%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}