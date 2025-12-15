import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function ImageGallery({ eventos = [], isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [sortBy, setSortBy] = useState("data"); // "data" ou "popularidade"

  // Preparar imagens dos eventos
  const images = eventos
    .filter(e => e.imagem)
    .map(evento => ({
      url: evento.imagem,
      title: evento.nome,
      date: evento.data,
      location: evento.local,
      localidade: evento.localidade,
      tags: evento.tags || [],
      popularidade: evento.tags?.length || 0 // Métrica simples de popularidade
    }));

  // Ordenar imagens
  const sortedImages = [...images].sort((a, b) => {
    if (sortBy === "data") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return b.popularidade - a.popularidade;
    }
  });

  const currentImage = sortedImages[currentIndex];

  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setCurrentIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, sortedImages.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedImages.length);
    setZoom(1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.3, 0.5));
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentImage.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar imagem:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: `Confira o evento: ${currentImage.title} em ${currentImage.localidade}`,
          url: window.location.href
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-white font-bold text-lg">{currentImage?.title}</h3>
              <Badge className="bg-white/20 text-white">
                {currentIndex + 1} / {sortedImages.length}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {/* Ordenação */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSortBy(sortBy === "data" ? "popularidade" : "data");
                  setCurrentIndex(0);
                }}
                className="text-white hover:bg-white/10"
              >
                {sortBy === "data" ? (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Por Data
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Por Popularidade
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="text-white hover:bg-white/10"
              >
                <Download className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="text-white hover:bg-white/10"
              >
                <Share2 className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Imagem Principal */}
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={currentImage?.url}
              alt={currentImage?.title}
              className="max-w-full max-h-[80vh] object-contain cursor-zoom-in"
              style={{ transform: `scale(${zoom})` }}
              transition={{ duration: 0.2 }}
              onClick={() => zoom === 1 ? handleZoomIn() : setZoom(1)}
            />

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-sm mb-2">{currentImage?.location}</p>
              <p className="text-white/70 text-xs">{currentImage?.localidade}</p>
              {currentImage?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {currentImage.tags.slice(0, 3).map((tag, i) => (
                    <Badge key={i} className="bg-white/20 text-white text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Controles de Navegação */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 w-12 h-12"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 w-12 h-12"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>

        {/* Controles de Zoom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            className="text-white hover:bg-white/10"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-5 h-5" />
          </Button>

          <span className="text-white text-sm font-medium px-3">
            {Math.round(zoom * 100)}%
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            className="text-white hover:bg-white/10"
            disabled={zoom >= 3}
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
        </div>

        {/* Miniaturas */}
        <div className="absolute bottom-24 left-0 right-0 overflow-x-auto">
          <div className="flex gap-2 px-4 justify-center">
            {sortedImages.slice(Math.max(0, currentIndex - 5), currentIndex + 6).map((img, idx) => {
              const actualIndex = sortedImages.indexOf(img);
              return (
                <motion.button
                  key={actualIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(actualIndex);
                    setZoom(1);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    actualIndex === currentIndex
                      ? "border-white scale-110"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}