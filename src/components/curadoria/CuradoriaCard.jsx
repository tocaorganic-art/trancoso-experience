import React from "react";
import { motion } from "framer-motion";
import { Star, Headphones, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import LazyEmbed from "@/components/embeds/LazyEmbed";

const CATEGORY_LABELS = {
  afro_house: "Afro House",
  organic_house: "Organic House",
  playlists: "Playlists",
  eventos: "Eventos",
  bastidores: "Bastidores"
};

// Função para determinar o CTA correto baseado na categoria
const getCTA = (category, hasSpotifyEmbed) => {
  if (hasSpotifyEmbed || category === "playlists") {
    return { text: "Ouvir Playlist", icon: Headphones };
  }
  return { text: "Leia o Artigo", icon: BookOpen };
};

export default function CuradoriaCard({ post, index }) {
  const cta = getCTA(post.category, post.spotify_embed);
  const CTAIcon = cta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-[#FFD700]/30 transition-all overflow-hidden h-full group">
        {post.cover_image && (
          <div className="h-48 overflow-hidden relative">
            <picture>
              <source
                srcSet={`${post.cover_image}?format=webp&width=800&quality=85`}
                type="image/webp"
              />
              <img 
                src={post.cover_image} 
                alt={post.title}
                loading="lazy"
                decoding="async"
                width="400"
                height="192"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
              {CATEGORY_LABELS[post.category]}
            </Badge>
            {post.featured && (
              <Badge className="bg-[#40E0D0]/10 text-[#40E0D0] border border-[#40E0D0]/30">
                <Star className="w-3 h-3 mr-1" />
                Destaque
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
          
          {post.spotify_embed && (
            <div className="mb-4">
              <LazyEmbed
                type="spotify"
                src={post.spotify_embed}
                title={`Spotify - ${post.title}`}
                height={80}
              />
            </div>
          )}

          <Link to={createPageUrl(`BlogPost?id=${post.id}`)}>
            <Button 
              variant="outline" 
              className="w-full bg-transparent border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all"
            >
              <CTAIcon className="w-4 h-4 mr-2" />
              {cta.text}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}