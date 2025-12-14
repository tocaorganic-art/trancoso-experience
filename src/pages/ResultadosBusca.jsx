import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import EventCard from "@/components/eventos/EventCard";

export default function ResultadosBusca() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: eventos = [], isLoading } = useQuery({
    queryKey: ['eventos-busca'],
    queryFn: () => base44.entities.EventoAnoNovo.list('data'),
  });

  // Filtrar eventos baseado na busca
  const resultados = useMemo(() => {
    if (!query.trim()) return [];

    const searchLower = query.toLowerCase();
    return eventos.filter(evento => {
      const nome = evento.nome?.toLowerCase() || "";
      const local = evento.local?.toLowerCase() || "";
      const localidade = evento.localidade?.toLowerCase() || "";
      const detalhes = evento.detalhes?.toLowerCase() || "";
      const tags = evento.tags?.join(" ").toLowerCase() || "";

      return nome.includes(searchLower) ||
             local.includes(searchLower) ||
             localidade.includes(searchLower) ||
             detalhes.includes(searchLower) ||
             tags.includes(searchLower);
    });
  }, [eventos, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a1f] via-[#0d0d1a] to-[#050510]">
      {/* Efeito de brilho */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-bl from-pink-500/10 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-b from-[#FF9F40]/20 via-[#F72585]/10 to-transparent py-10">
        <div className="container mx-auto px-6">
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
              <Search className="w-4 h-4" />
              Resultados da Busca
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Buscando por: <span className="text-orange-400">"{query}"</span>
            </h1>
            <p className="text-gray-300 text-lg">
              {isLoading ? "Buscando..." : `${resultados.length} evento${resultados.length !== 1 ? 's' : ''} encontrado${resultados.length !== 1 ? 's' : ''}`}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Resultados */}
      <div className="container mx-auto px-6 py-12 relative">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
          </div>
        ) : resultados.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Nenhum evento encontrado</h2>
            <p className="text-gray-400 mb-6">Tente buscar por outros termos ou explore nossa página de eventos</p>
            <Link to={createPageUrl("EventosAnoNovo")}>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                Ver Todos os Eventos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resultados.map((evento) => {
              const eventDate = new Date(evento.data);
              const day = eventDate.getDate().toString();
              const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
              
              let variant = "reveillon";
              if (evento.data === "2025-12-31") variant = "reveillon";
              else if (evento.data === "2026-01-01" || evento.data === "2026-01-02") variant = "afrohouse";
              
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
        )}
      </div>
    </div>
  );
}