import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Briefcase, Users, Trophy, Star, CheckCircle, MessageCircle, Building } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function EventosCorporativos() {
  const [formData, setFormData] = useState({
    empresa: "",
    responsavel: "",
    email: "",
    telefone: "",
    tipoEvento: "",
    dataEvento: "",
    numeroParticipantes: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // FAQ Schema
    const faqSchema = document.querySelector('script[data-schema="faq-corporativo"]');
    if (faqSchema) faqSchema.remove();
    
    const newSchema = document.createElement('script');
    newSchema.type = 'application/ld+json';
    newSchema.setAttribute('data-schema', 'faq-corporativo');
    newSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quanto custa contratar DJ para evento corporativo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os valores variam de R$ 10.000 a R$ 50.000+ dependendo do tipo de evento, duração, equipamentos e localização. Entre em contato para orçamento personalizado."
          }
        },
        {
          "@type": "Question",
          "name": "Vocês fornecem equipamento de som e iluminação?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Trabalhamos com equipamentos Pioneer de última geração (CDJ-3000, DJM-V10) e sistemas de som Funktion-One, além de iluminação LED profissional."
          }
        },
        {
          "@type": "Question",
          "name": "É possível customizar o repertório musical?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutamente! Realizamos reuniões de briefing pré-evento para entender o perfil dos participantes e criar uma playlist personalizada que atenda perfeitamente o clima desejado."
          }
        },
        {
          "@type": "Question",
          "name": "Atendem eventos corporativos fora de Trancoso?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Atendemos toda a região da Bahia e também realizamos eventos corporativos em outras cidades mediante consulta de disponibilidade e custos de deslocamento."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a antecedência ideal para reservar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para eventos corporativos, recomendamos contato com pelo menos 60 dias de antecedência para garantir disponibilidade de agenda e tempo adequado para planejamento."
          }
        }
      ]
    });
    document.head.appendChild(newSchema);

    return () => {
      const schema = document.querySelector('script[data-schema="faq-corporativo"]');
      if (schema) schema.remove();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.entities.EventData.create({
        client_name: `${formData.empresa} - ${formData.responsavel}`,
        client_email: formData.email,
        client_phone: formData.telefone,
        event_type: "corporativo",
        event_date: formData.dataEvento,
        message: `Tipo: ${formData.tipoEvento}. Participantes: ${formData.numeroParticipantes}. ${formData.mensagem}`
      });

      const whatsappMessage = encodeURIComponent(`*Orçamento Evento Corporativo*
      
*Empresa:* ${formData.empresa}
*Responsável:* ${formData.responsavel}
*Email:* ${formData.email}
*Telefone:* ${formData.telefone}
*Tipo de Evento:* ${formData.tipoEvento}
*Data:* ${formData.dataEvento}
*Participantes:* ${formData.numeroParticipantes}

*Mensagem:* ${formData.mensagem}`);

      window.open(`https://wa.me/5521972824659?text=${whatsappMessage}`, '_blank');
      
      toast.success("Proposta enviada com sucesso!");
      setFormData({ empresa: "", responsavel: "", email: "", telefone: "", tipoEvento: "", dataEvento: "", numeroParticipantes: "", mensagem: "" });
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
        { label: "Eventos Corporativos" }
      ]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16">
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
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm mb-6">
              <Briefcase className="w-4 h-4" />
              DJ para Eventos Corporativos de Alto Nível
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              DJ para Eventos Corporativos em Trancoso
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Música profissional para confraternizações, lançamentos e convenções empresariais
            </p>
            <p className="text-gray-500">
              Experiência internacional • Repertório customizado • Equipamento Pioneer de última geração
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Tipos de Eventos */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Eventos Corporativos que Atendemos</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Confraternizações", desc: "Festas de fim de ano e celebrações da equipe" },
              { icon: Trophy, title: "Convenções", desc: "Eventos de vendas e premiações" },
              { icon: Star, title: "Lançamentos", desc: "Produtos, serviços e inaugurações" },
              { icon: Building, title: "Team Building", desc: "Atividades de integração e workshops" }
            ].map((tipo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
                      <tipo.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{tipo.title}</h3>
                    <p className="text-gray-600">{tipo.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Diferenciais Corporativos */}
        <section className="mb-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Por Que Empresas Confiam na Toca Experience?</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Profissionalismo Comprovado",
                points: [
                  "Experiência em eventos corporativos de grandes marcas",
                  "Pontualidade e dress code adequado ao evento",
                  "Reuniões de briefing pré-evento incluídas"
                ]
              },
              {
                title: "Flexibilidade Musical",
                points: [
                  "Repertório adaptável ao público corporativo",
                  "Transição suave entre momentos do evento",
                  "Playlist personalizada conforme perfil dos participantes"
                ]
              },
              {
                title: "Infraestrutura Completa",
                points: [
                  "Equipamento Pioneer profissional",
                  "Som e iluminação de qualidade premium",
                  "Técnico de som dedicado durante o evento"
                ]
              },
              {
                title: "Suporte Dedicado",
                points: [
                  "Coordenação com equipe de produção do evento",
                  "Backup de equipamento garantido",
                  "Relatório pós-evento disponível"
                ]
              }
            ].map((diferencial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{diferencial.title}</h3>
                  <div className="space-y-2">
                    {diferencial.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Cases de Sucesso */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Cases de Sucesso</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                empresa: "Tech Summit 2024",
                tipo: "Convenção de Tecnologia",
                participantes: "500+",
                descricao: "Evento de 3 dias com música ambiente durante networking e festa de encerramento."
              },
              {
                empresa: "Lançamento Resort Luxury",
                tipo: "Inauguração",
                participantes: "300",
                descricao: "Sunset party para inauguração de resort 5 estrelas em Trancoso."
              },
              {
                empresa: "Confraternização Fim de Ano",
                tipo: "Festa Corporativa",
                participantes: "200",
                descricao: "Festa temática tropical para multinacional com DJ set de 6 horas."
              }
            ].map((caso, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{caso.empresa}</h3>
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">{caso.tipo}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{caso.participantes} pessoas</span>
                  </div>
                  <p className="text-sm text-gray-600">{caso.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Formulário de Orçamento */}
        <section className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
                <h2 className="text-3xl font-bold mb-2">Solicite um Orçamento Corporativo</h2>
                <p className="text-gray-600">Resposta em até 24 horas úteis com proposta detalhada</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome da Empresa *</label>
                    <Input
                      required
                      value={formData.empresa}
                      onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                      placeholder="Sua empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Responsável *</label>
                    <Input
                      required
                      value={formData.responsavel}
                      onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                      placeholder="Seu nome"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Corporativo *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone *</label>
                    <Input
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Evento *</label>
                    <Select value={formData.tipoEvento} onValueChange={(value) => setFormData({...formData, tipoEvento: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confraternizacao">Confraternização</SelectItem>
                        <SelectItem value="convencao">Convenção/Congresso</SelectItem>
                        <SelectItem value="lancamento">Lançamento de Produto</SelectItem>
                        <SelectItem value="inauguracao">Inauguração</SelectItem>
                        <SelectItem value="team_building">Team Building</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Número de Participantes</label>
                    <Input
                      value={formData.numeroParticipantes}
                      onChange={(e) => setFormData({...formData, numeroParticipantes: e.target.value})}
                      placeholder="Ex: 150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Data do Evento</label>
                  <Input
                    type="date"
                    value={formData.dataEvento}
                    onChange={(e) => setFormData({...formData, dataEvento: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Detalhes do Evento</label>
                  <Textarea
                    value={formData.mensagem}
                    onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                    placeholder="Local, horários, perfil do público, necessidades específicas..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 py-6 text-lg"
                >
                  {isSubmitting ? "ENVIANDO..." : "SOLICITAR PROPOSTA"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mt-20 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Quanto custa contratar DJ para evento corporativo?",
                answer: "Os valores variam de R$ 10.000 a R$ 50.000+ dependendo do tipo de evento, duração, equipamentos e localização. Entre em contato para orçamento personalizado."
              },
              {
                question: "Vocês fornecem equipamento de som e iluminação?",
                answer: "Sim! Trabalhamos com equipamentos Pioneer de última geração (CDJ-3000, DJM-V10) e sistemas de som Funktion-One, além de iluminação LED profissional."
              },
              {
                question: "É possível customizar o repertório musical?",
                answer: "Absolutamente! Realizamos reuniões de briefing pré-evento para entender o perfil dos participantes e criar uma playlist personalizada que atenda perfeitamente o clima desejado."
              },
              {
                question: "Atendem eventos corporativos fora de Trancoso?",
                answer: "Sim! Atendemos toda a região da Bahia e também realizamos eventos corporativos em outras cidades mediante consulta de disponibilidade e custos de deslocamento."
              },
              {
                question: "Qual a antecedência ideal para reservar?",
                answer: "Para eventos corporativos, recomendamos contato com pelo menos 60 dias de antecedência para garantir disponibilidade de agenda e tempo adequado para planejamento."
              }
            ].map((faq, idx) => (
              <Card key={idx} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-white">
            <Briefcase className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Transforme Seu Evento Corporativo</h2>
            <p className="text-xl mb-8 text-indigo-100">Entre em contato e receba uma proposta personalizada</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
                onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar Proposta
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.open('https://wa.me/5521972824659', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}