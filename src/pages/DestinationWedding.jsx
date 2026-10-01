import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plane, Heart, Globe, Star, CheckCircle, Music, Sparkles, MessageCircle, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function DestinationWedding() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataCasamento: "",
    paisOrigem: "",
    numeroConvidados: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SEO Schema Markup
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Destination Wedding DJ Services",
      "provider": {
        "@type": "Organization",
        "name": "Toca Experience"
      },
      "areaServed": {
        "@type": "City",
        "name": "Trancoso"
      },
      "description": "DJ especializado em destination weddings de luxo em Trancoso. Atendimento internacional, logística completa e experiência musical exclusiva.",
      "offers": {
        "@type": "Offer",
        "price": "15000",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.entities.EventData.create({
        client_name: formData.nome,
        client_email: formData.email,
        client_phone: formData.telefone,
        event_type: "destination_wedding",
        event_date: formData.dataCasamento,
        message: `Destination Wedding - País: ${formData.paisOrigem}. Convidados: ${formData.numeroConvidados}. ${formData.mensagem}`
      });

      
      toast.success("Pedido recebido! Nossa equipe retornará pelo e-mail ou telefone informado.");
      setFormData({ nome: "", email: "", telefone: "", dataCasamento: "", paisOrigem: "", numeroConvidados: "", mensagem: "" });
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Breadcrumbs items={[
        { label: "Casamentos", href: createPageUrl("CasamentosTrancoso") },
        { label: "Destination Wedding Trancoso" }
      ]} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("CasamentosTrancoso")}>
            <Button variant="ghost" className="text-white/80 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Globe className="w-4 h-4" />
              Destination Wedding Experience
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Destination Wedding DJ Luxo em Trancoso
            </h1>
            <p className="text-2xl mb-4 text-blue-100">
              A Trilha Sonora Perfeita para o Seu Casamento dos Sonhos no Paraíso
            </p>
            <p className="text-lg text-white/80">
              Atendimento internacional • Logística completa • Experiência exclusiva
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Por que Trancoso */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Plane className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-4xl font-bold mb-6">Por Que Destination Wedding em Trancoso?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trancoso é o destino dos sonhos para casamentos de luxo. Praias paradisíacas, Quadrado histórico, 
              gastronomia de alto nível e infraestrutura completa para eventos exclusivos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Cenário Paradisíaco",
                desc: "Praias de água cristalina, falésias coloridas e o icônico Quadrado iluminado"
              },
              {
                icon: Star,
                title: "Luxo & Exclusividade",
                desc: "Resorts 5 estrelas, pousadas boutique e locais privativos para eventos"
              },
              {
                icon: Heart,
                title: "Experiência Inesquecível",
                desc: "Sunset na Praia dos Coqueiros, gastronomia renomada e clima tropical"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Serviço Completo */}
        <section className="mb-20 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <Music className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h2 className="text-4xl font-bold mb-4">Serviço Completo para Destination Weddings</h2>
            <p className="text-xl text-gray-600">Do planejamento à execução, cuidamos de cada detalhe musical</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Consultoria Musical Internacional",
                items: [
                  "Reuniões por videochamada em inglês, português ou espanhol",
                  "Curadoria musical personalizada para cada momento",
                  "Playlist colaborativa com sugestões dos noivos",
                  "Coordenação com wedding planner e fornecedores"
                ]
              },
              {
                title: "Logística & Infraestrutura",
                items: [
                  "Equipamento Pioneer de última geração",
                  "Sistema de som dimensionado para o local",
                  "Iluminação ambiente LED personalizada",
                  "Técnico de som dedicado durante todo o evento",
                  "Backup completo de equipamento"
                ]
              },
              {
                title: "Experiência Musical Exclusiva",
                items: [
                  "DJ set de 6-10 horas",
                  "Música ao vivo para cerimônia (opcional)",
                  "Transição suave entre momentos (cerimônia, coquetel, jantar, festa)",
                  "Leitura de público internacional especializada"
                ]
              },
              {
                title: "Suporte & Atendimento",
                items: [
                  "Atendimento em inglês, português e espanhol",
                  "Suporte pré-evento por e-mail",
                  "Cronograma musical detalhado",
                  "Relatório pós-evento com fotos e setlist"
                ]
              }
            ].map((service, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    {service.title}
                  </h3>
                  <div className="space-y-3">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Locais Atendidos */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Locais de Casamento em Trancoso</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { local: "Praia dos Coqueiros", tipo: "Beach Wedding", badge: "Pôr do sol épico" },
              { local: "Quadrado de Trancoso", tipo: "Historic Center", badge: "Romântico" },
              { local: "Praia do Espelho", tipo: "Private Beach", badge: "Exclusivo" },
              { local: "Praia dos Nativos", tipo: "Beachfront", badge: "Sofisticado" },
              { local: "Fazenda São Francisco", tipo: "Farm Wedding", badge: "Rústico Chic" },
              { local: "UXUA Casa Hotel", tipo: "Boutique Hotel", badge: "Premium" },
              { local: "Estrela D'Água", tipo: "Beach Club", badge: "Moderno" },
              { local: "Villas de Trancoso", tipo: "Private Villa", badge: "Intimista" }
            ].map((venue, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold mb-2">{venue.local}</h3>
                  <p className="text-sm text-gray-500 mb-3">{venue.tipo}</p>
                  <Badge variant="outline" className="text-xs">{venue.badge}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Formulário de Orçamento */}
        <section className="max-w-2xl mx-auto">
          <Card className="border-2 border-purple-200">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h2 className="text-3xl font-bold mb-2">Request Your Quote</h2>
                <p className="text-gray-600">Solicite sua Proposta Personalizada</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dw-full-name-nome-completo" className="block text-sm font-medium mb-2">Full Name / Nome Completo *</label>
                    <Input id="dw-full-name-nome-completo"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="dw-email" className="block text-sm font-medium mb-2">Email *</label>
                    <Input id="dw-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dw-phone-whatsapp" className="block text-sm font-medium mb-2">Phone / WhatsApp *</label>
                    <Input id="dw-phone-whatsapp"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="dw-wedding-date-data" className="block text-sm font-medium mb-2">Wedding Date / Data *</label>
                    <Input id="dw-wedding-date-data"
                      required
                      type="date"
                      value={formData.dataCasamento}
                      onChange={(e) => setFormData({...formData, dataCasamento: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dw-country-pais-de-origem" className="block text-sm font-medium mb-2">Country / País de Origem</label>
                    <Input id="dw-country-pais-de-origem"
                      value={formData.paisOrigem}
                      onChange={(e) => setFormData({...formData, paisOrigem: e.target.value})}
                      placeholder="USA, France, UK..."
                    />
                  </div>
                  <div>
                    <label htmlFor="dw-number-of-guests-convidados" className="block text-sm font-medium mb-2">Number of Guests / Convidados</label>
                    <Input id="dw-number-of-guests-convidados"
                      value={formData.numeroConvidados}
                      onChange={(e) => setFormData({...formData, numeroConvidados: e.target.value})}
                      placeholder="Ex: 150"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dw-message-mensagem" className="block text-sm font-medium mb-2">Message / Mensagem</label>
                  <Textarea id="dw-message-mensagem"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                    placeholder="Tell us about your wedding: venue, music style preferences, special requests..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg text-white"
                >
                  {isSubmitting ? "SENDING... / ENVIANDO..." : "REQUEST QUOTE / SOLICITAR ORÇAMENTO"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* CTA Final */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Dream Wedding in Paradise?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Pronto para Planejar Seu Casamento dos Sonhos no Paraíso?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
              >
                Get Quote / Orçamento
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => window.location.href = '/Cotacao'}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Solicitar proposta
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}