import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";

const TYPE_LABELS = {
  single: "Single",
  ep: "EP",
  remix: "Remix",
  album: "Álbum"
};

const TYPE_COLORS = {
  single: "bg-blue-100 text-blue-700",
  ep: "bg-purple-100 text-purple-700",
  remix: "bg-orange-100 text-orange-700",
  album: "bg-green-100 text-green-700"
};

const ARTIST_LABELS = {
  tony_monteiro: "Tony Monteiro",
  enzo_furtado: "Enzo Furtado",
  toca_experience: "Toca Experience"
};

export default function ReleaseCard({ release, index, onPlay }) {
  const fallbackImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="bg-white border-gray-200 hover:shadow-lg transition-all overflow-hidden group h-full">
        <div className="relative">
          <OptimizedImage 
            src={release.cover_image || fallbackImage}
            alt={`Capa de ${release.title}`}
            aspectRatio="1:1"
            fallbackSrc={fallbackImage}
            className="w-full h-full"
          />
          
          {/* Play Overlay */}
          {(release.spotify_embed || release.spotify_url) && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                size="icon"
                onClick={onPlay}
                className="w-14 h-14 rounded-full bg-white hover:bg-gray-100 text-gray-900"
              >
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>
          )}

          {/* Featured Badge */}
          {release.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-yellow-400 text-yellow-900">★ Destaque</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <Badge className={`${TYPE_COLORS[release.type]} mb-2`}>
            {TYPE_LABELS[release.type]}
          </Badge>
          
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{release.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{ARTIST_LABELS[release.artist]}</p>
          
          {release.release_date && (
            <p className="text-gray-400 text-xs">
              {format(new Date(release.release_date), "MMMM yyyy", { locale: ptBR })}
            </p>
          )}

          {/* Streaming Links */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            {release.spotify_url && (
              <a 
                href={release.spotify_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 text-xs flex items-center gap-1"
              >
                Spotify <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {release.soundcloud_url && (
              <a 
                href={release.soundcloud_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 text-xs flex items-center gap-1"
              >
                SoundCloud <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {release.apple_music_url && (
              <a 
                href={release.apple_music_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 text-xs flex items-center gap-1"
              >
                Apple <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}