import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, Loader2, Copy, RefreshCw, CheckCircle, AlertTriangle, 
  Type, Target, Zap, BookOpen, ArrowRight
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

const SAMPLE_CONTENTS = [
  { label: "Home - Hero", content: "Experiência Exclusiva em Trancoso. Paraíso exclusivo para seus eventos. Trancoso é o cenário perfeito para momentos inesquecíveis com a trilha sonora ideal." },
  { label: "Ethos - Quem Somos", content: "A Toca Experience é uma label e coletivo artístico que promove eventos e a união de talentos da cena eletrônica global, sempre com foco na qualidade e inovação sonora." },
  { label: "Locação - Intro", content: "Transforme sua casa em um verdadeiro club. Oferecemos locação de equipamentos de som e iluminação para residências, com tecnologia profissional e montagem completa." },
];

export default function ContentOptimizer() {
  const [content, setContent] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeContent = async () => {
    if (!content.trim()) {
      toast.error("Cole ou digite um conteúdo para analisar");
      return;
    }

    setAnalyzing(true);
    setAnalysis(null);

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Você é um especialista em SEO e copywriting para o mercado de eventos e música eletrônica no Brasil.

Analise este conteúdo do site Toca Experience (DJs em Trancoso, Afro House, eventos):

"${content}"

Forneça:

1. **Score de Legibilidade** (0-100): Avalie clareza, fluidez e facilidade de leitura
2. **Score SEO** (0-100): Avalie otimização para buscadores
3. **Score CTA** (0-100): Avalie eficácia das chamadas para ação

4. **Versão Otimizada**: Reescreva o texto melhorando SEO, clareza e persuasão, mantendo o tom sofisticado da marca

5. **LSI Keywords**: Liste 8 palavras-chave semânticas relacionadas que poderiam ser incluídas

6. **Sugestões de CTAs**: 3 chamadas para ação otimizadas para conversão

7. **Pontos de Melhoria**: 4 sugestões específicas para melhorar o texto

8. **Análise de Legibilidade**:
   - Tamanho médio das frases
   - Palavras complexas identificadas
   - Sugestões de simplificação`,
        response_json_schema: {
          type: "object",
          properties: {
            score_legibilidade: { type: "number" },
            score_seo: { type: "number" },
            score_cta: { type: "number" },
            versao_otimizada: { type: "string" },
            lsi_keywords: { type: "array", items: { type: "string" } },
            sugestoes_cta: { type: "array", items: { type: "string" } },
            pontos_melhoria: { type: "array", items: { type: "string" } },
            legibilidade: {
              type: "object",
              properties: {
                tamanho_medio_frases: { type: "string" },
                palavras_complexas: { type: "array", items: { type: "string" } },
                sugestoes_simplificacao: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      });
      setAnalysis(result);
    } catch (error) {
      toast.error("Erro ao analisar conteúdo");
    } finally {
      setAnalyzing(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  const loadSample = (sample) => {
    setContent(sample.content);
    setAnalysis(null);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Type className="w-5 h-5" />
            Otimizador de Conteúdo On-Page
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-500 text-sm">
            Cole um trecho de conteúdo ou selecione um exemplo para receber sugestões de otimização em tempo real.
          </p>
          
          {/* Sample Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 mr-2">Exemplos:</span>
            {SAMPLE_CONTENTS.map((sample, i) => (
              <Button 
                key={i} 
                variant="outline" 
                size="sm"
                onClick={() => loadSample(sample)}
              >
                {sample.label}
              </Button>
            ))}
          </div>

          <Textarea
            placeholder="Cole aqui o conteúdo que deseja otimizar..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px]"
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{content.length} caracteres</span>
            <Button onClick={analyzeContent} disabled={analyzing || !content.trim()}>
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analisar e Otimizar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <>
          {/* Scores */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Legibilidade</span>
                  </div>
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.score_legibilidade)}`}>
                    {analysis.score_legibilidade}
                  </span>
                </div>
                <Progress value={analysis.score_legibilidade} className={`h-2 ${getProgressColor(analysis.score_legibilidade)}`} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">SEO</span>
                  </div>
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.score_seo)}`}>
                    {analysis.score_seo}
                  </span>
                </div>
                <Progress value={analysis.score_seo} className={`h-2 ${getProgressColor(analysis.score_seo)}`} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">CTA</span>
                  </div>
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.score_cta)}`}>
                    {analysis.score_cta}
                  </span>
                </div>
                <Progress value={analysis.score_cta} className={`h-2 ${getProgressColor(analysis.score_cta)}`} />
              </CardContent>
            </Card>
          </div>

          {/* Optimized Version */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Versão Otimizada
              </CardTitle>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(analysis.versao_otimizada)}>
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{analysis.versao_otimizada}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* LSI Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">LSI Keywords Sugeridas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-3">
                  Palavras-chave semânticas para enriquecer o conteúdo:
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.lsi_keywords?.map((kw, i) => (
                    <Badge key={i} className="bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200" onClick={() => copyToClipboard(kw)}>
                      {kw}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTAs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  CTAs Otimizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.sugestoes_cta?.map((cta, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg p-3 cursor-pointer hover:bg-orange-100"
                      onClick={() => copyToClipboard(cta)}
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">{cta}</span>
                      </div>
                      <Copy className="w-3 h-3 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Improvements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Pontos de Melhoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {analysis.pontos_melhoria?.map((ponto, i) => (
                  <div key={i} className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{ponto}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Readability Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Análise de Legibilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Tamanho Médio das Frases</p>
                  <p className="font-semibold">{analysis.legibilidade?.tamanho_medio_frases}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                  <p className="text-sm text-gray-500 mb-2">Palavras Complexas Identificadas</p>
                  <div className="flex flex-wrap gap-1">
                    {analysis.legibilidade?.palavras_complexas?.map((p, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2">Sugestões de Simplificação</p>
                <ul className="space-y-1">
                  {analysis.legibilidade?.sugestoes_simplificacao?.map((s, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-500">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Re-analyze Button */}
          <div className="text-center">
            <Button variant="outline" onClick={analyzeContent}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reanalisar Conteúdo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}