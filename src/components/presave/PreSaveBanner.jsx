import React from "react";
import { motion } from "framer-motion";
import { Music, ExternalLink, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PreSaveBanner() {
  const shareUrl = "https://open.spotify.com/intl-pt/album/48zWmrvv58M6T7vR4vvtOv?si=TpF_k1DdS5ugsoWxJ3JCdA";
  const shareText = "🎵 Novo single 'True To Myself' de Tony Monteiro já disponível! Ouça agora na sua playlist favorita";

  const handleShare = (platform) => {
    const urls = {
      instagram: `https://www.instagram.com/`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      copy: shareUrl
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copiado!");
    } else if (platform === "instagram") {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copiado! Cole no Instagram Stories ou Bio");
      window.open(urls[platform], '_blank');
    } else {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-900 rounded-3xl overflow-hidden shadow-2xl my-12"
    >
      {/* Scrolling text background */}
      <div className="absolute inset-0 flex items-center overflow-hidden opacity-10">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-white text-6xl font-bold"
        >
          OUÇA AGORA • TRUE TO MYSELF • OUÇA AGORA • TRUE TO MYSELF •
        </motion.div>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-12">
        {/* Imagem */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/45fbf25d5_anima_o_ultra_realista_e_ultra_hd_estilo.jpg?width=500&quality=75"
            alt="True To Myself - Tony Monteiro"
            className="w-full max-w-sm md:max-w-md rounded-xl md:rounded-2xl shadow-2xl border-2 md:border-4 border-white/20"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* Conteúdo */}
        <div className="flex flex-col justify-center text-white space-y-4 md:space-y-6">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm mb-3 md:mb-4">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              Lançamento: Já disponível
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
              TRUE TO MYSELF
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-2 md:mb-4">Tony Monteiro</p>
            <p className="text-sm md:text-lg text-white/80 mb-4 md:mb-6">
              Novo single já ta no ar! Seja um dos primeiros a ouvir e salve agora na sua playlist favorita.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 md:space-y-4"
          >
            {/* Texto de instrução com animação */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl p-3 md:p-4 text-center"
            >
              <p className="text-lg md:text-2xl font-bold flex items-center justify-center gap-2">
                <Music className="w-5 h-5 md:w-6 md:h-6" />
                OUÇA AGORA
              </p>
            </motion.div>

            {/* Botão de ação */}
            <a
              href="https://open.spotify.com/intl-pt/album/48zWmrvv58M6T7vR4vvtOv?si=TpF_k1DdS5ugsoWxJ3JCdA"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                className="w-full bg-white text-red-600 hover:bg-gray-100 text-base md:text-xl py-5 md:py-7 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
              >
                OUÇA AGORA NO SPOTIFY
                <ExternalLink className="w-5 h-5 md:w-6 md:h-6 ml-2" />
              </Button>
            </a>

            {/* Botões de Compartilhamento */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-white/80 text-xs md:text-sm mr-1">
                <Share2 className="w-4 h-4 inline mr-1" />
                Compartilhe:
              </span>
              <button
                onClick={() => handleShare("instagram")}
                className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white p-2 rounded-full transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                title="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full transition-colors"
                title="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-full transition-colors"
                title="Copiar link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <p className="text-center text-white/70 text-xs md:text-sm">
              Adicione nas suas playlists no Spotify, Apple Music, Deezer e mais!
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}