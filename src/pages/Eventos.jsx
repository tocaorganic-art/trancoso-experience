import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink, PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import EventoCard from "@/components/eventos-ano-novo/EventoCard";
import EventCard from "@/components/eventos/EventCard";

export default function Eventos() {
  const { data: eventosAyumar, isLoading } = useQuery({
    queryKey: ['eventos-ayumar'],
    queryFn: async () => {
      const eventos = await base44.entities.EventoAnoNovo.list('data');
      // Filtrar apenas eventos RÉVEILLON AYUMAR
      return eventos.filter(e => e.nome.includes('RÉVEILLON AYUMAR'));
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <Calendar className="w-4 h-4" />
              Eventos Exclusivos
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Eventos
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Casamentos, celebrações e experiências inesquecíveis
            </p>
          </motion.div>
        </div>
      </div>

      {/* Réveillon Ayumar 2026 Section */}
      {eventosAyumar && eventosAyumar.length > 0 && (
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <PartyPopper className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-800">Réveillon Ayumar 2026</h2>
              </div>
              <Link to={createPageUrl("EventosAnoNovo")}>
                <Button variant="outline" size="sm">
                  Ver todos os eventos <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-gray-600 mb-4">
              🎉 Pacote completo de 5 festas no Fly Club Trancoso com open bar premium - 27/12 a 02/01
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {eventosAyumar.map((evento) => {
                const eventDate = new Date(evento.data);
                const day = eventDate.getDate().toString();
                const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
                
                let variant = "reveillon";
                let city = "trancoso";
                
                const highlights = [];
                if (evento.tags?.includes("Open bar premium")) highlights.push("Open Bar Premium");
                if (evento.tags?.includes("Pacote de festas")) highlights.push("Parte de um pacote");
                if (evento.nome.includes("PACOTE")) highlights.push("5 Festas Incluídas");
                
                return (
                  <EventCard
                    key={evento.id}
                    variant={variant}
                    day={day}
                    month={month}
                    title={evento.nome}
                    location={evento.local}
                    city={city}
                    tags={evento.tags || []}
                    highlights={highlights}
                    backgroundImage={evento.imagem}
                    buyLink={evento.link_compra}
                    status={evento.data === "2025-12-31" ? "hot" : null}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* Iframe Container */}
      <div className="w-full" style={{ height: "calc(100vh - 180px)" }}>
        <iframe
          src="https://preview-stellar-rain-252.apps.devlo.ai/casamentos"
          className="w-full h-full border-0"
          title="Eventos Toca Experience"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}