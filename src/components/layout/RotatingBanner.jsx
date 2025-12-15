import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import OptimizedImage from "@/components/ui/OptimizedImage";

const BANNER_ITEMS = [
  {
    id: "toca-logo",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/e442a09d3_LOGO_HORIZ_COLOR_POSIT.png",
    link: null
  },
  {
    id: "ano-novo",
    title: "Festas de Ano Novo",
    subtitle: "2025/2026",
    description: "Trancoso • Caraíva • Arraial d'Ajuda",
    backgroundImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    link: "EventosAnoNovo",
    gradient: "from-orange-500/90 to-rose-600/90"
  },
  {
    id: "locacao-som",
    title: "Locação de Som",
    subtitle: "Pioneer DJ",
    description: "Equipamentos profissionais para sua festa",
    backgroundImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/6a7bbf2de_djm-450-set-xdj-700.jpg",
    link: "LocacaoSom",
    gradient: "from-purple-600/90 to-indigo-700/90"
  },
  {
    id: "discografia",
    title: "Discografia",
    subtitle: "Tony Monteiro",
    description: "Singles, EPs & Remixes",
    backgroundImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/f6262c8a5_IMG_8909.JPEG",
    link: "Discografia",
    gradient: "from-gray-700/90 to-gray-900/90"
  }
];

export default function RotatingBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_ITEMS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentItem = BANNER_ITEMS[currentIndex];

  return (
    <div className="w-[300px] md:w-[450px] lg:w-[600px] mx-auto relative overflow-hidden rounded-2xl shadow-xl">
      {BANNER_ITEMS.map((item, index) => {
        const offset = (index - currentIndex) * 100;
        
        return (
          <div
            key={item.id}
            className="absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${offset}%)` }}
          >
            {item.video ? (
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <iframe
                  src={`${item.video}?autoplay=1&mute=1&loop=1&playlist=3V59U7hwj9Q`}
                  title="Toca Experience"
                  className="w-full h-full rounded-2xl"
                  style={{ aspectRatio: '16/9' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : item.image ? (
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center p-8">
                <img 
                  src={item.image}
                  alt="Toca Experience"
                  className="w-full h-full object-contain"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ) : (
              <Link
                to={createPageUrl(item.link)}
                className="w-full h-full relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform flex"
              >
                {/* Imagem de fundo lado esquerdo */}
                <div className="w-1/2 h-full relative">
                  <OptimizedImage 
                    src={item.backgroundImage}
                    alt={item.title}
                    className="w-full h-full"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  {/* Botão Saiba Mais */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium hover:bg-white transition-colors">
                      Saiba Mais →
                    </span>
                  </div>
                </div>
                {/* Conteúdo lado direito */}
                <div className={`w-1/2 h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center text-white text-center px-3 md:px-6`}>
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-1 drop-shadow-lg leading-tight">{item.title}</h3>
                  <p className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">{item.subtitle}</p>
                  <p className="text-xs md:text-sm opacity-90 drop-shadow">{item.description}</p>
                </div>
              </Link>
            )}
          </div>
        );
      })}
      
      {/* Container para manter proporção */}
      <div className="w-full" style={{ paddingBottom: "66.67%" }} />
      
      {/* Indicadores */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {BANNER_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-gray-700 w-4" 
                : "bg-gray-400/60 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}