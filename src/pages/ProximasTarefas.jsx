import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Clock, Target, ArrowLeft, ExternalLink, Settings, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function ProximasTarefas() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to={createPageUrl("AdminDashboard")}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📋 Próximas Tarefas - Desenvolvedor
            </h1>
            <p className="text-gray-600 text-lg">
              Ações prioritárias para otimização e lançamento
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Gerado em: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>

        {/* Status Geral */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center gap-4">
              <Target className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-1">🎯 STATUS: 7 TAREFAS PRIORITÁRIAS</h2>
                <p className="text-blue-50">
                  3 críticas • 2 importantes • 2 recomendadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CRÍTICAS - Google Tag Manager */}
        <Card className="mb-8 border-2 border-red-300">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
                CRÍTICAS - Bloqueia Lançamento
              </CardTitle>
              <Badge className="bg-red-600 text-white">3 tarefas</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Tarefa 1 */}
              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Configurar Google Tag Manager</h3>
                      <p className="text-sm text-gray-600 mt-1">Criar triggers e tags de conversão no GTM</p>
                    </div>
                  </div>
                  <Badge className="bg-red-600">CRÍTICA</Badge>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Checklist de Ações:</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Acessar <a href="https://tagmanager.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Tag Manager</a></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Criar Trigger: <code className="bg-gray-100 px-2 py-0.5 rounded">form_submission_success</code></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Criar Tag Google Ads: AW-17649743667 / Px_YCKCb3s4bELPuhuBB</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Criar Tag Meta Pixel: <code className="bg-gray-100 px-2 py-0.5 rounded">fbq('track', 'Lead')</code></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Publicar container GTM</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-orange-500">⏱️ 30-40 minutos</Badge>
                  <Badge className="bg-purple-500 text-white">🎓 Dificuldade: Média</Badge>
                </div>

                <div className="mt-4">
                  <a href="https://tagmanager.google.com" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Configurar Agora
                    </Button>
                  </a>
                </div>
              </div>

              {/* Tarefa 2 */}
              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Validar Rastreamento com Extensões</h3>
                      <p className="text-sm text-gray-600 mt-1">Testar Google Tag Assistant e Meta Pixel Helper</p>
                    </div>
                  </div>
                  <Badge className="bg-red-600">CRÍTICA</Badge>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Checklist de Ações:</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Instalar <a href="https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Tag Assistant Legacy</a></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Instalar <a href="https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Meta Pixel Helper</a></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Testar formulário: preencher → enviar → verificar página /obrigado</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Verificar se Google Ads conversion tag dispara</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Verificar se Meta Pixel "Lead" event dispara</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Documentar resultados com screenshots</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-orange-500">⏱️ 15-20 minutos</Badge>
                  <Badge className="bg-green-500">🎓 Dificuldade: Fácil</Badge>
                </div>
              </div>

              {/* Tarefa 3 */}
              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Configurar Tracking Template no Google Ads</h3>
                      <p className="text-sm text-gray-600 mt-1">Adicionar parâmetros UTM e GCLID</p>
                    </div>
                  </div>
                  <Badge className="bg-red-600">CRÍTICA</Badge>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Usar o guia criado:</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Abrir página <Link to={createPageUrl("ConfiguracaoGoogleAds")} className="text-blue-600 underline">Configuração Google Ads</Link></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Seguir os 3 passos: Modelo de Acompanhamento + Sufixo + Parâmetros</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Copiar e colar os códigos fornecidos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Testar no Google Ads antes de salvar</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-orange-500">⏱️ 10-15 minutos</Badge>
                  <Badge className="bg-green-500">🎓 Dificuldade: Fácil</Badge>
                </div>

                <div className="mt-4 flex gap-3">
                  <Link to={createPageUrl("ConfiguracaoGoogleAds")}>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Ver Guia Completo
                    </Button>
                  </Link>
                  <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Acessar Google Ads
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IMPORTANTES - SEO e Performance */}
        <Card className="mb-8 border-2 border-yellow-300">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
                IMPORTANTES - Melhora Performance
              </CardTitle>
              <Badge className="bg-yellow-600 text-white">2 tarefas</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Tarefa 4 */}
              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Implementar Schema Markup Completo</h3>
                      <p className="text-sm text-gray-600 mt-1">Adicionar structured data para todos os eventos</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-600">IMPORTANTE</Badge>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Status:</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
                      <span>✅ Schema markup criado para 10 primeiros eventos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>⏳ Expandir para TODOS os eventos (47 no total)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>⏳ Validar com <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Rich Results Test</a></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-orange-500">⏱️ 20-30 minutos</Badge>
                  <Badge className="bg-purple-500 text-white">🎓 Dificuldade: Média</Badge>
                </div>
              </div>

              {/* Tarefa 5 */}
              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Otimizar Core Web Vitals</h3>
                      <p className="text-sm text-gray-600 mt-1">Melhorar LCP, FID e CLS para melhor ranking</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-600">IMPORTANTE</Badge>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Ações:</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
                      <span>✅ Lazy loading de vídeos implementado</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
                      <span>✅ Preconnect e DNS-prefetch configurados</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>⏳ Comprimir imagens dos eventos (usar WebP)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>⏳ Adicionar preload para imagens above-the-fold</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>⏳ Testar com <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">PageSpeed Insights</a></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-orange-500">⏱️ 1-2 horas</Badge>
                  <Badge className="bg-purple-500 text-white">🎓 Dificuldade: Média</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RECOMENDADAS - Extras */}
        <Card className="mb-8 border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                RECOMENDADAS - Melhorias Extras
              </CardTitle>
              <Badge className="bg-blue-600 text-white">2 tarefas</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Tarefa 6 */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">6</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Configurar BigQuery Data Transfer</h3>
                      <p className="text-sm text-gray-600 mt-1">Importar dados Google Ads para análises avançadas</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white">OPCIONAL</Badge>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Conectar contas Google Ads (327-063-2041 e 719-576-6711) ao BigQuery para análise de ROI em tempo real.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-orange-500">⏱️ 30-45 minutos</Badge>
                  <Badge className="bg-red-500">🎓 Dificuldade: Avançada</Badge>
                </div>

                <div className="mt-4">
                  <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Google Cloud Console
                    </Button>
                  </a>
                </div>
              </div>

              {/* Tarefa 7 */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">7</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Criar Dashboards Looker Studio</h3>
                      <p className="text-sm text-gray-600 mt-1">Visualização de dados de conversão e ROI</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white">OPCIONAL</Badge>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Dashboard executivo com métricas de Google Ads, GA4 e Meta Ads em um só lugar.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-orange-500">⏱️ 1-2 horas</Badge>
                  <Badge className="bg-purple-500 text-white">🎓 Dificuldade: Média</Badge>
                </div>

                <div className="mt-4">
                  <a href="https://lookerstudio.google.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Looker Studio
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Executivo */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">📊 RESUMO EXECUTIVO</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">3</p>
                <p className="text-sm text-purple-100">Tarefas Críticas</p>
                <p className="text-xs text-purple-200 mt-1">⏱️ ~1-1.5 horas</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">2</p>
                <p className="text-sm text-purple-100">Tarefas Importantes</p>
                <p className="text-xs text-purple-200 mt-1">⏱️ ~1.5-2 horas</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">2</p>
                <p className="text-sm text-purple-100">Tarefas Opcionais</p>
                <p className="text-xs text-purple-200 mt-1">⏱️ ~2-3 horas</p>
              </div>
            </div>

            <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">⏱️ Tempo Total Estimado:</p>
              <p className="text-3xl font-bold">2.5-3.5 horas</p>
              <p className="text-sm text-purple-100 mt-2">
                (Apenas tarefas críticas + importantes para lançamento)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Links Rápidos */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Link to={createPageUrl("RelatorioImplementacao")}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-white">
              📊 Ver Relatório Completo
            </Button>
          </Link>
          <Link to={createPageUrl("ConfiguracaoGoogleAds")}>
            <Button className="w-full bg-green-700 hover:bg-green-800 py-6">
              ⚙️ Guia Google Ads
            </Button>
          </Link>
          <a href="https://tagmanager.google.com" target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              Google Tag Manager
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}