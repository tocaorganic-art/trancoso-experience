import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, CheckCircle2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function PromptManus() {
  const [copied, setCopied] = React.useState(false);

  const promptManus = `═══════════════════════════════════════════════════════════════
PROMPT DE COMANDO ÚNICO PARA AGENTE MANUS
Configuração de Campanha Google Ads - Réveillon Trancoso 2026
═══════════════════════════════════════════════════════════════

## OBJETIVO
Configurar a campanha de Google Ads "Réveillon Trancoso 2026" na conta do usuário (ID: AW-17649743667), seguindo o plano detalhado para venda de ingressos dos eventos Ayumar (Wesley Safadão, Jorge & Mateus, Bell Marques) e Elemental.

## INSTRUÇÕES PARA O AGENTE

1. **Acessar a Conta Google Ads** do usuário (o usuário garantirá o acesso à conta AW-17649743667)
2. **Criar uma nova Campanha de Pesquisa** com o objetivo "Vendas"
3. **Configurar a Campanha** estritamente de acordo com os parâmetros abaixo

═══════════════════════════════════════════════════════════════
PARÂMETROS DE CONFIGURAÇÃO ESSENCIAIS
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│ INFORMAÇÕES BÁSICAS DA CAMPANHA                             │
└─────────────────────────────────────────────────────────────┘

Nome da Campanha: Réveillon Trancoso 2026
Tipo de Campanha: Pesquisa (Search)
Objetivo: Vendas
Estratégia de Lance: Maximizar Conversões
Rede: Somente Pesquisa Google
Idioma: Português (Brasil)

┌─────────────────────────────────────────────────────────────┐
│ URLs                                                         │
└─────────────────────────────────────────────────────────────┘

URL Final: https://tocaexperience.com.br/EventosAnoNovo
URL de Exibição: tocaexperience.com.br

┌─────────────────────────────────────────────────────────────┐
│ ORÇAMENTO                                                    │
└─────────────────────────────────────────────────────────────┘

Orçamento Diário: R$ 15,00
CPC Máximo: R$ 0,30
Gasto Estimado Total: R$ 195,00 (13 dias)

┌─────────────────────────────────────────────────────────────┐
│ PERÍODO                                                      │
└─────────────────────────────────────────────────────────────┘

Data de Início: 16/12/2025
Data de Término: 28/12/2025
Duração: 13 dias

┌─────────────────────────────────────────────────────────────┐
│ LOCALIZAÇÃO (6 Cidades)                                     │
└─────────────────────────────────────────────────────────────┘

Locais Alvo:
1. Belo Horizonte, MG
2. São Paulo, SP
3. Porto Seguro, BA
4. Trancoso, BA
5. Caraíva, BA
6. Arraial d'Ajuda, BA

┌─────────────────────────────────────────────────────────────┐
│ RASTREAMENTO DE CONVERSÕES                                  │
└─────────────────────────────────────────────────────────────┘

ID de Conversão (AW): AW-17649743667/Px_YCKCb3s4bELPuhuBB
URL de Conversão: https://tocaexperience.com.br/Obrigado
Modelo de Rastreamento: {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=reveillon2026

═══════════════════════════════════════════════════════════════
ESTRUTURA DE GRUPOS DE ANÚNCIOS E PALAVRAS-CHAVE
═══════════════════════════════════════════════════════════════

Criar 3 Grupos de Anúncios. As palavras-chave devem ser configuradas conforme a estrutura abaixo, com foco nas novas localizações (Belo Horizonte, São Paulo, Porto Seguro).

┌─────────────────────────────────────────────────────────────┐
│ GRUPO 1: SHOWS NACIONAIS (AYUMAR)                          │
└─────────────────────────────────────────────────────────────┘

Foco Principal: Artistas (Wesley Safadão, Jorge & Mateus, Bell Marques)
URL Final: https://tocaexperience.com.br/EventosAnoNovo

PALAVRAS-CHAVE (Correspondência de Frase):
• "Wesley Safadão Trancoso ingresso"
• "Jorge e Mateus Fly Club"
• "Bell Marques Réveillon Trancoso"
• "Wesley Safadão Réveillon 2026"
• "Jorge e Mateus Trancoso ingresso"

PALAVRAS-CHAVE (Correspondência Exata):
• [Wesley Safadão Trancoso]
• [Jorge e Mateus Trancoso]
• [Bell Marques Trancoso]

PALAVRAS-CHAVE NEGATIVAS:
-letras -videoclipe -biografia -gratis -gratuito -pirata -revenda

┌─────────────────────────────────────────────────────────────┐
│ GRUPO 2: PACOTES DE FESTAS (ELEMENTAL/AYUMAR)              │
└─────────────────────────────────────────────────────────────┘

Foco Principal: Pacotes e Eventos Específicos
URL Final: https://tocaexperience.com.br/EventosAnoNovo

PALAVRAS-CHAVE (Correspondência de Frase):
• "Réveillon Elemental Trancoso 2026"
• "Pacote festas Trancoso"
• "Ingressos Fly Club Trancoso"
• "Réveillon Ayumar Trancoso 2026"
• "Pacote 5 dias Trancoso Réveillon"

PALAVRAS-CHAVE (Correspondência Exata):
• [Pacote festas Trancoso]
• [Ingressos Fly Club Trancoso]

PALAVRAS-CHAVE NEGATIVAS:
-barato -revenda -pirata -esquema -gratuito

┌─────────────────────────────────────────────────────────────┐
│ GRUPO 3: LOCALIZAÇÃO E DATA (GERAL)                        │
└─────────────────────────────────────────────────────────────┘

Foco Principal: Buscas Genéricas e Localização
URL Final: https://tocaexperience.com.br/EventosAnoNovo

PALAVRAS-CHAVE (Correspondência de Frase):
• "Ingressos Réveillon Trancoso 2026"
• "Festa Trancoso Ano Novo"
• "Onde comprar ingresso Réveillon Bahia"
• "Réveillon Trancoso de Belo Horizonte"
• "Pacotes Trancoso São Paulo"

PALAVRAS-CHAVE (Correspondência Exata):
• [Festa Trancoso Ano Novo]
• [Eventos Trancoso Dezembro]

PALAVRAS-CHAVE NEGATIVAS:
-gratis -gratuito -caseiro -em casa

OBSERVAÇÃO: Este grupo deve incluir termos de busca que reflitam a intenção de compra nas cidades de Belo Horizonte, São Paulo e Porto Seguro.

═══════════════════════════════════════════════════════════════
ANÚNCIOS E EXTENSÕES
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│ ANÚNCIOS RESPONSIVOS DE PESQUISA (RSA)                      │
└─────────────────────────────────────────────────────────────┘

TÍTULOS (Fixar os 3 primeiros):
1. ✅ Réveillon Trancoso 2026 - Ingressos Oficiais [FIXAR]
2. ✅ Shows Nacionais: Safadão, J&M, Bell Marques [FIXAR]
3. ✅ Pacotes Ayumar & Elemental - Garanta Já! [FIXAR]
4. Fly Club Trancoso - Festas Premium
5. Últimos Ingressos - Não Perca!
6. Réveillon Exclusivo na Bahia

DESCRIÇÕES (Usar as 3):

Descrição 1:
"Compre seus ingressos oficiais para o Réveillon Ayumar e Elemental em Trancoso. Shows nacionais e festas open bar premium."

Descrição 2:
"Venda de ingressos para os eventos mais exclusivos de Trancoso. Pacotes de 5 dias no Fly Club e Almar."

Descrição 3:
"Não fique de fora! Garanta seu lugar nas festas com Wesley Safadão, Jorge & Mateus e Bell Marques."

┌─────────────────────────────────────────────────────────────┐
│ EXTENSÕES DE SITELINK (4 Links Obrigatórios)               │
└─────────────────────────────────────────────────────────────┘

1. Eventos de Ano Novo → https://tocaexperience.com.br/EventosAnoNovo
2. Solicitar Cotação → https://tocaexperience.com.br/Cotacao
3. DJ para Casamentos → https://tocaexperience.com.br/CasamentosTrancoso
4. Locação de Som → https://tocaexperience.com.br/LocacaoSom

┌─────────────────────────────────────────────────────────────┐
│ EXTENSÕES DE CALLOUT (5 Benefícios Obrigatórios)           │
└─────────────────────────────────────────────────────────────┘

• Open Bar Premium
• Shows Nacionais
• Local Exclusivo
• Pacotes de 5 Dias
• Experiência Única

═══════════════════════════════════════════════════════════════
CHECKLIST DE IMPLEMENTAÇÃO
═══════════════════════════════════════════════════════════════

□ Acessar conta Google Ads AW-17649743667
□ Criar campanha "Réveillon Trancoso 2026"
□ Configurar tipo: Pesquisa (Search) + Objetivo: Vendas
□ Definir orçamento: R$ 15,00/dia + CPC R$ 0,30
□ Configurar datas: 16/12/2025 a 28/12/2025
□ Adicionar 6 localizações (BH, SP, Porto Seguro, Trancoso, Caraíva, Arraial)
□ Criar Grupo 1: Shows Nacionais (Ayumar)
□ Criar Grupo 2: Pacotes de Festas (Elemental/Ayumar)
□ Criar Grupo 3: Localização e Data (Geral)
□ Adicionar palavras-chave (frase + exata) em cada grupo
□ Adicionar palavras-chave negativas em cada grupo
□ Criar anúncios RSA (6 títulos + 3 descrições)
□ Fixar os 3 primeiros títulos
□ Adicionar 4 sitelinks
□ Adicionar 5 callouts
□ Configurar tracking template com UTMs
□ Validar rastreamento de conversão (AW-17649743667/Px_YCKCb3s4bELPuhuBB)
□ Revisar todas as configurações
□ Ativar campanha
□ Monitorar desempenho nas primeiras 48h

═══════════════════════════════════════════════════════════════
MÉTRICAS ESPERADAS
═══════════════════════════════════════════════════════════════

Cliques Diários Estimados: 50 cliques/dia
CTR Alvo: > 3%
Taxa de Conversão Alvo: > 2%
CPA Alvo: < R$ 15,00
ROAS Alvo: > 3:1

═══════════════════════════════════════════════════════════════
ANEXO
═══════════════════════════════════════════════════════════════

O documento completo de configuração (google_ads_configuracao.md) contém todos os detalhes de palavras-chave, descrições de anúncios, palavras-chave negativas e o plano de otimização. O agente deve usá-lo como fonte primária para todos os detalhes não listados neste prompt.

═══════════════════════════════════════════════════════════════
Versão: 2.0 (Atualizada) | Data: 16/12/2025
Status: ✅ PRONTO PARA IMPLEMENTAÇÃO IMEDIATA
═══════════════════════════════════════════════════════════════`;

  const copiarPrompt = () => {
    navigator.clipboard.writeText(promptManus);
    setCopied(true);
    toast.success("Prompt copiado para área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([promptManus], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt_manus_google_ads_reveillon2026.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    toast.success("Arquivo TXT baixado!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link to={createPageUrl("ConfiguracaoGoogleAds")}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Configuração
          </Button>
        </Link>

        <div className="mb-8">
          <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
            🤖 PROMPT PARA AGENTE MANUS
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Comando Único - Google Ads
          </h1>
          <p className="text-gray-600 text-lg">
            Prompt consolidado para implementação automática da campanha Réveillon 2026
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button 
            onClick={copiarPrompt}
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                Copiar Prompt Completo
              </>
            )}
          </Button>
          
          <Button 
            onClick={downloadTxt}
            size="lg"
            variant="outline"
            className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            <Download className="w-5 h-5 mr-2" />
            Baixar TXT
          </Button>
        </div>

        {/* Main Prompt Card */}
        <Card className="mb-8 border-2 border-indigo-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardTitle className="text-2xl">
              📋 Prompt de Comando Completo
            </CardTitle>
            <p className="text-indigo-100 text-sm mt-2">
              Cole este prompt diretamente na interface do agente Manus para configuração automática
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="bg-gray-900 text-green-400 p-6 overflow-x-auto text-xs leading-relaxed whitespace-pre font-mono h-[600px] overflow-y-auto">
              {promptManus}
            </pre>
          </CardContent>
        </Card>

        {/* Quick Reference Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                💰 Orçamento
              </CardTitle>
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
                  <span className="font-bold text-purple-600">R$ 195,00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📅 Período
              </CardTitle>
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
                  <span className="font-bold text-indigo-600">13 dias</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🎯 Grupos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="font-bold text-pink-600">1. Shows Nacionais</div>
                <div className="font-bold text-pink-600">2. Pacotes de Festas</div>
                <div className="font-bold text-pink-600">3. Localização & Data</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Steps */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <CardTitle className="text-green-800">✅ Checklist de Implementação</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Copiar o prompt completo acima</li>
              <li>Acessar a interface do agente Manus</li>
              <li>Colar o prompt na área de comando</li>
              <li>Garantir acesso à conta Google Ads AW-17649743667</li>
              <li>Executar o comando</li>
              <li>Validar todas as configurações criadas</li>
              <li>Ativar a campanha</li>
              <li>Monitorar desempenho nas primeiras 48h</li>
            </ol>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Versão 2.0 | Atualizado em 16/12/2025</p>
          <p className="mt-1">Baseado no documento oficial de configuração Google Ads - Réveillon Trancoso 2026</p>
        </div>
      </div>
    </div>
  );
}