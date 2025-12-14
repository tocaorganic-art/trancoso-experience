import React from "react";
import { ExternalLink, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * EventCard - Card de evento sofisticado com glassmorphism premium
 * 
 * @param {Object} props
 * @param {string} props.variant - Variante de cor: casamento | reveillon | corporativo | afrohouse | gastronomia
 * @param {string} props.day - Dia do evento (ex: "31")
 * @param {string} props.month - Mês abreviado (ex: "DEZ")
 * @param {string} props.title - Título do evento
 * @param {string} props.location - Localização do evento
 * @param {string} props.city - Cidade: trancoso | caraiva | arraial
 * @param {Array<string>} props.tags - Array de tags do evento
 * @param {Array<string>} props.highlights - Destaques do evento (ex: "Open Bar Premium")
 * @param {string} props.backgroundImage - URL da imagem de fundo (opcional)
 * @param {string} props.buyLink - Link externo para compra de ingressos
 * @param {string} props.status - Status do evento para badge especial
 * @param {Function} props.onClick - Callback ao clicar no card
 */
export default function EventCard({ 
  variant = "reveillon", 
  day, 
  month, 
  title, 
  location, 
  city = "trancoso",
  tags = [],
  highlights = [],
  backgroundImage,
  buyLink,
  status,
  onClick
}) {
  const cardStyle = backgroundImage ? {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};

  const cityColors = {
    trancoso: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    caraiva: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    arraial: "bg-purple-500/20 text-purple-300 border-purple-500/30"
  };

  const cityLabels = {
    trancoso: "🌴 Trancoso",
    caraiva: "🏝️ Caraíva",
    arraial: "🌊 Arraial d'Ajuda"
  };

  const variantBorders = {
    reveillon: "border-l-4 border-yellow-400",
    casamento: "border-l-4 border-pink-500",
    corporativo: "border-l-4 border-purple-500",
    afrohouse: "border-l-4 border-orange-500",
    gastronomia: "border-l-4 border-emerald-500"
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    if (buyLink) {
      window.open(buyLink, '_blank');
    }
  };

  return (
    <div 
      className={`
        relative flex flex-col gap-4 p-5 rounded-3xl
        backdrop-blur-[16px] bg-gray-900/95 border border-gray-700/50
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        cursor-pointer transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)]
        hover:bg-gray-800/95 hover:border-gray-600/60
        overflow-hidden min-h-[240px]
        ${variantBorders[variant]}
        ${backgroundImage ? 'bg-black/80' : ''}
      `}
      style={cardStyle}
      onClick={onClick}
    >
      {/* Header: Data + Cidade */}
      <div className="flex justify-between items-start mb-1">
        <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gray-800/90 backdrop-blur-sm border border-gray-600/50 flex-shrink-0">
            <div className="text-[26px] font-bold leading-none text-white tracking-tight">{day}</div>
            <div className="text-[11px] font-semibold uppercase text-gray-300 tracking-wide mt-0.5">{month}</div>
          </div>
        
        <Badge className={cityColors[city]}>
          {cityLabels[city]}
        </Badge>
      </div>

      {/* Corpo: Informações do evento */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className={`text-lg font-bold leading-tight ${backgroundImage ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]' : 'text-white'}`}>
          {title}
        </h3>
        <p className={`text-sm flex items-center gap-1 ${backgroundImage ? 'text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]' : 'text-white/70'}`}>
          {location}
        </p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            {highlights.slice(0, 2).map((highlight, index) => (
              <span key={index} className={`text-xs leading-relaxed ${backgroundImage ? 'text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]' : 'text-white/65'}`}>
                • {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && !backgroundImage && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-gray-800/90 text-gray-200 backdrop-blur-sm border border-gray-600/50 whitespace-nowrap">
              {tags[tags.length - 1]}
            </span>
          </div>
        )}

        {/* Status Badge */}
        {status && (
          <Badge className="mt-2 text-[11px] font-semibold px-2 py-1 w-fit">
            {status === 'hot' && '🔥 Últimas vagas'}
            {status === 'new' && '✨ Novo'}
            {status === 'soldout' && '✓ Esgotado'}
          </Badge>
        )}
      </div>

      {/* Footer: Ação de compra */}
      {buyLink && (
        <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
          <Button 
            onClick={handleBuyClick}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 border-0 text-black font-semibold text-[13px] px-4 py-2.5 rounded-xl transition-all hover:from-yellow-500 hover:to-yellow-600 hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(251,191,36,0.4)]"
            size="sm"
          >
            <Ticket className="w-4 h-4 mr-2" />
            Comprar Ingresso com Desconto
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}