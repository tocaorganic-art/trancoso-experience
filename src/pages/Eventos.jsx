import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink, PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import EventoCard from "@/components/eventos-ano-novo/EventoCard";

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
            <div className="grid gap-4">
              {eventosAyumar.map((evento, index) => (
                <EventoCard 
                  key={evento.id} 
                  evento={evento} 
                  index={index}
                  isReveillon={evento.data === "2025-12-31"}
                />
              ))}
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