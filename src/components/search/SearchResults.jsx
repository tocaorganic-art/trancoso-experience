import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink, Ticket, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function SearchResults({ results, isSearching, searchQuery, onClose }) {
  const navigate = useNavigate();

  if (isSearching) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-full left-0 right-0 mt-2 z-50"
      >
        <Card className="bg-gray-900/95 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Buscando eventos...</span>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!searchQuery || searchQuery.trim().length < 2) {
    return null;
  }

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-full left-0 right-0 mt-2 z-50"
      >
        <Card className="bg-gray-900/95 backdrop-blur-xl border-white/10 p-6">
          <p className="text-gray-400 text-center">
            Nenhum evento encontrado para "{searchQuery}"
          </p>
        </Card>
      </motion.div>
    );
  }

  const regionColors = {
    "Trancoso": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "Caraíva": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    "Arraial d'Ajuda": "bg-purple-500/20 text-purple-300 border-purple-500/30"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 z-50"
    >
      <Card className="bg-gray-900/95 backdrop-blur-xl border-white/10 max-h-[500px] overflow-y-auto">
        <div className="p-4 border-b border-white/10">
          <p className="text-sm text-gray-400">
            {results.length} {results.length === 1 ? "evento encontrado" : "eventos encontrados"} para "{searchQuery}"
          </p>
        </div>

        <div className="divide-y divide-white/10">
          <AnimatePresence>
            {results.slice(0, 8).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => {
                  navigate(createPageUrl("EventosAnoNovo"));
                  if (onClose) onClose();
                }}
              >
                <div className="flex gap-4">
                  {/* Imagem */}
                  {event.image && (
                    <div className="flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>
                  )}

                  {/* Informações */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1 truncate">
                      {event.name}
                    </h3>
                    
                    {event.artist && (
                      <p className="text-sm text-gray-400 mb-2">
                        {event.artist}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {event.dateLabel}
                      </Badge>
                      
                      <Badge className={regionColors[event.region] || "bg-gray-500/20 text-gray-300"}>
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.region}
                      </Badge>

                      {event.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(createPageUrl("EventosAnoNovo"));
                          if (onClose) onClose();
                        }}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Ver Detalhes
                      </Button>

                      {event.linkComprar && (
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(event.linkComprar, '_blank');
                          }}
                          className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                        >
                          <Ticket className="w-3 h-3 mr-1" />
                          Comprar
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {results.length > 8 && (
          <div className="p-4 border-t border-white/10 text-center">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate(createPageUrl("EventosAnoNovo"));
                if (onClose) onClose();
              }}
              className="text-gray-400 hover:text-white"
            >
              Ver todos os {results.length} resultados
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
}