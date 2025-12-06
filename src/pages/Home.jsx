import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Music, Sparkles, Instagram, MessageCircle, ChevronDown, Facebook, Music2, Link, Headphones, Calendar, Newspaper, Disc3, PartyPopper, Calendar as CalendarIcon } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import VideoBackground from "@/components/hero/VideoBackground";
import OptimizedImage from "@/components/ui/OptimizedImage";
import CriticalCSS from "@/components/performance/CriticalCSS";
import DeferredResources from "@/components/performance/DeferredResources";
import { useTracking } from "@/components/tracking/TrackingProvider";
import ABTestTracker from "@/components/tracking/ABTestTracker";

// Lazy load non-critical components
const PreSaveBanner = React.lazy(() => import("@/components/presave/PreSaveBanner"));
const StickyPlayer = React.lazy(() => import("@/components/player/StickyPlayer"));
const SmartChatbot = React.lazy(() => import("@/components/ai/SmartChatbot"));
const FixedLogo = React.lazy(() => import("@/components/layout/FixedLogo"));
const RotatingBanner = React.lazy(() => import("@/components/layout/RotatingBanner"));
const FloatingSocialBar = React.lazy(() => import("@/components/layout/FloatingSocialBar"));
const NewsletterPopup = React.lazy(() => import("@/components/layout/NewsletterPopup"));

export default function Home() {
  const { trackFormSubmission, trackWhatsAppClick } = useTracking();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const emailBody = `
Nova proposta recebida via Toca Experience!

📋 DADOS DO CLIENTE:
Nome: ${formData.nome}
E-mail: ${formData.email}
Telefone: ${formData.telefone}

🎉 DETALHES DO EVENTO:
Tipo: ${tipoEventoLabels[formData.tipoEvento] || "Não informado"}
Data: ${formData.data || "Não informada"}
Orçamento: ${orcamentoLabels[formData.orcamento] || "Não informado"}

💬 MENSAGEM:
${formData.mensagem || "Nenhuma mensagem adicional"}

---
Enviado automaticamente pelo site Toca Experience
      `.trim();

      // Monta mensagem para WhatsApp
      const whatsappMessage = encodeURIComponent(`*Nova Proposta - Toca Experience*

*📋 DADOS DO CLIENTE:*
Nome: ${formData.nome}
E-mail: ${formData.email}
Telefone: ${formData.telefone}

*🎉 DETALHES DO EVENTO:*
Tipo: ${tipoEventoLabels[formData.tipoEvento] || "Não informado"}
Data: ${formData.data || "Não informada"}
Orçamento: ${orcamentoLabels[formData.orcamento] || "Não informado"}

*💬 MENSAGEM:*
${formData.mensagem || "Nenhuma mensagem adicional"}`);

      // Rastrear conversão
      trackFormSubmission(formData);

      // Abre WhatsApp com a mensagem
      trackWhatsAppClick();
      window.open(`https://wa.me/5521972824659?text=${whatsappMessage}`, '_blank');

      toast.success("Proposta enviada!", {
        description: "Email enviado e WhatsApp aberto para confirmação."
      });

      setFormData({ nome: "", email: "", telefone: "", tipoEvento: "", data: "", orcamento: "", mensagem: "" });
      setErrors({});
    } catch (error) {
      toast.error("Erro ao preparar proposta. Tente novamente.");
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
              {/* Critical CSS */}
              <CriticalCSS />
              <DeferredResources />

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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Video Background */}
          <VideoBackground />

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
              Paraíso exclusivo para seus eventos. Trancoso é o cenário perfeito para momentos inesquecíveis com a trilha sonora ideal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <div className="w-[280px] md:w-[400px] lg:w-[500px] mx-auto rounded-2xl shadow-xl overflow-hidden">
                                  <OptimizedImage 
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png?width=500&quality=85&format=webp" 
                                    alt="Tony Monteiro & Enzo Furtado" 
                                    className="scale-[1.02]"
                                    containerClassName="w-full h-full"
                                    priority={true}
                                    width="500"
                                    height="500"
                                  />
                                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex items-center justify-center gap-8 md:gap-12 mb-12"
            >
              <img 
                                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/26d2bba55_CpiadeENZOSIMBOLOSEMFUNDO.png?width=120&quality=80&format=webp" 
                                  alt="Enzo Furtado" 
                                  className="w-[80px] md:w-[100px] lg:w-[120px]"
                                  loading="eager"
                                  decoding="async"
                                  width="120"
                                  height="120"
                                />
                                <img 
                                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/e3f5d6cf3_LOGO_VERT_POSIT.png?width=120&quality=80&format=webp" 
                                  alt="Tony Monteiro" 
                                  className="w-[80px] md:w-[100px] lg:w-[120px]"
                                  loading="eager"
                                  decoding="async"
                                  width="120"
                                  height="120"
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
                    className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105"
                  >
                    {variant === 'A' ? 'SOLICITAR PROPOSTA' : 'AGENDAR CONSULTA'}
                  </Button>
                )}
              </ABTestTracker>
              <Button 
                variant="outline" 
                onClick={scrollToAbout}
                className="border-gray-400 text-gray-600 hover:bg-gray-100 px-6 py-6 text-lg rounded-full"
              >
                SAIBA MAIS <ChevronDown className="ml-2 h-5 w-5" />
              </Button>

              <RouterLink to={createPageUrl("Curadoria")}>
                <Button 
                  variant="outline" 
                  className="border-gray-400 text-gray-600 hover:bg-gray-100 px-6 py-6 text-lg rounded-full"
                >
                  <Newspaper className="mr-2 h-5 w-5" /> CURADORIA
                </Button>
              </RouterLink>
              <RouterLink to={createPageUrl("Discografia")}>
                                    <Button 
                                      variant="outline" 
                                      className="border-gray-400 text-gray-600 hover:bg-gray-100 px-6 py-6 text-lg rounded-full"
                                    >
                                      <Disc3 className="mr-2 h-5 w-5" /> DISCOGRAFIA
                                    </Button>
                                  </RouterLink>
                                  <RouterLink to={createPageUrl("EventosAnoNovo")}>
                                    <Button 
                                      variant="outline" 
                                      className="border-gray-400 text-gray-600 hover:bg-gray-100 px-6 py-6 text-lg rounded-full"
                                    >
                                      <PartyPopper className="mr-2 h-5 w-5" /> ANO NOVO
                                    </Button>
                                  </RouterLink>
                                  <RouterLink to={createPageUrl("LocacaoSom")}>
                                    <Button 
                                      variant="outline" 
                                      className="border-gray-400 text-gray-600 hover:bg-gray-100 px-6 py-6 text-lg rounded-full"
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

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Tony Monteiro */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/f6262c8a5_IMG_8909.JPEG?width=64&quality=80&format=webp" 
                                      alt="Tony Monteiro"
                                      className="w-16 h-16 rounded-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                      width="64"
                                      height="64"
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

            {/* Enzo Furtado */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/17f05bd54_1b237d14-f085-43a3-a137-1198713a2146.jpg?width=64&quality=80&format=webp" 
                                      alt="Enzo Furtado"
                                      className="w-16 h-16 rounded-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                      width="64"
                                      height="64"
                                    />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Enzo Furtado</h3>
                  <p className="text-gray-500">A Vibe Orgânica</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Foram cinco anos transformando pistas em <strong className="text-gray-800">Trancoso</strong>, do Zé Barbudo ao Estrela D'Água, marcando presença nos endereços mais desejados do litoral baiano. Há um ano, mudou-se para São Paulo para se aprofundar nos estudos e expandir sua visão musical.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hoje, mais maduro e focado em sua identidade artística, entrega sets que exploram o <strong className="text-gray-800">Afro House</strong> e <span className="text-gray-700">texturas orgânicas</span> capazes de fazer o corpo se mover antes mesmo que a mente compreenda. Uma experiência que conecta ritmo, sensibilidade e presença.
              </p>

              <div className="flex flex-wrap gap-2">
                <a href="https://wa.me/5573999752005" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors" title="WhatsApp">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/enzofurtado/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-600 transition-colors" title="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://open.spotify.com/user/21653dr5mtlrcarl5m7n3vo2i" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors" title="Spotify">
                  <Music2 className="w-5 h-5" />
                </a>
                <a href="https://soundcloud.com/enzofurtado" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-colors" title="SoundCloud">
                  <Headphones className="w-5 h-5" />
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
                quote: "Exclusividade e luxo em um paraíso. A Toca Experience transformou nosso casamento em Trancoso em algo mágico. A energia da música foi perfeita do sunset até o amanhecer!",
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
            <a href="mailto:tocaorganic@gmail.com" className="hover:text-gray-800 transition-colors">tocaorganic@gmail.com</a>
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

      {/* Sticky Player */}
      <React.Suspense fallback={null}>
        <StickyPlayer />
      </React.Suspense>

      {/* Smart AI Chatbot */}
      <React.Suspense fallback={null}>
        <SmartChatbot />
      </React.Suspense>

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