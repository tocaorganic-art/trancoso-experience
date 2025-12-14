import React from "react";
import "./EventCard.css";
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

  const handleBuyClick = (e) => {
    e.stopPropagation();
    if (buyLink) {
      window.open(buyLink, '_blank');
    }
  };

  return (
    <div 
      className={`event-card event-card--${variant} ${backgroundImage ? 'event-card--with-image' : ''}`}
      style={cardStyle}
      onClick={onClick}
    >
      {/* Header: Data + Cidade */}
      <div className="event-card-header">
        <div className="event-date-box">
          <div className="day">{day}</div>
          <div className="month">{month}</div>
        </div>
        
        <Badge className={cityColors[city]}>
          {cityLabels[city]}
        </Badge>
      </div>

      {/* Corpo: Informações do evento */}
      <div className="event-info">
        <h3 className="event-title">{title}</h3>
        <p className="event-location">{location}</p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="event-highlights">
            {highlights.slice(0, 2).map((highlight, index) => (
              <span key={index} className="event-highlight">
                • {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && !backgroundImage && (
          <div className="event-tags">
            <span className="event-tag">
              {tags[tags.length - 1]}
            </span>
          </div>
        )}

        {/* Status Badge */}
        {status && (
          <Badge className="event-status-badge">
            {status === 'hot' && '🔥 Últimas vagas'}
            {status === 'new' && '✨ Novo'}
            {status === 'soldout' && '✓ Esgotado'}
          </Badge>
        )}
      </div>

      {/* Footer: Ação de compra */}
      {buyLink && (
        <div className="event-card-footer">
          <Button 
            onClick={handleBuyClick}
            className="event-buy-button"
            size="sm"
          >
            <Ticket className="w-4 h-4 mr-2" />
            Comprar Ingresso
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}