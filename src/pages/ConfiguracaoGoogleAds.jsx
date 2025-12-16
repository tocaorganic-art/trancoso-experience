import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function ConfiguracaoGoogleAds() {
  const [copied, setCopied] = React.useState(false);

  const copiarTexto = (texto) => {
    navigator.clipboard.writeText(texto);
    setCopied(true);
    toast.success("Copiado para área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  const promptCompleto = `PROMPT DE CONFIGURAÇÃO GOOGLE ADS - RÉVEILLON TRANCOSO 2026

OBJETIVO
Configurar a campanha de Google Ads "Réveillon Trancoso 2026" na conta 790-733-7347, seguindo o plano detalhado para venda de ingressos dos eventos Ayumar e Elemental.

INSTRUÇÕES
1. Acessar a Conta Google Ads do usuário
2. Criar uma nova Campanha de Pesquisa com objetivo Vendas
3. Configurar a Campanha de acordo com os parâmetros abaixo

PARÂMETROS ESSENCIAIS DA CAMPANHA

Informações Básicas:
- Nome: Réveillon Trancoso 2026
- Tipo: Pesquisa (Search)
- Objetivo: Vendas
- Estratégia de Lance: Maximizar Conversões
- URL Final: https://tocaexperience.com.br/EventosAnoNovo
- Idioma: Português (Brasil)

Orçamento:
- Diário: R$ 15,00
- CPC Máximo: R$ 0,30
- Total (13 dias): R$ 195,00

Período:
- Início: 16/12/2025
- Término: 28/12/2025

Localizações (6 cidades):
1. Belo Horizonte, MG
2. São Paulo, SP
3. Porto Seguro, BA
4. Trancoso, BA
5. Caraíva, BA
6. Arraial d'Ajuda, BA

Rastreamento:
- ID: 790-733-7347/Px_YCKCb3s4bELPuhuBB
- URL: https://tocaexperience.com.br/Obrigado

GRUPOS DE ANÚNCIOS

Grupo 1: Shows Nacionais (Ayumar)
Palavras-chave frase:
- Wesley Safadão Trancoso ingresso
- Jorge e Mateus Fly Club
- Bell Marques Réveillon Trancoso

Palavras-chave exatas:
- [Wesley Safadão Trancoso]
- [Jorge e Mateus Trancoso]

Negativas: -letras -videoclipe -gratis -pirata

Grupo 2: Pacotes de Festas
Palavras-chave frase:
- Réveillon Elemental Trancoso 2026
- Pacote festas Trancoso
- Ingressos Fly Club Trancoso

Negativas: -barato -revenda -pirata

Grupo 3: Localização e Data
Palavras-chave frase:
- Ingressos Réveillon Trancoso 2026
- Festa Trancoso Ano Novo
- Pacotes Trancoso São Paulo

Negativas: -gratis -caseiro

ANÚNCIOS (Títulos - Fixar os 3 primeiros)
1. Réveillon Trancoso 2026 - Ingressos Oficiais
2. Shows Nacionais: Safadão, J&M, Bell Marques
3. Pacotes Ayumar & Elemental - Garanta Já!
4. Fly Club Trancoso - Festas Premium
5. Últimos Ingressos - Não Perca!
6. Réveillon Exclusivo na Bahia

DESCRIÇÕES
1. Compre seus ingressos oficiais para o Réveillon Ayumar e Elemental em Trancoso. Shows nacionais e festas open bar premium.
2. Venda de ingressos para os eventos mais exclusivos de Trancoso. Pacotes de 5 dias no Fly Club e Almar.
3. Não fique de fora! Garanta seu lugar nas festas com Wesley Safadão, Jorge & Mateus e Bell Marques.

EXTENSÕES
Sitelinks:
- Eventos de Ano Novo -> /EventosAnoNovo
- Solicitar Cotação -> /Cotacao
- DJ para Casamentos -> /CasamentosTrancoso
- Locação de Som -> /LocacaoSom

Callouts:
- Open Bar Premium
- Shows Nacionais
- Local Exclusivo
- Pacotes de 5 Dias
- Experiência Única

MÉTRICAS ESPERADAS
- Cliques Diários: 50
- CTR Alvo: > 3%
- Taxa Conversão: > 2%
- CPA: < R$ 15,00
- ROAS: > 3:1`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to={createPageUrl("Home")}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Configuração Google Ads - Réveillon 2026
          </h1>
          <p className="text-gray-600">
            Prompt completo para implementação da campanha
          </p>
        </div>

        {/* Prompt para Manus */}
        <Card className="mb-8 border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl">🤖 Prompt para Agente Manus</span>
              <div className="flex gap-2">
                <Button 
                  onClick={() => copiarTexto(promptCompleto)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Prompt
                    </>
                  )}
                </Button>
                <Link to={createPageUrl("PromptManus")}>
                  <Button variant="outline">
                    Ver Versão Detalhada <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-xs leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
              {promptCompleto}
            </pre>
          </CardContent>
        </Card>

        {/* Cards de Resumo */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">💰 Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Diário:</span>
                  <span className="font-bold">R$ 15,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CPC Máx:</span>
                  <span className="font-bold">R$ 0,30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total (13 dias):</span>
                  <span className="font-bold text-blue-600">R$ 195,00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">📅 Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Início:</span>
                  <span className="font-bold">16/12/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Término:</span>
                  <span className="font-bold">28/12/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-bold text-purple-600">13 dias</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg">🎯 Conversões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">ID de Conversão:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                    790-733-7347/Px_YCKCb3s4bELPuhuBB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parâmetros Detalhados */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>📍 Localizações Alvo (6 cidades)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Belo Horizonte, MG</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>São Paulo, SP</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Porto Seguro, BA</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Trancoso, BA</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Caraíva, BA</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Arraial d'Ajuda, BA</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔗 URLs Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 font-semibold mb-1">Landing Page:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                    /EventosAnoNovo
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold mb-1">Conversão:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                    /Obrigado
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold mb-1">Sitelinks:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                    /Cotacao, /CasamentosTrancoso, /LocacaoSom
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instruções */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <CardTitle className="text-green-800">✅ Como Usar</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Clique em <strong>"Copiar Prompt"</strong> acima</li>
              <li>Cole no agente Manus ou configure manualmente no Google Ads</li>
              <li>Garanta acesso à conta 790-733-7347</li>
              <li>Siga a estrutura de 3 grupos de anúncios</li>
              <li>Configure extensões (sitelinks + callouts)</li>
              <li>Valide o rastreamento de conversão</li>
              <li>Ative a campanha e monitore nas primeiras 48h</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}