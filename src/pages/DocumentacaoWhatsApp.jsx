import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ArrowLeft, MessageCircle, AlertCircle, CheckCircle, 
  ExternalLink, Copy, Settings, Code 
} from "lucide-react";
import { motion } from "framer-motion";

export default function DocumentacaoWhatsApp() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-12">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("AdminDashboard")}>
            <Button variant="ghost" className="text-white/80 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <MessageCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Configuração WhatsApp Business API</h1>
            <p className="text-xl text-green-100">
              Envio automático de mensagens sem abrir interface
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Status Atual */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Status Atual: Não Configurado</h3>
              <p className="text-yellow-800 text-sm">
                A função backend está criada, mas os secrets necessários ainda não foram configurados. 
                Siga os passos abaixo para ativar o envio automático de WhatsApp.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Opções de Integração */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Opções de Integração</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">WhatsApp Business API (Oficial)</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Solução oficial do Meta para empresas. Mais confiável e escalável.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-700" />
                    <span>Gratuito até 1.000 conversas/mês</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-700" />
                    <span>Número verificado com selo verde</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-700" />
                    <span>Suporte oficial do Meta</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-green-700 hover:bg-green-800"
                  onClick={() => window.open('https://business.facebook.com/wa/manage/phone-numbers/', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Configurar WhatsApp Business
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Twilio WhatsApp API</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Integração rápida através de plataforma terceira. Ideal para começar.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Setup em minutos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Documentação completa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>US$ 0.005 por mensagem</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open('https://www.twilio.com/whatsapp', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver Twilio WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Passo a Passo - WhatsApp Business API */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Passo a Passo: WhatsApp Business API (Recomendado)</h2>
          
          <div className="space-y-6">
            {/* Passo 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Criar Conta Meta Business</h3>
                    <p className="text-gray-600 mb-3">
                      Acesse o Meta Business Suite e crie uma conta empresarial (ou use uma existente).
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('https://business.facebook.com/', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Meta Business Suite
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passo 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Adicionar Número de Telefone</h3>
                    <p className="text-gray-600 mb-3">
                      No Business Suite, vá em "WhatsApp Manager" → "Adicionar número". Você precisará verificar o número via SMS ou ligação.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p className="font-semibold mb-1">⚠️ Requisitos do Número:</p>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Não pode estar registrado no WhatsApp pessoal</li>
                        <li>• Deve ser um número comercial (recomendado)</li>
                        <li>• Pode ser fixo ou móvel</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passo 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Criar App no Meta for Developers</h3>
                    <p className="text-gray-600 mb-3">
                      Crie um app no Meta for Developers e adicione o produto "WhatsApp".
                    </p>
                    <ol className="space-y-2 text-sm text-gray-600 mb-3">
                      <li>1. Acesse developers.facebook.com</li>
                      <li>2. Clique em "Meus Apps" → "Criar App"</li>
                      <li>3. Selecione "Business" como tipo</li>
                      <li>4. Adicione o produto "WhatsApp"</li>
                      <li>5. Vincule o número criado no passo anterior</li>
                    </ol>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('https://developers.facebook.com/apps', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Meta for Developers
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passo 4 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Obter Credenciais (Token e Phone ID)</h3>
                    <p className="text-gray-600 mb-3">
                      No painel do app, navegue até WhatsApp → "API Setup" para obter:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Access Token (Temporário)
                        </p>
                        <p className="text-xs text-gray-600 mb-2">Token de 24 horas para testes iniciais</p>
                        <code className="text-xs bg-white p-2 rounded block break-all">
                          EAAJ...
                        </code>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Phone Number ID
                        </p>
                        <p className="text-xs text-gray-600 mb-2">ID do número de telefone</p>
                        <code className="text-xs bg-white p-2 rounded block">
                          123456789012345
                        </code>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                        <p className="font-semibold text-sm mb-1">⚠️ Token Permanente</p>
                        <p className="text-xs text-gray-600">
                          Para produção, você precisará gerar um "System User Token" permanente em Business Settings → System Users.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passo 5 */}
            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Configurar Secrets no Base44</h3>
                    <p className="text-gray-600 mb-3">
                      Adicione os secrets no painel administrativo da Base44:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-purple-700">WHATSAPP_API_TOKEN</code>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => copyToClipboard('WHATSAPP_API_TOKEN')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600">Cole o Access Token obtido no passo 4</p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-purple-700">WHATSAPP_PHONE_ID</code>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => copyToClipboard('WHATSAPP_PHONE_ID')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600">Cole o Phone Number ID obtido no passo 4</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">📍 Onde adicionar os secrets:</p>
                      <p className="text-xs text-gray-700">
                        Dashboard Base44 → Settings → Environment Variables → Add Secret
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passo 6 */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Testar Integração
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Após configurar os secrets, teste enviando uma cotação pelo site. Você deve receber:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700" />
                        <span>Email em eventos@tocaexperience.com.br</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700" />
                        <span>Mensagem WhatsApp automática (sem abrir interface)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Alternativa Rápida - Twilio */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Alternativa Rápida: Twilio</h2>
          
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Para começar mais rápido, você pode usar Twilio. O código da função backend já está preparado e basta adaptar minimamente:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">1. Criar conta Twilio e obter credenciais</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://www.twilio.com/try-twilio', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Criar Conta Twilio
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">2. Configurar secrets</p>
                  <div className="space-y-2 text-sm">
                    <code className="block bg-white p-2 rounded">TWILIO_ACCOUNT_SID</code>
                    <code className="block bg-white p-2 rounded">TWILIO_AUTH_TOKEN</code>
                    <code className="block bg-white p-2 rounded">TWILIO_WHATSAPP_FROM</code>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">3. Adaptar código da função</p>
                  <p className="text-sm text-gray-600">
                    A função sendWhatsApp.js precisará ser modificada para usar a API do Twilio ao invés da API oficial do Meta.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Custos */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Comparação de Custos</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border">Solução</th>
                  <th className="p-3 text-left border">Custo Setup</th>
                  <th className="p-3 text-left border">Custo por Mensagem</th>
                  <th className="p-3 text-left border">Tier Gratuito</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-semibold">WhatsApp Business API</td>
                  <td className="p-3 border">Gratuito</td>
                  <td className="p-3 border">US$ 0.005 - 0.05*</td>
                  <td className="p-3 border">1.000 conversas/mês</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border font-semibold">Twilio</td>
                  <td className="p-3 border">Gratuito (trial)</td>
                  <td className="p-3 border">US$ 0.005</td>
                  <td className="p-3 border">US$ 15 trial credit</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">360Dialog</td>
                  <td className="p-3 border">€ 49/mês</td>
                  <td className="p-3 border">€ 0.01</td>
                  <td className="p-3 border">-</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-600 mt-2">* Varia por país e tipo de conversa</p>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Possíveis Desafios e Soluções</h2>
          
          <div className="space-y-4">
            <Card className="border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Erro: "Phone number not found"</p>
                    <p className="text-sm text-gray-600">
                      <strong>Solução:</strong> Verifique se o WHATSAPP_PHONE_ID está correto. É o ID do número, não o número de telefone em si.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Erro: "Invalid OAuth access token"</p>
                    <p className="text-sm text-gray-600">
                      <strong>Solução:</strong> Token expirou. Gere um System User Token permanente ao invés de usar o temporário de 24h.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Mensagem não chega ao destinatário</p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Soluções possíveis:</strong>
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Verifique formato do número (deve incluir código do país: 55...)</li>
                      <li>• Confirme que o número não está bloqueado</li>
                      <li>• Aguarde até 24h - número pode estar em período de warming</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Final */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="p-8 text-center">
            <Settings className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="mb-6 text-green-100">
              Siga o passo a passo acima e tenha envio automático de WhatsApp em minutos
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100"
                onClick={() => window.open('https://business.facebook.com/wa/manage/phone-numbers/', '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Configurar WhatsApp Business
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => window.open('https://developers.facebook.com/docs/whatsapp/cloud-api/get-started', '_blank')}
              >
                Ver Documentação Oficial
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}