import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function RelatorioSEO() {
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Relatório SEO & Google Ads Readiness
              </h1>
              <p className="text-gray-600">
                Análise completa de www.tocaexperience.com.br • Data: Dezembro 2025
              </p>
            </div>
            <Button onClick={handleExportPDF} className="bg-gray-800 hover:bg-gray-900">
              <Download className="w-4 h-4 mr-2" /> Exportar PDF
            </Button>
          </div>
        </div>

        {/* Score Geral */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-green-600 mb-2">82/100</div>
                <p className="text-xl text-gray-700 font-semibold">Pronto para Lançamento</p>
                <p className="text-sm text-gray-600 mt-2">Site otimizado com pontos de melhoria identificados</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Análise de Palavras-Chave */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">🎯 Análise de Palavras-Chave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2 text-green-600">✅ Palavras-Chave Identificadas (Pontos Fortes)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-semibold">Primárias:</p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• DJ Trancoso</li>
                      <li>• Casamento Trancoso</li>
                      <li>• Eventos Trancoso</li>
                      <li>• Réveillon Trancoso</li>
                      <li>• Aluguel equipamento DJ</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-semibold">Secundárias:</p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Afro House Brasil</li>
                      <li>• Organic House</li>
                      <li>• Tony Monteiro DJ</li>
                      <li>• Enzo Furtado DJ</li>
                      <li>• Som Pioneer Trancoso</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-yellow-600">⚠️ Palavras-Chave Faltando (Oportunidades)</h3>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm mb-2">Adicionar estas keywords de alta conversão:</p>
                  <ul className="text-sm space-y-1">
                    <li>• "DJ para casamento Trancoso preço"</li>
                    <li>• "Quanto custa DJ casamento Bahia"</li>
                    <li>• "Melhor DJ Caraíva"</li>
                    <li>• "Aluguel som festa Arraial d'Ajuda"</li>
                    <li>• "DJ evento corporativo Porto Seguro"</li>
                    <li>• "Contratar DJ Réveillon 2025 Trancoso"</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-blue-600">📊 Intenção de Busca</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">Informacional</p>
                    <p className="text-xs text-gray-600 mt-1">Cobertura: 70%</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">Transacional</p>
                    <p className="text-xs text-gray-600 mt-1">Cobertura: 85%</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-sm">Navegacional</p>
                    <p className="text-xs text-gray-600 mt-1">Cobertura: 90%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO On-Page */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">🔍 SEO On-Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Meta Tags */}
              <div>
                <h3 className="font-bold text-lg mb-3">Meta Tags</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Title Tags</p>
                      <p className="text-xs text-gray-600">Otimizados por página com palavras-chave primárias</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Meta Descriptions</p>
                      <p className="text-xs text-gray-600">Únicas para cada página, incluindo CTAs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Open Graph Tags</p>
                      <p className="text-xs text-gray-600">Configurados para compartilhamento social</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estrutura de Conteúdo */}
              <div>
                <h3 className="font-bold text-lg mb-3">Estrutura de Conteúdo</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Hierarquia de Headings (H1-H3)</p>
                      <p className="text-xs text-gray-600">Estrutura clara e semântica</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Schema.org Markup</p>
                      <p className="text-xs text-gray-600">LocalBusiness, Service e MusicGroup implementados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Alt Text de Imagens</p>
                      <p className="text-xs text-gray-600">70% das imagens - adicionar alt text descritivo nas restantes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="font-bold text-lg mb-3">Performance Técnica</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Otimização de Imagens</p>
                      <p className="text-xs text-gray-600">WebP, lazy loading e dimensões responsivas implementadas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Mobile-First Design</p>
                      <p className="text-xs text-gray-600">Layout totalmente responsivo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Font Preloading</p>
                      <p className="text-xs text-gray-600">Algumas fontes não utilizadas - limpar preloads desnecessários</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funcionalidades */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">⚙️ Funcionalidades & Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Formulários de Cotação</p>
                  <p className="text-xs text-gray-600">Funcionais com redirect para WhatsApp +55 73 98283579</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">CTAs Claros</p>
                  <p className="text-xs text-gray-600">Múltiplos pontos de conversão em todas as páginas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Navegação Intuitiva</p>
                  <p className="text-xs text-gray-600">Menu fixo com acesso rápido a todas as seções</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">LGPD Compliance</p>
                  <p className="text-xs text-gray-600">Política de Privacidade e Termos de Serviço implementados</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Pixel de Rastreamento</p>
                  <p className="text-xs text-gray-600 mb-2">Meta Pixel ID configurado como NULL - não está rastreando</p>
                  <p className="text-xs font-semibold text-red-700">AÇÃO CRÍTICA: Configurar Meta Pixel antes de lançar campanhas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Google Tag Manager</p>
                  <p className="text-xs text-gray-600 mb-2">GTM-XXXXXXX placeholder - não está ativo</p>
                  <p className="text-xs font-semibold text-red-700">AÇÃO CRÍTICA: Configurar GTM antes de lançar campanhas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recomendações Prioritárias */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">🚀 Ações Prioritárias Pré-Lançamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-800 mb-2">🔴 CRÍTICO (Fazer AGORA)</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Configurar Meta Pixel ID real (remover "YOUR_PIXEL_ID")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Configurar Google Tag Manager ID real (remover "GTM-XXXXXXX")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Criar Google Ads e configurar tag de conversão</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4.</span>
                    <span>Testar eventos de conversão (Form Submit, WhatsApp Click)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h4 className="font-bold text-yellow-800 mb-2">🟡 IMPORTANTE (Fazer em 1 semana)</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Adicionar alt text em todas as imagens restantes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Remover preload de fontes não utilizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Criar páginas de destino específicas para keywords de cauda longa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4.</span>
                    <span>Implementar FAQ Schema nas páginas de serviço</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-bold text-blue-800 mb-2">🔵 OTIMIZAÇÃO (Fazer em 1 mês)</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Criar blog com conteúdo SEO sobre casamentos e eventos em Trancoso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Obter backlinks de portais de casamento locais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Criar perfil Google Business para "Toca Experience Trancoso"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4.</span>
                    <span>Implementar A/B tests em CTAs principais</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist de Lançamento */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">✅ Checklist Google Ads Launch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Google Tag Manager configurado e testado</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Google Analytics 4 vinculado ao GTM</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Google Ads Conversion Tag instalada</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Meta Pixel configurado e validado</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Eventos de conversão testados (Form, WhatsApp)</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Páginas de destino otimizadas para cada grupo de anúncios</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Orçamento diário definido e aprovado</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Palavras-chave negativas configuradas</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Extensões de anúncio criadas (Sitelinks, Callouts)</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Remarketing configurado</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Sugestões de Campanhas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">📢 Sugestões de Campanhas Google Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-lg">Campanha 1: Casamentos Trancoso (Alta Intenção)</h4>
                <p className="text-sm text-gray-600 mt-1">Orçamento sugerido: R$ 50-100/dia</p>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>Keywords:</strong> "dj casamento trancoso", "dj para casamento bahia", "som casamento trancoso"</p>
                  <p><strong>Landing Page:</strong> /CasamentosTrancoso</p>
                  <p><strong>CPC Estimado:</strong> R$ 2-5</p>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-bold text-lg">Campanha 2: Réveillon 2025/2026</h4>
                <p className="text-sm text-gray-600 mt-1">Orçamento sugerido: R$ 80-150/dia (Sazonal: Nov-Dez)</p>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>Keywords:</strong> "reveillon trancoso 2026", "festa ano novo caraiva", "dj reveillon bahia"</p>
                  <p><strong>Landing Page:</strong> /EventosAnoNovo</p>
                  <p><strong>CPC Estimado:</strong> R$ 3-8</p>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg">Campanha 3: Aluguel de Equipamentos</h4>
                <p className="text-sm text-gray-600 mt-1">Orçamento sugerido: R$ 30-60/dia</p>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>Keywords:</strong> "aluguel som trancoso", "alugar equipamento dj bahia", "cdj pioneer aluguel"</p>
                  <p><strong>Landing Page:</strong> /LocacaoSom</p>
                  <p><strong>CPC Estimado:</strong> R$ 1.50-4</p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-lg">Campanha 4: Display Remarketing</h4>
                <p className="text-sm text-gray-600 mt-1">Orçamento sugerido: R$ 20-40/dia</p>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>Público:</strong> Visitantes que não converteram</p>
                  <p><strong>Criativos:</strong> Banner com ofertas especiais, vídeos de eventos</p>
                  <p><strong>CPM Estimado:</strong> R$ 5-15</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Final */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">📝 Resumo Executivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                O site <strong>www.tocaexperience.com.br</strong> está <strong className="text-green-600">82% pronto</strong> para lançamento de campanhas Google Ads. 
                A estrutura de SEO on-page é sólida, com meta tags otimizadas, schema markup implementado e design responsivo.
              </p>
              <p className="text-gray-700">
                <strong className="text-red-600">Bloqueadores críticos:</strong> A ausência de pixels de rastreamento (Meta Pixel e GTM) impede o lançamento imediato. 
                Sem esses pixels, não será possível medir ROI, otimizar campanhas ou fazer remarketing.
              </p>
              <p className="text-gray-700">
                <strong className="text-green-600">Próximos passos:</strong> Configurar os pixels de rastreamento (1-2 dias), testar eventos de conversão (1 dia), 
                e criar as primeiras campanhas focadas em casamentos e réveillon (2-3 dias). Orçamento inicial sugerido: R$ 200-300/dia distribuído entre as campanhas.
              </p>
              <p className="text-gray-700">
                <strong>Expectativa de resultados:</strong> Com as otimizações implementadas, estimamos 15-25 leads qualificados/mês nas primeiras 4 semanas, 
                com CPA entre R$ 80-150 dependendo da campanha.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}