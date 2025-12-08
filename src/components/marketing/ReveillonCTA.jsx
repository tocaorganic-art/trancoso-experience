import React, { useState, useEffect } from "react";
import { X, Sparkles, Music, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ReveillonCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Check if user already closed the banner in this session
    const bannerClosed = sessionStorage.getItem('reveillon_cta_closed');
    if (bannerClosed) {
      setIsVisible(false);
      setIsClosed(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    sessionStorage.setItem('reveillon_cta_closed', 'true');
  };

  if (isClosed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Sparkles className="w-5 h-5 flex-shrink-0 animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm md:text-base font-semibold">
                    🎉 Réveillon Trancoso: DJ Exclusivo e Aluguel de Som para sua Residência
                  </p>
                  <p className="text-xs md:text-sm text-white/90 hidden sm:block">
                    Equipamento Pioneer profissional • DJ experiente • Som de alta qualidade
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link to={createPageUrl("Cotacao")}>
                  <Button 
                    size="sm" 
                    className="bg-white text-purple-600 hover:bg-gray-100 font-bold whitespace-nowrap"
                  >
                    <Music className="w-4 h-4 mr-1" />
                    Pedir Orçamento
                  </Button>
                </Link>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 p-2"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}