import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const localidades = [
  {
    nome: "Caraíva",
    coords: [-16.8861, -39.1444],
    icon: "🏝️",
    descricao: "Paraíso rústico sem carros, conhecido por suas praias paradisíacas e clima boêmio"
  },
  {
    nome: "Trancoso",
    coords: [-16.5914, -39.0681],
    icon: "🌴",
    descricao: "Charme exclusivo com o famoso Quadrado e vida noturna sofisticada"
  },
  {
    nome: "Arraial d'Ajuda",
    coords: [-16.4783, -39.0778],
    icon: "🌊",
    descricao: "Vibrante e cosmopolita, com festas memoráveis e energia tropical"
  }
];

function MapaEventos({ onLocalidadeClick, eventosCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {localidades.map((local) => (
        <Card
          key={local.nome}
          className="bg-gray-900/50 border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group"
          onClick={() => onLocalidadeClick(local.nome)}
        >
          <div className="p-6 text-center">
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
              {local.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{local.nome}</h3>
            <p className="text-sm text-gray-400 mb-4">{local.descricao}</p>
            {eventosCount[local.nome] && (
              <div className="bg-purple-500/20 text-purple-300 text-sm px-3 py-2 rounded-full inline-flex items-center gap-2 border border-purple-500/30">
                <MapPin className="w-4 h-4" />
                {eventosCount[local.nome]} evento{eventosCount[local.nome] > 1 ? 's' : ''}
              </div>
            )}
            <Button
              size="sm"
              className="mt-4 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600"
            >
              Ver Eventos
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default MapaEventos;