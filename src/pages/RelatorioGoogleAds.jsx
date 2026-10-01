import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Circle, AlertTriangle, ExternalLink, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function RelatorioGoogleAds() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Link to={createPageUrl("AdminDashboard")}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 Relatório de Implementação Google Ads
          </h1>
          <p className="text-gray-600">
            Tarefas pendentes para finalizar sua campanha publicitária
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-700" />
                <div>
                  <p className="text-2xl font-bold text-green-900">2</p>
                  <p className="text-sm text-green-700">Concluídas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-900">5</p>
                  <p className="text-sm text-yellow-700">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Circle className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-900">20</p>
                  <p className="text-sm text-blue-700">Leads Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tarefas Concluídas */}
        <Card className="mb-6 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <CheckCircle2 className="w-5 h-5" />
              ✅ Tarefas Concluídas (Código)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-700 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Tag do Google Instalada</p>
                <p className="text-sm text-gray-600">
                  Código gtag.js (G-8HTCZ1069J e AW-17589027735) adicionado ao Layout.js
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-700 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Evento de Conversão Ajustado</p>
                <p className="text-sm text-gray-600">
                  Página Obrigado.js atualizada com evento 'lead_form_submit'
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarefas Pendentes - Google Ads */}
        <Card className="mb-6 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <AlertTriangle className="w-5 h-5" />
              ⚠️ Tarefas Pendentes - Google Ads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Grupo 1: Réveillon */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-lg mb-3">1. Criar Grupo de Anúncios: Réveillon</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Nome do Grupo:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">Réveillon Trancoso 2026</code>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard("Réveillon Trancoso 2026")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Palavras-chave (15):</p>
                  <div className="bg-gray-50 p-3 rounded text-xs space-y-1 max-h-48 overflow-y-auto">
                    <p>DJ Réveillon Trancoso 2026</p>
                    <p>Réveillon em Trancoso com DJ</p>
                    <p>Aluguel de som para Réveillon Trancoso</p>
                    <p>Festa de Ano Novo Trancoso</p>
                    <p>Contratar DJ Réveillon 2026 Trancoso</p>
                    <p>Aluguel de som e iluminação para Réveillon Trancoso</p>
                    <p>Experiência Réveillon Trancoso</p>
                    <p>DJ para Réveillon Caraíva 2026</p>
                    <p>Réveillon Bahia Trancoso DJ</p>
                    <p>Festa de Ano Novo com DJ em Trancoso</p>
                    <p>DJ para festa de Réveillon de luxo</p>
                    <p>Sonorização Réveillon Trancoso</p>
                    <p>DJ eletrônico Réveillon Trancoso</p>
                    <p>Aluguel de som profissional Réveillon Bahia</p>
                    <p>DJ para festa privada Réveillon Trancoso</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="mt-2"
                    onClick={() => copyToClipboard("DJ Réveillon Trancoso 2026\nRéveillon em Trancoso com DJ\nAluguel de som para Réveillon Trancoso\nFesta de Ano Novo Trancoso\nContratar DJ Réveillon 2026 Trancoso\nAluguel de som e iluminação para Réveillon Trancoso\nExperiência Réveillon Trancoso\nDJ para Réveillon Caraíva 2026\nRéveillon Bahia Trancoso DJ\nFesta de Ano Novo com DJ em Trancoso\nDJ para festa de Réveillon de luxo\nSonorização Réveillon Trancoso\nDJ eletrônico Réveillon Trancoso\nAluguel de som profissional Réveillon Bahia\nDJ para festa privada Réveillon Trancoso")}
                  >
                    <Copy className="w-4 h-4 mr-2" /> Copiar Todas
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Criar RSA (Anúncio):</p>
                  <p className="text-xs text-gray-600">Você precisará criar manualmente no Google Ads</p>
                </div>
              </div>
            </div>

            {/* Grupo 2: DJ Eventos Privados */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-3">2. Criar Grupo de Anúncios: DJ Eventos Privados</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Nome do Grupo:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">DJ Eventos Privados</code>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard("DJ Eventos Privados")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Palavras-chave (15):</p>
                  <div className="bg-gray-50 p-3 rounded text-xs space-y-1 max-h-48 overflow-y-auto">
                    <p>DJ para casamento Trancoso</p>
                    <p>DJ profissional Trancoso</p>
                    <p>DJ em Trancoso</p>
                    <p>Festa privada Trancoso</p>
                    <p>Contratar DJ para festa privada em Trancoso</p>
                    <p>DJ profissional para eventos corporativos Trancoso</p>
                    <p>DJ e som para eventos corporativo</p>
                    <p>DJ para micro-eventos Trancoso</p>
                    <p>DJ para eventos de alto padrão Trancoso</p>
                    <p>DJ de luxo para casamento Trancoso</p>
                    <p>Sonorização para casamento Trancoso</p>
                    <p>DJ evento corporativo Porto Seguro</p>
                    <p>DJ para festa de 15 anos Trancoso</p>
                    <p>DJ para eventos em hotéis Trancoso</p>
                    <p>Quanto custa DJ casamento Bahia</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="mt-2"
                    onClick={() => copyToClipboard("DJ para casamento Trancoso\nDJ profissional Trancoso\nDJ em Trancoso\nFesta privada Trancoso\nContratar DJ para festa privada em Trancoso\nDJ profissional para eventos corporativos Trancoso\nDJ e som para eventos corporativo\nDJ para micro-eventos Trancoso\nDJ para eventos de alto padrão Trancoso\nDJ de luxo para casamento Trancoso\nSonorização para casamento Trancoso\nDJ evento corporativo Porto Seguro\nDJ para festa de 15 anos Trancoso\nDJ para eventos em hotéis Trancoso\nQuanto custa DJ casamento Bahia")}
                  >
                    <Copy className="w-4 h-4 mr-2" /> Copiar Todas
                  </Button>
                </div>
              </div>
            </div>

            {/* Grupo 3: Aluguel Equipamentos */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold text-lg mb-3">3. Criar Grupo de Anúncios: Aluguel Equipamentos</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Nome do Grupo:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">Aluguel Equipamentos</code>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard("Aluguel Equipamentos")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-sm font-semibold text-blue-900 mb-2">📝 RSA Completo Disponível</p>
                  <p className="text-xs text-blue-700 mb-3">Use o texto abaixo para criar o anúncio:</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-1">TÍTULOS (fixar posições 1 e 3):</p>
                      <div className="bg-white p-2 rounded text-xs space-y-1">
                        <p><Badge className="bg-green-600">Posição 1</Badge> Aluguel de Som Profissional</p>
                        <p>Locação de Equipamento DJ Pioneer</p>
                        <p><Badge className="bg-green-600">Posição 3</Badge> Peça Seu Orçamento Agora!</p>
                        <p>Iluminação para Festas Trancoso</p>
                        <p>Equipamento Pioneer aluguel Trancoso</p>
                        <p>Som e Iluminação Completa</p>
                        <p>Sonorização de Eventos Trancoso</p>
                        <p>Aluguel de Som Porto Seguro</p>
                        <p>Suporte Técnico Incluso</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-1">DESCRIÇÕES (fixar posições 1 e 2):</p>
                      <div className="bg-white p-2 rounded text-xs space-y-1">
                        <p><Badge className="bg-green-600">Posição 1</Badge> Alugue equipamentos Pioneer (CDJ, Controladoras) e sonorização completa para seu evento em Trancoso. Entrega e instalação inclusas.</p>
                        <p><Badge className="bg-green-600">Posição 2</Badge> Iluminação profissional e sonorização de eventos em Trancoso, Porto Seguro e Arraial d'Ajuda. Qualidade e suporte técnico garantidos.</p>
                        <p>Locação de som e iluminação para festas privadas, casamentos e eventos corporativos. O melhor equipamento para sua experiência.</p>
                        <p>Não arrisque seu evento! Aluguel de equipamentos de DJ e som de alta fidelidade com a Toca Experience. Orçamento rápido.</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-1">URL FINAL:</p>
                      <code className="bg-white px-2 py-1 rounded text-xs">https://www.tocaexperience.com.br/LocacaoSom</code>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-1">CAMINHOS DE EXIBIÇÃO:</p>
                      <code className="bg-white px-2 py-1 rounded text-xs">Aluguel-Som / Pioneer-Trancoso</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Extensão de Formulário */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-lg mb-3">4. Adicionar Extensão de Formulário de Lead</h3>
              
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                  <p className="text-sm font-semibold text-yellow-900 mb-1">⚠️ IMPORTANTE:</p>
                  <p className="text-xs text-yellow-800">Clique em "Ver e aceitar termos" antes de preencher!</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Título:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">Orçamento Rápido e Exclusivo</code>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard("Orçamento Rápido e Exclusivo")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Nome da Empresa:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">Toca Experience</code>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard("Toca Experience")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Descrição:</p>
                  <div className="bg-gray-50 p-3 rounded text-xs mb-2">
                    Receba uma proposta personalizada para DJ, som e iluminação de luxo em Trancoso. Especialistas em Réveillon, Casamentos e Eventos Corporativos. Qualidade Pioneer e curadoria exclusiva.
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard("Receba uma proposta personalizada para DJ, som e iluminação de luxo em Trancoso. Especialistas em Réveillon, Casamentos e Eventos Corporativos. Qualidade Pioneer e curadoria exclusiva.")}
                  >
                    <Copy className="w-4 h-4 mr-2" /> Copiar
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Campos de Contato:</p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    <li>✅ Nome (Pré-preenchido)</li>
                    <li>✅ E-mail (Pré-preenchido)</li>
                    <li>✅ Telefone (Adicionar)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Orçamento */}
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-bold text-lg mb-3">5. Definir Orçamento e Ativar Campanha</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Orçamento Diário Sugerido:</p>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm">R$ 50 - R$ 100/dia</code>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Estratégia de Lance:</p>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm">Maximizar conversões</code>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-xs text-blue-800">
                    💡 <strong>Dica:</strong> Comece com R$ 50/dia e monitore os resultados nos primeiros 7 dias. Ajuste conforme necessário.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gestão de Leads */}
        <Card className="mb-6 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <Circle className="w-5 h-5" />
              🚨 URGENTE: 20 Leads Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <p className="font-semibold text-red-900 mb-2">Leads Prioritários (eventos próximos):</p>
                <ul className="text-sm text-red-800 space-y-2">
                  <li>• <strong>TONY</strong> - Aniversário 20/12/2025 - 50 pessoas - Bahia</li>
                  <li>• <strong>TONY</strong> - Festa Privada 20/12/2025 - 50 pessoas - Trancoso</li>
                  <li>• <strong>TONY MONTEIRO</strong> - Club/Boate 20/12/2025 - 49 pessoas</li>
                  <li>• <strong>antonio</strong> - Casamento 20/12/2025 - 50 pessoas - Trancoso</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Ações Recomendadas:</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>✅ Contactar via WhatsApp: 21 99773-1321</li>
                  <li>✅ Enviar proposta comercial personalizada</li>
                  <li>✅ Atualizar status no Dashboard de "pending" para "contacted"</li>
                  <li>✅ Deletar leads duplicados (testes internos)</li>
                </ul>
              </div>

              <Link to={createPageUrl("AdminDashboard")}>
                <Button className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Dashboard de Leads
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Links Úteis */}
        <Card>
          <CardHeader>
            <CardTitle>🔗 Links Úteis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a 
              href="https://ads.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Google Ads Console
            </a>
            <a 
              href="https://analytics.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Google Analytics
            </a>
            <a 
              href="https://wa.me/5521997731321" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-700 hover:underline text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              WhatsApp Business (Leads)
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}