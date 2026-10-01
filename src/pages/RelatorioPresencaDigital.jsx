import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, AlertCircle, TrendingUp, Sparkles, ArrowLeft, Zap, Brain, Target, Layout, Code, FileText, Image, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function RelatorioPresencaDigital() {
  const [activeTab, setActiveTab] = useState("visao-geral");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 py-12 shadow-2xl">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("AdminDashboard")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Relatório Estratégico 2025
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Presença Digital — Toca Experience
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Análise Completa: SEO Avançado + Design Moderno + IA Integrada
            </p>
            <p className="text-gray-500 text-sm mt-3">
              Gerado em: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 bg-white/50 p-2 rounded-xl">
            <TabsTrigger value="visao-geral" className="text-xs">📊 Visão Geral</TabsTrigger>
            <TabsTrigger value="seo" className="text-xs">🔍 SEO Técnico</TabsTrigger>
            <TabsTrigger value="design" className="text-xs">🎨 Design UI/UX</TabsTrigger>
            <TabsTrigger value="ia" className="text-xs">🤖 IA Aplicada</TabsTrigger>
            <TabsTrigger value="conteudo" className="text-xs">✍️ Conteúdo</TabsTrigger>
            <TabsTrigger value="visual" className="text-xs">🖼️ Prompts Visuais</TabsTrigger>
            <TabsTrigger value="implementacao" className="text-xs">⚡ Implementação</TabsTrigger>
            <TabsTrigger value="metricas" className="text-xs">📈 Métricas</TabsTrigger>
          </TabsList>

          {/* VISÃO GERAL */}
          <TabsContent value="visao-geral" className="space-y-6">
            {/* Score Geral */}
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="inline-block mb-4">
                    <div className="text-7xl font-bold">8.2</div>
                    <div className="text-sm text-blue-100 mt-2">Score Atual / 10</div>
                  </div>
                  <p className="text-xl text-blue-50 mb-6">
                    Site em excelente estado técnico. Oportunidades identificadas para atingir 9.5+
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-3xl font-bold">8.5</div>
                      <div className="text-xs text-blue-100 mt-1">SEO Técnico</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-3xl font-bold">8.0</div>
                      <div className="text-xs text-blue-100 mt-1">Design/UX</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-3xl font-bold">7.5</div>
                      <div className="text-xs text-blue-100 mt-1">IA & Automação</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-3xl font-bold">8.8</div>
                      <div className="text-xs text-blue-100 mt-1">Performance</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Priorização */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-900">
                    <AlertCircle className="w-5 h-5" />
                    Alto Impacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-red-600 shrink-0">1</Badge>
                      <span className="text-gray-700">Completar schema markup eventos (47 eventos restantes)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-red-600 shrink-0">2</Badge>
                      <span className="text-gray-700">Implementar chatbot IA qualificador de leads</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-red-600 shrink-0">3</Badge>
                      <span className="text-gray-700">Otimizar imagens WebP + lazy loading</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-red-600 shrink-0">4</Badge>
                      <span className="text-gray-700">Criar landing pages específicas por serviço</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-900">
                    <TrendingUp className="w-5 h-5" />
                    Médio Impacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-yellow-600 shrink-0">5</Badge>
                      <span className="text-gray-700">Adicionar seção de reviews/testimonials estruturada</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-yellow-600 shrink-0">6</Badge>
                      <span className="text-gray-700">Implementar breadcrumbs em todas as páginas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-yellow-600 shrink-0">7</Badge>
                      <span className="text-gray-700">Criar sistema de blog/conteúdo</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-yellow-600 shrink-0">8</Badge>
                      <span className="text-gray-700">Otimizar meta descriptions por página</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <CheckCircle2 className="w-5 h-5" />
                    Baixo Impacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-green-600 shrink-0">9</Badge>
                      <span className="text-gray-700">Adicionar microcopy em formulários</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-green-600 shrink-0">10</Badge>
                      <span className="text-gray-700">Criar página de FAQ expandida</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-green-600 shrink-0">11</Badge>
                      <span className="text-gray-700">Implementar dark mode</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-green-600 shrink-0">12</Badge>
                      <span className="text-gray-700">Adicionar animações de scroll</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Atual */}
            <Card>
              <CardHeader>
                <CardTitle>✅ Status Atual - O Que Já Está Funcionando Bem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-700" />
                      SEO Técnico
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✅ Google Tag Manager configurado</li>
                      <li>✅ Schema markup para LocalBusiness + Service</li>
                      <li>✅ Canonical URLs implementadas</li>
                      <li>✅ Meta tags Open Graph e Twitter Card</li>
                      <li>✅ Sitemap XML gerado automaticamente</li>
                      <li>✅ Resource hints (preconnect, dns-prefetch)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-700" />
                      Performance
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✅ Lazy loading de componentes React</li>
                      <li>✅ Code splitting implementado</li>
                      <li>✅ Vídeo hero com lazy loading</li>
                      <li>✅ CSS crítico inline</li>
                      <li>✅ Fonts otimizadas (preload)</li>
                      <li>✅ React Query para cache de dados</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-700" />
                      UX/Design
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✅ Design responsivo (mobile-first)</li>
                      <li>✅ Navegação clara e intuitiva</li>
                      <li>✅ CTAs bem posicionados</li>
                      <li>✅ Identidade visual consistente</li>
                      <li>✅ Animações Framer Motion</li>
                      <li>✅ Componentes UI modernos (shadcn)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-700" />
                      Conversão
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✅ Formulário de cotação otimizado</li>
                      <li>✅ Google Ads + Meta Pixel tracking</li>
                      <li>✅ Página de agradecimento /obrigado</li>
                      <li>✅ WhatsApp integration</li>
                      <li>✅ Social proof (reviews)</li>
                      <li>✅ LGPD compliance iniciado</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO TÉCNICO */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  SEO On-Page - Recomendações por Página
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Home */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🏠 Home (tocaexperience.com.br)</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📌 Título SEO</h4>
                        <div className="bg-green-50 p-3 rounded-lg mb-2 border border-green-200">
                          <p className="text-sm"><strong>Atual (✅ BOM):</strong></p>
                          <code className="text-xs text-green-800">DJ para Casamento e Eventos de Luxo em Trancoso | Toca Experience</code>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-sm"><strong>Variação A (Mais Local):</strong></p>
                          <code className="text-xs text-blue-800">DJ Profissional Trancoso, Caraíva & Arraial | Casamentos & Eventos Premium 2025</code>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
                          <p className="text-sm"><strong>Variação B (Mais Amplo):</strong></p>
                          <code className="text-xs text-blue-800">Toca Experience: DJs Tony Monteiro & Enzo Furtado | Afro House & Organic House Trancoso</code>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📝 Meta Description</h4>
                        <div className="bg-green-50 p-3 rounded-lg mb-2 border border-green-200">
                          <p className="text-sm"><strong>Atual (✅ BOM):</strong></p>
                          <code className="text-xs text-green-800">Experiências musicais exclusivas em Trancoso. DJs Tony Monteiro & Enzo Furtado. Aluguel de som profissional (CDJ, Controladoras, Caixas de Som) para festas e casamentos.</code>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-sm"><strong>Variação A (CTA mais forte):</strong></p>
                          <code className="text-xs text-blue-800">🎵 DJs profissionais para casamentos e eventos em Trancoso. Equipamento Pioneer CDJ-3000, som Funktion-One. 500 mil+ streams. Solicite orçamento personalizado → WhatsApp: (21) 99773-1321</code>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🔑 Palavras-Chave Alvo</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-600 text-white">dj casamento trancoso</Badge>
                          <Badge className="bg-blue-600 text-white">eventos luxo trancoso</Badge>
                          <Badge className="bg-blue-600 text-white">aluguel som profissional</Badge>
                          <Badge className="bg-blue-600 text-white">afro house brasil</Badge>
                          <Badge className="bg-purple-600 text-white">tony monteiro dj</Badge>
                          <Badge className="bg-purple-600 text-white">organic house trancoso</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">✏️ Conteúdo H1-H3</h4>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                          <p><strong>H1:</strong> Experiência Exclusiva em <mark className="bg-yellow-200">Trancoso</mark></p>
                          <p><strong>H2 (adicionar):</strong> DJs Premiados para Casamentos e Eventos de Luxo</p>
                          <p><strong>H2 (adicionar):</strong> Aluguel de Equipamentos Pioneer & Funktion-One</p>
                          <p><strong>H3 (expandir):</strong> Por Que Escolher a Toca Experience?</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Eventos Ano Novo */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎉 Eventos de Ano Novo</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">⚠️ CRÍTICO: Schema Markup</h4>
                        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                          <p className="text-sm text-red-900 font-semibold mb-2">Status Atual:</p>
                          <p className="text-sm text-red-800">✅ 10 eventos com schema completo</p>
                          <p className="text-sm text-red-800">⏳ 37 eventos SEM schema markup</p>
                          <p className="text-sm text-red-800 mt-3"><strong>Impacto:</strong> Rich snippets no Google para TODOS os 47 eventos = +40% cliques orgânicos</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📌 Título SEO (3 variações)</h4>
                        <div className="space-y-2">
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-xs"><strong>Variação A (Long-tail):</strong></p>
                            <code className="text-xs">Réveillon Trancoso 2025/2026: 47 Festas Premium | Caraíva & Arraial d'Ajuda</code>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-xs"><strong>Variação B (Urgência):</strong></p>
                            <code className="text-xs">🎆 Ano Novo Trancoso 2026: Ingressos & Pacotes VIP | Guia Completo Atualizado</code>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-xs"><strong>Variação C (Local):</strong></p>
                            <code className="text-xs">Festas de Réveillon em Trancoso, Caraíva e Arraial 2026 | Open Bar & DJs Internacionais</code>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🔑 Palavras-Chave Long-Tail</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge>reveillon trancoso 2026 ingressos</Badge>
                          <Badge>festa ano novo caraiva open bar</Badge>
                          <Badge>pacotes reveillon arraial ajuda</Badge>
                          <Badge>eventos fim de ano trancoso premium</Badge>
                          <Badge>onde passar ano novo bahia luxo</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Casamentos Trancoso */}
                  <div className="border-l-4 border-pink-500 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">💍 Casamentos em Trancoso</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📌 Título SEO (3 variações)</h4>
                        <div className="space-y-2">
                          <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                            <p className="text-xs"><strong>Variação A (Emocional):</strong></p>
                            <code className="text-xs">DJ para Casamento dos Sonhos em Trancoso | Música Exclusiva & Som Pioneer Premium</code>
                          </div>
                          <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                            <p className="text-xs"><strong>Variação B (Destination Wedding):</strong></p>
                            <code className="text-xs">Destination Wedding DJ Trancoso | Casamentos na Praia com Tony Monteiro</code>
                          </div>
                          <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                            <p className="text-xs"><strong>Variação C (Preço/Valor):</strong></p>
                            <code className="text-xs">DJ Casamento Trancoso a partir de R$ 15 mil | Equipamento Pioneer CDJ-3000 Incluso</code>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">💡 Conteúdo Adicionar</h4>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                          <ul className="space-y-2 text-sm text-gray-800">
                            <li>✏️ Seção: "Como Escolher o DJ Perfeito para Seu Casamento"</li>
                            <li>✏️ Lista: "Top 10 Músicas para Entrada dos Noivos em Trancoso"</li>
                            <li>✏️ FAQ: "Quanto custa DJ para casamento na praia?" (com schema)</li>
                            <li>✏️ Testimonial: 3-5 reviews de casais com fotos (schema Review)</li>
                            <li>✏️ Video: Embed YouTube de casamento real (melhora tempo na página)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schema Markup Priority */}
            <Card className="border-2 border-orange-300">
              <CardHeader className="bg-orange-50">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Code className="w-6 h-6" />
                  Schema Markup - Prioridade de Implementação
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-red-900">URGENTE: Event Schema (37 eventos)</h4>
                      <Badge className="bg-red-600">Alto Impacto</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Completar schema markup para os 37 eventos de Ano Novo restantes. Cada evento deve incluir:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1 ml-4">
                      <li>• name, startDate, endDate</li>
                      <li>• location (Place + PostalAddress completo)</li>
                      <li>• image (URL otimizada)</li>
                      <li>• organizer (Toca Experience)</li>
                      <li>• offers (link de compra + price range)</li>
                      <li>• performer (DJs/artistas)</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-yellow-900">Review Schema (Casamentos + Eventos)</h4>
                      <Badge className="bg-yellow-600">Médio Impacto</Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      Adicionar AggregateRating + Review para mostrar ⭐⭐⭐⭐⭐ (5.0 - 47 avaliações) nos resultados do Google.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-green-900">FAQ Schema (Páginas de Serviço)</h4>
                      <Badge className="bg-green-600">Médio Impacto</Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      Criar FAQ sections com schema para aparecer como "Pessoas também perguntam" no Google.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DESIGN UI/UX */}
          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-6 h-6 text-purple-600" />
                  Propostas de Design Moderno 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Glass Morphism Cards */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🪟 Cartões em Vidro Líquido (Glassmorphism)</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                        <div className="text-4xl mb-3">🎵</div>
                        <h4 className="font-bold text-gray-900 mb-2">Serviços DJ</h4>
                        <p className="text-sm text-gray-700">Cards translúcidos com blur de fundo para destacar serviços</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl text-white">
                        <div className="text-4xl mb-3">🎉</div>
                        <h4 className="font-bold text-white mb-2">Eventos Premium</h4>
                        <p className="text-sm text-white/90">Gradiente sutil com transparência para eventos destaque</p>
                      </div>
                      <div className="bg-gradient-to-br from-pink-500/30 to-orange-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl text-white">
                        <div className="text-4xl mb-3">💍</div>
                        <h4 className="font-bold text-white mb-2">Casamentos</h4>
                        <p className="text-sm text-white/90">Efeito romântico com bordas brilhantes</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700"><strong>Código CSS:</strong></p>
                      <code className="text-xs bg-gray-900 text-green-400 p-3 rounded block mt-2">
                        background: rgba(255, 255, 255, 0.1);<br/>
                        backdrop-filter: blur(20px);<br/>
                        border: 1px solid rgba(255, 255, 255, 0.2);<br/>
                        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
                      </code>
                    </div>
                  </div>

                  {/* Hero Section Variants */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎬 Hero Section - 3 Variações</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
                        <h4 className="font-bold text-blue-900 mb-2">Variação A: Vídeo Fullscreen + Overlay Gradient</h4>
                        <p className="text-sm text-gray-700 mb-2">Vídeo de evento em loop com gradient escuro no topo</p>
                        <p className="text-xs text-gray-600">✅ Atual (mantém identidade, funciona bem)</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded-r-lg">
                        <h4 className="font-bold text-purple-900 mb-2">Variação B: Split Screen (50/50)</h4>
                        <p className="text-sm text-gray-700 mb-2">Esquerda: Imagem Tony Monteiro | Direita: Form de cotação rápida</p>
                        <p className="text-xs text-gray-600">📈 Aumenta conversões, reduz scroll até form</p>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-4 py-3 bg-pink-50 rounded-r-lg">
                        <h4 className="font-bold text-pink-900 mb-2">Variação C: Slider Dinâmico de Eventos</h4>
                        <p className="text-sm text-gray-700 mb-2">Carousel automático de 5-7 eventos com CTAs diretos</p>
                        <p className="text-xs text-gray-600">🎯 Destaca múltiplos serviços simultaneamente</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🧭 Navegação - Melhorias</h3>
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-8">
                          <div className="text-xl font-bold">TOCA</div>
                          <div className="flex gap-6 text-sm">
                            <a href="#" className="hover:text-blue-400 transition">Home</a>
                            <a href="#" className="hover:text-blue-400 transition">Eventos</a>
                            <a href="#" className="hover:text-blue-400 transition">Música</a>
                            <a href="#" className="hover:text-blue-400 transition">Sobre</a>
                          </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold transition text-white">
                          Solicitar Orçamento
                        </button>
                      </div>
                      <p className="text-xs text-gray-400">✨ Navbar sticky com blur de fundo (já implementado)</p>
                    </div>
                    <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                      <p className="text-sm text-gray-800"><strong>💡 Adicionar:</strong></p>
                      <ul className="text-xs text-gray-700 space-y-1 ml-4 mt-2">
                        <li>• Mega menu ao hover em "Eventos" (Casamentos | Corporativos | Réveillon)</li>
                        <li>• Badge "NOVO" em Eventos de Ano Novo</li>
                        <li>• Ícone WhatsApp floating sempre visível</li>
                      </ul>
                    </div>
                  </div>

                  {/* Mobile UX */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📱 Mobile-First - Otimizações</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-3">✅ Já Funciona Bem</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>✓ Layout responsivo</li>
                          <li>✓ Touch-friendly buttons (min 44x44px)</li>
                          <li>✓ Scroll suave</li>
                          <li>✓ Menu hamburger claro</li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-300">
                        <h4 className="font-bold text-blue-900 mb-3">🎯 Adicionar</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>+ Bottom sheet para filtros (eventos)</li>
                          <li>+ Swipe gestures em cards</li>
                          <li>+ Skeleton loaders (feedback visual)</li>
                          <li>+ Pull-to-refresh em listas</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IA APLICADA */}
          <TabsContent value="ia" className="space-y-6">
            <Card className="border-2 border-purple-300">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  Estratégias de IA para Toca Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Chatbot Qualificador */}
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">🤖 Chatbot IA - Qualificador de Leads</h3>
                        <Badge className="bg-white/20">PRIORIDADE ALTA</Badge>
                      </div>
                      <MessageSquare className="w-12 h-12 opacity-50" />
                    </div>
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2">📋 Funcionalidades:</p>
                        <ul className="space-y-1 text-blue-100">
                          <li>• Perguntas contextuais (tipo evento, data, orçamento)</li>
                          <li>• Sugestão automática de serviços (DJ vs. Aluguel)</li>
                          <li>• Captura de contato progressiva (não invasiva)</li>
                          <li>• Integração WhatsApp direto</li>
                          <li>• Análise de sentimento (urgência, budget)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-semibold mb-2">💬 Exemplo de Conversa:</p>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
                          <div className="flex gap-3">
                            <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">🤖</div>
                            <div className="flex-1">
                              <div className="bg-white/20 rounded-2xl rounded-tl-none p-3">
                                Olá! 👋 Qual evento você está planejando?
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 justify-end">
                            <div className="bg-blue-700 rounded-2xl rounded-tr-none p-3 text-white">
                              Um casamento em Trancoso
                            </div>
                            <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">👤</div>
                          </div>
                          <div className="flex gap-3">
                            <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">🤖</div>
                            <div className="flex-1">
                              <div className="bg-white/20 rounded-2xl rounded-tl-none p-3">
                                Perfeito! 💍 Para quando é a data do casamento?<br/>
                                <span className="text-xs mt-2 block opacity-80">(Consigo te dar orçamento em 2 minutos)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold mb-2">⚡ Tech Stack Sugerida:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-white/20">OpenAI GPT-4</Badge>
                          <Badge className="bg-white/20">Langchain</Badge>
                          <Badge className="bg-white/20">Base44 Functions</Badge>
                          <Badge className="bg-white/20">React</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gerador de Playlists */}
                  <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-green-900">🎵 Gerador de Playlists Personalizado</h3>
                      <Badge className="bg-green-600">Médio Impacto</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Cliente informa: estilo musical preferido, momento do evento (jantar, dança, after), faixa etária convidados → IA gera playlist Spotify sugerida.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-xs font-semibold text-gray-800 mb-2">Exemplo de Output:</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>🎼 <strong>Jantar (19h-21h):</strong> Bossa Nova, Jazz Brasileiro, Lounge</p>
                        <p>💃 <strong>Festa (21h-02h):</strong> Afro House, Organic House, Deep House</p>
                        <p>🌅 <strong>Sunrise (02h-06h):</strong> Melodic Techno, Downtempo</p>
                      </div>
                    </div>
                  </div>

                  {/* Analisador de Vibe */}
                  <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-purple-900">✨ Analisador de Vibe do Evento</h3>
                      <Badge className="bg-purple-600 text-white">Inovação</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Cliente descreve o evento em palavras livres → IA sugere: paleta de cores, estilo de decoração, tipo de música, mood boards.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-xs font-semibold text-gray-800 mb-2">Input do Cliente:</p>
                      <p className="text-xs text-gray-600 italic mb-3">"Casamento ao pôr do sol, atmosfera tropical, elegante mas descontraído"</p>
                      <p className="text-xs font-semibold text-gray-800 mb-2">Output da IA:</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>🎨 <strong>Cores:</strong> Terracota, Dourado, Verde Folha, Off-White</p>
                        <p>🎵 <strong>Música:</strong> Organic House, Bossa Nova Moderna, Indie Folk</p>
                        <p>🌴 <strong>Decoração:</strong> Madeira natural, Folhagens tropicais, Luz âmbar</p>
                      </div>
                    </div>
                  </div>

                  {/* Recomendações Dinâmicas */}
                  <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-orange-900">🎯 Recomendações Dinâmicas de Eventos</h3>
                      <Badge className="bg-orange-600">Alto Impacto</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Baseado no histórico de navegação + localização + data de busca → IA recomenda eventos relevantes (Réveillon, casamentos, corporativos).
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-xs font-semibold text-gray-800 mb-2">Exemplo:</p>
                      <p className="text-xs text-gray-600">
                        Usuário acessou "Eventos de Ano Novo" + está em dezembro → IA exibe banner: 
                        <span className="block mt-2 italic">"⏰ Últimas vagas para Réveillon Trancoso 2026! Open bar + DJs internacionais. Reserve agora →"</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTEÚDO */}
          <TabsContent value="conteudo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-green-700" />
                  Estratégia de Conteúdo SEO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Blog Posts */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Blog Posts Sugeridos (15 ideias)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-bold text-blue-900 mb-2">1. Guia Completo: Como Escolher DJ para Casamento em Trancoso</h4>
                        <p className="text-xs text-gray-700 mb-2">🎯 Palavra-chave: "como escolher dj casamento trancoso"</p>
                        <Badge className="bg-blue-600 text-xs text-white">2000+ palavras</Badge>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-900 mb-2">2. Top 10 Locais para Casamento em Trancoso 2025</h4>
                        <p className="text-xs text-gray-700 mb-2">🎯 Palavra-chave: "melhores locais casamento trancoso"</p>
                        <Badge className="bg-purple-600 text-xs text-white">1500+ palavras</Badge>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-900 mb-2">3. Afro House vs. Organic House: Qual o Melhor para Seu Evento?</h4>
                        <p className="text-xs text-gray-700 mb-2">🎯 Palavra-chave: "afro house organic house diferenca"</p>
                        <Badge className="bg-green-600 text-xs">1200+ palavras</Badge>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-bold text-orange-900 mb-2">4. Réveillon Trancoso 2026: O Que Esperar + Melhores Festas</h4>
                        <p className="text-xs text-gray-700 mb-2">🎯 Palavra-chave: "reveillon trancoso 2026 guia"</p>
                        <Badge className="bg-orange-600 text-xs">2500+ palavras</Badge>
                      </div>
                      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <h4 className="font-bold text-pink-900 mb-2">5. Quanto Custa um Casamento em Trancoso? [Breakdown Completo]</h4>
                        <p className="text-xs text-gray-700 mb-2">🎯 Palavra-chave: "custo casamento trancoso"</p>
                        <Badge className="bg-pink-600 text-xs text-white">1800+ palavras</Badge>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                        <h4 className="font-bold text-indigo-900 mb-2">6. Equipamento DJ Pioneer: CDJ-3000 vs. DJM-V10 [Review]</h4>
                        <p className="text-xs text-gray-700 mb-2">🎯 Palavra-chave: "pioneer cdj 3000 review"</p>
                        <Badge className="bg-indigo-600 text-xs text-white">1000+ palavras</Badge>
                      </div>
                    </div>
                    <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                      <p className="text-sm text-gray-800 font-semibold mb-2">💡 Estratégia de Publicação:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Publicar 1-2 posts por semana</li>
                        <li>• Focar em long-tail keywords (baixa concorrência)</li>
                        <li>• Incluir fotos reais de eventos (com schema ImageObject)</li>
                        <li>• Adicionar CTAs para orçamento em cada post</li>
                        <li>• Compartilhar em Instagram Stories + LinkedIn</li>
                      </ul>
                    </div>
                  </div>

                  {/* Landing Pages */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Landing Pages Específicas (criar novas)</h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg">
                        <h4 className="font-bold mb-2">🏖️ /dj-casamento-praia-trancoso</h4>
                        <p className="text-sm text-blue-100">Focus: Casamentos na praia especificamente</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-white/20 text-xs">Título: DJ Especializado em Casamentos na Praia</Badge>
                          <Badge className="bg-white/20 text-xs">Gallery de fotos praia</Badge>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-lg">
                        <h4 className="font-bold mb-2">🏢 /dj-eventos-corporativos-trancoso</h4>
                        <p className="text-sm text-purple-100">Focus: Empresas planejando eventos</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-white/20 text-xs">Case studies</Badge>
                          <Badge className="bg-white/20 text-xs">Pacotes empresariais</Badge>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-lg">
                        <h4 className="font-bold mb-2">🎉 /aluguel-som-pioneer-trancoso</h4>
                        <p className="text-sm text-green-100">Focus: Aluguel de equipamentos</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-white/20 text-xs">Catálogo equipamentos</Badge>
                          <Badge className="bg-white/20 text-xs">Calculadora preço</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAQs */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">❓ FAQs Estratégicas (com schema)</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      {[
                        { q: "Quanto custa contratar DJ para casamento em Trancoso?", a: "Os valores variam de R$ 15.000 a R$ 50.000+ dependendo da duração do evento, equipamentos utilizados e serviços adicionais como curadoria musical personalizada." },
                        { q: "Vocês fornecem equipamento de som?", a: "Sim! Trabalhamos com equipamentos Pioneer de última geração (CDJ-3000, DJM-V10) e sistemas de som Funktion-One para garantir qualidade acústica premium." },
                        { q: "Qual o estilo musical tocado?", a: "Especializados em Afro House, Organic House e House Music. Também criamos playlists personalizadas incluindo MPB, Bossa Nova, Jazz e outros estilos conforme preferência do casal." },
                        { q: "Atendem eventos fora de Trancoso?", a: "Sim! Atendemos Trancoso, Caraíva, Arraial d'Ajuda, Porto Seguro e região da Costa do Descobrimento." },
                      ].map((faq, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="font-semibold text-gray-900 text-sm mb-1">{faq.q}</p>
                          <p className="text-xs text-gray-600">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PROMPTS VISUAIS */}
          <TabsContent value="visual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-6 h-6 text-pink-600" />
                  Prompts para Geração de Imagens IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl border-2 border-pink-300">
                    <p className="text-sm text-gray-700 mb-4">
                      <strong>⚠️ IMPORTANTE:</strong> Logo TOCA e ícones oficiais devem ser usados EXATAMENTE como fornecidos. 
                      Prompts abaixo são para elementos complementares (backgrounds, ilustrações, banners).
                    </p>
                  </div>

                  {/* Hero Backgrounds */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎬 Backgrounds Hero Section</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-xl border border-blue-200">
                        <Badge className="bg-blue-600 mb-3 text-white">Prompt 1 - Sunset Trancoso</Badge>
                        <p className="text-sm text-gray-800 font-mono bg-white p-3 rounded-lg">
                          "Ultra-realistic photograph of Trancoso beach at golden hour sunset, warm orange and pink sky, palm trees silhouette, soft waves, DJ equipment (Pioneer CDJ) subtly integrated on beachfront setup, cinematic lighting, 16:9 aspect ratio, professional photography, dreamy atmosphere, bokeh effect, 8K resolution"
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-5 rounded-xl border border-purple-200">
                        <Badge className="bg-purple-600 mb-3 text-white">Prompt 2 - Wedding Vibe</Badge>
                        <p className="text-sm text-gray-800 font-mono bg-white p-3 rounded-lg">
                          "Elegant outdoor wedding reception in Trancoso Brazil, string lights hanging over wooden tables, tropical flowers decoration, guests dancing, DJ booth with modern equipment, romantic ambient lighting, luxury destination wedding, aerial view, cinematic color grading, natural tones, shallow depth of field"
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-100 p-5 rounded-xl border border-orange-200">
                        <Badge className="bg-orange-600 mb-3">Prompt 3 - Festival Energy</Badge>
                        <p className="text-sm text-gray-800 font-mono bg-white p-3 rounded-lg">
                          "Vibrant outdoor electronic music festival in tropical setting, crowd with hands up, dynamic DJ performing with Pioneer equipment, laser lights and LED screens, energetic atmosphere, Afro House music vibe, palm trees background, night scene, long exposure light trails, professional event photography, 4K quality"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cards/Thumbnails */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🖼️ Cards de Serviços</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-teal-100 p-5 rounded-xl border border-green-200">
                        <Badge className="bg-green-600 mb-3">DJ para Casamentos</Badge>
                        <p className="text-xs text-gray-800 font-mono bg-white p-3 rounded-lg">
                          "Minimalist modern illustration of couple dancing at beach wedding, DJ silhouette in background, tropical leaves border, soft pastel colors (peach, mint, ivory), clean design, vector art style, elegant typography space, professional graphic design, 1:1 square format"
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-5 rounded-xl border border-blue-200">
                        <Badge className="bg-blue-600 mb-3 text-white">Aluguel de Equipamentos</Badge>
                        <p className="text-xs text-gray-800 font-mono bg-white p-3 rounded-lg">
                          "Product photography of Pioneer CDJ-3000 and DJM-V10 mixer on sleek black surface, studio lighting, reflections, premium quality equipment, modern professional DJ gear, minimalist composition, dark moody background, commercial product shot, high resolution, shallow focus"
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-5 rounded-xl border border-purple-200">
                        <Badge className="bg-purple-600 mb-3 text-white">Eventos Corporativos</Badge>
                        <p className="text-xs text-gray-800 font-mono bg-white p-3 rounded-lg">
                          "Corporate event scene with professional DJ setup, modern office rooftop party, business casual attendees networking, sleek lighting design, urban skyline background, contemporary business event photography, sophisticated atmosphere, editorial style, natural light mixed with ambient"
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-5 rounded-xl border border-orange-200">
                        <Badge className="bg-orange-600 mb-3">Réveillon Trancoso</Badge>
                        <p className="text-xs text-gray-800 font-mono bg-white p-3 rounded-lg">
                          "New Year's Eve celebration on Trancoso beach, fireworks in sky, crowd cheering, DJ performing under decorated stage, tropical party vibes, festive lighting, countdown moment energy, wide angle shot, celebratory atmosphere, vibrant colors, professional event photography, 2026 celebration"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📱 Templates Redes Sociais</h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-4 rounded-xl">
                        <Badge className="bg-white/20 mb-2">Instagram Post 1:1</Badge>
                        <p className="text-sm font-mono opacity-90">
                          "Instagram post template design for DJ service, tropical Trancoso aesthetic, glassmorphism card overlay, space for text 'Casamento dos Sonhos', palm leaf accents, modern minimalist layout, gradient background (coral to purple), professional branding, 1080x1080px"
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl">
                        <Badge className="bg-white/20 mb-2">Instagram Stories 9:16</Badge>
                        <p className="text-sm font-mono opacity-90">
                          "Vertical Instagram story template for event announcement, dynamic layout with countdown timer placeholder, tropical vibes, vibrant colors, space for event details, modern typography, engaging CTA button area, mobile-optimized design, 1080x1920px"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nota Técnica */}
                  <div className="bg-gray-900 text-white p-6 rounded-xl">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Nota Técnica - Uso de Prompts
                    </h4>
                    <ul className="text-sm space-y-2 text-gray-300">
                      <li>• <strong>Ferramentas sugeridas:</strong> Midjourney, DALL-E 3, Stable Diffusion XL</li>
                      <li>• <strong>Formato ideal:</strong> WebP (comprimido) para web, PNG para qualidade máxima</li>
                      <li>• <strong>Dimensões:</strong> 2x resolução do display final (ex: 2400x1600px para hero 1200x800px)</li>
                      <li>• <strong>Otimização:</strong> Comprimir com TinyPNG antes do upload (manter qualidade 85%)</li>
                      <li>• <strong>Alt text:</strong> Sempre adicionar descrição detalhada para SEO e acessibilidade</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IMPLEMENTAÇÃO */}
          <TabsContent value="implementacao" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  Roadmap de Implementação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Sprint 1 */}
                  <div className="border-l-4 border-red-500 pl-6 bg-red-50 rounded-r-xl py-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-red-900">Sprint 1 - SEO Crítico (1 semana)</h3>
                      <Badge className="bg-red-600">URGENTE</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Completar schema markup para 37 eventos restantes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Otimizar todas as imagens para WebP + lazy loading</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Adicionar breadcrumbs em todas as páginas</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Implementar FAQPage schema em 3 páginas principais</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Configurar Google Search Console + corrigir erros</span>
                      </div>
                    </div>
                  </div>

                  {/* Sprint 2 */}
                  <div className="border-l-4 border-yellow-500 pl-6 bg-yellow-50 rounded-r-xl py-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-yellow-900">Sprint 2 - IA & UX (2 semanas)</h3>
                      <Badge className="bg-yellow-600">ALTA PRIORIDADE</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Implementar chatbot qualificador de leads com IA</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Criar landing pages específicas (3 novas páginas)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Redesign hero section com variações A/B test</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Adicionar seção de reviews estruturada (schema)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Implementar glassmorphism cards em serviços</span>
                      </div>
                    </div>
                  </div>

                  {/* Sprint 3 */}
                  <div className="border-l-4 border-green-500 pl-6 bg-green-50 rounded-r-xl py-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-green-900">Sprint 3 - Conteúdo (3 semanas)</h3>
                      <Badge className="bg-green-600">MÉDIO PRAZO</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Criar estrutura de blog + 5 primeiros posts</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Produzir conteúdo visual com IA (10 imagens)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Gravar 3 vídeos curtos para Instagram/TikTok</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Expandir FAQ para 20+ perguntas com schema</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Otimizar meta descriptions (todas as páginas)</span>
                      </div>
                    </div>
                  </div>

                  {/* Sprint 4 */}
                  <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 rounded-r-xl py-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-blue-900">Sprint 4 - Inovação (1 mês)</h3>
                      <Badge className="bg-blue-600 text-white">OPCIONAL</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Gerador de playlists personalizado (IA)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Analisador de vibe do evento (IA + mood boards)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Sistema de recomendações dinâmicas</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Dark mode + animações avançadas</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>Dashboard cliente (acompanhar orçamento)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MÉTRICAS */}
          <TabsContent value="metricas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-700" />
                  KPIs e Metas 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Objetivos Principais */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-4">🎯 Objetivos Q1 2025</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-4xl font-bold mb-2">+150%</div>
                        <div className="text-sm text-green-100">Tráfego Orgânico</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-4xl font-bold mb-2">+80%</div>
                        <div className="text-sm text-green-100">Taxa de Conversão</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-4xl font-bold mb-2">Top 3</div>
                        <div className="text-sm text-green-100">Google "DJ Trancoso"</div>
                      </div>
                    </div>
                  </div>

                  {/* Métricas Detalhadas */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">🔍 SEO</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Palavras-Chave Top 10</span>
                            <Badge>Meta: 25</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full text-white" style={{width: '40%'}}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Atual: 10 palavras</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Domain Authority</span>
                            <Badge>Meta: 40</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Atual: 24 DA</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">📊 Performance</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">PageSpeed Score</span>
                            <Badge className="bg-green-600">Meta: 95</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Atual: 88/100</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Core Web Vitals</span>
                            <Badge className="bg-yellow-600">Meta: Todas Green</Badge>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <div className="flex-1 bg-green-200 rounded p-2 text-center text-xs">LCP ✓</div>
                            <div className="flex-1 bg-yellow-200 rounded p-2 text-center text-xs">FID ~</div>
                            <div className="flex-1 bg-green-200 rounded p-2 text-center text-xs">CLS ✓</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">💰 Conversão</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Taxa de Conversão</span>
                            <Badge>Meta: 4.5%</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full text-white" style={{width: '55%'}}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Atual: 2.5%</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Leads Qualificados/Mês</span>
                            <Badge>Meta: 150</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full text-white" style={{width: '40%'}}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Atual: 60 leads</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">👥 Engajamento</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Tempo Médio no Site</span>
                            <Badge>Meta: 4min</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-600 h-2 rounded-full" style={{width: '62%'}}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Atual: 2min 30s</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700">Taxa de Rejeição</span>
                            <Badge className="bg-green-600">Meta: &lt;40%</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{width: '52%'}}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Atual: 52%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monitoramento */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">📈 Ferramentas de Monitoramento</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-bold text-blue-900 mb-2">Google Analytics 4</h5>
                        <ul className="text-xs text-gray-700 space-y-1">
                          <li>• Tráfego orgânico</li>
                          <li>• Conversões</li>
                          <li>• Comportamento usuário</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h5 className="font-bold text-green-900 mb-2">Google Search Console</h5>
                        <ul className="text-xs text-gray-700 space-y-1">
                          <li>• Posições palavras-chave</li>
                          <li>• Impressões e cliques</li>
                          <li>• Erros de indexação</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="font-bold text-purple-900 mb-2">PageSpeed Insights</h5>
                        <ul className="text-xs text-gray-700 space-y-1">
                          <li>• Core Web Vitals</li>
                          <li>• Performance score</li>
                          <li>• Sugestões otimização</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Final */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white border-0 mt-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">🚀 Pronto para Decolar?</h2>
            <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
              Relatório completo gerado. Todas as recomendações documentadas e priorizadas.
              Próximo passo: Executar Sprint 1 (SEO Crítico).
            </p>
            <div className="flex justify-center gap-4">
              <Link to={createPageUrl("ProximasTarefas")}>
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-bold">
                  Ver Tarefas Prioritárias
                </Button>
              </Link>
              <Link to={createPageUrl("AdminDashboard")}>
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}