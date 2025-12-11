import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { Search, Loader2, Globe, ExternalLink, TrendingUp } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

const MOCK_COMPETITORS = [
  { 
    name: "Toca Experience", 
    url: "tocaexperience.com.br",
    isOwn: true,
    metrics: { authority: 35, keywords: 120, backlinks: 45, content: 80, technical: 75, social: 60 }
  },
  { 
    name: "DJ Premium Events", 
    url: "djpremiumevents.com.br",
    isOwn: false,
    metrics: { authority: 42, keywords: 180, backlinks: 78, content: 65, technical: 80, social: 55 }
  },
  { 
    name: "Sound Trancoso", 
    url: "soundtrancoso.com",
    isOwn: false,
    metrics: { authority: 28, keywords: 85, backlinks: 32, content: 70, technical: 60, social: 45 }
  }
];

export default function CompetitorAnalysis() {
  const [competitors, setCompetitors] = useState(MOCK_COMPETITORS);
  const [newCompetitor, setNewCompetitor] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const addCompetitor = async () => {
    if (!newCompetitor.trim()) return;
    
    setAnalyzing(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Analise o site concorrente "${newCompetitor}" no mercado de DJs e eventos. Estime métricas SEO: autoridade de domínio (0-100), quantidade de keywords ranqueadas, backlinks, qualidade de conteúdo (0-100), SEO técnico (0-100), presença social (0-100).`,
        response_json_schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            authority: { type: "number" },
            keywords: { type: "number" },
            backlinks: { type: "number" },
            content: { type: "number" },
            technical: { type: "number" },
            social: { type: "number" }
          }
        }
      });
      
      setCompetitors([...competitors, {
        name: result.name || newCompetitor,
        url: newCompetitor,
        isOwn: false,
        metrics: {
          authority: result.authority || 30,
          keywords: result.keywords || 50,
          backlinks: result.backlinks || 20,
          content: result.content || 50,
          technical: result.technical || 50,
          social: result.social || 40
        }
      }]);
      setNewCompetitor("");
      toast.success("Concorrente adicionado!");
    } catch (error) {
      toast.error("Erro ao analisar concorrente");
    } finally {
      setAnalyzing(false);
    }
  };

  const generateInsights = async () => {
    setLoadingInsights(true);
    try {
      const competitorData = competitors.map(c => ({
        name: c.name,
        ...c.metrics
      }));

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Analise estes dados de concorrentes SEO e gere insights estratégicos para a Toca Experience (empresa de DJs em Trancoso):

Dados: ${JSON.stringify(competitorData)}

Gere:
1. 3 pontos fortes da Toca Experience em relação aos concorrentes
2. 3 oportunidades de melhoria
3. 3 ações prioritárias recomendadas
4. Análise geral da posição competitiva`,
        response_json_schema: {
          type: "object",
          properties: {
            pontos_fortes: { type: "array", items: { type: "string" } },
            oportunidades: { type: "array", items: { type: "string" } },
            acoes_prioritarias: { type: "array", items: { type: "string" } },
            analise_geral: { type: "string" }
          }
        }
      });
      
      setInsights(result);
    } catch (error) {
      toast.error("Erro ao gerar insights");
    } finally {
      setLoadingInsights(false);
    }
  };

  const radarData = competitors.map(c => ({
    subject: c.name,
    ...c.metrics
  }));

  const radarChartData = [
    { metric: "Autoridade", ...Object.fromEntries(competitors.map(c => [c.name, c.metrics.authority])) },
    { metric: "Conteúdo", ...Object.fromEntries(competitors.map(c => [c.name, c.metrics.content])) },
    { metric: "Técnico", ...Object.fromEntries(competitors.map(c => [c.name, c.metrics.technical])) },
    { metric: "Social", ...Object.fromEntries(competitors.map(c => [c.name, c.metrics.social])) },
  ];

  const barData = competitors.map(c => ({
    name: c.name.length > 15 ? c.name.substring(0, 15) + "..." : c.name,
    Keywords: c.metrics.keywords,
    Backlinks: c.metrics.backlinks
  }));

  return (
    <div className="space-y-6">
      {/* Add Competitor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Adicionar Concorrente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Ex: djconcorrente.com.br"
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addCompetitor} disabled={analyzing}>
              {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
              Analisar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Competitors List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Concorrentes Monitorados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {competitors.map((comp, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-lg border ${comp.isOwn ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">{comp.name}</span>
                  {comp.isOwn && <Badge className="bg-blue-100 text-blue-700 text-xs">Você</Badge>}
                </div>
                <p className="text-sm text-gray-500 mb-3">{comp.url}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Autoridade:</span>
                    <span className="ml-1 font-medium">{comp.metrics.authority}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Keywords:</span>
                    <span className="ml-1 font-medium">{comp.metrics.keywords}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Backlinks:</span>
                    <span className="ml-1 font-medium">{comp.metrics.backlinks}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Social:</span>
                    <span className="ml-1 font-medium">{comp.metrics.social}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Keywords vs Backlinks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Keywords" fill="#f97316" />
                  <Bar dataKey="Backlinks" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Comparativo de Métricas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  {competitors.map((comp, i) => (
                    <Radar
                      key={i}
                      name={comp.name}
                      dataKey={comp.name}
                      stroke={comp.isOwn ? "#3b82f6" : i === 1 ? "#f97316" : "#10b981"}
                      fill={comp.isOwn ? "#3b82f6" : i === 1 ? "#f97316" : "#10b981"}
                      fillOpacity={0.2}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Insights Estratégicos (IA)
          </CardTitle>
          <Button onClick={generateInsights} disabled={loadingInsights}>
            {loadingInsights ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Gerar Insights
          </Button>
        </CardHeader>
        {insights && (
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Pontos Fortes</h4>
                <ul className="space-y-1">
                  {insights.pontos_fortes?.map((p, i) => (
                    <li key={i} className="text-sm text-green-700">• {p}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Oportunidades</h4>
                <ul className="space-y-1">
                  {insights.oportunidades?.map((o, i) => (
                    <li key={i} className="text-sm text-yellow-700">• {o}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Ações Prioritárias</h4>
                <ul className="space-y-1">
                  {insights.acoes_prioritarias?.map((a, i) => (
                    <li key={i} className="text-sm text-blue-700">• {a}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Análise Geral</h4>
              <p className="text-gray-600">{insights.analise_geral}</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}