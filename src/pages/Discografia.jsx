import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Disc3, Music, Loader2, ExternalLink, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import LazyEmbed from "@/components/embeds/LazyEmbed";
import ReleaseCard from "@/components/discografia/ReleaseCard";
import ReleasePlayer from "@/components/discografia/ReleasePlayer";
import PreSaveBanner from "@/components/presave/PreSaveBanner";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import DiscografiaFilters from "@/components/discografia/DiscografiaFilters";

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

const RELEASES_PER_PAGE = 12;

export default function Discografia() {
  const [filtros, setFiltros] = useState({
    tipo: "all",
    artista: "all",
    ordenacao: "data_desc"
  });
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [selectedRelease, setSelectedRelease] = useState(null);

  useEffect(() => {
    document.title = "Discografia | Toca Experience - Tony Monteiro & Enzo Furtado";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Discografia completa de Tony Monteiro e Enzo Furtado. Singles, EPs, remixes e álbuns de Afro House e Organic House. Ouça agora no Spotify, SoundCloud e Apple Music.";

    // Schema.org MusicGroup discography
    let schemaScript = document.querySelector('script[data-schema="discography"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute('data-schema', 'discography');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "name": "Toca Experience",
      "genre": ["Afro House", "Organic House", "House Music"],
      "member": [
        { "@type": "Person", "name": "Tony Monteiro" },
        { "@type": "Person", "name": "Enzo Furtado" }
      ]
    });

    return () => {
      const schema = document.querySelector('script[data-schema="discography"]');
      if (schema) schema.remove();
    };
  }, []);

  const { data: releases = [], isLoading } = useQuery({
    queryKey: ['releases'],
    queryFn: () => base44.entities.Release.list('-release_date'),
  });

  // Aplicar filtros
  let releasesFiltrados = releases;

  if (filtros.tipo !== "all") {
    releasesFiltrados = releasesFiltrados.filter(r => r.type === filtros.tipo);
  }

  if (filtros.artista !== "all") {
    releasesFiltrados = releasesFiltrados.filter(r => r.artist === filtros.artista);
  }

  // Ordenação
  releasesFiltrados = [...releasesFiltrados].sort((a, b) => {
    switch (filtros.ordenacao) {
      case "data_asc":
        return new Date(a.release_date || 0) - new Date(b.release_date || 0);
      case "nome_asc":
        return a.title.localeCompare(b.title);
      case "nome_desc":
        return b.title.localeCompare(a.title);
      default: // data_desc
        return new Date(b.release_date || 0) - new Date(a.release_date || 0);
    }
  });

  // Paginação
  const totalPaginas = Math.ceil(releasesFiltrados.length / RELEASES_PER_PAGE);
  const releasesPaginados = releasesFiltrados.slice(0, paginaAtual * RELEASES_PER_PAGE);

  const handleFilterChange = (newFilters) => {
    setFiltros(prev => ({ ...prev, ...newFilters }));
    setPaginaAtual(1);
  };

  const carregarMais = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(prev => prev + 1);
    }
  };

  // Counts para filtros
  const counts = {
    total: releases.length,
    single: releases.filter(r => r.type === "single").length,
    ep: releases.filter(r => r.type === "ep").length,
    remix: releases.filter(r => r.type === "remix").length,
    album: releases.filter(r => r.type === "album").length
  };

  const featuredReleases = releases.filter(r => r.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 pb-24">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[
          { label: "Discografia", page: "Discografia" }
        ]} />
      </div>

      {/* Header - Compact Mobile */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <Disc3 className="w-4 h-4" />
              Discografia
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Discografia
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              Singles, EPs e remixes
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Pre-Save Banner */}
        <React.Suspense fallback={<div className="h-64" />}>
          <PreSaveBanner />
        </React.Suspense>

        {/* Featured Release with Player */}
        {featuredReleases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Music className="w-6 h-6" />
              Em Destaque
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredReleases.slice(0, 2).map((release) => (
                <Card key={release.id} className="bg-white border-gray-200 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {release.cover_image && (
                      <div className="md:w-48 h-48 flex-shrink-0">
                        <picture>
                          <source
                            srcSet={`${release.cover_image}?format=webp&width=384&quality=85`}
                            type="image/webp"
                          />
                          <img 
                            src={release.cover_image} 
                            alt={`Capa de ${release.title}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width="192"
                            height="192"
                          />
                        </picture>
                      </div>
                    )}
                    <CardContent className="p-6 flex-1">
                      <Badge className="mb-2 bg-yellow-100 text-yellow-700">
                        {TYPE_LABELS[release.type]}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{release.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{ARTIST_LABELS[release.artist]}</p>
                      {release.spotify_embed && (
                        <LazyEmbed
                          type="spotify"
                          src={release.spotify_embed}
                          title={release.title}
                          height={80}
                        />
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filtros Avançados */}
        <DiscografiaFilters 
          filters={filtros}
          onFilterChange={handleFilterChange}
          counts={counts}
        />

        {/* Releases Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : releasesFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <Disc3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum lançamento encontrado
            </h3>
            <p className="text-gray-400">
              Tente ajustar os filtros.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600 text-sm">
              Mostrando {releasesPaginados.length} de {releasesFiltrados.length} lançamentos
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {releasesPaginados.map((release, idx) => (
                <ReleaseCard 
                  key={release.id} 
                  release={release} 
                  index={idx}
                  onPlay={() => setSelectedRelease(release)}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {paginaAtual < totalPaginas && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={carregarMais}
                  size="lg"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-8"
                >
                  Carregar Mais ({releasesFiltrados.length - releasesPaginados.length} restantes)
                </Button>
              </div>
            )}
          </>
        )}

        {/* Streaming Links - Mobile Optimized */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <a 
            href="https://open.spotify.com/artist/2r4S2RPdfnx7UPL73jJWlQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl flex items-center justify-between transition-colors"
          >
            <span className="font-bold text-sm md:text-base">Spotify</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a 
            href="https://soundcloud.com/tonyismusic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl flex items-center justify-between transition-colors"
          >
            <span className="font-bold text-sm md:text-base">SoundCloud</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a 
            href="https://music.apple.com/br/artist/tony-monteiro/373816598" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl flex items-center justify-between transition-colors"
          >
            <span className="font-bold text-sm md:text-base">Apple Music</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a 
            href="https://www.beatport.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center justify-between transition-colors"
          >
            <span className="font-bold text-sm md:text-base">Beatport</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>

      {/* Player Modal */}
      {selectedRelease && (
        <ReleasePlayer 
          release={selectedRelease} 
          onClose={() => setSelectedRelease(null)} 
        />
      )}
    </div>
  );
}