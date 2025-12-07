import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

let MapContainer, TileLayer, Marker, Popup, L;

// Lazy load Leaflet to avoid SSR issues
const loadLeaflet = async () => {
  if (typeof window === "undefined") return;
  
  const leaflet = await import("leaflet");
  L = leaflet.default;
  
  const reactLeaflet = await import("react-leaflet");
  MapContainer = reactLeaflet.MapContainer;
  TileLayer = reactLeaflet.TileLayer;
  Marker = reactLeaflet.Marker;
  Popup = reactLeaflet.Popup;
  
  // Import CSS
  await import("leaflet/dist/leaflet.css");
  
  // Fix for default markers
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadLeaflet().then(() => setLoaded(true));
  }, []);

  const createCustomIcon = (icon, nome) => {
    if (!L) return null;
    return L.divIcon({
      html: `
        <div class="relative group cursor-pointer">
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl drop-shadow-lg group-hover:scale-110 transition-transform">
            ${icon}
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            ${nome}
          </div>
        </div>
      `,
      className: "custom-marker",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  if (!loaded || !MapContainer) {
    return (
      <Card className="bg-gray-900/50 border-white/10 p-8 text-center">
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-800/50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Carregando mapa interativo...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-white/10 overflow-hidden">
      <div className="relative">
        <MapContainer
          center={[-16.6, -39.1]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {localidades.map((local) => (
            <Marker
              key={local.nome}
              position={local.coords}
              icon={createCustomIcon(local.icon, local.nome)}
              eventHandlers={{
                click: () => onLocalidadeClick(local.nome)
              }}
            >
              <Popup className="custom-popup">
                <div className="text-center p-2">
                  <div className="text-2xl mb-2">{local.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{local.nome}</h3>
                  <p className="text-xs text-gray-600 mb-2">{local.descricao}</p>
                  {eventosCount[local.nome] && (
                    <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full inline-block">
                      {eventosCount[local.nome]} evento{eventosCount[local.nome] > 1 ? 's' : ''}
                    </div>
                  )}
                  <Button
                    size="sm"
                    onClick={() => onLocalidadeClick(local.nome)}
                    className="mt-2 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs"
                  >
                    Ver Eventos
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-xs z-[1000]">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-3 h-3" />
            <span className="font-semibold">Clique no ícone para filtrar</span>
          </div>
          <div className="space-y-1 mt-2">
            {localidades.map((local) => (
              <div key={local.nome} className="flex items-center gap-2">
                <span>{local.icon}</span>
                <span>{local.nome}</span>
                {eventosCount[local.nome] && (
                  <span className="text-purple-400">({eventosCount[local.nome]})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MapaEventos;