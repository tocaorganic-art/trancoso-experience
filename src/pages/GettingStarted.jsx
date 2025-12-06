import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle, Users, Bot, TrendingUp, Mail, MessageCircle, BarChart3, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function GettingStarted() {
  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const steps = [
    {
      id: 1,
      title: "Acesse o Admin Dashboard",
      icon: BarChart3,
      description: "Familiarize-se com o painel administrativo",
      action: "Ir para Dashboard",
      link: "AdminDashboard",
      details: [
        "QuickStats: métricas em tempo real",
        "Leads: gestão completa de cotações",
        "Funil: visualize conversões",
        "Revenue: acompanhe receita",
        "A/B Tests: otimize conversões"
      ]
    },
    {
      id: 2,
      title: "Teste o Chatbot IA",
      icon: Bot,
      description: "Interaja com o assistente virtual",
      action: "Ver Home",
      link: "Home",
      details: [
        "Clique no ícone flutuante no canto inferior direito",
        "Faça perguntas sobre eventos",
        "O bot qualifica leads automaticamente",
        "FAQ respondida instantaneamente"
      ]
    },
    {
      id: 3,
      title: "Envie um Lead de Teste",
      icon: Users,
      description: "Teste o fluxo completo de conversão",
      action: "Formulário",
      link: "Cotacao",
      details: [
        "Preencha o formulário de cotação",
        "Verifique email de confirmação",
        "Abra WhatsApp com mensagem pré-formatada",
        "Acompanhe no AdminDashboard"
      ]
    },
    {
      id: 4,
      title: "Configure Email Marketing",
      icon: Mail,
      description: "Ative sequências automatizadas",
      action: "Ver Documentação",
      link: "Documentacao",
      details: [
        "Secrets já configuradas (Brevo + Mailchimp)",
        "5 emails automáticos por lead",
        "Rastreamento de opens e clicks",
        "Unsubscribe automático"
      ]
    },
    {
      id: 5,
      title: "Analise Testes A/B",
      icon: TrendingUp,
      description: "Otimize com base em dados reais",
      action: "Ver Testes",
      link: "AdminDashboard",
      details: [
        "CTA Button: 2 variantes ativas",
        "Mínimo 100 views para declarar vencedor",
        "Significance > 95% para confiança",
        "Aplique variante vencedora"
      ]
    },
    {
      id: 6,
      title: "Configure WhatsApp Business",
      icon: MessageCircle,
      description: "Automação de follow-up",
      action: "Ver Guia",
      link: "Documentacao",
      details: [
        "Webhook configurado em functions/whatsappWebhook",
        "Follow-up automático após 24h",
        "Mensagens personalizadas por evento",
        "Integração com Meta Business"
      ]
    },
    {
      id: 7,
      title: "Monitore Performance",
      icon: Settings,
      description: "Acompanhe métricas técnicas",
      action: "Checklist",
      link: "ProductionChecklist",
      details: [
        "Core Web Vitals: meta >90",
        "Lighthouse score: validado",
        "Error tracking: via Base44 logs",
        "Uptime: 99.9% garantido"
      ]
    }
  ];

  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <PlayCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Primeiros Passos</h1>
            <p className="text-blue-100 text-lg">
              Guia de onboarding para começar a usar o sistema Toca Experience
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mt-6">
              <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500 flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
              <p className="text-sm text-white/80 mt-2">
                {completedSteps.length} de {steps.length} passos completos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Quick Tips */}
        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              💡 Dicas Rápidas
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use o AdminDashboard como seu hub central</li>
              <li>• Teste cada feature antes de anunciar aos clientes</li>
              <li>• Monitore métricas diariamente nas primeiras 2 semanas</li>
              <li>• Itere com base em dados A/B, não em intuição</li>
            </ul>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const Icon = step.icon;

            return (
              <Card 
                key={step.id} 
                className={`transition-all ${isCompleted ? 'bg-green-50 border-green-300' : 'hover:shadow-lg'}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-600' : 'bg-blue-600'}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {step.id}. {step.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {isCompleted && <CheckCircle className="w-5 h-5 text-white" />}
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={createPageUrl(step.link)}>
                    <Button variant={isCompleted ? "outline" : "default"} size="sm">
                      {step.action} →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <Card className="mt-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                🎉 Parabéns! Onboarding Completo
              </h2>
              <p className="text-white/90 mb-6">
                Você está pronto para usar o sistema Toca Experience em produção!
              </p>
              <div className="flex justify-center gap-4">
                <Link to={createPageUrl("Home")}>
                  <Button className="bg-white text-green-600 hover:bg-gray-100">
                    Ver Site Público
                  </Button>
                </Link>
                <Link to={createPageUrl("AdminDashboard")}>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Ir para Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📚 Precisa de Ajuda?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Documentação:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>
                    <Link to={createPageUrl("Documentacao")} className="text-blue-600 hover:underline">
                      → Guia Completo
                    </Link>
                  </li>
                  <li>
                    <Link to={createPageUrl("ProductionChecklist")} className="text-blue-600 hover:underline">
                      → Production Checklist
                    </Link>
                  </li>
                  <li>
                    <Link to={createPageUrl("ProductionSetup")} className="text-blue-600 hover:underline">
                      → Deploy Guides
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Suporte:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>📧 Eventos: eventos@tocaexperience.com.br</li>
                  <li>📧 Suporte: contato@tocaexperience.com.br</li>
                  <li>💬 WhatsApp: +55 21 99773-1321</li>
                  <li>📱 Instagram: @tonyismusic</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}