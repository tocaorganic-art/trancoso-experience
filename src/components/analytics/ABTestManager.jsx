import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, RefreshCw, Loader2 } from "lucide-react";

export default function ABTestManager() {
  const [activeTests, setActiveTests] = useState([
    { name: 'CTA Button', element: 'cta_button', variants: { A: 'Solicitar Proposta', B: 'Agendar Consulta' } },
    { name: 'Form Type', element: 'form_type', variants: { A: '1-Step', B: 'Multi-Step' } },
    { name: 'Pricing Display', element: 'pricing', variants: { A: 'A combinar', B: 'Sob consulta' } }
  ]);

  const { data: testResults = [], isLoading, refetch } = useQuery({
    queryKey: ['abTests'],
    queryFn: () => base44.entities.ABTest.list('-created_date', 1000),
  });

  const calculateMetrics = (testName) => {
    const testData = testResults.filter(r => r.test_name === testName);
    
    const variantA = testData.filter(r => r.variant === 'A');
    const variantB = testData.filter(r => r.variant === 'B');

    const metricsA = {
      views: variantA.length,
      clicks: variantA.filter(r => r.clicked).length,
      conversions: variantA.filter(r => r.converted).length,
      ctr: variantA.length > 0 ? (variantA.filter(r => r.clicked).length / variantA.length * 100).toFixed(2) : 0,
      cvr: variantA.length > 0 ? (variantA.filter(r => r.converted).length / variantA.length * 100).toFixed(2) : 0
    };

    const metricsB = {
      views: variantB.length,
      clicks: variantB.filter(r => r.clicked).length,
      conversions: variantB.filter(r => r.converted).length,
      ctr: variantB.length > 0 ? (variantB.filter(r => r.clicked).length / variantB.length * 100).toFixed(2) : 0,
      cvr: variantB.length > 0 ? (variantB.filter(r => r.converted).length / variantB.length * 100).toFixed(2) : 0
    };

    const winner = parseFloat(metricsB.cvr) > parseFloat(metricsA.cvr) ? 'B' : 'A';
    const improvement = Math.abs(parseFloat(metricsB.cvr) - parseFloat(metricsA.cvr)).toFixed(2);
    const significance = metricsA.views + metricsB.views >= 100 ? 'Significativo' : 'Dados insuficientes';

    return { metricsA, metricsB, winner, improvement, significance };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Testes A/B Ativos</h2>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {activeTests.map((test) => {
        const metrics = calculateMetrics(test.name);

        return (
          <Card key={test.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{test.name}</span>
                {metrics.significance === 'Significativo' && (
                  <span className="text-sm font-normal text-green-600">✓ {metrics.significance}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Variant A */}
                <div className={`p-4 rounded-lg border-2 ${metrics.winner === 'A' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800">Variante A</h4>
                    {metrics.winner === 'A' && <span className="text-green-600 text-sm font-bold">🏆 Vencedor</span>}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{test.variants.A}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Visualizações:</span>
                      <span className="font-bold">{metrics.metricsA.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cliques:</span>
                      <span className="font-bold">{metrics.metricsA.clicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversões:</span>
                      <span className="font-bold">{metrics.metricsA.conversions}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">CTR:</span>
                      <span className="font-bold text-blue-600">{metrics.metricsA.ctr}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CVR:</span>
                      <span className="font-bold text-purple-600">{metrics.metricsA.cvr}%</span>
                    </div>
                  </div>
                </div>

                {/* Variant B */}
                <div className={`p-4 rounded-lg border-2 ${metrics.winner === 'B' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800">Variante B</h4>
                    {metrics.winner === 'B' && <span className="text-green-600 text-sm font-bold">🏆 Vencedor</span>}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{test.variants.B}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Visualizações:</span>
                      <span className="font-bold">{metrics.metricsB.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cliques:</span>
                      <span className="font-bold">{metrics.metricsB.clicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversões:</span>
                      <span className="font-bold">{metrics.metricsB.conversions}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">CTR:</span>
                      <span className="font-bold text-blue-600">{metrics.metricsB.ctr}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CVR:</span>
                      <span className="font-bold text-purple-600">{metrics.metricsB.cvr}%</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="p-4 rounded-lg bg-gray-50">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Análise
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Melhoria:</p>
                      <p className="text-2xl font-bold text-green-600">+{metrics.improvement}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Total de Testes:</p>
                      <p className="font-bold">{metrics.metricsA.views + metrics.metricsB.views}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Significância:</p>
                      <p className={`font-bold ${metrics.significance === 'Significativo' ? 'text-green-600' : 'text-orange-600'}`}>
                        {metrics.significance}
                      </p>
                    </div>
                    {metrics.significance === 'Significativo' && (
                      <Button className="w-full mt-4" size="sm">
                        Aplicar Vencedor
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}