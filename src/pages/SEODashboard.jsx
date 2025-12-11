import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Search, FileText, Lightbulb, Loader2, 
  CheckCircle, AlertTriangle, TrendingUp, Sparkles, Copy, RefreshCw,
  BarChart3, Tag, Users, Activity, Type
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import KeywordTracker from "@/components/seo/KeywordTracker";
import MetaTagMonitor from "@/components/seo/MetaTagMonitor";
import CompetitorAnalysis from "@/components/seo/CompetitorAnalysis";
import EngagementMetrics from "@/components/seo/EngagementMetrics";
import ContentOptimizer from "@/components/seo/ContentOptimizer";

const PAGES_TO_ANALYZE = [
  { name: "Home", description: "Página principal com apresentação da Toca Experience" },
  { name: "Ethos", description: "Missão, visão, valores e filosofia da marca" },
  { name: "Eventos", description: "Casamentos e celebrações" },
  { name: "Curadoria", description: "Blog com sets e playlists" },
  { name: "Discografia", description: "Lançamentos musicais" },
  { name: "LocacaoSom", description: "Locação de equipamentos de som" },
  { name: "EventosAnoNovo", description: "Programação de Réveillon" }
];

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState("analyzer");
  const [selectedPage, setSelectedPage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [seoAnalysis, setSeoAnalysis] = useState(null);
  const [generatingIdeas, setGeneratingIdeas] = useState(false);
  const [blogIdeas, setBlogIdeas] = useState(null);
  const [generatingPost, setGeneratingPost] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [customTopic, setCustomTopic] = useState("");

  const analyzePage = async (pageName) => {
    setSelectedPage(pageName);
    setAnalyzing(true);
    setSeoAnalysis(null);

    const pageInfo = PAGES_TO_ANALYZE.find(p => p.name === pageName);

    const prompt = `Você é um especialista em SEO para sites de entretenimento e eventos musicais no Brasil.

Analise a página "${pageName}" do site Toca Experience (DJs especializados em Afro House e Organic House em Trancoso, Bahia).

Contexto da página: ${pageInfo?.description || pageName}

Gere uma análise SEO completa incluindo:

1. **Keywords Principais** (5-8 palavras-chave primárias recomendadas)
2. **Keywords Long-tail** (5-8 frases de cauda longa)
3. **Meta Title** (sugestão otimizada, máx 60 caracteres)
4. **Meta Description** (sugestão otimizada, máx 155 caracteres)
5. **Headers Sugeridos** (H1, H2s e H3s recomendados)
6. **Pontos de Melhoria** (3-5 sugestões práticas)
7. **Score Estimado** (0-100, baseado nas melhores práticas)

Contexto do negócio:
- DJs Tony Monteiro e Enzo Furtado
- Especialistas em Afro House, Organic House
- Atuação em Trancoso, Caraíva, Arraial d'Ajuda
- Serviços: DJ para casamentos, eventos corporativos, festivais, locação de som
- Mais de 500 mil streams no Spotify`;

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            keywords_principais: { type: "array", items: { type: "string" } },
            keywords_longtail: { type: "array", items: { type: "string" } },
            meta_title: { type: "string" },
            meta_description: { type: "string" },
            headers: {
              type: "object",
              properties: {
                h1: { type: "string" },
                h2s: { type: "array", items: { type: "string" } },
                h3s: { type: "array", items: { type: "string" } }
              }
            },
            melhorias: { type: "array", items: { type: "string" } },
            score: { type: "number" }
          }
        }
      });
      setSeoAnalysis(result);
    } catch (error) {
      toast.error("Erro ao analisar página");
    } finally {
      setAnalyzing(false);
    }
  };

  const generateBlogIdeas = async () => {
    setGeneratingIdeas(true);
    setBlogIdeas(null);

    const prompt = `Você é um especialista em marketing de conteúdo para a indústria de música eletrônica e eventos.

Gere 8 ideias de blog posts para o site Toca Experience, considerando:

**Sobre a marca:**
- DJs Tony Monteiro e Enzo Furtado
- Especialistas em Afro House e Organic House
- Atuação principal em Trancoso, Caraíva, Arraial d'Ajuda (Bahia)
- Serviços: DJ para casamentos, eventos corporativos, festivais, sunset parties, locação de equipamentos de som

**Objetivos do conteúdo:**
- Atrair clientes para eventos (casamentos, festas privadas)
- Educar sobre música eletrônica
- Posicionar como referência em experiências musicais em Trancoso
- Melhorar SEO para termos relacionados

Para cada ideia, forneça:
1. Título otimizado para SEO
2. Resumo do conteúdo (2-3 frases)
3. Keywords alvo
4. Tipo de conteúdo (guia, lista, storytelling, tutorial)`;

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            ideias: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  titulo: { type: "string" },
                  resumo: { type: "string" },
                  keywords: { type: "array", items: { type: "string" } },
                  tipo: { type: "string" }
                }
              }
            }
          }
        }
      });
      setBlogIdeas(result.ideias);
    } catch (error) {
      toast.error("Erro ao gerar ideias");
    } finally {
      setGeneratingIdeas(false);
    }
  };

  const generateBlogPost = async (idea) => {
    setGeneratingPost(true);
    setGeneratedPost(null);

    const topic = idea?.titulo || customTopic;

    const prompt = `Você é um redator especializado em música eletrônica e eventos de luxo no Brasil.

Escreva um blog post completo sobre: "${topic}"

**Contexto da marca Toca Experience:**
- DJs Tony Monteiro e Enzo Furtado
- Especializados em Afro House e Organic House
- Atuação em Trancoso, Caraíva, Arraial d'Ajuda
- Tom de voz: sofisticado, acolhedor, apaixonado por música

**Requisitos do post:**
- Título H1 otimizado para SEO
- Meta description (máx 155 caracteres)
- Introdução envolvente
- 3-5 seções com H2s
- Conclusão com CTA
- Aproximadamente 800-1200 palavras
- Inclua keywords naturalmente
- Tom conversacional mas profissional`;

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            titulo: { type: "string" },
            meta_description: { type: "string" },
            keywords: { type: "array", items: { type: "string" } },
            conteudo: { type: "string" },
            categoria_sugerida: { type: "string" }
          }
        }
      });
      setGeneratedPost(result);
    } catch (error) {
      toast.error("Erro ao gerar post");
    } finally {
      setGeneratingPost(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              SEO & Content Studio
            </h1>
            <p className="text-gray-300">
              Otimização SEO e geração de conteúdo com inteligência artificial
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-4 md:grid-cols-8 gap-1">
            <TabsTrigger value="analyzer" className="flex items-center gap-1 text-xs md:text-sm">
              <Search className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">Analisar</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-1 text-xs md:text-sm">
              <Type className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">Conteúdo</span>
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-1 text-xs md:text-sm">
              <Tag className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">Keywords</span>
            </TabsTrigger>
            <TabsTrigger value="meta" className="flex items-center gap-1 text-xs md:text-sm">
              <FileText className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">Meta Tags</span>
            </TabsTrigger>
            <TabsTrigger value="competitors" className="flex items-center gap-1 text-xs md:text-sm">
              <Users className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">Concorrentes</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-1 text-xs md:text-sm">
              <Activity className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">Engajamento</span>
            </TabsTrigger>
            <TabsTrigger value="ideas" className="flex items-center gap-1 text-xs md:text-sm">
              <Lightbulb className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">Ideias</span>
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-1 text-xs md:text-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">Gerar Post</span>
            </TabsTrigger>
          </TabsList>

          {/* Content Optimizer Tab */}
          <TabsContent value="content">
            <ContentOptimizer />
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords">
            <KeywordTracker />
          </TabsContent>

          {/* Meta Tags Tab */}
          <TabsContent value="meta">
            <MetaTagMonitor />
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors">
            <CompetitorAnalysis />
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement">
            <EngagementMetrics />
          </TabsContent>

          {/* SEO Analyzer Tab */}
          <TabsContent value="analyzer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Analisador SEO de Páginas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Selecione uma página para receber sugestões de otimização SEO
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PAGES_TO_ANALYZE.map((page) => (
                    <Button
                      key={page.name}
                      variant={selectedPage === page.name ? "default" : "outline"}
                      onClick={() => analyzePage(page.name)}
                      disabled={analyzing}
                      className="h-auto py-3 flex flex-col items-center"
                    >
                      {analyzing && selectedPage === page.name ? (
                        <Loader2 className="w-4 h-4 animate-spin mb-1" />
                      ) : (
                        <FileText className="w-4 h-4 mb-1" />
                      )}
                      {page.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {seoAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score Card */}
                <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Score SEO Estimado</p>
                      <p className="text-lg font-medium">Página: {selectedPage}</p>
                    </div>
                    <div className={`text-5xl font-bold ${getScoreColor(seoAnalysis.score)}`}>
                      {seoAnalysis.score}/100
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Meta Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Meta Tags Sugeridas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 mb-1 block">Meta Title</label>
                        <div className="flex gap-2">
                          <Input value={seoAnalysis.meta_title} readOnly className="flex-1" />
                          <Button size="icon" variant="outline" onClick={() => copyToClipboard(seoAnalysis.meta_title)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{seoAnalysis.meta_title?.length || 0}/60 caracteres</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 mb-1 block">Meta Description</label>
                        <div className="flex gap-2">
                          <Textarea value={seoAnalysis.meta_description} readOnly className="flex-1" rows={2} />
                          <Button size="icon" variant="outline" onClick={() => copyToClipboard(seoAnalysis.meta_description)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{seoAnalysis.meta_description?.length || 0}/155 caracteres</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Keywords */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Keywords Recomendadas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">Principais</label>
                        <div className="flex flex-wrap gap-2">
                          {seoAnalysis.keywords_principais?.map((kw, i) => (
                            <Badge key={i} className="bg-blue-100 text-blue-700">{kw}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 mb-2 block">Long-tail</label>
                        <div className="flex flex-wrap gap-2">
                          {seoAnalysis.keywords_longtail?.map((kw, i) => (
                            <Badge key={i} variant="outline">{kw}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Headers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Estrutura de Headers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Badge className="bg-gray-800 mb-2">H1</Badge>
                        <p className="text-gray-700">{seoAnalysis.headers?.h1}</p>
                      </div>
                      <div>
                        <Badge className="bg-gray-600 mb-2">H2s</Badge>
                        <ul className="space-y-1">
                          {seoAnalysis.headers?.h2s?.map((h2, i) => (
                            <li key={i} className="text-gray-600 text-sm">• {h2}</li>
                          ))}
                        </ul>
                      </div>
                      {seoAnalysis.headers?.h3s?.length > 0 && (
                        <div>
                          <Badge className="bg-gray-400 mb-2">H3s</Badge>
                          <ul className="space-y-1">
                            {seoAnalysis.headers?.h3s?.map((h3, i) => (
                              <li key={i} className="text-gray-500 text-sm">• {h3}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Improvements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Pontos de Melhoria
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {seoAnalysis.melhorias?.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </TabsContent>

          {/* Blog Ideas Tab */}
          <TabsContent value="ideas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Gerador de Ideias para Blog
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Gere ideias de posts otimizados para SEO relacionados aos serviços da Toca Experience
                </p>
                <Button onClick={generateBlogIdeas} disabled={generatingIdeas}>
                  {generatingIdeas ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Gerando ideias...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Gerar 8 Ideias de Posts
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {blogIdeas && (
              <div className="grid md:grid-cols-2 gap-4">
                {blogIdeas.map((idea, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-purple-100 text-purple-700">{idea.tipo}</Badge>
                        <h3 className="font-bold text-gray-800 mb-2">{idea.titulo}</h3>
                        <p className="text-gray-500 text-sm mb-4">{idea.resumo}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {idea.keywords?.slice(0, 3).map((kw, j) => (
                            <Badge key={j} variant="outline" className="text-xs">{kw}</Badge>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setActiveTab("generate");
                            setCustomTopic(idea.titulo);
                            generateBlogPost(idea);
                          }}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Gerar este Post
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Generate Post Tab */}
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Gerador de Blog Posts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-500">
                  Digite um tema ou selecione uma ideia da aba anterior
                </p>
                <div className="flex gap-3">
                  <Input
                    placeholder="Ex: Como escolher o DJ ideal para seu casamento em Trancoso"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => generateBlogPost()} disabled={generatingPost || !customTopic}>
                    {generatingPost ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Gerar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {generatedPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Post Gerado</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedPost.conteudo)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => generateBlogPost()}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Meta Info */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">Título SEO</label>
                        <p className="font-bold text-gray-800">{generatedPost.titulo}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Meta Description</label>
                        <p className="text-gray-600 text-sm">{generatedPost.meta_description}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Keywords</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {generatedPost.keywords?.map((kw, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{kw}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Categoria Sugerida</label>
                        <Badge className="ml-2">{generatedPost.categoria_sugerida}</Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-sm max-w-none">
                      <div className="bg-white border rounded-lg p-6 whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {generatedPost.conteudo}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}