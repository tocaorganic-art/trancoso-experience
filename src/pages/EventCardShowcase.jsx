import React from "react";
import EventCard from "@/components/eventos/EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function EventCardShowcase() {
  const eventos = [
    {
      variant: "casamento",
      day: "15",
      month: "JUN",
      title: "Casamento Marina & Pedro",
      location: "Trancoso • Praia dos Coqueiros",
      tags: ["Casamento", "Praia"],
      backgroundImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80"
    },
    {
      variant: "reveillon",
      day: "31",
      month: "DEZ",
      title: "Réveillon Aura Trancoso 2026",
      location: "Trancoso • Quadrado",
      tags: ["Ano Novo", "Réveillon", "Premium"],
      backgroundImage: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80"
    },
    {
      variant: "corporativo",
      day: "20",
      month: "SET",
      title: "Summit Tech Innovation 2025",
      location: "Trancoso • Hotel Fasano",
      tags: ["Corporativo", "Networking", "Tech"],
      backgroundImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80"
    },
    {
      variant: "afrohouse",
      day: "05",
      month: "AGO",
      title: "Tony Monteiro • Sunset Session",
      location: "Trancoso • Praia do Taípe",
      tags: ["Afro House", "Sunset", "Live DJ"],
      backgroundImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
    },
    {
      variant: "gastronomia",
      day: "12",
      month: "JUL",
      title: "Experiência Gastronômica • Chef Alex Atala",
      location: "Trancoso • Uxua Casa",
      tags: ["Gastronomia", "Fine Dining", "Exclusivo"],
      backgroundImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Event Cards - Glassmorphism Premium
            </h1>
          </div>
          
          <p className="text-gray-600 text-lg mb-2">
            Componentes de evento com design premium e 5 variantes de cores
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            <strong>Variantes disponíveis:</strong> casamento (rosa/coral), reveillon (dourado), 
            corporativo (azul), afrohouse (preto), gastronomia (verde)
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {eventos.map((evento, index) => (
            <EventCard
              key={index}
              variant={evento.variant}
              day={evento.day}
              month={evento.month}
              title={evento.title}
              location={evento.location}
              tags={evento.tags}
              backgroundImage={evento.backgroundImage}
              onClick={() => console.log('Clicou em:', evento.title)}
            />
          ))}
        </div>

        {/* Exemplo sem background image */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Variação sem imagem de fundo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.slice(0, 3).map((evento, index) => (
              <EventCard
                key={index}
                variant={evento.variant}
                day={evento.day}
                month={evento.month}
                title={evento.title}
                location={evento.location}
                tags={[evento.tags[evento.tags.length - 1]]}
              />
            ))}
          </div>
        </div>

        {/* Código de exemplo */}
        <div className="bg-gray-900 rounded-xl p-6 text-gray-100">
          <h3 className="text-xl font-bold mb-4">Como usar:</h3>
          <pre className="text-sm overflow-x-auto">
{`import EventCard from "@/components/eventos/EventCard";

<EventCard
  variant="reveillon"
  day="31"
  month="DEZ"
  title="Réveillon Aura Trancoso 2026"
  location="Trancoso • Quadrado"
  tags={["Ano Novo", "Réveillon", "Premium"]}
  backgroundImage="https://..."
  onClick={() => console.log('clicked')}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}