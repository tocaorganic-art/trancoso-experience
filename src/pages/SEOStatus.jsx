import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, AlertCircle, ExternalLink, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

/**
 * Página de Status de SEO - Dashboard pós-lançamento
 * Mostra configurações, links úteis e checklist de SEO
 */
export default function SEOStatus() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-8">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Status de SEO
            </h1>
            <p className="text-green-100 text-lg">
              Configurações e monitoramento pós-lançamento
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Checklist de Implementação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Implementações Concluídas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Meta Tags Automáticas</p>
                  <p className="text-sm text-gray-600">Título, descrição e keywords otimizados por página</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Sitemap.xml Dinâmico</p>
                  <p className="text-sm text-gray-600">Geração automática com todas as páginas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Schema Markup - Eventos</p>
                  <p className="text-sm text-gray-600">Event schema para todos os eventos listados</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Schema Markup - Serviços</p>
                  <p className="text-sm text-gray-600">Service schema para casamentos, corporativo e aluguel</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Open Graph & Twitter Cards</p>
                  <p className="text-sm text-gray-600">Otimizado para compartilhamento social</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Canonical URLs</p>
                  <p className="text-sm text-gray-600">URLs canônicas em todas as páginas principais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links e Ferramentas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-blue-600" />
                Links Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sitemap URL */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="font-medium text-sm mb-2">URL do Sitemap:</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-white px-2 py-1 rounded flex-1 overflow-x-auto">
                    https://base44.app/api/functions/68f2dbf0b11165a8439c5a8b/generateSitemap
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard("https://base44.app/api/functions/68f2dbf0b11165a8439c5a8b/generateSitemap")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Google Search Console */}
              <a 
                href="https://search.google.com/search-console" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Google Search Console</p>
                    <p className="text-sm text-gray-600">Submeter sitemap e monitorar indexação</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </a>

              {/* Schema Validator */}
              <a 
                href="https://validator.schema.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Schema.org Validator</p>
                    <p className="text-sm text-gray-600">Validar structured data do site</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </a>

              {/* Rich Results Test */}
              <a 
                href="https://search.google.com/test/rich-results" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rich Results Test</p>
                    <p className="text-sm text-gray-600">Testar resultados enriquecidos do Google</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </a>

              {/* PageSpeed Insights */}
              <a 
                href="https://pagespeed.web.dev/?url=https://tocaexperience.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">PageSpeed Insights</p>
                    <p className="text-sm text-gray-600">Verificar performance e Core Web Vitals</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Próximos Passos */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Próximos Passos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Submeter Sitemap ao Google Search Console</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Acesse Search Console → Sitemaps → Adicionar novo sitemap → Cole a URL acima
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Verificar Schema Markup</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Use o Rich Results Test para validar os schemas de eventos e serviços
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Solicitar Indexação Manual</p>
                  <p className="text-sm text-gray-600 mt-1">
                    No Search Console, solicite indexação das páginas principais (Home, Casamentos, Corporativo)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">Monitorar Desempenho</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Acompanhe impressões, cliques e posição média no Search Console após 7-14 dias
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Palavras-chave Alvo */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Palavras-chave Alvo por Página</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Casamentos Trancoso:</p>
                <div className="flex flex-wrap gap-2">
                  {["dj casamento trancoso", "dj para casamento bahia", "casamento trancoso", "som casamento trancoso"].map(kw => (
                    <span key={kw} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{kw}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Eventos Corporativos:</p>
                <div className="flex flex-wrap gap-2">
                  {["dj corporativo trancoso", "evento empresarial trancoso", "festa corporativa"].map(kw => (
                    <span key={kw} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">{kw}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Aluguel Equipamentos:</p>
                <div className="flex flex-wrap gap-2">
                  {["aluguel equipamento dj trancoso", "locação som trancoso", "pioneer cdj trancoso"].map(kw => (
                    <span key={kw} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">{kw}</span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}