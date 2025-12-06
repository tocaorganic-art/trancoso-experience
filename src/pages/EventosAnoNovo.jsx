import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter, Sparkles, PartyPopper, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import EventoCard from "@/components/eventos-ano-novo/EventoCard";

const LOCALIDADES = ["Todas", "Caraíva", "Trancoso", "Arraial d'Ajuda"];

export default function EventosAnoNovo() {
  const [filtroLocalidade, setFiltroLocalidade] = useState("Todas");

  const { data: eventos = [], isLoading } = useQuery({
    queryKey: ['eventosAnoNovo'],
    queryFn: () => base44.entities.EventoAnoNovo.list('data'),
  });

  const eventosFiltrados = filtroLocalidade === "Todas" 
    ? eventos 
    : eventos.filter(e => e.localidade === filtroLocalidade);

  // Agrupar por data
  const eventosPorData = eventosFiltrados.reduce((acc, evento) => {
    const data = evento.data;
    if (!acc[data]) acc[data] = [];
    acc[data].push(evento);
    return acc;
  }, {});

  const isReveillon = (data) => data === "2025-12-31";
  const isDayAfter = (data) => data === "2026-01-01" || data === "2026-01-02";

  // Dynamic Open Graph meta tags
  useEffect(() => {
    const totalEventos = eventosFiltrados.length;
    
    document.title = `Réveillon 2025/2026 - ${totalEventos} Eventos em Trancoso, Caraíva e Arraial d'Ajuda | Toca Experience`;
    
    const firstEventImage = eventosFiltrados[0]?.imagem || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png";
    
    const metaTags = [
      { property: "og:title", content: `Réveillon 2025/2026 - ${totalEventos} Eventos | Toca Experience` },
      { property: "og:description", content: `Confira ${totalEventos} eventos de Ano Novo em Trancoso, Caraíva e Arraial d'Ajuda. Open bar premium, DJs internacionais e experiências inesquecíveis.` },
      { property: "og:image", content: firstEventImage },
      { property: "og:url", content: window.location.href },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Réveillon 2025/2026 - Toca Experience` },
      { name: "twitter:description", content: `${totalEventos} eventos em Trancoso, Caraíva e Arraial d'Ajuda` },
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
  }, [eventosFiltrados]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a1f] via-[#0d0d1a] to-[#050510]">
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
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center">
          {LOCALIDADES.map((loc) => (
            <Button
              key={loc}
              variant={filtroLocalidade === loc ? "default" : "outline"}
              onClick={() => setFiltroLocalidade(loc)}
              size="sm"
              className={`
                text-xs sm:text-sm
                ${filtroLocalidade === loc 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0' 
                  : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
              `}
            >
              {loc === "Caraíva" && "🏝️ "}
              {loc === "Trancoso" && "🌴 "}
              {loc === "Arraial d'Ajuda" && "🌊 "}
              <span className="hidden sm:inline">{loc}</span>
              <span className="sm:hidden">{loc === "Arraial d'Ajuda" ? "Arraial" : loc === "Todas" ? "Todas" : ""}</span>
            </Button>
          ))}
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
          <div className="space-y-8">
            {Object.entries(eventosPorData).map(([data, eventosData]) => {
              // Parse date correctly to avoid timezone issues
              const [year, month, day] = data.split('-').map(Number);
              const dateObj = new Date(year, month - 1, day);
              const isRev = isReveillon(data);
              const isDay = isDayAfter(data);
              
              return (
                <div key={data}>
                  {/* Data Header */}
                  <div className={`
                    flex items-center gap-3 mb-4 pb-2 border-b
                    ${isRev ? 'border-yellow-500/30' : isDay ? 'border-purple-500/30' : 'border-white/10'}
                  `}>
                    <Calendar className={`w-5 h-5 ${isRev ? 'text-yellow-400' : isDay ? 'text-purple-400' : 'text-gray-400'}`} />
                    <h2 className="text-xl font-semibold text-white">
                      {format(dateObj, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                    </h2>
                    {isRev && (
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        <Sparkles className="w-3 h-3 mr-1" /> Noite de Réveillon
                      </Badge>
                    )}
                    {isDay && (
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        <PartyPopper className="w-3 h-3 mr-1" /> Day After
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-gray-400 border-gray-600 ml-auto">
                      {eventosData.length} evento{eventosData.length > 1 ? 's' : ''}
                    </Badge>
                  </div>

                  {/* Eventos Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {eventosData.map((evento, idx) => (
                      <EventoCard 
                        key={evento.id} 
                        evento={evento} 
                        index={idx}
                        isReveillon={isRev}
                        isDayAfter={isDay}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <p className="text-3xl font-bold text-white">{eventos.length}</p>
            <p className="text-gray-400 text-sm">Total de Eventos</p>
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
    </div>
  );
}