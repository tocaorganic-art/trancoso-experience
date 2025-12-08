import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Heart, Music, Sparkles, CheckCircle, Star, Music2, Calendar, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function CasamentosTrancoso() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataCasamento: "",
    localCasamento: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.entities.EventData.create({
        client_name: formData.nome,
        client_email: formData.email,
        client_phone: formData.telefone,
        event_type: "casamento",
        event_date: formData.dataCasamento,
        message: `Local: ${formData.localCasamento}. ${formData.mensagem}`
      });

      const whatsappMessage = encodeURIComponent(`*Orçamento DJ Casamento Trancoso*
      
*Nome:* ${formData.nome}
*Email:* ${formData.email}
*Telefone:* ${formData.telefone}
*Data do Casamento:* ${formData.dataCasamento}
*Local:* ${formData.localCasamento}

*Mensagem:* ${formData.mensagem}`);

      window.open(`https://wa.me/5521972824659?text=${whatsappMessage}`, '_blank');
      
      toast.success("Proposta enviada com sucesso!");
      setFormData({ nome: "", email: "", telefone: "", dataCasamento: "", localCasamento: "", mensagem: "" });
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: "Serviços", href: createPageUrl("Home") + "#servicos" },
        { label: "DJ para Casamento em Trancoso" }
      ]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-16">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm mb-6">
              <Heart className="w-4 h-4" />
              DJ Especializado em Casamentos de Luxo
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              DJ para Casamento em Trancoso
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Música exclusiva e inesquecível para o dia mais especial da sua vida
            </p>
            <p className="text-gray-500">
              Equipamentos Pioneer profissionais • Trilha personalizada • 500 mil+ streams • Experiência internacional
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Por que escolher a Toca Experience */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Por Que Escolher a Toca Experience?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Music2,
                title: "Equipamentos Pioneer de Última Geração",
                description: "CDJ-3000, mixers DJM-V10 e sistema de som profissional para qualidade impecável"
              },
              {
                icon: Sparkles,
                title: "Trilha Sonora Personalizada",
                description: "Consultoria musical completa para criar a atmosfera perfeita em cada momento do seu casamento"
              },
              {
                icon: Star,
                title: "Experiência Internacional",
                description: "Mais de 500 mil streams e apresentações na Polinésia Francesa, Europa e América do Sul"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* O que está incluído */}
        <section className="mb-20 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Está Incluído</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Consultoria musical pré-evento de 2 horas",
              "Equipamento Pioneer profissional (CDJ-3000, DJM-V10)",
              "Sistema de som de alta qualidade para até 300 pessoas",
              "Iluminação ambiente LED personalizada",
              "Playlist personalizada para cerimônia e festa",
              "DJ residente durante todo o evento (6-8 horas)",
              "Backup de equipamento completo",
              "Mixing ao vivo e leitura de público especializada"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Dizem Nossos Noivos</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: "A Toca Experience transformou nosso casamento em algo mágico. Do sunset à pista de dança, cada momento tinha a música perfeita. Nossos convidados ainda comentam!",
                author: "Marina & Pedro",
                event: "Casamento na Praia do Espelho"
              },
              {
                quote: "Profissionalismo impecável. Tony e Enzo entenderam exatamente o que queríamos e superaram todas as expectativas. A energia na festa foi incrível!",
                author: "Juliana & Ricardo",
                event: "Casamento no Quadrado de Trancoso"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.event}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Formulário de Contato */}
        <section className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <h2 className="text-3xl font-bold mb-2">Solicite um Orçamento</h2>
                <p className="text-gray-600">Preencha o formulário e receba uma proposta personalizada em até 2 horas</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                    <Input
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone / WhatsApp *</label>
                    <Input
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Data do Casamento *</label>
                    <Input
                      required
                      type="date"
                      value={formData.dataCasamento}
                      onChange={(e) => setFormData({...formData, dataCasamento: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Local do Casamento</label>
                  <Input
                    value={formData.localCasamento}
                    onChange={(e) => setFormData({...formData, localCasamento: e.target.value})}
                    placeholder="Ex: Praia do Espelho, Quadrado de Trancoso..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem / Detalhes</label>
                  <Textarea
                    value={formData.mensagem}
                    onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                    placeholder="Conte-nos mais sobre seu casamento: número de convidados, estilo musical preferido, horários..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 py-6 text-lg"
                >
                  {isSubmitting ? "ENVIANDO..." : "SOLICITAR ORÇAMENTO"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* FAQ com Schema Markup */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            {[
              {
                q: "Qual o custo de um DJ para casamento em Trancoso?",
                a: "O investimento varia de R$ 8.000 a R$ 25.000, dependendo da duração, equipamentos e serviços adicionais. Entre em contato para um orçamento personalizado considerando data, local e número de convidados."
              },
              {
                q: "Como funciona a logística de som e luz em Trancoso?",
                a: "Cuidamos de toda a logística: transporte de equipamentos Pioneer profissionais, montagem no local, teste de som pré-evento e desmontagem. Incluímos técnico de som durante todo o evento e equipamento backup."
              },
              {
                q: "Quais estilos musicais são mais pedidos em casamentos?",
                a: "Os estilos mais solicitados incluem Organic House, Afro House para o sunset, MPB contemporânea para cerimônia e jantar, e House/Deep House para a pista de dança. Personalizamos a trilha conforme o perfil dos noivos."
              },
              {
                q: "Com quantos meses de antecedência devo contratar?",
                a: "Recomendamos de 6 a 12 meses de antecedência, especialmente para datas de alta temporada em Trancoso (dezembro a março, julho e festas de fim de ano)."
              },
              {
                q: "Vocês atendem casamentos fora de Trancoso?",
                a: "Sim! Atendemos toda a Costa do Descobrimento (Caraíva, Arraial d'Ajuda, Porto Seguro) e realizamos projetos personalizados em outras localidades do Brasil e exterior."
              },
              {
                q: "Qual o tempo de duração do serviço?",
                a: "O padrão é de 6 a 8 horas, podendo ser ajustado conforme a necessidade do evento. Oferecemos pacotes estendidos para casamentos que incluem cerimônia, coquetel, jantar e festa."
              },
              {
                q: "Vocês fornecem equipamento de som completo?",
                a: "Sim, fornecemos equipamento Pioneer profissional completo: CDJ-3000, mixer DJM-V10, caixas de som Funktion-One ou QSC, subwoofers, iluminação LED ambiente e todos os cabos necessários."
              },
              {
                q: "É possível fazer uma consultoria musical antes do casamento?",
                a: "Sim! Incluímos uma consultoria musical de 2 horas para definir playlist, momentos especiais (entrada dos noivos, primeira dança), e entender o perfil musical dos convidados."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Qual o custo de um DJ para casamento em Trancoso?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "O investimento varia de R$ 8.000 a R$ 25.000, dependendo da duração, equipamentos e serviços adicionais."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Como funciona a logística de som e luz em Trancoso?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Cuidamos de toda a logística: transporte de equipamentos Pioneer profissionais, montagem no local, teste de som pré-evento e desmontagem."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Quais estilos musicais são mais pedidos em casamentos?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Os estilos mais solicitados incluem Organic House, Afro House para o sunset, MPB contemporânea para cerimônia e jantar, e House/Deep House para a pista de dança."
                    }
                  }
                ]
              })
            }}
          />
        </section>

        {/* CTA Final */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-12 text-white">
            <Music className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Pronto para Tornar Seu Casamento Inesquecível?</h2>
            <p className="text-xl mb-8 text-pink-100">Entre em contato agora e receba uma proposta personalizada</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-pink-600 hover:bg-gray-100"
                onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar Orçamento
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.open('https://wa.me/5521972824659', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Direto
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}