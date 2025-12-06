import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, X, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 1,
      title: "Acessar Dashboard",
      description: "Acesse /admin para ver métricas em tempo real",
      action: "Ir para Dashboard"
    },
    {
      id: 2,
      title: "Verificar Leads Hot",
      description: "Leads com score 80+ precisam de contato imediato (até 2h)",
      action: "Ver Leads"
    },
    {
      id: 3,
      title: "Revisar Follow-ups",
      description: "Sistema enviou emails automáticos. Verifique respostas",
      action: "Ver Automações"
    },
    {
      id: 4,
      title: "Analisar Testes A/B",
      description: "Veja qual CTA está convertendo melhor",
      action: "Ver Testes"
    },
    {
      id: 5,
      title: "Exportar Relatório",
      description: "Baixe CSV com todos os leads para análise",
      action: "Exportar CSV"
    }
  ];

  const toggleStep = (id) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl z-40"
        size="lg"
      >
        <BookOpen className="w-5 h-5 mr-2" />
        Guia Rápido
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed left-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Guia Rápido</h2>
                      <p className="text-sm text-gray-500">5 passos essenciais</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>🎯 Meta de Hoje:</strong> Contatar todos os leads hot (score 80+) 
                    e revisar follow-ups pendentes.
                  </p>
                </div>

                <div className="space-y-3">
                  {steps.map((step, idx) => {
                    const isCompleted = completedSteps.includes(step.id);
                    return (
                      <Card 
                        key={step.id} 
                        className={`cursor-pointer transition-all ${
                          isCompleted ? 'bg-green-50 border-green-300' : 'hover:shadow-md'
                        }`}
                        onClick={() => toggleStep(step.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted 
                                ? 'bg-green-500' 
                                : 'bg-gray-200'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              ) : (
                                <span className="text-sm font-bold text-gray-600">{idx + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className={`font-semibold ${
                                isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                              }`}>
                                {step.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-4">
                  <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-base">📊 Métricas Importantes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p><strong>Taxa de Conversão Meta:</strong> 25%</p>
                      <p><strong>Tempo de Resposta:</strong> Máx 2h para leads hot</p>
                      <p><strong>Follow-ups:</strong> Máx 3 tentativas por lead</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-base">⚠️ Ações Urgentes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>• Leads hot sem resposta (2h)</p>
                      <p>• Follow-ups atrasados (24h)</p>
                      <p>• Propostas pendentes (48h)</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
                    <strong>Suporte:</strong> tocaorganic@gmail.com<br/>
                    <strong>WhatsApp:</strong> (21) 97282-4659
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}