import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink, PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import EventCard from "@/components/eventos/EventCard";

export default function Eventos() {
  const { data: eventosAyumar, isLoading } = useQuery({
    queryKey: ['eventos-ayumar'],
    queryFn: async () => {
      const eventos = await base44.entities.EventoAnoNovo.filter({});
      const ayumarEvents = eventos.filter(e => 
        e.nome.includes("AYUMAR") || e.nome.includes("Ayumar") || e.nome.includes("Elemental")
      );
      return ayumarEvents.sort((a, b) => new Date(a.data) - new Date(b.data));
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
                <h2 className="text-2xl font-bold text-gray-800">Réveillon 2025/2026</h2>
              </div>
              <Link to={createPageUrl("EventosAnoNovo")}>
                <Button variant="outline" size="sm">
                  Ver todos os eventos <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-gray-600 mb-4">
              🎉 Eventos premium em Trancoso com open bar e shows nacionais
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {eventosAyumar.map((evento) => {
                const eventDate = new Date(evento.data);
                const day = eventDate.getDate().toString();
                const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
                
                // Determinar variante baseado no evento
                let variant = "reveillon";
                if (evento.data === "2025-12-31") variant = "reveillon";
                else if (evento.data === "2026-01-01" || evento.data === "2026-01-02") variant = "afrohouse";
                
                // Imagens de festas para os eventos
                const eventImages = {
                  "Elemental": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
                  "PACOTE": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
                  "Wesley": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
                  "Jorge": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
                  "Bell": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
                  "Benzadeus": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
                };
                
                const backgroundImage = Object.keys(eventImages).find(key => evento.nome.includes(key)) 
                  ? eventImages[Object.keys(eventImages).find(key => evento.nome.includes(key))]
                  : "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80";
                
                // Link de compra - com fallback para evento Elemental
                const buyLink = evento.link_compra || 
                  (evento.nome.includes("Elemental") ? "https://embedstore.ingresse.com/tickets/www.ingresse.com/event/86204?passkey=toca" : null);
                
                return (
                  <EventCard
                    key={evento.id}
                    variant={variant}
                    day={day}
                    month={month}
                    title={evento.nome}
                    location={evento.local}
                    city={evento.localidade === "Caraíva" ? "caraiva" : evento.localidade === "Arraial d'Ajuda" ? "arraial" : "trancoso"}
                    tags={evento.tags || []}
                    highlights={evento.detalhes ? [evento.detalhes] : []}
                    backgroundImage={backgroundImage}
                    buyLink={buyLink}
                    status={evento.tags?.includes("DJs internacionais") ? "hot" : null}
                    onClick={() => window.location.href = createPageUrl("EventosAnoNovo")}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      )}


    </div>
  );
}