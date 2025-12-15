import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter, Sparkles, PartyPopper, Loader2, ArrowLeft, Users, Music, MessageCircle, CheckCircle, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import EventCard from "@/components/eventos/EventCard";
import EventDaySection from "@/components/eventos/EventDaySection";
import CompartilharTodos from "@/components/eventos-ano-novo/CompartilharTodos";
import ImageGallery from "@/components/eventos/ImageGallery";
import EventFilters from "@/components/eventos/EventFilters";

const MapaEventos = React.lazy(() => import("@/components/eventos-ano-novo/MapaEventos"));
const Breadcrumbs = React.lazy(() => import("@/components/seo/Breadcrumbs"));
const StructuredDataEvents = React.lazy(() => import("@/components/seo/StructuredDataEvents"));

const LOCALIDADES = ["Todas", "Caraíva", "Trancoso", "Arraial d'Ajuda"];
const EVENTOS_POR_PAGINA = 20;

export default function EventosAnoNovo() {
  const [filtros, setFiltros] = useState({
    localidade: "Todas",
    ordenacao: "data_asc",
    mesInicio: "todos",
    mesFim: "todos"
  });
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const { data: eventos = [], isLoading } = useQuery({
    queryKey: ['eventosAnoNovo'],
    queryFn: () => base44.entities.EventoAnoNovo.list('data'),
  });

  // Aplicar filtros
  let eventosFiltrados = eventos;

  // Filtro de localidade
  if (filtros.localidade !== "Todas") {
    eventosFiltrados = eventosFiltrados.filter(e => e.localidade === filtros.localidade);
  }

  // Filtro de mês
  if (filtros.mesInicio !== "todos" || filtros.mesFim !== "todos") {
    eventosFiltrados = eventosFiltrados.filter(e => {
      const [ano, mes] = e.data.split('-');
      const mesNum = parseInt(mes);
      const mesInicio = filtros.mesInicio !== "todos" ? parseInt(filtros.mesInicio) : 1;
      const mesFim = filtros.mesFim !== "todos" ? parseInt(filtros.mesFim) : 12;
      
      // Handle December to January range
      if (mesInicio === 12 && mesFim === 1) {
        return mesNum === 12 || mesNum === 1;
      }
      
      return mesNum >= mesInicio && mesNum <= mesFim;
    });
  }

  // Ordenação
  eventosFiltrados = [...eventosFiltrados].sort((a, b) => {
    switch (filtros.ordenacao) {
      case "data_desc":
        return new Date(b.data) - new Date(a.data);
      case "nome_asc":
        return a.nome.localeCompare(b.nome);
      case "nome_desc":
        return b.nome.localeCompare(a.nome);
      default: // data_asc
        return new Date(a.data) - new Date(b.data);
    }
  });

  // Paginação
  const totalPaginas = Math.ceil(eventosFiltrados.length / EVENTOS_POR_PAGINA);
  const eventosPaginados = eventosFiltrados.slice(0, paginaAtual * EVENTOS_POR_PAGINA);

  const handleFilterChange = (newFilters) => {
    setFiltros(prev => ({ ...prev, ...newFilters }));
    setPaginaAtual(1);
  };

  const carregarMais = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(prev => prev + 1);
    }
  };

  // Count eventos por localidade
  const eventosCount = {
    total: eventos.length,
    ...eventos.reduce((acc, evento) => {
      acc[evento.localidade] = (acc[evento.localidade] || 0) + 1;
      return acc;
    }, {})
  };

  // Agrupar por data (apenas eventos paginados)
  const eventosPorData = eventosPaginados.reduce((acc, evento) => {
    const data = evento.data;
    if (!acc[data]) acc[data] = [];
    acc[data].push(evento);
    return acc;
  }, {});

  const isReveillon = (data) => data === "2025-12-31";
  const isDayAfter = (data) => data === "2026-01-01" || data === "2026-01-02";

  // SEO Optimization - Dynamic meta tags + Schema
  useEffect(() => {
    const totalEventos = eventosFiltrados.length;

    // Title otimizado para palavra-chave alvo
    document.title = `DJ para Réveillon Trancoso Luxo 2025/2026 | ${totalEventos} Eventos Exclusivos`;

    const firstEventImage = eventosPaginados[0]?.imagem || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png";

    // Meta tags otimizadas
    const metaTags = [
      { property: "og:title", content: `DJ Réveillon Trancoso Luxo 2025/2026 | ${totalEventos} Eventos Premium` },
      { property: "og:description", content: `${totalEventos} eventos de Réveillon de alto padrão em Trancoso, Caraíva e Arraial d'Ajuda. DJs internacionais, open bar premium, festas exclusivas.` },
      { property: "og:image", content: firstEventImage },
      { property: "og:url", content: window.location.href },
      { property: "og:type", content: "website" },
      { name: "description", content: `Confira a programação completa e exclusiva do Réveillon 2025! Festas e eventos de Ano Novo em Trancoso, Caraíva e Arraial d'Ajuda. Garanta seus ingressos e viva uma experiência inesquecível.` },
      { name: "keywords", content: "dj reveillon trancoso luxo, festa ano novo trancoso, reveillon caraiva 2026, eventos fim de ano trancoso, festa premium arraial ajuda" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `DJ Réveillon Trancoso Luxo 2025/2026` },
      { name: "twitter:description", content: `${totalEventos} eventos premium de Ano Novo` },
      { name: "twitter:image", content: firstEventImage }
    ];

    metaTags.forEach(tag => {
      const attr = tag.property ? 'property' : 'name';
      const value = tag.property || tag.name;
      let metaTag = document.querySelector(`meta[${attr}="${value}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attr, value);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    // Event Schema Markup para rich snippets
    const eventSchemas = eventosPaginados.slice(0, 5).map(evento => ({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": evento.nome,
      "startDate": evento.data,
      "location": {
        "@type": "Place",
        "name": evento.local,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": evento.localidade,
          "addressRegion": "BA",
          "addressCountry": "BR"
        }
      },
      "image": evento.imagem,
      "description": evento.detalhes,
      "offers": {
        "@type": "Offer",
        "url": evento.link_compra
      }
    }));

    let schemaScript = document.querySelector('script[data-schema="reveillon-events"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-schema', 'reveillon-events');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(eventSchemas);

    return () => {
      if (schemaScript) {
        document.head.removeChild(schemaScript);
      }
    };
  }, [eventosPaginados]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a1f] via-[#0d0d1a] to-[#050510]">
      {/* Structured Data for Events */}
      <React.Suspense fallback={null}>
        <StructuredDataEvents eventos={eventosFiltrados} />
      </React.Suspense>

      {/* Conversion Block - Services CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Serviços Exclusivos para Réveillon
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transforme sua Festa em um Evento Exclusivo
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Contrate Nossos DJs ou Alugue Equipamentos Pioneer para sua Residência!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl("CasamentosTrancoso")}>
                <Button 
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-6"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Contratar DJ para Evento Privado
                </Button>
              </Link>
              
              <Link to={createPageUrl("AluguelEquipamentos")}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6"
                >
                  <Music className="w-5 h-5 mr-2" />
                  Alugar Som Profissional
                </Button>
              </Link>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6"
                onClick={() => window.open('https://wa.me/5521972824659?text=Olá! Gostaria de um orçamento para Réveillon em Trancoso', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Direto
              </Button>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <CheckCircle className="w-8 h-8 mb-3" />
                <h3 className="font-bold mb-2">Equipamento Pioneer Premium</h3>
                <p className="text-sm text-white/80">CDJ-3000, DJM-V10, Funktion-One</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <CheckCircle className="w-8 h-8 mb-3" />
                <h3 className="font-bold mb-2">DJs Experientes</h3>
                <p className="text-sm text-white/80">500 mil+ streams, turnês internacionais</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <CheckCircle className="w-8 h-8 mb-3" />
                <h3 className="font-bold mb-2">Serviço Completo</h3>
                <p className="text-sm text-white/80">Instalação, suporte técnico e backup</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Efeito de brilho - Luxo Moderno */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-bl from-pink-500/10 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-tr from-green-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-b from-[#FF9F40]/20 via-[#F72585]/10 to-transparent py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Réveillon 2025/2026
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Eventos de <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">Ano Novo</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Trancoso • Caraíva • Arraial d'Ajuda
            </p>
            <p className="text-gray-500 text-sm mt-2">
              26 de Dezembro a 10 de Janeiro
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative">
        {/* Breadcrumbs */}
        <React.Suspense fallback={null}>
          <Breadcrumbs items={[
            { label: "Eventos de Ano Novo", page: "EventosAnoNovo" }
          ]} />
        </React.Suspense>

        {/* Mapa Interativo */}
        <div className="mb-8">
          <React.Suspense fallback={
            <Card className="bg-gray-900/50 border-white/10 p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-pink-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Carregando mapa...</p>
            </Card>
          }>
            <MapaEventos 
              onLocalidadeClick={(loc) => setFiltroLocalidade(loc)}
              eventosCount={eventosCount}
            />
          </React.Suspense>
        </div>

        {/* Filtros Avançados */}
        <EventFilters 
          filters={filtros} 
          onFilterChange={handleFilterChange}
          eventCounts={eventosCount}
        />

        {/* Quick Filters + Actions */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setGalleryOpen(true)}
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Galeria ({eventosFiltrados.filter(e => e.imagem).length})
          </Button>

          <CompartilharTodos eventos={eventos} />
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span>Noite de Réveillon (31/12)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            <span>After / Day After (01-02/01)</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(eventosPorData).map(([data, eventosData]) => {
              // Parse date correctly to avoid timezone issues
              const [year, month, day] = data.split('-').map(Number);
              const dateObj = new Date(year, month - 1, day);
              const isRev = isReveillon(data);
              const isDay = isDayAfter(data);

              // Transformar eventos para o formato do EventCard
              const eventosFormatados = eventosData.map(evento => {
                const eventDate = new Date(evento.data);
                const day = eventDate.getDate().toString();
                const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');

                // Determinar variante baseado em tags ou tipo
                let variant = "reveillon";
                if (evento.tags?.includes("Gastronomia")) variant = "gastronomia";
                else if (evento.tags?.includes("Afro House")) variant = "afrohouse";
                else if (evento.tags?.includes("Corporativo")) variant = "corporativo";
                else if (isDay) variant = "afrohouse";

                // Determinar cidade baseado em localidade
                let city = "trancoso";
                if (evento.localidade === "Caraíva") city = "caraiva";
                else if (evento.localidade === "Arraial d'Ajuda") city = "arraial";

                // Extrair highlights das tags
                const highlights = [];
                if (evento.tags?.includes("Open bar premium")) highlights.push("Open Bar Premium");
                if (evento.tags?.includes("Pacote de festas")) highlights.push("Parte de um pacote");
                if (evento.detalhes && !evento.detalhes.startsWith("Festa")) {
                  highlights.push(evento.detalhes.substring(0, 50));
                }

                return {
                  id: evento.id,
                  variant,
                  day,
                  month,
                  title: evento.nome,
                  location: evento.local,
                  city,
                  tags: evento.tags || [],
                  highlights,
                  backgroundImage: evento.imagem,
                  buyLink: evento.link_compra,
                  status: evento.tags?.includes("DJs internacionais") ? "hot" : null
                };
              });

              return (
                <div key={data} className="space-y-3">
                  {/* Date Header */}
                  <div className={`flex items-center gap-2 px-2 ${isRev ? 'text-yellow-400' : isDay ? 'text-purple-400' : 'text-white'}`}>
                    <Calendar className="w-5 h-5" />
                    <h3 className="text-lg font-bold">
                      {format(dateObj, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                    </h3>
                    {isRev && <span className="text-xs bg-yellow-400/20 px-2 py-1 rounded-full">Réveillon</span>}
                    {isDay && <span className="text-xs bg-purple-400/20 px-2 py-1 rounded-full">Day After</span>}
                  </div>

                  {/* Cards - Horizontal Scroll on Mobile */}
                  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent -mx-4 px-4">
                    <div className="flex gap-3 pb-2 min-w-max md:grid md:grid-cols-2 lg:grid-cols-3 md:min-w-0">
                      {eventosFormatados.map((evento) => (
                        <div key={evento.id} className="w-[85vw] max-w-[340px] flex-shrink-0 md:w-auto md:max-w-none">
                          <EventCard {...evento} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
            )}

            {/* Load More Button */}
            {!isLoading && paginaAtual < totalPaginas && (
            <div className="flex justify-center mt-8">
            <Button
              onClick={carregarMais}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
            >
              Carregar Mais Eventos ({eventosFiltrados.length - eventosPaginados.length} restantes)
            </Button>
            </div>
            )}

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <p className="text-3xl font-bold text-white">{eventosFiltrados.length}</p>
                <p className="text-gray-400 text-sm">Eventos Filtrados</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <p className="text-3xl font-bold text-white">{eventos.filter(e => e.status === "A confirmar").length}</p>
                <p className="text-gray-400 text-sm">A Confirmar</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <p className="text-3xl font-bold text-white">{eventos.filter(e => e.tags?.includes("Open bar premium")).length}</p>
                <p className="text-gray-400 text-sm">Open Bar Premium</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <p className="text-3xl font-bold text-white">{eventos.filter(e => e.tags?.includes("Pacote de festas")).length}</p>
                <p className="text-gray-400 text-sm">Pacotes de Festas</p>
              </div>
            </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5 mt-12">
        <p>© 2024 Toca Experience - Eventos de Ano Novo</p>
      </footer>

      {/* Image Gallery Modal */}
      <ImageGallery 
        eventos={eventosFiltrados}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
}