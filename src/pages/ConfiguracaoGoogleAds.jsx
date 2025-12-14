import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle, ArrowLeft, ExternalLink, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function ConfiguracaoGoogleAds() {
  const [copied, setCopied] = useState({});

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    toast.success(`${field} copiado!`);
    setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
  };

  // Configurações recomendadas
  const trackingTemplate = "https://tocaexperience.com.br/{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}&gclid={gclid}";
  
  const finalUrlSuffix = "utm_source=google&utm_medium=cpc&gclid={gclid}";

  const customParameters = [
    { name: "campaign", value: "{campaignid}" },
    { name: "adgroup", value: "{adgroupid}" },
    { name: "keyword", value: "{keyword}" },
    { name: "device", value: "{device}" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 shadow-lg">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("AdminDashboard")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <CheckCircle className="w-4 h-4" />
              Guia de Configuração
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Configuração Google Ads - Rastreamento
            </h1>
            <p className="text-blue-100 text-lg">
              Siga este guia passo a passo para configurar o rastreamento perfeito
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Passo 1: Modelo de Acompanhamento */}
        <Card className="mb-6 border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-blue-600 text-white mb-2">PASSO 1</Badge>
                <CardTitle className="text-2xl">Modelo de Acompanhamento</CardTitle>
                <p className="text-gray-600 text-sm mt-2">
                  Este é o template principal que rastreia todos os cliques dos anúncios
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <code className="text-xs text-gray-800 break-all flex-1 pr-4">
                  {trackingTemplate}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(trackingTemplate, "Modelo de Acompanhamento")}
                  className="shrink-0"
                >
                  {copied["Modelo de Acompanhamento"] ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Como usar:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>Cole este código exatamente como está no campo "Modelo de acompanhamento"</li>
                <li>O Google Ads substituirá automaticamente os valores entre chaves {`{}`}</li>
                <li>Isso capturará: campanha, grupo de anúncios, palavra-chave e GCLID</li>
              </ol>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">O que faz:</p>
                <p className="text-sm font-medium text-gray-800">Rastreia cada clique com parâmetros UTM</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Resultado:</p>
                <p className="text-sm font-medium text-gray-800">Dados precisos no Google Analytics 4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passo 2: Sufixo do URL Final */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-green-600 text-white mb-2">PASSO 2</Badge>
                <CardTitle className="text-2xl">Sufixo do URL Final</CardTitle>
                <p className="text-gray-600 text-sm mt-2">
                  Adiciona parâmetros extras ao final de todas as URLs
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <code className="text-xs text-gray-800 break-all flex-1 pr-4">
                  {finalUrlSuffix}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(finalUrlSuffix, "Sufixo do URL")}
                  className="shrink-0"
                >
                  {copied["Sufixo do URL"] ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Como usar:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-green-800">
                <li>Cole no campo "Sufixo do URL final"</li>
                <li>Será adicionado automaticamente após a URL de destino</li>
                <li>Garante que o GCLID seja sempre capturado</li>
              </ol>
            </div>

            <div className="mt-4 bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-sm text-amber-900">
                <strong>⚠️ Importante:</strong> Este sufixo funciona em conjunto com o Modelo de Acompanhamento. 
                Use os dois para rastreamento completo!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Passo 3: Parâmetros Personalizados */}
        <Card className="mb-6 border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-purple-600 text-white mb-2">PASSO 3 (OPCIONAL)</Badge>
                <CardTitle className="text-2xl">Parâmetros Personalizados</CardTitle>
                <p className="text-gray-600 text-sm mt-2">
                  Parâmetros extras para análise avançada
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 mb-4">
              {customParameters.map((param, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Nome do Parâmetro:</p>
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-medium text-gray-800">{param.name}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(param.name, `Parâmetro ${param.name}`)}
                        >
                          {copied[`Parâmetro ${param.name}`] ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Valor:</p>
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-medium text-gray-800">{param.value}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(param.value, `Valor ${param.name}`)}
                        >
                          {copied[`Valor ${param.name}`] ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Como adicionar:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-purple-800">
                <li>Clique no botão azul "+" na interface do Google Ads</li>
                <li>Digite o nome do parâmetro no campo "{`{_Nome}`}"</li>
                <li>Cole o valor correspondente no campo "Valor"</li>
                <li>Repita para cada parâmetro</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Teste e Validação */}
        <Card className="mb-6 border-2 border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
            <CardTitle className="text-2xl">🧪 Testar Configuração</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 mb-4">
              <h4 className="font-semibold text-orange-900 mb-3">Após salvar as configurações:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-orange-800">
                <li>Clique no botão "Testar" no Google Ads (embaixo dos parâmetros personalizados)</li>
                <li>Verifique se a URL gerada está correta</li>
                <li>Procure pelos parâmetros UTM e GCLID na URL</li>
                <li>Se aparecer erro, revise os passos acima</li>
              </ol>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-800 mb-2">
                <strong>Exemplo de URL gerada corretamente:</strong>
              </p>
              <code className="text-xs text-green-700 bg-green-50 p-2 rounded block break-all">
                https://tocaexperience.com.br/Cotacao?utm_source=google&utm_medium=cpc&utm_campaign=12345&utm_content=67890&utm_term=dj+casamento+trancoso&gclid=abc123xyz
              </code>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="border-2 border-gray-200">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
            <CardTitle className="text-2xl">❓ Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  1. Por que preciso configurar isso?
                </h4>
                <p className="text-sm text-gray-600">
                  Para rastrear quais anúncios, palavras-chave e campanhas geram mais conversões e calcular o ROI real.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  2. O que é GCLID?
                </h4>
                <p className="text-sm text-gray-600">
                  Google Click Identifier - um ID único para cada clique que permite rastrear conversões no Google Ads.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  3. Posso usar outro modelo de acompanhamento?
                </h4>
                <p className="text-sm text-gray-600">
                  Sim, mas o modelo fornecido é otimizado para o seu site e Google Analytics 4. Modificações podem quebrar o rastreamento.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  4. Preciso fazer isso em todas as campanhas?
                </h4>
                <p className="text-sm text-gray-600">
                  Configure no nível da conta para aplicar automaticamente a todas as campanhas, ou configure individualmente por campanha.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links Úteis */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <a 
            href="https://ads.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Acessar Google Ads</h4>
                    <p className="text-sm text-gray-600">Configure suas campanhas</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </a>

          <a 
            href="https://analytics.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Google Analytics 4</h4>
                    <p className="text-sm text-gray-600">Veja os dados de rastreamento</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}