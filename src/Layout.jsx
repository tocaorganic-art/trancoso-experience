import React, { useEffect } from "react";
import { Toaster } from "sonner";
import TrackingProvider from "@/components/tracking/TrackingProvider";

const FloatingChatWidget = React.lazy(() => import("@/components/chatbot/FloatingChatWidget"));
const ReveillonCTA = React.lazy(() => import("@/components/marketing/ReveillonCTA"));

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // Preload Critical Fonts for better Core Web Vitals (FCP, LCP)
    const fonts = [
      { href: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', type: 'font/woff2' },
      { href: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', type: 'font/woff2' }
    ];

    fonts.forEach(font => {
      let preloadLink = document.querySelector(`link[rel="preload"][href="${font.href}"]`);
      if (!preloadLink) {
        preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'font';
        preloadLink.type = font.type;
        preloadLink.href = font.href;
        preloadLink.crossOrigin = 'anonymous';
        document.head.appendChild(preloadLink);
      }
    });

    // Resource Hints - DNS prefetch only (lighter than preconnect)
    const prefetchDomains = [
      'https://base44.app',
      'https://qtrypzzcjebvfcihiynt.supabase.co',
      'https://fonts.gstatic.com'
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

    // SEO Meta Tags - Otimizado para conversão
    const pageTitles = {
      "Home": "DJ para Casamento e Eventos de Luxo em Trancoso | Toca Experience",
      "Agenda": "Agenda de Eventos | Toca Experience - Tony Monteiro & Enzo Furtado",
      "CasamentosTrancoso": "DJ para Casamento em Trancoso | Música Exclusiva para Seu Grande Dia",
      "AluguelEquipamentos": "Aluguel de Equipamentos DJ Pioneer em Trancoso | CDJ, Controladoras e Som",
      "EventosCorporativos": "DJ para Eventos Corporativos em Trancoso | Festas Empresariais Exclusivas"
    };

    document.title = pageTitles[currentPageName] || "Toca Experience | DJs Tony Monteiro & Enzo Furtado - Afro House & Organic House";

    // Meta Description - Otimizada com palavras-chave de cauda longa
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    const pageDescriptions = {
      "Home": "Experiências musicais exclusivas em Trancoso. DJs Tony Monteiro & Enzo Furtado. Aluguel de som profissional (CDJ, Controladoras, Caixas de Som) para festas e casamentos.",
      "Agenda": "Confira a agenda de eventos e próximas apresentações dos DJs Tony Monteiro e Enzo Furtado. Afro House, Organic House e House music em festivais, clubs e eventos privados.",
      "CasamentosTrancoso": "DJ especializado em casamentos de luxo em Trancoso. Som profissional Pioneer, trilha personalizada e experiência inesquecível para seu grande dia.",
      "AluguelEquipamentos": "Aluguel de equipamentos DJ profissionais em Trancoso: Pioneer CDJ-3000, Controladoras DDJ, caixas de som e iluminação para festas e eventos.",
      "EventosCorporativos": "DJs para eventos corporativos em Trancoso. Festas empresariais, lançamentos de produtos e confraternizações com música de alta qualidade."
    };

    metaDescription.content = pageDescriptions[currentPageName] || "Toca Experience apresenta Tony Monteiro & Enzo Furtado - duo de DJs especialistas em Afro House, Organic House e House. Contrate para casamentos, festivais, eventos corporativos e festas privadas.";

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

    // Schema.org JSON-LD - Múltiplos schemas para melhor SEO

    // LocalBusiness Schema
    let localBusinessSchema = document.querySelector('script[data-schema="localbusiness"]');
    if (!localBusinessSchema) {
      localBusinessSchema = document.createElement('script');
      localBusinessSchema.type = "application/ld+json";
      localBusinessSchema.setAttribute('data-schema', 'localbusiness');
      document.head.appendChild(localBusinessSchema);
    }
    localBusinessSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Toca Experience",
      "description": "DJs profissionais e aluguel de equipamentos de som em Trancoso",
      "url": "https://www.tocaexperience.com.br",
      "telephone": "+55-21-99773-1321",
      "email": "eventos@tocaexperience.com.br",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Trancoso",
        "addressRegion": "BA",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-16.5917",
        "longitude": "-39.0736"
      },
      "priceRange": "$$$$",
      "openingHours": "Mo-Su 00:00-23:59",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47"
      }
    });

    // Service Schema
    let serviceSchema = document.querySelector('script[data-schema="service"]');
    if (!serviceSchema) {
      serviceSchema = document.createElement('script');
      serviceSchema.type = "application/ld+json";
      serviceSchema.setAttribute('data-schema', 'service');
      document.head.appendChild(serviceSchema);
    }
    serviceSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "DJ Services & Equipment Rental",
      "provider": {
        "@type": "Organization",
        "name": "Toca Experience"
      },
      "areaServed": {
        "@type": "City",
        "name": "Trancoso"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "DJ e Aluguel de Equipamentos",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "DJ para Casamento"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Aluguel de Equipamentos DJ Pioneer"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "DJ para Eventos Corporativos"
            }
          }
        ]
      }
    });

    // MusicGroup Schema
    let musicGroupSchema = document.querySelector('script[data-schema="musicgroup"]');
    if (!musicGroupSchema) {
      musicGroupSchema = document.createElement('script');
      musicGroupSchema.type = "application/ld+json";
      musicGroupSchema.setAttribute('data-schema', 'musicgroup');
      document.head.appendChild(musicGroupSchema);
    }
    musicGroupSchema.textContent = JSON.stringify({
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
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M6JSFD39"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div className="min-h-screen">
        {/* Réveillon CTA Banner */}
        <React.Suspense fallback={null}>
          <ReveillonCTA />
        </React.Suspense>
        
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