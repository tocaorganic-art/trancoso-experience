import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import LazyEmbed from "@/components/embeds/LazyEmbed";

const CATEGORY_LABELS = {
  afro_house: "Afro House",
  organic_house: "Organic House",
  playlists: "Playlists",
  eventos: "Eventos",
  bastidores: "Bastidores"
};

const CATEGORY_COLORS = {
  afro_house: "bg-orange-100 text-orange-700",
  organic_house: "bg-green-100 text-green-700",
  playlists: "bg-purple-100 text-purple-700",
  eventos: "bg-blue-100 text-blue-700",
  bastidores: "bg-pink-100 text-pink-700"
};

export default function BlogPostPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const { data: post, isLoading } = useQuery({
    queryKey: ['blogPost', postId],
    queryFn: () => base44.entities.BlogPost.filter({ id: postId }),
    enabled: !!postId,
    select: (data) => data[0]
  });

  // Dynamic SEO Meta Tags
  useEffect(() => {
    if (!post) return;

    // Title
    document.title = `${post.title} | Curadoria Toca - Toca Experience`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = post.excerpt;

    // Open Graph Tags
    const ogTags = [
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.excerpt },
      { property: "og:image", content: post.cover_image || "" },
      { property: "og:type", content: "article" },
      { property: "og:locale", content: "pt_BR" },
      { property: "article:author", content: "Tony Monteiro, Enzo Furtado" },
      { property: "article:published_time", content: post.created_date }
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    // Schema.org Article JSON-LD
    let schemaScript = document.querySelector('script[data-schema="article"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute('data-schema', 'article');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.cover_image || "",
      "datePublished": post.created_date,
      "dateModified": post.updated_date || post.created_date,
      "author": [
        {
          "@type": "Person",
          "name": "Tony Monteiro",
          "url": "https://www.instagram.com/tonyismusic"
        },
        {
          "@type": "Person",
          "name": "Enzo Furtado",
          "url": "https://www.instagram.com/enzofurtado/"
        }
      ],
      "publisher": {
        "@type": "Organization",
        "name": "Toca Experience",
        "logo": {
          "@type": "ImageObject",
          "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/8c9bc9739_logo_da_toca_experience_com_cone_branco2.jpg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    });

    // Cleanup on unmount
    return () => {
      const articleSchema = document.querySelector('script[data-schema="article"]');
      if (articleSchema) articleSchema.remove();
    };
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Post não encontrado</h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Enquanto isso, explore conteúdos que inspiram nossa curadoria sonora:
        </p>
        
        <div className="grid grid-cols-2 gap-3 max-w-lg w-full mb-8">
          {[
            { name: "When We Dip", url: "https://www.whenwedjp.com" },
            { name: "Deep House Amsterdam", url: "https://www.deephouseamsterdam.com" },
            { name: "Mixmag", url: "https://mixmag.net" },
            { name: "Electronic Groove", url: "https://www.electronicgroove.com" },
            { name: "Alataj", url: "https://www.alataj.com.br" },
            { name: "DJ Mag Brasil", url: "https://djmagbrasil.com.br" }
          ].map(blog => (
            <a
              key={blog.name}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-300 hover:border-gray-500 p-3 rounded-lg text-center transition-all"
            >
              <p className="text-gray-800 text-sm font-medium">{blog.name}</p>
              <ExternalLink className="w-3 h-3 mx-auto mt-1 text-gray-500" />
            </a>
          ))}
        </div>
        
        <Link to={createPageUrl("Curadoria")}>
          <Button>Voltar para Curadoria</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
      {/* Compact Header - Mobile Optimized */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <Link to={createPageUrl("Curadoria")}>
            <Button variant="ghost" className="mb-2 text-white/70 hover:text-white text-sm">
              <ArrowLeft className="w-3 h-3 mr-1" />
              Voltar
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Category Badge */}
          <Badge className={`${CATEGORY_COLORS[post.category]} mb-4`}>
            {CATEGORY_LABELS[post.category]}
          </Badge>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Tony Monteiro & Enzo Furtado</span>
            </div>
            {post.created_date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.created_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Spotify Embed - Lazy Loaded */}
          {post.spotify_embed && (
            <div className="mb-8">
              <LazyEmbed
                type="spotify"
                src={post.spotify_embed}
                title={`Spotify - ${post.title}`}
              />
            </div>
          )}

          {/* Content */}
          {post.content && (
            <div className="prose prose-lg prose-gray max-w-none mb-8">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          )}

          {/* SoundCloud Embed - Lazy Loaded */}
          {post.soundcloud_embed && (
            <div className="mb-8">
              <LazyEmbed
                type="soundcloud"
                src={post.soundcloud_embed}
                title={`SoundCloud - ${post.title}`}
              />
            </div>
          )}

          {/* Share / CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 mb-4">Gostou do conteúdo?</p>
            <Link to={createPageUrl("Home") + "#contato"}>
              <Button className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white">
                Solicitar Proposta
              </Button>
            </Link>
          </div>
        </motion.article>
      </div>
    </div>
  );
}