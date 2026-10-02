import React, { useEffect } from "react";
import { Toaster } from "sonner";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Calendar, ConciergeBell, Newspaper, Disc3, Music, Calendar as CalendarIcon } from "lucide-react";
import TrackingProvider from "@/components/tracking/TrackingProvider";
import { isNoIndexPage } from "@/lib/internalPages";
import SiteFooterInfo from "@/components/layout/SiteFooterInfo";
import { DsButton } from "@shared";
import logoWeb720 from "@/assets/brand/logo-web-720.png";
import simbolo192 from "@/assets/brand/simbolo-192.png";
import { ECOSYSTEM_LINKS } from "@shared/ui/EcosystemHub";

const ReveillonCTA = React.lazy(() => import("@/components/marketing/ReveillonCTA"));
const GlobalSearchBar = React.lazy(() => import("@/components/search/GlobalSearchBar"));
const FloatingChatWidget = React.lazy(() => import("@/components/chatbot/FloatingChatWidget"));

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // Canonical URL - Evita conteúdo duplicado
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    const baseUrl = 'https://www.tocaexperience.com.br';
    const pageUrls = {
      "Home": baseUrl,
      "EventosAnoNovo": `${baseUrl}/EventosAnoNovo`,
      "CasamentosTrancoso": `${baseUrl}/CasamentosTrancoso`,
      "AluguelEquipamentos": `${baseUrl}/AluguelEquipamentos`,
      "EventosCorporativos": `${baseUrl}/EventosCorporativos`,
      "Curadoria": `${baseUrl}/Curadoria`,
      "Discografia": `${baseUrl}/Discografia`,
      "LocacaoSom": `${baseUrl}/LocacaoSom`,
      "Cotacao": `${baseUrl}/Cotacao`,
      "Ethos": `${baseUrl}/Ethos`,
      "Concierge": `${baseUrl}/Concierge`,
      "ConciergeProposta": `${baseUrl}/ConciergeProposta`
    };
    canonicalLink.href = pageUrls[currentPageName] || baseUrl;

    // Hreflang para SEO internacional
    let hreflangPtBr = document.querySelector('link[rel="alternate"][hreflang="pt-BR"]');
    if (!hreflangPtBr) {
      hreflangPtBr = document.createElement('link');
      hreflangPtBr.rel = 'alternate';
      hreflangPtBr.hreflang = 'pt-BR';
      document.head.appendChild(hreflangPtBr);
    }
    hreflangPtBr.href = canonicalLink.href;

    // Robots meta tag - controle de indexação
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = isNoIndexPage(currentPageName) 
      ? 'noindex, nofollow' 
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    // Fontes (Nunito Sans/Newsreader) são auto-hospedadas e carregadas via CSS (font-display: swap).

    // Resource Hints - DNS prefetch + Preconnect para CDNs críticos
    const prefetchDomains = [
      'https://base44.app',
      'https://qtrypzzcjebvfcihiynt.supabase.co',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://connect.facebook.net',
      'https://assets.mixkit.co'
    ];

    const preconnectDomains = [
      'https://qtrypzzcjebvfcihiynt.supabase.co', // CDN de imagens
      'https://fonts.gstatic.com', // CDN de fonts
      'https://assets.mixkit.co' // CDN de vídeos
    ];

    // DNS Prefetch para todos os domínios
    prefetchDomains.forEach(domain => {
      let link = document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      }
    });

    // Preconnect para CDNs críticos (mais rápido)
    preconnectDomains.forEach(domain => {
      let link = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // SEO Meta Tags - Otimizado para conversão + Long-tail keywords
    const pageTitles = {
      "Home": "DJ para Casamento e Eventos em Trancoso | Toca Experience",
      "Agenda": "Agenda de Eventos | Toca Experience - Tony Monteiro & Enzo Furtado",
      "CasamentosTrancoso": "DJ para Casamento em Trancoso | Música Exclusiva para Seu Grande Dia",
      "AluguelEquipamentos": "Aluguel de Equipamentos DJ Pioneer em Trancoso | CDJ, Controladoras e Som",
      "EventosCorporativos": "DJ para Eventos Corporativos em Trancoso | Festas Empresariais Exclusivas",
      "EventosAnoNovo": "Réveillon Trancoso 2025/2026 | Festas de Ano Novo Premium em Caraíva e Arraial",
      "LocacaoSom": "Locação de Som Profissional em Trancoso | Aluguel Pioneer CDJ-3000 e Funktion-One",
      "Curadoria": "Curadoria Musical Afro House & Organic House | Playlists e Sets Exclusivos",
      "Discografia": "Discografia Tony Monteiro & Enzo Furtado | Releases Afro House e Organic House",
      "Ethos": "Sobre Toca Experience | Filosofia e Valores dos DJs Tony Monteiro e Enzo Furtado",
      "Cotacao": "Solicitar Orçamento DJ Trancoso | Cotação Personalizada para Eventos",
      "Obrigado": "Cotação Recebida | Toca Experience - Aguarde Nosso Contato",
      "Concierge": "Concierge Privativo: Experiências Exclusivas | Toca Experience",
      "ConciergeProposta": "Friend’s Party Experience · Experiência Tony | Proposta Toca Experience"
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
      "Home": "Viva o Novo - Viva Experiências. Experiências musicais exclusivas em Trancoso. Tony Monteiro & Enzo Furtado. Aluguel de som profissional (CDJ, Controladoras, Caixas de Som) para festas e casamentos.",
      "Agenda": "Viva o Novo - Viva Experiências. Confira a agenda de eventos e próximas apresentações. Tony Monteiro e Enzo Furtado. Afro House, Organic House e House music em festivais, clubs e eventos privados.",
      "CasamentosTrancoso": "Viva o Novo - Viva Experiências. Casamentos de luxo em Trancoso. Som profissional Pioneer, trilha personalizada e experiência inesquecível para seu grande dia.",
      "AluguelEquipamentos": "Viva o Novo - Viva Experiências. Aluguel de equipamentos profissionais em Trancoso: Pioneer CDJ-3000, Controladoras DDJ, caixas de som e iluminação para festas e eventos.",
      "EventosCorporativos": "Viva o Novo - Viva Experiências. Eventos corporativos em Trancoso. Festas empresariais, lançamentos de produtos e confraternizações com música de alta qualidade.",
      "EventosAnoNovo": "Viva o Novo - Viva Experiências. Guia completo de festas e eventos de Réveillon 2025/2026 em Trancoso, Caraíva e Arraial d'Ajuda. Mais de 40 opções de festas premium, open bar, música internacional. Ingressos e reservas disponíveis.",
      "LocacaoSom": "Viva o Novo - Viva Experiências. Locação de equipamentos de som profissional em Trancoso: Pioneer CDJ-3000, DJM-V10, Funktion-One, iluminação LED. Instalação e suporte técnico inclusos. Ideal para casamentos, festas e eventos.",
      "Curadoria": "Viva o Novo - Viva Experiências. Curadoria musical especializada em Afro House, Organic House e House Music. Playlists exclusivas, sets ao vivo e conteúdo selecionado por Tony Monteiro e Enzo Furtado.",
      "Discografia": "Viva o Novo - Viva Experiências. Discografia completa de Tony Monteiro e Enzo Furtado. Ouça lançamentos, remixes e produções originais de Afro House e Organic House. Disponível no Spotify, SoundCloud e Apple Music.",
      "Ethos": "Viva o Novo - Viva Experiências. Conheça a filosofia da Toca Experience: música como linguagem universal, fusão de brasilidades com eletrônica contemporânea, e excelência técnica em cada apresentação.",
      "Cotacao": "Viva o Novo - Viva Experiências. Solicite um orçamento personalizado para casamentos, eventos corporativos, festas privadas e Réveillon em Trancoso.",
      "Obrigado": "Viva o Novo - Viva Experiências. Sua cotação foi recebida! A equipe Toca Experience entrará em contato em breve para discutir os detalhes do seu evento exclusivo.",
      "Concierge": "Viva o Novo - Viva Experiências. Concierge privativo para experiências exclusivas: propostas completas com concierge, chef privativo, barman, DJ e logística em destinos premium.",
      "ConciergeProposta": "Viva o Novo - Viva Experiências. Proposta exclusiva Friend's Party Experience · Experiência Tony: concierge, chef privativo, governança, barman e DJ, logística privativa e noites VIP no Surreal Park e no Green Valley."
    };

    metaDescription.content = pageDescriptions[currentPageName] || "Toca Experience apresenta Tony Monteiro & Enzo Furtado - duo de DJs especialistas em Afro House, Organic House e House. Contrate para casamentos, festivais, eventos corporativos e festas privadas.";

    // Meta Keywords - Long-tail SEO
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    const pageKeywords = {
      "Home": "DJ para casamento Trancoso, DJ eventos premium, aluguel som profissional Trancoso, Afro House Brasil, DJ casamento praia",
      "EventosAnoNovo": "reveillon trancoso 2026, festa ano novo caraiva, eventos premium arraial ajuda, ingressos reveillon bahia, festas fim de ano trancoso",
      "CasamentosTrancoso": "DJ casamento Trancoso, musica casamento praia, DJ destination wedding, som casamento profissional, playlist casamento exclusiva",
      "AluguelEquipamentos": "aluguel Pioneer CDJ Trancoso, locação equipamento DJ, som profissional eventos, Funktion-One aluguel, iluminação festa",
      "LocacaoSom": "locação som profissional Trancoso, aluguel caixa de som eventos, equipamento DJ Bahia, sistema de som casamento",
      "EventosCorporativos": "DJ evento corporativo Trancoso, festa empresa exclusiva, confraternização empresarial musica, evento corporativo premium",
      "Curadoria": "curadoria musical Afro House, playlist Organic House, sets exclusivos house music, seleção musical profissional",
      "Discografia": "Tony Monteiro Spotify, lancamentos Afro House Brasil, producoes Organic House, artistas house music brasileiros",
      "Concierge": "concierge privativo, experiencia privativa balneario camboriu, friend's party experience, concierge premium, proposta concierge toca experience",
      "ConciergeProposta": "friend's party experience, experiencia tony balneario camboriu, proposta concierge privativa, surreal park, green valley"
    };
    metaKeywords.content = pageKeywords[currentPageName] || "DJ, Afro House, Organic House, House Music, Tony Monteiro, Enzo Furtado, Toca Experience, DJ para casamento, DJ para evento, DJ Trancoso, festival, sunset, pool party";

    // Open Graph Tags - Dinâmico por página
    const defaultOgImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/45fbf25d5_anima_o_ultra_realista_e_ultra_hd_estilo.jpg";
    
    const pageOgData = {
      "Home": {
        title: "Toca Experience | DJs Premium para Casamentos e Eventos em Trancoso",
        description: "DJs profissionais Tony Monteiro & Enzo Furtado. Especializados em Afro House, Organic House. Aluguel de equipamentos Pioneer. Atendemos Trancoso, Caraíva e região.",
        type: "website"
      },
      "EventosAnoNovo": {
        title: "Réveillon Trancoso 2025/2026 | Guia Completo de Festas de Ano Novo Premium",
        description: "Mais de 40 eventos exclusivos de Réveillon em Trancoso, Caraíva e Arraial d'Ajuda. DJs internacionais, open bar premium, festas na praia.",
        type: "website"
      },
      "CasamentosTrancoso": {
        title: "DJ para Casamento em Trancoso | Som Pioneer e Curadoria Musical Exclusiva",
        description: "DJ especializado em casamentos. Equipamentos Pioneer de última geração, playlist personalizada, experiência inesquecível na praia.",
        type: "website"
      },
      "Discografia": {
        title: "True To Myself - Tony Monteiro | Já Disponível",
        description: "🎵 Novo single 'True To Myself' de Tony Monteiro já disponível! Ouça agora na sua playlist favorita.",
        type: "music.song",
        url: "https://ffm.to/truetomyself"
      }
    };

    const ogData = pageOgData[currentPageName] || {
      title: document.title,
      description: metaDescription.content,
      type: "website"
    };

    const ogTags = [
      { property: "og:title", content: ogData.title },
      { property: "og:description", content: ogData.description },
      { property: "og:image", content: defaultOgImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1200" },
      { property: "og:type", content: ogData.type },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: ogData.url || canonicalLink.href },
      { property: "og:site_name", content: "Toca Experience" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogData.title },
      { name: "twitter:description", content: ogData.description },
      { name: "twitter:image", content: defaultOgImage },
      { name: "twitter:site", content: "@tonyismusic" },
      { name: "twitter:creator", content: "@tonyismusic" }
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
      "alternateName": "Tony Monteiro & Enzo Furtado",
      "description": "Duo de DJs Tony Monteiro e Enzo Furtado, especialistas em Afro House, Organic House e House Music.",
      "genre": ["Afro House", "Organic House", "House Music", "Electronic Dance Music"],
      "foundingDate": "2015",
      "foundingLocation": {
        "@type": "Place",
        "name": "Trancoso, Bahia, Brasil"
      },
      "member": [
        {
          "@type": "Person",
          "name": "Tony Monteiro",
          "jobTitle": "DJ & Music Producer",
          "description": "DJ internacional especializado em Afro House, Organic House e MPB Rock Club",
          "sameAs": [
            "https://www.instagram.com/tonyismusic",
            "https://open.spotify.com/artist/2r4S2RPdfnx7UPL73jJWlQ",
            "https://soundcloud.com/YjRNAgQXyfWcPrfAX1",
            "https://music.apple.com/br/artist/tony-monteiro/373816598"
          ]
        },
        {
          "@type": "Person",
          "name": "Enzo Furtado",
          "jobTitle": "DJ & Music Producer",
          "description": "DJ residente especializado em Organic House e vibes tropicais de Trancoso",
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

    // Breadcrumb Schema
    const breadcrumbPaths = {
      "EventosAnoNovo": ["Home", "Eventos de Ano Novo"],
      "CasamentosTrancoso": ["Home", "Serviços", "Casamentos"],
      "AluguelEquipamentos": ["Home", "Serviços", "Aluguel de Equipamentos"],
      "LocacaoSom": ["Home", "Serviços", "Locação de Som"],
      "EventosCorporativos": ["Home", "Serviços", "Eventos Corporativos"],
      "Curadoria": ["Home", "Curadoria Musical"],
      "Discografia": ["Home", "Discografia"],
      "Cotacao": ["Home", "Solicitar Cotação"],
      "Concierge": ["Home", "Concierge"],
      "ConciergeProposta": ["Home", "Concierge", "Friend's Party Experience"]
    };

    if (breadcrumbPaths[currentPageName]) {
      let breadcrumbSchema = document.querySelector('script[data-schema="breadcrumb"]');
      if (!breadcrumbSchema) {
        breadcrumbSchema = document.createElement('script');
        breadcrumbSchema.type = "application/ld+json";
        breadcrumbSchema.setAttribute('data-schema', 'breadcrumb');
        document.head.appendChild(breadcrumbSchema);
      }
      
      const itemListElement = breadcrumbPaths[currentPageName].map((name, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": name,
        "item": index === 0 ? baseUrl : `${baseUrl}/${currentPageName}`
      }));

      breadcrumbSchema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement
      });
    }

    // FAQ Schema para páginas de serviço
    if (currentPageName === "CasamentosTrancoso" || currentPageName === "LocacaoSom") {
      let faqSchema = document.querySelector('script[data-schema="faq"]');
      if (!faqSchema) {
        faqSchema = document.createElement('script');
        faqSchema.type = "application/ld+json";
        faqSchema.setAttribute('data-schema', 'faq');
        document.head.appendChild(faqSchema);
      }
      
      const faqData = {
        "CasamentosTrancoso": [
          {
            question: "Quanto custa um DJ para casamento em Trancoso?",
            answer: "Os valores variam de R$ 15.000 a R$ 50.000+ dependendo da duração, equipamentos e personalização. Entre em contato para orçamento personalizado."
          },
          {
            question: "Vocês fornecem equipamento de som?",
            answer: "Sim! Trabalhamos com equipamentos Pioneer de última geração (CDJ-3000, DJM-V10) e sistemas de som Funktion-One."
          },
          {
            question: "Qual o estilo musical?",
            answer: "Especializados em Afro House, Organic House e House Music. Também criamos playlists personalizadas incluindo MPB, Bossa Nova e outros estilos conforme preferência do casal."
          }
        ],
        "LocacaoSom": [
          {
            question: "Quais equipamentos estão disponíveis para aluguel?",
            answer: "Pioneer CDJ-3000, DJM-V10, controladoras DDJ, caixas de som Funktion-One, iluminação LED profissional e microfones sem fio."
          },
          {
            question: "A instalação está incluída?",
            answer: "Sim! Instalação, configuração e suporte técnico durante o evento estão inclusos no aluguel."
          },
          {
            question: "Vocês atendem eventos residenciais?",
            answer: "Sim! Atendemos casamentos, festas privadas, eventos corporativos e residenciais em Trancoso e região."
          }
        ]
      };

      if (faqData[currentPageName]) {
        faqSchema.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData[currentPageName].map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        });
      }
    }

  }, [currentPageName]);

  return (
    <TrackingProvider>
      {/* Google Ads Tag (gtag.js) - Primary */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17649743667"></script>
      <script dangerouslySetInnerHTML={{__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17649743667');
        gtag('config', 'G-8HTCZ1069J');

        // Google Ads Click Conversion Function
        function gtag_report_conversion(url) {
          var callback = function () {
            if (typeof(url) != 'undefined') {
              window.location = url;
            }
          };
          gtag('event', 'conversion', {
            'send_to': 'AW-17649743667/Px_YCKCb3s4bELPuhuBB',
            'value': 1.0,
            'currency': 'BRL',
            'event_callback': callback
          });
          return false;
        }
      `}} />

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
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[10000] focus:px-4 focus:py-3 focus:text-sm focus:font-bold"
          style={{ backgroundColor: "var(--ds-color-action)", color: "var(--ds-color-on-action)", borderRadius: "var(--ds-radius-sm)" }}
        >
          Pular para o conteúdo
        </a>

        {/* Réveillon CTA Banner */}
        <React.Suspense fallback={null}>
          <ReveillonCTA />
        </React.Suspense>

        {/* Barra de Navegação Global - Aparece em todas as páginas */}
        <div 
          id="categories-bar"
          className="sticky top-0 z-50 overflow-hidden border-b border-white/10 backdrop-blur-[18px]"
          style={{ backgroundColor: "var(--toca-header-bg)" }}
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex min-w-0 items-center justify-between">
              {/* Logo + Navigation Links */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Link to={createPageUrl("Home")} className="flex-shrink-0 flex items-center gap-2" aria-label="TOCA EXPERIENCE, página inicial">
                  <img
                    src={simbolo192}
                    alt=""
                    width="36"
                    height="36"
                    className="h-9 w-9 rounded-[10px] object-cover"
                  />
                  <span className="hidden sm:inline text-xs font-extrabold tracking-[0.18em]" style={{ color: "var(--toca-areia)" }}>
                    TOCA EXPERIENCE
                  </span>
                </Link>
                <nav aria-label="Principal" className="flex min-w-0 flex-nowrap items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <Button asChild variant="ghost" 
                    size="sm"
                    className="min-h-[44px] text-[#F2DEC4] hover:text-white hover:bg-white/10 text-xs whitespace-nowrap font-medium tracking-wide transition-all duration-200 rounded-full px-2 py-1">
                  <Link to={createPageUrl("Ethos")}>
                    ETHOS
                  </Link>
                </Button>
                <Button asChild variant="ghost" 
                    size="sm"
                    className="min-h-[44px] text-[#F2DEC4] hover:text-white hover:bg-white/10 text-xs whitespace-nowrap font-medium tracking-wide transition-all duration-200 rounded-full px-2 py-1">
                  <Link to={createPageUrl("Eventos")}>
                    <Calendar className="mr-0.5 h-2.5 w-2.5" /> EVENTOS
                  </Link>
                </Button>
                <Button asChild variant="ghost" 
                    size="sm"
                    className="min-h-[44px] text-[#F2DEC4] hover:text-white hover:bg-white/10 text-xs whitespace-nowrap font-medium tracking-wide transition-all duration-200 rounded-full px-2 py-1">
                  <Link to={createPageUrl("Curadoria")}>
                    <Newspaper className="mr-0.5 h-2.5 w-2.5" /> CURADORIA
                  </Link>
                </Button>
                <Button asChild variant="ghost" 
                    size="sm"
                    className="min-h-[44px] text-[#F2DEC4] hover:text-white hover:bg-white/10 text-xs whitespace-nowrap font-medium tracking-wide transition-all duration-200 rounded-full px-2 py-1">
                  <Link to={createPageUrl("Cotacao")}>
                    <CalendarIcon className="mr-0.5 h-2.5 w-2.5" /> COTAÇÃO
                  </Link>
                </Button>
                <Button asChild variant="ghost" 
                    size="sm"
                    className="min-h-[44px] text-[#F2DEC4] hover:text-white hover:bg-white/10 text-xs whitespace-nowrap font-medium tracking-wide transition-all duration-200 rounded-full px-2 py-1">
                  <Link to={createPageUrl("Discografia")}>
                    <Disc3 className="mr-0.5 h-2.5 w-2.5" /> DISCOS
                  </Link>
                </Button>

                <Button asChild variant="ghost" 
                    size="sm"
                    className="min-h-[44px] text-[#F2DEC4] hover:text-white hover:bg-white/10 text-xs whitespace-nowrap font-medium tracking-wide transition-all duration-200 rounded-full px-2 py-1">
                  <Link to={createPageUrl("LocacaoSom")}>
                    <Music className="mr-0.5 h-2.5 w-2.5" /> LOCAÇÃO DE SOM
                  </Link>
                </Button>

                <Button asChild variant="ghost"
                    size="sm"
                    className="min-h-[44px] text-[#F2DEC4] hover:text-white hover:bg-white/10 text-xs whitespace-nowrap font-medium tracking-wide transition-all duration-200 rounded-full px-2 py-1">
                  <Link to={createPageUrl("Concierge")}>
                    <ConciergeBell className="mr-0.5 h-2.5 w-2.5" /> CONCIERGE
                  </Link>
                </Button>
                {ECOSYSTEM_LINKS.filter((i) => !i.current).map((item) => (
                  <Button key={item.id} asChild variant="ghost"
                      size="sm"
                      className="min-h-[44px] text-[#F2DEC4] hover:text-white hover:bg-white/10 text-xs whitespace-nowrap font-medium tracking-wide">
                    <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} (abre em nova aba)`}>
                      {item.name.toUpperCase()}
                    </a>
                  </Button>
                ))}
                  </nav>
                  </div>
              <DsButton href={createPageUrl("Cotacao")} className="ml-3 hidden whitespace-nowrap !min-h-[40px] !px-4 !py-2 !text-sm sm:inline-flex">
                Solicitar proposta
              </DsButton>
            </div>
          </div>
        </div>
        
        <Toaster position="top-center" richColors />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="py-8 border-t border-gray-200/60 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3" style={{ backgroundColor: "var(--toca-obsidiana)", borderRadius: "var(--toca-radius-lg)" }}>
                <picture>
                  <source media="(min-width: 700px)" srcSet={logoWeb720} />
                  <img
                    src={simbolo192}
                    alt="TOCA EXPERIENCE. Experiências que conectam você ao seu próximo destino."
                    width="720"
                    height="379"
                    className="h-24 w-24 object-cover min-[700px]:h-auto min-[700px]:w-[640px] min-[700px]:max-w-full"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            <SiteFooterInfo />
          </div>
        </footer>

        {/* Floating Chat Widget */}
        <React.Suspense fallback={null}>
          <FloatingChatWidget />
        </React.Suspense>
        </div>
    </TrackingProvider>
  );
}