import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Music, Sparkles, Instagram, MessageCircle, ChevronDown, Facebook, Music2, Link, Headphones, Calendar, Newspaper, Disc3, PartyPopper, Calendar as CalendarIcon } from "lucide-react";
import LGPDConsent from "@/components/compliance/LGPDConsent";
import { Link as RouterLink } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import VideoBackground from "@/components/hero/VideoBackground";
import OptimizedImage from "@/components/ui/OptimizedImage";
import CriticalCSS from "@/components/performance/CriticalCSS";
import DeferredResources from "@/components/performance/DeferredResources";
import PerformanceOptimizer from "@/components/performance/PerformanceOptimizer";
import { useTracking } from "@/components/tracking/TrackingProvider";
import ABTestTracker from "@/components/tracking/ABTestTracker";
import EventCard from "@/components/eventos/EventCard";

// Lazy load non-critical components
const Breadcrumbs = React.lazy(() => import("@/components/seo/Breadcrumbs"));
const PreSaveBanner = React.lazy(() => import("@/components/presave/PreSaveBanner"));
const FixedLogo = React.lazy(() => import("@/components/layout/FixedLogo"));
const RotatingBanner = React.lazy(() => import("@/components/layout/RotatingBanner"));
const FloatingSocialBar = React.lazy(() => import("@/components/layout/FloatingSocialBar"));
const NewsletterPopup = React.lazy(() => import("@/components/layout/NewsletterPopup"));

export default function Home() {
  const { trackFormSubmission, trackWhatsAppClick } = useTracking();

  // SEO - Reviews Schema
  React.useEffect(() => {
    let reviewSchema = document.querySelector('script[data-schema="reviews"]');
    if (!reviewSchema) {
      reviewSchema = document.createElement('script');
      reviewSchema.type = "application/ld+json";
      reviewSchema.setAttribute('data-schema', 'reviews');
      document.head.appendChild(reviewSchema);
    }
    reviewSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Toca Experience",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Marina & Pedro S." },
          "datePublished": "2024-12-01",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "reviewBody": "Exclusividade em um paraíso. A Toca Experience transformou nosso casamento em Trancoso em algo mágico. A energia da música foi perfeita do sunset até o amanhecer!"
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Carlos R." },
          "datePublished": "2024-11-15",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "reviewBody": "Desde 2015, acompanho a trajetória do Tony. A busca constante pela excelência artística e a energia tropical que ele traz são incomparáveis."
        }
      ]
    });

    return () => {
      if (reviewSchema && reviewSchema.parentNode) {
        reviewSchema.parentNode.removeChild(reviewSchema);
      }
    };
  }, []);
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
      // Mensagem para WhatsApp
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

      const whatsappMessage = `*NOVA PROPOSTA - Toca Experience*

    📋 *DADOS DO CLIENTE:*
    Nome: ${formData.nome}
    Email: ${formData.email}
    Telefone: ${formData.telefone}

    🎉 *EVENTO:*
    Tipo: ${tipoEventoLabels[formData.tipoEvento] || "Não especificado"}
    Data: ${formData.data || "Não informada"}

    💰 *ORÇAMENTO:*
    ${orcamentoLabels[formData.orcamento] || "A combinar"}

    💬 *MENSAGEM:*
    ${formData.mensagem || "Sem mensagem adicional"}`;

      // Salvar dados no localStorage para WhatsApp posterior
      localStorage.setItem('whatsapp_message', whatsappMessage);

      // Enviar evento para dataLayer do GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'form_submission_success',
        'form_name': 'cotacao',
        'event_category': 'Lead',
        'event_label': formData.tipoEvento || 'Não especificado'
      });

      trackFormSubmission(formData);
      trackWhatsAppClick();

      toast.success("Proposta enviada com sucesso!", {
        description: "Redirecionando para página de confirmação..."
      });

      // Redirecionar para página de agradecimento (dispara conversão)
      setTimeout(() => {
        window.location.href = createPageUrl("Obrigado");
      }, 800);
    } catch (error) {
      console.error("Erro ao processar proposta:", error);
      toast.error("Erro ao processar proposta. Tente novamente.");
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
          <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 text-gray-800">
              {/* Performance Optimizations */}
              <CriticalCSS />
              <DeferredResources />
              <PerformanceOptimizer />

              {/* Logo Fixa */}
                        <React.Suspense fallback={<div />}>
                          <FixedLogo />
                        </React.Suspense>

                      {/* Sticky Categories Bar - Acima do Hero */}
                      <div 
                        id="categories-bar"
                        className="sticky top-0 z-50 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border-b border-gray-200 shadow-sm backdrop-blur-sm bg-opacity-95"
                      >
                        <div className="container mx-auto px-4 py-3 pl-16 md:pl-20">
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
              <RouterLink to={createPageUrl("Ethos")}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap"
                >
                  <Sparkles className="mr-1.5 h-4 w-4" /> ETHOS
                </Button>
              </RouterLink>
              <RouterLink to={createPageUrl("Eventos")}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap"
                >
                  <Calendar className="mr-1.5 h-4 w-4" /> EVENTOS
                </Button>
              </RouterLink>
              <RouterLink to={createPageUrl("Curadoria")}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap"
                >
                  <Newspaper className="mr-1.5 h-4 w-4" /> CURADORIA
                </Button>
              </RouterLink>
              <RouterLink to={createPageUrl("Cotacao")}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap"
                >
                  <CalendarIcon className="mr-1.5 h-4 w-4" /> COTAÇÃO
                </Button>
              </RouterLink>
              <RouterLink to={createPageUrl("Discografia")}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap"
                >
                  <Disc3 className="mr-1.5 h-4 w-4" /> DISCOGRAFIA
                </Button>
              </RouterLink>
              <RouterLink to={createPageUrl("EventosAnoNovo")}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap"
                >
                  <PartyPopper className="mr-1.5 h-4 w-4" /> ANO NOVO/TRANCOSO/CARAÍVA/ARRAIAL
                </Button>
              </RouterLink>
              <RouterLink to={createPageUrl("LocacaoSom")}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-xs md:text-sm whitespace-nowrap"
                >
                  <Music className="mr-1.5 h-4 w-4" /> LOCAÇÃO DE SOM
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
          {/* Video Background */}
          <React.Suspense fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300" />
          }>
            <VideoBackground />
          </React.Suspense>

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
            <motion.div
                            id="toca-logo"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="mb-8"
                          >
                            <React.Suspense fallback={<div className="w-full h-32" />}>
                              <RotatingBanner />
                            </React.Suspense>
                          </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-gray-600 mb-4"
            >
              Experiência Exclusiva em <span className="font-semibold bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent">Trancoso</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8"
            >
              Todos os Eventos de Ano Novo em Trancoso, Caraíva e Arraial d'Ajuda
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 w-full max-w-[90vw] md:max-w-[800px] lg:max-w-[900px] mx-auto"
            >
              {/* Grid de EventCards Premium */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <EventCard
                  variant="reveillon"
                  day="26"
                  month="DEZ"
                  title="Réveillon Elemental Trancoso 2026"
                  location="Trancoso • Almar"
                  city="trancoso"
                  tags={["Parte de um pacote", "Atividades imersivas"]}
                  backgroundImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
                  buyLink="https://embedstore.ingresse.com/tickets/www.ingresse.com/event/86204?passkey=toca"
                  onClick={() => window.location.href = createPageUrl("EventosAnoNovo")}
                />
                <EventCard
                  variant="reveillon"
                  day="27"
                  month="DEZ"
                  title="RÉVEILLON AYUMAR PACOTE"
                  location="Trancoso • Fly Club"
                  city="trancoso"
                  tags={["Open Bar Premium", "Pacote 5 Festas"]}
                  backgroundImage="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
                  buyLink="https://comissario.q2ingressos.com.br/events/comissario-reveillon-ayumar-pacote-fly-club14112025102422"
                  status="hot"
                  onClick={() => window.location.href = createPageUrl("EventosAnoNovo")}
                />
                <EventCard
                  variant="afrohouse"
                  day="28"
                  month="DEZ"
                  title="AYUMAR — Wesley Safadão"
                  location="Trancoso • Fly Club"
                  city="trancoso"
                  tags={["Open Bar Premium", "Show Nacional"]}
                  backgroundImage="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
                  buyLink="https://comissario.q2ingressos.com.br/events/comissario-reveillon-ayumar-28-12-2025-fly-club13112025083501"
                  onClick={() => window.location.href = createPageUrl("EventosAnoNovo")}
                />
                <EventCard
                  variant="reveillon"
                  day="30"
                  month="DEZ"
                  title="AYUMAR — Jorge & Mateus"
                  location="Trancoso • Fly Club"
                  city="trancoso"
                  tags={["Open Bar Premium", "Show Nacional"]}
                  backgroundImage="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80"
                  buyLink="https://comissario.q2ingressos.com.br/events/comissario-reveillon-ayumar-29-12-2025-fly-club13112025083723"
                  onClick={() => window.location.href = createPageUrl("EventosAnoNovo")}
                />
                <EventCard
                  variant="reveillon"
                  day="31"
                  month="DEZ"
                  title="AYUMAR — Bell Marques"
                  location="Trancoso • Fly Club"
                  city="trancoso"
                  tags={["Réveillon", "Open Bar Premium"]}
                  backgroundImage="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80"
                  buyLink="https://comissario.q2ingressos.com.br/events/comissario-reveillon-ayumar-yara-fly-club14112025102612"
                  status="hot"
                  onClick={() => window.location.href = createPageUrl("EventosAnoNovo")}
                />
                <EventCard
                  variant="afrohouse"
                  day="02"
                  month="JAN"
                  title="AYUMAR — Grupo Benzadeus"
                  location="Trancoso • Fly Club"
                  city="trancoso"
                  tags={["Day After", "Open Bar Premium"]}
                  backgroundImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
                  buyLink="https://comissario.q2ingressos.com.br/events/comissario-reveillon-ayumar-30-12-2025-fly-club13112025083939"
                  onClick={() => window.location.href = createPageUrl("EventosAnoNovo")}
                />
              </div>

              <div className="text-center mt-6">
                <RouterLink to={createPageUrl("EventosAnoNovo")}>
                  <Button 
                    variant="outline"
                    className="bg-white/15 backdrop-blur-xl border-2 border-white/25 text-gray-800 font-semibold px-8 py-4 rounded-full shadow-xl hover:bg-white/25 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] transition-all"
                  >
                    Ver Todos os Eventos de Ano Novo
                  </Button>
                </RouterLink>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex items-center justify-center mb-12"
            >
              <OptimizedImage
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/e3f5d6cf3_LOGO_VERT_POSIT.png"
                alt="Tony Monteiro Logo"
                width={120}
                height={120}
                className="w-[80px] md:w-[100px] lg:w-[120px]"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <ABTestTracker testName="CTA Button" element="hero_cta">
                {({ variant, trackClick, trackConversion }) => (
                  <Button 
                    onClick={() => {
                      trackClick();
                      scrollToForm();
                    }}
                    className="bg-white/20 backdrop-blur-xl border-2 border-white/30 text-gray-900 font-bold px-8 py-6 text-lg rounded-full shadow-2xl transition-all hover:scale-105 hover:bg-white/30 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.37)]"
                  >
                    {variant === 'A' ? 'SOLICITAR PROPOSTA' : 'AGENDAR CONSULTA'}
                  </Button>
                )}
              </ABTestTracker>
              <Button 
                variant="outline" 
                onClick={scrollToAbout}
                className="bg-white/15 backdrop-blur-xl border-2 border-white/25 text-gray-800 font-semibold px-6 py-6 text-lg rounded-full shadow-xl hover:bg-white/25 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] transition-all"
              >
                SAIBA MAIS <ChevronDown className="ml-2 h-5 w-5" />
              </Button>

              <RouterLink to={createPageUrl("Curadoria")}>
                <Button 
                  variant="outline" 
                  className="bg-white/15 backdrop-blur-xl border-2 border-white/25 text-gray-800 font-semibold px-6 py-6 text-lg rounded-full shadow-xl hover:bg-white/25 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] transition-all"
                >
                  <Newspaper className="mr-2 h-5 w-5" /> CURADORIA
                </Button>
              </RouterLink>
              <RouterLink to={createPageUrl("Discografia")}>
                                    <Button 
                                      variant="outline" 
                                      className="bg-white/15 backdrop-blur-xl border-2 border-white/25 text-gray-800 font-semibold px-6 py-6 text-lg rounded-full shadow-xl hover:bg-white/25 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] transition-all"
                                    >
                                      <Disc3 className="mr-2 h-5 w-5" /> DISCOGRAFIA
                                    </Button>
                                  </RouterLink>
                                  <RouterLink to={createPageUrl("EventosAnoNovo")}>
                                    <Button 
                                      variant="outline" 
                                      className="bg-white/15 backdrop-blur-xl border-2 border-white/25 text-gray-800 font-semibold px-6 py-6 text-lg rounded-full shadow-xl hover:bg-white/25 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] transition-all"
                                    >
                                      <PartyPopper className="mr-2 h-5 w-5" /> ANO NOVO
                                    </Button>
                                  </RouterLink>
                                  <RouterLink to={createPageUrl("LocacaoSom")}>
                                    <Button 
                                      variant="outline" 
                                      className="bg-white/15 backdrop-blur-xl border-2 border-white/25 text-gray-800 font-semibold px-6 py-6 text-lg rounded-full shadow-xl hover:bg-white/25 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] transition-all"
                                    >
                                      <Music className="mr-2 h-5 w-5" /> LOCAÇÃO DE SOM
                                    </Button>
                                  </RouterLink>
                                  </motion.div>
              </div>
              </section>

      {/* Pre-Save Banner */}
      <section className="py-12 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
        <div className="container mx-auto px-6">
          <React.Suspense fallback={<div className="h-64" />}>
            <PreSaveBanner />
          </React.Suspense>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                Ethos — Nossa Essência
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
              A música como <strong className="text-gray-700">linguagem universal</strong> que conecta culturas, gerações e experiências. Cada set é uma jornada cuidadosamente construída para criar momentos únicos e memoráveis.
            </p>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed mt-4">
              Com mais de <strong className="text-gray-700">500 mil streams</strong> e apresentações em vários países, a Toca Experience leva a energia tropical de Trancoso para palcos internacionais. Fusão entre elementos eletrônicos contemporâneos e <strong className="text-gray-700">brasilidades autênticas</strong>.
            </p>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mt-4 font-medium">
              Lideramos eventos e a união de talentos da cena eletrônica global, sempre com foco na qualidade, inovação sonora e excelência técnica com equipamentos Pioneer de última geração.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Tony Monteiro */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <OptimizedImage
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/f6262c8a5_IMG_8909.JPEG"
                  alt="Tony Monteiro - DJ Afro House"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Tony Monteiro</h3>
                  <p className="text-gray-500">O Refinamento Global</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                O refinamento global é a marca registrada das produções de Tony Monteiro, que transita com maestria entre <strong className="text-gray-800">Afro House, Organic House e House</strong>. Com residências em clubes de elite pelo Brasil e turnês realizadas pela <strong className="text-gray-800">Polinésia Francesa, Europa e América do Sul</strong>, Tony leva sua assinatura sonora a diferentes culturas e pistas ao redor do mundo. Seu projeto <span className="text-gray-700 font-semibold">MPB Rock Club</span> traduz a alma brasileira em batidas sofisticadas, conectando tradição e modernidade em performances únicas. Com mais de <strong className="text-gray-800">500 mil streams</strong> nas plataformas oficiais, Tony Monteiro consolida-se como presença constante e relevante na cena eletrônica atual.
              </p>

              <div className="flex flex-wrap gap-2">
                <a href="https://wa.me/5521997731321" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors" title="WhatsApp">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/tonyismusic" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-600 transition-colors" title="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://on.soundcloud.com/YjRNAgQXyfWcPrfAX1" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-colors" title="SoundCloud">
                  <Headphones className="w-5 h-5" />
                </a>
                <a href="https://open.spotify.com/artist/2r4S2RPdfnx7UPL73jJWlQ" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors" title="Spotify">
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

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
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
                <Card className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all h-full group">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                    <p className="text-gray-500">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
          >
            O Que Dizem Sobre <span className="text-gray-600">Nós</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Exclusividade em um paraíso. A Toca Experience transformou nosso casamento em Trancoso em algo mágico. A energia da música foi perfeita do sunset até o amanhecer!",
                author: "Marina & Pedro S.",
                role: "Casamento em Trancoso"
              },
              {
                quote: "Desde 2015, acompanho a trajetória do Tony. A busca constante pela excelência artística e a energia tropical que ele traz são incomparáveis.",
                author: "Carlos R.",
                role: "Réveillon em Caraíva"
              },
              {
                quote: "A fusão entre elementos eletrônicos e brasilidades autênticas criou uma atmosfera única no nosso evento. Inovação sonora e conexão global!",
                author: "Amanda L.",
                role: "Festival AWÊ - Arraial"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all"
              >
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="text-gray-800 font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contato" className="py-24 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
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

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Nome Completo *</label>
                  <Input
                    required
                    value={formData.nome}
                    onChange={(e) => handleFieldChange("nome", e.target.value)}
                    className={`bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-gray-500 ${errors.nome ? "border-red-400" : ""}`}
                    placeholder="Seu nome"
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">E-mail *</label>
                  <Input
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
                  <label className="block text-sm font-medium text-gray-600 mb-2">Telefone / WhatsApp *</label>
                  <Input
                    required
                    value={formData.telefone}
                    onChange={(e) => handleFieldChange("telefone", e.target.value)}
                    className={`bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-gray-500 ${errors.telefone ? "border-red-400" : ""}`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Tipo de Evento</label>
                  <Select value={formData.tipoEvento} onValueChange={(value) => setFormData({...formData, tipoEvento: value})}>
                    <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-800">
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
                  <label className="block text-sm font-medium text-gray-600 mb-2">Data Sugerida</label>
                  <Input
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    className="bg-gray-50 border-gray-300 text-gray-800 focus:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Orçamento Estimado</label>
                  <Select value={formData.orcamento} onValueChange={(value) => setFormData({...formData, orcamento: value})}>
                    <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-800">
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
                <label className="block text-sm font-medium text-gray-600 mb-2">Mensagem / Detalhes</label>
                <Textarea
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

      {/* Footer */}
      <footer className="py-12 border-t border-gray-300 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 pb-24">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 font-medium mb-2">
            Toca Experience — Experiências Exclusivas em Trancoso
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Trancoso • Caraíva • Arraial d'Ajuda • Porto Seguro • Brasil
          </p>
          <p className="text-gray-500 text-sm mb-4">
            <a href="mailto:eventos@tocaexperience.com.br" className="hover:text-gray-800 transition-colors">eventos@tocaexperience.com.br</a>
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <a href="https://www.instagram.com/tonyismusic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors" title="Instagram Tony">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/enzofurtado/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors" title="Instagram Enzo">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://wa.me/5521997731321" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors" title="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
          <div className="flex justify-center gap-3 mb-4 text-xs">
            <RouterLink to={createPageUrl("PoliticaPrivacidade")} className="text-gray-500 hover:text-gray-800 underline">
              Política de Privacidade
            </RouterLink>
            <span className="text-gray-400">•</span>
            <RouterLink to={createPageUrl("TermosServico")} className="text-gray-500 hover:text-gray-800 underline">
              Termos de Serviço
            </RouterLink>
            <span className="text-gray-400">•</span>
            <RouterLink to={createPageUrl("AdminDashboard")} className="text-gray-500 hover:text-gray-800 underline">
              Admin
            </RouterLink>
          </div>
          <p className="text-gray-400 text-xs">
            © 2024 Toca Experience. Todos os direitos reservados.
          </p>
        </div>
      </footer>

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