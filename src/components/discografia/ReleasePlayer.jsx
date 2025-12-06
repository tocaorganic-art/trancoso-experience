import React from "react";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const TYPE_LABELS = {
  single: "Single",
  ep: "EP",
  remix: "Remix",
  album: "Álbum"
};

const ARTIST_LABELS = {
  tony_monteiro: "Tony Monteiro",
  enzo_furtado: "Enzo Furtado",
  toca_experience: "Toca Experience"
};

export default function ReleasePlayer({ release, onClose }) {
  if (!release) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
        >
          {/* Header with Cover */}
          <div className="relative">
            {release.cover_image ? (
              <img 
                src={release.cover_image} 
                alt={`Capa de ${release.title}`}
                className="w-full aspect-video object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-gradient-to-br from-gray-700 to-gray-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="mb-2 bg-white/20 text-white border-0">
                {TYPE_LABELS[release.type]}
              </Badge>
              <h2 className="text-2xl font-bold text-white">{release.title}</h2>
              <p className="text-gray-300">{ARTIST_LABELS[release.artist]}</p>
            </div>
          </div>

          {/* Player Content */}
          <div className="p-6">
            {release.description && (
              <p className="text-gray-600 mb-4">{release.description}</p>
            )}

            {/* Spotify Embed Player */}
            {release.spotify_embed && (
              <div className="mb-4">
                <iframe
                  src={release.spotify_embed}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
            )}

            {/* Streaming Links */}
            <div className="grid grid-cols-2 gap-3">
              {release.spotify_url && (
                <a 
                  href={release.spotify_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Spotify <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {release.soundcloud_url && (
                <a 
                  href={release.soundcloud_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  SoundCloud <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {release.apple_music_url && (
                <a 
                  href={release.apple_music_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Apple Music <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {release.beatport_url && (
                <a 
                  href={release.beatport_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Beatport <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}