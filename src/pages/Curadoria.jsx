import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Music, Headphones, Calendar, Loader2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import AuthorityBanner from "@/components/curadoria/AuthorityBanner";
import PlayerTabs from "@/components/curadoria/PlayerTabs";
import CuradoriaFilters from "@/components/curadoria/CuradoriaFilters";
import CuradoriaCard from "@/components/curadoria/CuradoriaCard";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function Curadoria() {
  const [activeCategory, setActiveCategory] = useState("all");

  // SEO Meta Tags for Curadoria page
  useEffect(() => {
    document.title = "Curadoria Toca Experience | Sets, Playlists e Artigos de Afro House & Organic House";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Curadoria Toca: sets exclusivos, playlists curadas e artigos sobre Afro House e Organic House. Blog oficial de Tony Monteiro e Enzo Furtado.";

    // Schema.org Blog JSON-LD
    let schemaScript = document.querySelector('script[data-schema="blog"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute('data-schema', 'blog');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Curadoria Toca",
      "description": "Sets exclusivos, playlists curadas e o melhor do Afro House e Organic House.",
      "author": [
        { "@type": "Person", "name": "Tony Monteiro" },
        { "@type": "Person", "name": "Enzo Furtado" }
      ],
      "publisher": {
        "@type": "Organization",
        "name": "Toca Experience"
      }
    });

    return () => {
      const blogSchema = document.querySelector('script[data-schema="blog"]');
      if (blogSchema) blogSchema.remove();
    };
  }, []);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => base44.entities.BlogPost.filter({ published: true }, '-created_date'),
  });

  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const featuredPosts = posts.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[
          { label: "Curadoria Musical", page: "Curadoria" }
        ]} />
      </div>

      {/* Header - Compact Mobile */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-8 md:py-12 border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 text-[#FFD700] px-4 py-2 rounded-full text-sm mb-4 border border-[#FFD700]/30">
              <Headphones className="w-4 h-4" />
              Curadoria
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[#FFD700] to-[#40E0D0] bg-clip-text text-transparent">
                Curadoria
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Música e experiências sonoras
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Authority Banner */}
        <AuthorityBanner />

        {/* Player Tabs */}
        <PlayerTabs />

        {/* Category Filter */}
        <CuradoriaFilters 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        {/* Posts Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#FFD700]" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <Music className="w-16 h-16 mx-auto text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Conteúdo em breve
            </h3>
            <p className="text-gray-600">
              Estamos preparando conteúdos incríveis para você.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPosts.map((post, idx) => (
              <CuradoriaCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        )}

        {/* Blogs Recomendados */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Headphones className="w-6 h-6 text-[#FFD700]" />
            Fontes que Inspiram Nossa Curadoria
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: "When We Dip", url: "https://www.whenwedjp.com", category: "Afro/Organic" },
              { name: "Deep House Amsterdam", url: "https://www.deephouseamsterdam.com", category: "Curadoria" },
              { name: "Mixmag", url: "https://mixmag.net", category: "Internacional" },
              { name: "Resident Advisor", url: "https://ra.co", category: "Artistas" },
              { name: "OkayAfrica", url: "https://www.okayafrica.com", category: "Afro Culture" },
              { name: "Electronic Groove", url: "https://www.electronicgroove.com", category: "Organic" },
              { name: "Alataj", url: "https://www.alataj.com.br", category: "Brasil" },
              { name: "DJ Mag Brasil", url: "https://djmagbrasil.com.br", category: "Brasil" }
            ].map(blog => (
              <a
                key={blog.name}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 border border-gray-800 hover:border-[#FFD700]/50 p-3 rounded-lg text-center transition-all group"
              >
                <p className="text-white text-sm font-medium group-hover:text-[#FFD700] transition-colors">{blog.name}</p>
                <p className="text-gray-500 text-xs mt-1">{blog.category}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links - Redesigned CTAs */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <a 
            href="https://open.spotify.com/artist/2r4S2RPdfnx7UPL73jJWlQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-gray-900 to-black border border-[#FFD700]/30 hover:border-[#FFD700] p-6 rounded-2xl flex items-center justify-between transition-all group"
          >
            <div>
              <p className="font-bold text-lg text-[#FFD700]">Siga no Spotify</p>
              <p className="text-gray-500 text-sm">Todas as tracks e remixes</p>
            </div>
            <ExternalLink className="w-6 h-6 text-[#FFD700] group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="https://soundcloud.com/tonyismusic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-gray-900 to-black border border-[#40E0D0]/30 hover:border-[#40E0D0] p-6 rounded-2xl flex items-center justify-between transition-all group"
          >
            <div>
              <p className="font-bold text-lg text-[#40E0D0]">Ouça no SoundCloud</p>
              <p className="text-gray-500 text-sm">Sets completos exclusivos</p>
            </div>
            <ExternalLink className="w-6 h-6 text-[#40E0D0] group-hover:scale-110 transition-transform" />
          </a>
          <Link 
            to={createPageUrl("Eventos")}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 hover:border-[#FFD700]/50 p-6 rounded-2xl flex items-center justify-between transition-all group"
          >
            <div>
              <p className="font-bold text-lg text-white group-hover:text-[#FFD700] transition-colors">Próximos Eventos</p>
              <p className="text-gray-500 text-sm">Veja onde vamos tocar</p>
            </div>
            <Calendar className="w-6 h-6 text-gray-400 group-hover:text-[#FFD700] group-hover:scale-110 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}