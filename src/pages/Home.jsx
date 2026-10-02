import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Music, Sparkles, Instagram, Facebook, Music2, Link, Headphones } from "lucide-react";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { DsButton, EcosystemHub, HeroCinematic, MarqueeStrip, ServiceGrid, ShareButton, StickyCTA } from "@shared";
import { Building2, ConciergeBell, Disc3 as DiscIcon, Heart, Newspaper as NewsIcon, PartyPopper, Speaker } from "@shared/icons";
import CriticalCSS from "@/components/performance/CriticalCSS";
import DeferredResources from "@/components/performance/DeferredResources";
import PerformanceOptimizer from "@/components/performance/PerformanceOptimizer";
import { useTracking } from "@/components/tracking/TrackingProvider";
import ABTestTracker from "@/components/tracking/ABTestTracker";

// Lazy load non-critical components
const Breadcrumbs = React.lazy(() => import("@/components/seo/Breadcrumbs"));
const PreSaveBanner = React.lazy(() => import("@/components/presave/PreSaveBanner"));
const VideoBackground = React.lazy(() => import("@/components/hero/VideoBackground"));
const FloatingSocialBar = React.lazy(() => import("@/components/layout/FloatingSocialBar"));
const NewsletterPopup = React.lazy(() => import("@/components/layout/NewsletterPopup"));

export default function Home() {
  const { trackFormSubmission } = useTracking();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipoEvento: "",
    data: "",
    orcamento: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [consents, setConsents] = useState({
    privacy: false,
    terms: false,
    marketing: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar consentimentos LGPD
    if (!consents.privacy || !consents.terms) {
      toast.error("Você precisa aceitar a Política de Privacidade e os Termos de Serviço para continuar.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const tipoEventoLabels = {
        casamento: "Casamento",
        aniversario: "Aniversário",
        corporativo: "Evento Corporativo",
        festa_privada: "Festa Privada",
        club: "Club / Boate",
        festival: "Festival",
        sunset: "Sunset / Pool Party",
        reveillon: "Réveillon",
        lancamento: "Lançamento de Produto",
        outro: "Outro"
      };

      const orcamentoLabels = {
        ate_5k: "Até R$ 5.000",
        "5k_10k": "R$ 5.000 - R$ 10.000",
        "10k_20k": "R$ 10.000 - R$ 20.000",
        "20k_50k": "R$ 20.000 - R$ 50.000",
        acima_50k: "Acima de R$ 50.000",
        a_combinar: "A combinar"
      };


      // Grava o lead na entidade EventData (mesmo caminho dos demais formulários do site).
      await base44.entities.EventData.create({
        client_name: formData.nome,
        client_email: formData.email,
        client_phone: formData.telefone,
        event_type: tipoEventoLabels[formData.tipoEvento] || formData.tipoEvento || "não especificado",
        event_date: formData.data || null,
        budget_requested: formData.orcamento || "a_combinar",
        message: `Orçamento: ${orcamentoLabels[formData.orcamento] || "A combinar"}. ${formData.mensagem || ""}`.trim(),
        conversion_status: "pending",
        source: "website"
      });

      // Só chega aqui se o lead foi gravado; o evento não carrega nome, e-mail nem telefone.
      trackFormSubmission(formData);

      toast.success("Pedido recebido!", {
        description: "Nossa equipe retornará pelo e-mail ou telefone informado."
      });

      setTimeout(() => {
        window.location.href = createPageUrl("Obrigado");
      }, 800);
    } catch (error) {
      console.error("Erro ao processar proposta:", error);
      toast.error("Não foi possível enviar seu pedido. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "nome":
        if (!value.trim()) error = "Nome é obrigatório";
        else if (value.trim().length < 3) error = "Nome deve ter pelo menos 3 caracteres";
        break;
      case "email":
        if (!value.trim()) error = "E-mail é obrigatório";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "E-mail inválido";
        break;
      case "telefone":
        if (!value.trim()) error = "Telefone é obrigatório";
        else if (value.replace(/\D/g, "").length < 10) error = "Telefone deve ter pelo menos 10 dígitos";
        break;
      default:
        break;
    }
    return error;
  };

  const handleFieldChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };



  return (
          <div className="min-h-screen bg-white text-gray-800">
              {/* Performance Optimizations */}
              <CriticalCSS />
              <DeferredResources />
              <PerformanceOptimizer />




        {/* Hero cinematográfico (design system compartilhado) */}
        <HeroCinematic
          eyebrow="TRANCOSO · BAHIA"
          title="Experiências que conectam você ao seu"
          titleAccent="próximo destino."
          subtitle="Um ecossistema. Todas as experiências. A vitrine digital dos nossos projetos e serviços: Toca Experience, Toca Concierge, Trancoso Resolve e Trancoso Move."
          background={
            <React.Suspense fallback={null}>
              <VideoBackground />
            </React.Suspense>
          }
          actions={
            <>
              <ABTestTracker testName="CTA Button" element="hero_cta">
                {({ variant, trackClick }) => (
                  <DsButton
                    onClick={() => {
                      trackClick();
                      if (typeof window.gtag_report_conversion === 'function') {
                        window.gtag_report_conversion();
                      }
                      scrollToForm();
                    }}
                  >
                    {variant === 'A' ? 'Solicitar proposta' : 'Agendar consulta'}
                  </DsButton>
                )}
              </ABTestTracker>
              <DsButton variant="ghost-dark" onClick={scrollToAbout}>
                Saiba mais
              </DsButton>
              <ShareButton
                title="TOCA EXPERIENCE"
                text="Um ecossistema. Todas as experiências em Trancoso."
              />
            </>
          }
          shortcuts={[
            { label: "Curadoria", href: createPageUrl("Curadoria"), Icon: NewsIcon },
            { label: "Discografia", href: createPageUrl("Discografia"), Icon: DiscIcon },
            { label: "Locação de som", href: createPageUrl("LocacaoSom"), Icon: Speaker },
          ]}
          scrollTargetId="servicos"
          scrollLabel="Rolar para os serviços"
        />

        <MarqueeStrip
          ariaLabel="Nossos serviços"
          items={[
            "DJ para casamentos",
            "Eventos corporativos",
            "Locação de som",
            "Aluguel de equipamentos",
            "Réveillon em Trancoso",
            "Curadoria musical",
            "Discografia",
          ]}
        />

        <ServiceGrid
          id="servicos"
          eyebrow="O QUE FAZEMOS"
          title="Música e estrutura para cada momento"
          intro="Escolha o serviço e solicite uma proposta."
          items={[
            { id: "casamentos", title: "Casamentos", description: "DJ e trilha sonora para casamentos em Trancoso.", href: createPageUrl("CasamentosTrancoso"), Icon: Heart, featured: true },
            { id: "corporativos", title: "Eventos corporativos", description: "DJ e sonorização para eventos empresariais, lançamentos e confraternizações.", href: createPageUrl("EventosCorporativos"), Icon: Building2 },
            { id: "concierge", title: "Concierge", description: "Experiências privativas completas: concierge, chef, barman, DJ e logística em destinos premium.", href: createPageUrl("Concierge"), Icon: ConciergeBell },
            { id: "som", title: "Locação de som", description: "Aluguel de som profissional para festas e eventos em Trancoso.", href: createPageUrl("LocacaoSom"), Icon: Speaker },
            { id: "reveillon", title: "Réveillon", description: "Festas de Ano Novo em Trancoso, Caraíva e Arraial d'Ajuda.", href: createPageUrl("EventosAnoNovo"), Icon: PartyPopper },
            { id: "curadoria", title: "Curadoria", description: "Sets exclusivos, playlists curadas e o melhor do Afro House e Organic House.", href: createPageUrl("Curadoria"), Icon: NewsIcon },
            { id: "discografia", title: "Discografia", description: "Singles, EPs e remixes de Tony Monteiro e Enzo Furtado.", href: createPageUrl("Discografia"), Icon: DiscIcon },
          ]}
        />

      {/* Pre-Save Banner */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <React.Suspense fallback={<div className="h-64" />}>
            <PreSaveBanner />
          </React.Suspense>
        </div>
      </section>

      {/* About Section - Clean White - Lazy Loaded Content */}
      <section id="sobre" className="py-24 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                Ethos — Nossa Essência
              </span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              A música como <strong className="text-gray-700">linguagem universal</strong> que conecta culturas, gerações e experiências. Cada set é uma jornada cuidadosamente construída para criar momentos únicos e memoráveis.
            </p>
            <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mt-4 px-4">
              Com apresentações em vários países, a Toca Experience leva a energia tropical de Trancoso para palcos internacionais. Fusão entre elementos eletrônicos contemporâneos e <strong className="text-gray-700">brasilidades autênticas</strong>.
            </p>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mt-4 font-medium px-4">
              Lideramos eventos e a união de talentos da cena eletrônica global, sempre com foco na qualidade, inovação sonora e excelência técnica com equipamentos Pioneer de última geração.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Tony Monteiro */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/60 hover:border-gray-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/f6262c8a5_IMG_8909.JPEG?width=128&quality=80"
                  alt="Tony Monteiro - DJ Afro House"
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Tony Monteiro</h3>
                  <p className="text-gray-500">O Refinamento Global</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                O refinamento global é a marca registrada das produções de Tony Monteiro, que transita com maestria entre <strong className="text-gray-800">Afro House, Organic House e House</strong>. Com residências em clubes de elite pelo Brasil e turnês realizadas pela <strong className="text-gray-800">Polinésia Francesa, Europa e América do Sul</strong>, Tony leva sua assinatura sonora a diferentes culturas e pistas ao redor do mundo. Seu projeto <span className="text-gray-700 font-semibold">MPB Rock Club</span> traduz a alma brasileira em batidas sofisticadas, conectando tradição e modernidade em performances únicas. Nas plataformas oficiais, Tony Monteiro consolida-se como presença constante e relevante na cena eletrônica atual.
              </p>

              <div className="flex flex-wrap gap-2">
                <a href="https://www.instagram.com/tonyismusic" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-600 transition-colors" title="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://on.soundcloud.com/YjRNAgQXyfWcPrfAX1" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-colors" title="SoundCloud">
                  <Headphones className="w-5 h-5" />
                </a>
                <a href="https://open.spotify.com/artist/2r4S2RPdfnx7UPL73jJWlQ" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 transition-colors" title="Spotify">
                  <Music2 className="w-5 h-5" />
                </a>
                <a href="https://www.threads.com/@tonyismusic" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors" title="Threads">
                  <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">@</span>
                </a>
                <a href="https://music.apple.com/br/artist/tony-monteiro/373816598" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors" title="Apple Music">
                  <Music className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/share/1D2R3NspD9/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors" title="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://linktr.ee/tocamusiccrew" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-lime-100 text-gray-600 hover:text-lime-600 transition-colors" title="Linktree">
                  <Link className="w-5 h-5" />
                </a>
              </div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* Benefits Section - Experiência Clean */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50/30 to-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Nossos <span className="text-gray-600">Serviços</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Music,
                title: "DJ Sets Exclusivos",
                description: "Performances personalizadas com os melhores equipamentos Pioneer e seleção musical única para seu evento.",
                gradient: "from-gray-600 to-gray-800"
              },
              {
                icon: Globe,
                title: "Eventos em Trancoso",
                description: "Organização completa de eventos em locais paradisíacos com toda infraestrutura necessária.",
                gradient: "from-gray-500 to-gray-700"
              },
              {
                icon: Sparkles,
                title: "Produção Musical",
                description: "Criação de trilhas sonoras personalizadas e remixes exclusivos para tornar seu evento inesquecível.",
                gradient: "from-gray-600 to-gray-800"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-gray-200/60 hover:border-gray-300/80 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all h-full group">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center group-hover:scale-110 transition-all shadow-lg`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hub: marcas e serviços Toca */}
      <EcosystemHub />

      {/* Contact Form - Premium Clean */}
      <section id="contato" className="py-24 bg-gradient-to-br from-white via-gray-50/30 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                  Viva Trancoso
                </span>
                <br />
                <span className="text-gray-800">de um Jeito Único</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Para booking, colaborações e consultas. Preencha o formulário e receba uma proposta personalizada para tornar seu evento inesquecível.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="home-nome-completo" className="block text-sm font-medium text-gray-600 mb-2">Nome Completo *</label>
                  <Input id="home-nome-completo"
                    required
                    value={formData.nome}
                    onChange={(e) => handleFieldChange("nome", e.target.value)}
                    className={`bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-gray-500 ${errors.nome ? "border-red-400" : ""}`}
                    placeholder="Seu nome"
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                </div>
                <div>
                  <label htmlFor="home-e-mail" className="block text-sm font-medium text-gray-600 mb-2">E-mail *</label>
                  <Input id="home-e-mail"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className={`bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-gray-500 ${errors.email ? "border-red-400" : ""}`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="home-telefone-whatsapp" className="block text-sm font-medium text-gray-600 mb-2">Telefone / WhatsApp *</label>
                  <Input id="home-telefone-whatsapp"
                    required
                    value={formData.telefone}
                    onChange={(e) => handleFieldChange("telefone", e.target.value)}
                    className={`bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-gray-500 ${errors.telefone ? "border-red-400" : ""}`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
                </div>
                <div>
                  <label htmlFor="home-tipo-de-evento" className="block text-sm font-medium text-gray-600 mb-2">Tipo de Evento</label>
                  <Select value={formData.tipoEvento} onValueChange={(value) => setFormData({...formData, tipoEvento: value})}>
                    <SelectTrigger id="home-tipo-de-evento" className="bg-gray-50 border-gray-300 text-gray-800">
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casamento">Casamento</SelectItem>
                      <SelectItem value="aniversario">Aniversário</SelectItem>
                      <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                      <SelectItem value="festa_privada">Festa Privada</SelectItem>
                      <SelectItem value="club">Club / Boate</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="sunset">Sunset / Pool Party</SelectItem>
                      <SelectItem value="reveillon">Réveillon</SelectItem>
                      <SelectItem value="lancamento">Lançamento de Produto</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="home-data-sugerida" className="block text-sm font-medium text-gray-600 mb-2">Data Sugerida</label>
                  <Input id="home-data-sugerida"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    className="bg-gray-50 border-gray-300 text-gray-800 focus:border-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="home-orcamento-estimado" className="block text-sm font-medium text-gray-600 mb-2">Orçamento Estimado</label>
                  <Select value={formData.orcamento} onValueChange={(value) => setFormData({...formData, orcamento: value})}>
                    <SelectTrigger id="home-orcamento-estimado" className="bg-gray-50 border-gray-300 text-gray-800">
                      <SelectValue placeholder="Selecione uma faixa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ate_5k">Até R$ 5.000</SelectItem>
                      <SelectItem value="5k_10k">R$ 5.000 - R$ 10.000</SelectItem>
                      <SelectItem value="10k_20k">R$ 10.000 - R$ 20.000</SelectItem>
                      <SelectItem value="20k_50k">R$ 20.000 - R$ 50.000</SelectItem>
                      <SelectItem value="acima_50k">Acima de R$ 50.000</SelectItem>
                      <SelectItem value="a_combinar">A combinar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="home-mensagem-detalhes" className="block text-sm font-medium text-gray-600 mb-2">Mensagem / Detalhes</label>
                <Textarea id="home-mensagem-detalhes"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-gray-500 min-h-[120px]"
                  placeholder="Conte-nos mais sobre seu evento: local, número de convidados, horário desejado..."
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white py-6 text-lg rounded-full shadow-lg transition-all hover:scale-[1.02]"
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR PROPOSTA"}
              </Button>
              </form>
          </motion.div>
        </div>
      </section>

      {/* CTA fixo no celular */}
      <StickyCTA label="Solicitar proposta" onClick={scrollToForm} hideWhenVisible="#contato" />

      {/* Floating Social Bar */}
      <React.Suspense fallback={null}>
        <FloatingSocialBar />
      </React.Suspense>

      {/* Newsletter Popup */}
      <React.Suspense fallback={null}>
        <NewsletterPopup />
      </React.Suspense>
            </div>
      );
      }