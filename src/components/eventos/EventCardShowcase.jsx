import React from 'react';
import EventCard from './EventCard';

/**
 * EventCardShowcase - Showcase dos 5 cards com imagens de fundo
 * Demonstra todas as variantes disponíveis
 */
export default function EventCardShowcase() {
  const eventos = [
    {
      day: "15",
      month: "JUN",
      title: "Casamento dos Sonhos em Trancoso",
      location: "Praia de Trancoso, Bahia",
      tags: ["Casamento", "Praia", "Luxo"],
      variant: "casamento"
    },
    {
      day: "31",
      month: "DEZ",
      title: "Réveillon Trancoso 2026",
      location: "Múltiplas locações - Caraíva & Arraial",
      tags: ["Réveillon", "Open Bar", "DJs Internacionais"],
      variant: "reveillon"
    },
    {
      day: "20",
      month: "MAR",
      title: "Coquetel Corporativo - Empresa XYZ",
      location: "Espaço Gourmet, Trancoso",
      tags: ["Corporativo", "Networking", "Premium"],
      variant: "corporativo"
    },
    {
      day: "08",
      month: "FEV",
      title: "Afro House Night - Tony Monteiro",
      location: "Espaço Cultural, Trancoso",
      tags: ["Afro House", "DJ", "Música"],
      variant: "afrohouse"
    },
    {
      day: "12",
      month: "ABR",
      title: "Experiência Gastronômica + DJ",
      location: "Restaurante Premium, Trancoso",
      tags: ["Gastronomia", "Música", "Experiência"],
      variant: "gastronomia"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Event Cards - Toca Experience</h1>
        <p className="text-gray-600">5 variantes premium com glassmorphism</p>
      </div>

      {eventos.map((evento, index) => (
        <EventCard key={index} {...evento} />
      ))}
    </div>
  );
}