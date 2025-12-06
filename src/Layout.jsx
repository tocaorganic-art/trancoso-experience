import React, { useEffect } from "react";
import { Toaster } from "sonner";
import TrackingProvider from "@/components/tracking/TrackingProvider";

const FloatingChatWidget = React.lazy(() => import("@/components/chatbot/FloatingChatWidget"));

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // Resource Hints - DNS prefetch only (lighter than preconnect)
    const prefetchDomains = [
      'https://base44.app',
      'https://qtrypzzcjebvfcihiynt.supabase.co'
    ];

    prefetchDomains.forEach(domain => {
      let link = document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      }
    });

    // SEO Meta Tags
    document.title = currentPageName === "Agenda" 
      ? "Agenda de Eventos | Toca Experience - Tony Monteiro & Enzo Furtado"
      : "Toca Experience | DJs Tony Monteiro & Enzo Furtado - Afro House & Organic House";
    
    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = currentPageName === "Agenda"
      ? "Confira a agenda de eventos e próximas apresentações dos DJs Tony Monteiro e Enzo Furtado. Afro House, Organic House e House music em festivais, clubs e eventos privados."
      : "Toca Experience apresenta Tony Monteiro & Enzo Furtado - duo de DJs especialistas em Afro House, Organic House e House. Contrate para casamentos, festivais, eventos corporativos e festas privadas.";

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "DJ, Afro House, Organic House, House Music, Tony Monteiro, Enzo Furtado, Toca Experience, DJ para casamento, DJ para evento, DJ Rio de Janeiro, DJ São Paulo, DJ Trancoso, festival, sunset, pool party";

    // Open Graph Tags
    const ogTags = [
      { property: "og:title", content: "True To Myself - Tony Monteiro | Novo Single 13/12" },
      { property: "og:description", content: "🎵 Novo single 'True To Myself' de Tony Monteiro lançando dia 13 de Dezembro! Salve agora na sua playlist favorita." },
      { property: "og:image", content: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/e19e90f67_anima_o_ultra_realista_e_ultra_hd_estilo.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1200" },
      { property: "og:type", content: "music.song" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: "https://ffm.to/truetomyself" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "True To Myself - Tony Monteiro" },
      { name: "twitter:description", content: "Novo single lançando 13/12! Salve agora 🎵" },
      { name: "twitter:image", content: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/e19e90f67_anima_o_ultra_realista_e_ultra_hd_estilo.jpg" }
    ];

    ogTags.forEach(tag => {
      const attr = tag.property ? 'property' : 'name';
      const value = tag.property || tag.name;
      let metaTag = document.querySelector(`meta[${attr}="${value}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attr, value);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    // Schema.org JSON-LD for Organization
    let schemaScript = document.querySelector('script[data-schema="organization"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute('data-schema', 'organization');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "name": "Toca Experience",
      "description": "Duo de DJs Tony Monteiro e Enzo Furtado, especialistas em Afro House, Organic House e House Music.",
      "genre": ["Afro House", "Organic House", "House Music"],
      "member": [
        {
          "@type": "Person",
          "name": "Tony Monteiro",
          "sameAs": [
            "https://www.instagram.com/tonyismusic",
            "https://open.spotify.com/artist/2r4S2RPdfnx7UPL73jJWlQ",
            "https://soundcloud.com/YjRNAgQXyfWcPrfAX1"
          ]
        },
        {
          "@type": "Person",
          "name": "Enzo Furtado",
          "sameAs": [
            "https://www.instagram.com/enzofurtado/",
            "https://open.spotify.com/user/21653dr5mtlrcarl5m7n3vo2i",
            "https://soundcloud.com/enzofurtado"
          ]
        }
      ],
      "sameAs": [
        "https://www.instagram.com/tonyismusic",
        "https://www.instagram.com/enzofurtado/",
        "https://linktr.ee/tocamusiccrew"
      ]
    });

  }, [currentPageName]);

  return (
    <TrackingProvider>
      <div className="min-h-screen">
        <Toaster position="top-center" richColors />
        {children}
        
        {/* Floating Chat Widget */}
        <React.Suspense fallback={null}>
          <FloatingChatWidget />
        </React.Suspense>
      </div>
    </TrackingProvider>
  );
}