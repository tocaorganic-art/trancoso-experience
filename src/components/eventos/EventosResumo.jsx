import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

/**
 * EventosResumo - Bloco resumo de todos os eventos em mini-cards
 * 
 * @param {Object} props
 * @param {Array} props.eventos - Array com todos os eventos
 */
export default function EventosResumo({ eventos = [] }) {
  // Pegar apenas alguns eventos de destaque
  const eventosDestaque = eventos.slice(0, 12);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Todos os Eventos de <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Ano Novo</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trancoso • Caraíva • Arraial d'Ajuda • 26 de Dezembro a 10 de Janeiro
          </p>
        </motion.div>

        {/* Grid de Mini-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {eventosDestaque.map((evento, idx) => {
            const eventDate = new Date(evento.data);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');

            return (
              <motion.div
                key={evento.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all cursor-pointer h-full flex flex-direction-column">
                  {/* Data */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-white">{day}</div>
                      <div className="text-[9px] text-gray-400 uppercase">{month}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                        {evento.nome}
                      </h3>
                    </div>
                  </div>

                  {/* Local */}
                  <div className="flex items-start gap-1 text-xs text-gray-400 mb-2">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{evento.localidade} • {evento.local}</span>
                  </div>

                  {/* Link */}
                  {evento.link_compra && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="w-full text-xs text-yellow-400 hover:text-yellow-300 mt-auto"
                      onClick={() => window.open(evento.link_compra, '_blank')}
                    >
                      Ver ingressos <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA para ver todos */}
        <div className="text-center">
          <Link to={createPageUrl("EventosAnoNovo")}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-8 py-6 rounded-full hover:from-orange-600 hover:to-pink-600 transition-all"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Ver Programação Completa
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}