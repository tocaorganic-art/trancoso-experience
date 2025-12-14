import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, PartyPopper, Sparkles, Share2, X, Instagram } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import EventStoryGenerator from "./EventStoryGenerator";

const TAG_COLORS = {
  "Ano Novo": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Réveillon": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Festival": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Open bar premium": "bg-green-500/20 text-green-300 border-green-500/30",
  "Pacote de festas": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Trancoso": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Caraíva": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Arraial d'Ajuda": "bg-rose-500/20 text-rose-300 border-rose-500/30"
};

const LOCALIDADE_ICONS = {
  "Caraíva": "🏝️",
  "Trancoso": "🌴",
  "Arraial d'Ajuda": "🌊"
};

export default function EventoCard({ evento, index, isReveillon, isDayAfter }) {
  const [showShare, setShowShare] = useState(false);
  const [showStoryGenerator, setShowStoryGenerator] = useState(false);
  const [imageError, setImageError] = useState(false);
  // Parse date correctly to avoid timezone issues
  const [year, month, day] = evento.data.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const dayOfMonth = format(eventDate, "dd");
  const monthName = format(eventDate, "MMM", { locale: ptBR }).toUpperCase();
  const fullDate = format(eventDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  const shareText = `🎉 ${evento.nome}\n📅 ${fullDate}\n📍 ${evento.localidade} - ${evento.local}\n${evento.detalhes || ''}\n\n✨ Réveillon 2025/2026 - Toca Experience`;
  const shareUrl = window.location.href;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText + '\n\n' + shareUrl);
    setShowShare(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card className={`
        bg-[#0A0A0F] border-l-4 overflow-hidden
        hover:shadow-2xl hover:shadow-pink-500/10 hover:scale-[1.01] transition-all duration-300
        ${isReveillon ? 'border-l-yellow-400 ring-1 ring-yellow-500/30' : 
          isDayAfter ? 'border-l-purple-400' : 'border-l-gradient-to-b from-orange-500 to-pink-500'}
        border border-gray-800/50
      `}
      style={{
        borderLeftColor: isReveillon ? '#facc15' : isDayAfter ? '#a855f7' : undefined,
        borderImage: !isReveillon && !isDayAfter ? 'linear-gradient(to bottom, #FF9F40, #F72585) 1' : undefined
      }}
      >
        <CardContent className="p-0">
          {/* Event Image */}
          {evento.imagem && !imageError && (
            <div className="relative w-full h-48 overflow-hidden group">
              <img
                src={`${evento.imagem}?width=800&quality=85&format=webp`}
                alt={`${evento.nome} - ${evento.data} em ${evento.local}, ${evento.localidade}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row">
            {/* Date + Title Header Mobile */}
            <div className="sm:hidden flex items-center gap-3 p-3 border-b border-gray-800/50">
              <div className={`
                w-14 h-14 flex-shrink-0 flex flex-col items-center justify-center rounded-lg
                ${isReveillon ? 'bg-gradient-to-b from-yellow-500/20 to-orange-500/20' : 
                  isDayAfter ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20' :
                  'bg-gradient-to-b from-orange-500/10 to-pink-500/10'}
              `}>
                <span className="text-xl font-bold text-white">{dayOfMonth}</span>
                <span className="text-[10px] text-gray-400 uppercase">{monthName}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <h3 className="font-bold text-white text-base leading-tight truncate">{evento.nome}</h3>
                  {isReveillon && <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
                  {isDayAfter && <PartyPopper className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                </div>
                {evento.status === "A confirmar" && (
                  <Badge variant="outline" className="text-[10px] mt-1 bg-amber-500/10 text-amber-400 border-amber-500/30">
                    A confirmar
                  </Badge>
                )}
              </div>
            </div>

            {/* Date Column Desktop */}
            <div className={`
              hidden sm:flex w-20 flex-shrink-0 flex-col items-center justify-center p-3
              ${isReveillon ? 'bg-gradient-to-b from-yellow-500/20 to-orange-500/20' : 
                isDayAfter ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20' :
                'bg-gradient-to-b from-orange-500/10 to-pink-500/10'}
            `}>
              <span className="text-3xl font-bold text-white">{dayOfMonth}</span>
              <span className="text-xs text-gray-400 uppercase">{monthName}</span>
              {isReveillon && <Sparkles className="w-4 h-4 text-yellow-400 mt-1" />}
              {isDayAfter && <PartyPopper className="w-4 h-4 text-purple-400 mt-1" />}
            </div>

            {/* Content */}
            <div className="flex-1 p-3 sm:p-4">
              {/* Title Desktop */}
              <div className="hidden sm:flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-white text-lg leading-tight tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{evento.nome}</h3>
                {evento.status === "A confirmar" && (
                  <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/30 flex-shrink-0">
                    A confirmar
                  </Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-400 mb-2">
                <div className="flex items-center gap-1">
                  <span>{LOCALIDADE_ICONS[evento.localidade]}</span>
                  <span>{evento.localidade}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate text-xs sm:text-sm">{evento.local}</span>
                </div>
              </div>

              {evento.detalhes && (
                <p className="text-gray-500 text-xs sm:text-sm mb-2 line-clamp-2">{evento.detalhes}</p>
              )}

              {/* Buy Button */}
              {evento.link_compra && (
                <div className="mb-3">
                  <a 
                    href={evento.link_compra} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={`Comprar ingressos para ${evento.nome} com código de desconto toca-organic`}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 hover:from-yellow-600 hover:via-orange-500 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                      size="sm"
                    >
                      🎟️ COMPRE AGORA <span className="text-xs font-normal ml-1">(código: toca-organic)</span>
                    </Button>
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1 flex-1">
                  {evento.tags?.slice(0, 3).map((tag, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className={`text-[10px] sm:text-xs px-1.5 py-0 sm:px-2 sm:py-0.5 ${TAG_COLORS[tag] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {evento.tags?.length > 3 && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-gray-500/20 text-gray-400 border-gray-500/30">
                      +{evento.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                {/* Share Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowShare(!showShare)}
                  className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10 flex-shrink-0"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Share Menu */}
              <AnimatePresence>
                {showShare && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-800/50">
                      <span className="text-[10px] text-gray-500">Compartilhar:</span>
                      <button
                        onClick={handleWhatsApp}
                        className="w-8 h-8 rounded-full bg-green-600/20 hover:bg-green-600/40 flex items-center justify-center transition-colors"
                        title="WhatsApp"
                      >
                        <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </button>
                      <button
                        onClick={handleFacebook}
                        className="w-8 h-8 rounded-full bg-blue-600/20 hover:bg-blue-600/40 flex items-center justify-center transition-colors"
                        title="Facebook"
                      >
                        <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="w-8 h-8 rounded-full bg-gray-600/20 hover:bg-gray-600/40 flex items-center justify-center transition-colors"
                        title="Copiar texto"
                      >
                        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setShowShare(false);
                          setShowStoryGenerator(true);
                        }}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 flex items-center justify-center transition-colors"
                        title="Stories"
                      >
                        <Instagram className="w-4 h-4 text-pink-400" />
                      </button>
                      <button
                        onClick={() => setShowShare(false)}
                        className="ml-auto w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        <X className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Generator Modal */}
      <EventStoryGenerator
        evento={evento}
        isOpen={showStoryGenerator}
        onClose={() => setShowStoryGenerator(false)}
      />
    </motion.div>
  );
}