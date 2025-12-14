import React from "react";
import "./EventCard.css";

/**
 * EventCard - Card de evento com glassmorphism premium
 * 
 * @param {Object} props
 * @param {string} props.variant - Variante de cor: casamento | reveillon | corporativo | afrohouse | gastronomia
 * @param {string} props.day - Dia do evento (ex: "31")
 * @param {string} props.month - Mês abreviado (ex: "DEZ")
 * @param {string} props.title - Título do evento
 * @param {string} props.location - Localização do evento
 * @param {Array<string>} props.tags - Array de tags do evento
 * @param {string} props.backgroundImage - URL da imagem de fundo (opcional)
 */
export default function EventCard({ 
  variant = "reveillon", 
  day, 
  month, 
  title, 
  location, 
  tags = [],
  backgroundImage,
  onClick
}) {
  const cardStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};

  return (
    <div 
      className={`event-card event-card--${variant}`}
      style={cardStyle}
      onClick={onClick}
    >
      <div className={`event-date-box`}>
        <div className="day">{day}</div>
        <div className="month">{month}</div>
      </div>

      <div className="event-info">
        <h3 className="event-title">{title}</h3>
        <p className="event-location">{location}</p>

        {tags.length > 0 && (
          <div className="event-tags">
            {tags.map((tag, index) => (
              <span key={index} className="event-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}