import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ArrowLeft, Target, TrendingUp, Users, DollarSign, 
  Instagram, CheckCircle, Zap, Star 
} from "lucide-react";
import { motion } from "framer-motion";

export default function CampanhaReveillon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-12 text-white">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("AdminDashboard")}>
            <Button variant="ghost" className="text-white/80 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-bold mb-4">Estratégia de Marketing - Réveillon Trancoso</h1>
            <p className="text-xl text-purple-100">
              Campanha de Conversão: DJ e Aluguel de Som para Residências
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* KPIs e Metas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-600" />
            KPIs e Metas da Campanha
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Tráfego</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">+40%</p>
                <p className="text-gray-600">Aumento no tráfego da página de Cotação</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-green-700 mb-4" />
                <h3 className="text-xl font-bold mb-2">Conversão</h3>
                <p className="text-3xl font-bold text-green-700 mb-2">5%</p>
                <p className="text-gray-600">Taxa de conversão no formulário de Ano Novo</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Star className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Autoridade</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">+5 pts</p>
                <p className="text-gray-600">Aumento na Autoridade do Domínio</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Estratégia de Anúncios */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-orange-600" />
            Estratégia Meta Ads (Instagram/Facebook)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Segmentação */}
            <Card>
              <CardContent className="p-8">
                <Users className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Segmentação de Público</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-2">🎯 Público Principal</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                        <span>Alto poder aquisitivo (renda familiar 30k+)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                        <span>Interesses: Luxo, viagens, destination weddings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                        <span>Idade: 28-55 anos</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">📍 Geolocalização</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                        <span>Primário: Trancoso, Caraíva, Arraial d'Ajuda</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                        <span>Secundário: São Paulo, Rio de Janeiro</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                        <span>Internacional: Miami, NYC, Europa</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Criativos */}
            <Card>
              <CardContent className="p-8">
                <Instagram className="w-10 h-10 text-pink-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Criativos Sugeridos</h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                    <h4 className="font-bold mb-2">🎥 Vídeo 1: "Seu Réveillon Privado"</h4>
                    <p className="text-sm text-gray-600">
                      Drone shot de villa em Trancoso ao pôr do sol → DJ montando setup Pioneer → 
                      Festa iniciando com convidados dançando → Logo final
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Duração: 15-30 segundos</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                    <h4 className="font-bold mb-2">📸 Carrossel 2: "Equipamento Premium"</h4>
                    <p className="text-sm text-gray-600">
                      Slide 1: CDJ-3000 close-up → Slide 2: Setup completo → 
                      Slide 3: Funktion-One speakers → Slide 4: CTA com preços
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                    <h4 className="font-bold mb-2">🎬 Vídeo 3: "Depoimento Cliente"</h4>
                    <p className="text-sm text-gray-600">
                      Cliente satisfeito falando sobre experiência de ter DJ em casa para Réveillon → 
                      B-roll da festa → Logo e CTA
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Budget & Planejamento */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-700" />
            Orçamento e Distribuição
          </h2>

          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Distribuição de Budget</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Meta Ads (Instagram/Facebook)</span>
                      <span className="font-bold text-purple-600">60%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Google Ads (Search)</span>
                      <span className="font-bold text-blue-600">25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Email Marketing</span>
                      <span className="font-bold text-orange-600">10%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Influencer Marketing</span>
                      <span className="font-bold text-green-700">5%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Timeline da Campanha</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 text-white"></div>
                      <div>
                        <p className="font-bold">Semana 1-2 (Nov 25 - Dez 8)</p>
                        <p className="text-sm text-gray-600">Setup de campanha, criação de criativos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 text-white"></div>
                      <div>
                        <p className="font-bold">Semana 3-4 (Dez 9-22)</p>
                        <p className="text-sm text-gray-600">Lançamento da campanha, teste A/B</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-600 mt-2"></div>
                      <div>
                        <p className="font-bold">Semana 5 (Dez 23-31)</p>
                        <p className="text-sm text-gray-600">Otimização final, push de conversão</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Copy para Anúncios */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Copy Sugerido para Anúncios</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-purple-600">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Variação 1: Exclusividade</h3>
                <p className="text-gray-700 mb-4">
                  "🎉 Réveillon Privado em Trancoso com DJ Exclusivo<br/>
                  <br/>
                  ✨ Equipamento Pioneer de última geração<br/>
                  🎵 DJ experiente com 500 mil+ streams<br/>
                  🏖️ Som profissional para sua residência<br/>
                  <br/>
                  👉 Orçamento em 24h. Vagas limitadas!"
                </p>
                <p className="text-xs text-gray-500">CTA: "Pedir Orçamento Agora"</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-pink-600">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Variação 2: Benefícios</h3>
                <p className="text-gray-700 mb-4">
                  "Transforme sua casa em Trancoso no melhor evento de Ano Novo<br/>
                  <br/>
                  ⚡ Setup completo instalado em 2 horas<br/>
                  🎧 CDJ-3000 + Funktion-One<br/>
                  🔧 Suporte técnico durante todo evento<br/>
                  <br/>
                  📲 Solicite sua proposta personalizada"
                </p>
                <p className="text-xs text-gray-500">CTA: "WhatsApp: (21) 97282-4659"</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Próximos Passos */}
        <section>
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Próximos Passos</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <CheckCircle className="w-10 h-10 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">1. Criar Criativos</h3>
                  <p className="text-sm text-white/80">Produzir vídeos e imagens dos 3 criativos sugeridos</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <CheckCircle className="w-10 h-10 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">2. Configurar Pixel</h3>
                  <p className="text-sm text-white/80">Instalar Meta Pixel para rastreamento de conversões</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <CheckCircle className="w-10 h-10 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">3. Lançar Campanha</h3>
                  <p className="text-sm text-white/80">Ativar anúncios no Meta Ads Manager</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to={createPageUrl("EventosAnoNovo")}>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Ver Página de Eventos
                  </Button>
                </Link>
                <Link to={createPageUrl("Cotacao")}>
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    Formulário de Cotação
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}