import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EquipmentGallery({ equipamentos, isOpen, onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const selectedEquip = equipamentos[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % equipamentos.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + equipamentos.length) % equipamentos.length);
    setIsZoomed(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") onClose();
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>

        {/* Main Content */}
        <div 
          className="flex flex-col items-center justify-center h-full p-4 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Container */}
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`relative ${isZoomed ? 'w-full h-full' : 'max-w-5xl max-h-[70vh]'} mb-6 cursor-zoom-in`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={selectedEquip.imagem}
              alt={selectedEquip.alt}
              className={`w-full h-full ${isZoomed ? 'object-contain' : 'object-cover rounded-2xl'} transition-all duration-300`}
            />
            
            {!isZoomed && (
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Clique para ampliar</span>
              </div>
            )}
          </motion.div>

          {/* Equipment Info */}
          {!isZoomed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {selectedEquip.titulo}
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                {selectedEquip.descricao}
              </p>
              
              {/* Thumbnails */}
              <div className="flex gap-2 justify-center flex-wrap">
                {equipamentos.map((equip, idx) => (
                  <button
                    key={equip.id}
                    onClick={() => {
                      setSelectedIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === selectedIndex 
                        ? 'border-orange-500 ring-2 ring-orange-500/50' 
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={equip.imagem}
                      alt={equip.titulo}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm">
              {selectedIndex + 1} / {equipamentos.length}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}