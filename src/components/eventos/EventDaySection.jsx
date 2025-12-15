import React from "react";
import { Calendar, Sparkles, PartyPopper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EventCard from "./EventCard";

/**
 * EventDaySection - Seção de eventos agrupados por dia
 * 
 * @param {Object} props
 * @param {string} props.date - Data no formato YYYY-MM-DD
 * @param {string} props.weekdayLabel - Rótulo do dia da semana (ex: "sexta-feira, 31 de dezembro")
 * @param {Array} props.events - Array de eventos do dia
 * @param {boolean} props.isReveillon - Se é a noite de réveillon (31/12)
 * @param {boolean} props.isDayAfter - Se é day after (01-02/01)
 */
export default function EventDaySection({ 
  date, 
  weekdayLabel, 
  events = [],
  isReveillon = false,
  isDayAfter = false
}) {
  if (!events || events.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Cabeçalho do Dia */}
      <div className={`
        flex items-center gap-3 mb-6 pb-3 border-b
        ${isReveillon ? 'border-yellow-500/30' : isDayAfter ? 'border-purple-500/30' : 'border-white/10'}
      `}>
        <Calendar className={`w-5 h-5 ${isReveillon ? 'text-yellow-400' : isDayAfter ? 'text-purple-400' : 'text-gray-400'}`} />
        <h2 className="text-xl md:text-2xl font-semibold text-white capitalize">
          {weekdayLabel}
        </h2>
        
        {isReveillon && (
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            <Sparkles className="w-3 h-3 mr-1" /> Noite de Réveillon
          </Badge>
        )}
        
        {isDayAfter && (
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <PartyPopper className="w-3 h-3 mr-1" /> Day After
          </Badge>
        )}
        
        <Badge variant="outline" className="text-gray-400 border-gray-600 ml-auto">
          {events.length} evento{events.length > 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Grid de EventCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {events.map((evento, idx) => (
          <EventCard
            key={evento.id || idx}
            {...evento}
          />
        ))}
      </div>
    </div>
  );
}