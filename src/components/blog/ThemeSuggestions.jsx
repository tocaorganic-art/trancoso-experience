import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Loader2, RefreshCw, TrendingUp, Calendar, Users, Music } from "lucide-react";
import { toast } from "sonner";

const TOPIC_CATEGORIES = [
  { value: "trending", label: "Tendências", icon: TrendingUp, color: "text-red-600" },
  { value: "seasonal", label: "Sazonal", icon: Calendar, color: "text-blue-600" },
  { value: "educational", label: "Educacional", icon: Users, color: "text-green-600" },
  { value: "music", label: "Música", icon: Music, color: "text-purple-600" }
];

export default function ThemeSuggestions({ onClose, onCreate }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("trending");

  useEffect(() => {
    generateSuggestions();
  }, [selectedCategory]);

  const generateSuggestions = async () => {
    setIsGenerating(true);
    try {
      const categoryPrompts = {
        trending: "temas em alta sobre DJs, Afro House, Organic House e eventos de luxo em Trancoso",
        seasonal: "temas sazonais para Réveillon, verão, alta temporada em Trancoso e eventos de fim de ano",
        educational: "guias educativos sobre equipamentos DJ, técnicas de mixagem, produção musical",
        music: "análises musicais, novos lançamentos, artistas emergentes de Afro House e Organic House"
      };

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Você é um especialista em marketing de conteúdo para DJs e eventos de luxo.

Contexto: Toca Experience é uma empresa de DJs profissionais especializada em Afro House, Organic House, casamentos de luxo e eventos exclusivos em Trancoso, Bahia.

Gere 8 sugestões de temas para posts de blog sobre: ${categoryPrompts[selectedCategory]}

Para cada tema, inclua:
- Título chamativo e otimizado para SEO
- Descrição breve (1 frase)
- 3 palavras-chave principais
- Categoria sugerida (afro_house, organic_house, casamentos, equipamentos, eventos, ou guias)
- Score de potencial SEO (0-100)

Priorize temas que:
- Atraiam clientes interessados em eventos de luxo
- Incluam palavras-chave long-tail (ex: "como contratar dj casamento trancoso")
- Sejam relevantes para o público-alvo: noivos, empresas, promoters de eventos
- Tenham potencial de viralização nas redes sociais`,
        response_json_schema: {
          type: "object",
          properties: {
            suggestions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  keywords: { type: "array", items: { type: "string" } },
                  category: { type: "string" },
                  seo_score: { type: "number" }
                }
              }
            }
          }
        }
      });

      setSuggestions(result.suggestions);
      toast.success('Sugestões geradas!');
    } catch (error) {
      toast.error('Erro ao gerar sugestões');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseSuggestion = (suggestion) => {
    toast.success('Tema selecionado! Abrindo editor...');
    // Create a draft post with the suggestion
    onCreate({
      title: suggestion.title,
      excerpt: suggestion.description,
      keywords: suggestion.keywords,
      category: suggestion.category
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={onClose} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              Sugestões de Temas
            </h1>
            <p className="text-gray-600 mt-2">
              Ideias geradas por IA para maximizar engajamento e SEO
            </p>
          </div>
          <Button
            onClick={generateSuggestions}
            disabled={isGenerating}
            variant="outline"
            className="border-purple-300 text-purple-700"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Gerar Novas
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {TOPIC_CATEGORIES.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
              >
                <Icon className={`w-4 h-4 mr-2 ${selectedCategory === category.value ? '' : category.color}`} />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Suggestions Grid */}
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
            <p className="text-gray-600">Gerando sugestões inteligentes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((suggestion, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow border-2 border-transparent hover:border-purple-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {suggestion.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-purple-600">
                        SEO: {suggestion.seo_score}/100
                      </span>
                      <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-green-600"
                          style={{ width: `${suggestion.seo_score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestion.keywords.map((keyword, kidx) => (
                      <span key={kidx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={() => handleUseSuggestion(suggestion)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Usar Este Tema
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {suggestions.length === 0 && !isGenerating && (
          <Card className="text-center py-16">
            <CardContent>
              <Sparkles className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Clique em "Gerar Novas" para obter sugestões</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}