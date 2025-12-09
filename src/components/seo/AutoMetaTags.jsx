import React from "react";

/**
 * AutoMetaTags - Geração automática de meta tags para SEO
 * Analisa o conteúdo da página e gera título e descrição otimizados
 */
export default function AutoMetaTags({ 
  title, 
  description, 
  keywords = [],
  ogImage,
  canonical,
  structuredData 
}) {
  React.useEffect(() => {
    // Title
    if (title) {
      document.title = `${title} | Toca Experience - DJ Trancoso`;
    }

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription && description) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    if (metaDescription && description) {
      metaDescription.content = description;
    }

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords && keywords.length > 0) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    if (metaKeywords && keywords.length > 0) {
      metaKeywords.content = keywords.join(', ');
    }

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical && canonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    if (linkCanonical && canonical) {
      linkCanonical.href = canonical;
    }

    // Open Graph Tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png" },
      { property: "og:url", content: canonical || window.location.href },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description }
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

    // Structured Data (Schema.org)
    if (structuredData) {
      let schemaScript = document.querySelector('script[data-schema="auto"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = "application/ld+json";
        schemaScript.setAttribute('data-schema', 'auto');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(structuredData);
    }

    return () => {
      // Cleanup on unmount
      if (structuredData) {
        const schemaScript = document.querySelector('script[data-schema="auto"]');
        if (schemaScript) schemaScript.remove();
      }
    };
  }, [title, description, keywords, ogImage, canonical, structuredData]);

  return null;
}

/**
 * Hook para gerar meta tags automaticamente baseado no conteúdo
 */
export const useAutoSEO = (pageName, pageContent) => {
  const [seoData, setSeoData] = React.useState(null);

  React.useEffect(() => {
    // Dados base por página
    const seoConfig = {
      "Home": {
        title: "DJ para Casamento e Eventos de Luxo em Trancoso",
        description: "Experiências musicais exclusivas em Trancoso com Tony Monteiro & Enzo Furtado. Afro House, Organic House para casamentos, festas e eventos corporativos.",
        keywords: ["dj trancoso", "dj para casamento", "afro house", "organic house", "eventos trancoso", "casamento trancoso"],
        canonical: "https://tocaexperience.com.br"
      },
      "CasamentosTrancoso": {
        title: "DJ para Casamento em Trancoso | Som Pioneer e Experiência Exclusiva",
        description: "DJs especializados em casamentos de luxo em Trancoso. Equipamentos Pioneer CDJ-3000, trilha personalizada e 500+ eventos realizados. Transforme seu grande dia em uma experiência inesquecível.",
        keywords: ["dj casamento trancoso", "casamento trancoso", "dj para casamento bahia", "festa casamento trancoso", "música casamento"],
        canonical: "https://tocaexperience.com.br/CasamentosTrancoso"
      },
      "EventosCorporativos": {
        title: "DJ para Eventos Corporativos em Trancoso | Festas Empresariais de Alto Nível",
        description: "DJs profissionais para eventos corporativos, lançamentos de produtos e confraternizações em Trancoso. Música de qualidade com equipamentos Pioneer de última geração.",
        keywords: ["dj corporativo trancoso", "evento empresarial", "festa corporativa trancoso", "lançamento produto"],
        canonical: "https://tocaexperience.com.br/EventosCorporativos"
      },
      "AluguelEquipamentos": {
        title: "Aluguel de Equipamentos DJ Pioneer em Trancoso | CDJ-3000 e Controladoras",
        description: "Aluguel de equipamentos DJ profissionais em Trancoso: Pioneer CDJ-3000, controladoras DDJ, caixas de som RCF e iluminação. Entrega e instalação incluídas.",
        keywords: ["aluguel equipamento dj trancoso", "pioneer cdj trancoso", "aluguel som trancoso", "equipamento festa"],
        canonical: "https://tocaexperience.com.br/AluguelEquipamentos"
      },
      "LocacaoSom": {
        title: "Locação de Som Profissional em Trancoso | Equipamentos Pioneer e RCF",
        description: "Locação de som profissional para festas e eventos em Trancoso. Caixas RCF, CDJ Pioneer, iluminação e instalação completa. A partir de R$ 800/dia.",
        keywords: ["locação som trancoso", "aluguel som profissional", "equipamento festa trancoso", "som pioneer"],
        canonical: "https://tocaexperience.com.br/LocacaoSom"
      },
      "EventosAnoNovo": {
        title: "Guia Completo: Ano Novo em Trancoso, Caraíva e Arraial 2025/2026",
        description: "Descubra os melhores eventos de Ano Novo em Trancoso, Caraíva e Arraial d'Ajuda. Festas exclusivas, DJs internacionais e experiências inesquecíveis no litoral baiano.",
        keywords: ["ano novo trancoso", "reveillon trancoso", "festas caraiva", "ano novo bahia", "eventos arraial"],
        canonical: "https://tocaexperience.com.br/EventosAnoNovo"
      },
      "Curadoria": {
        title: "Curadoria Musical | Blog Afro House e Organic House | Toca Experience",
        description: "Descubra o melhor do Afro House e Organic House. Playlists curadas, análises de releases e a cultura da música eletrônica orgânica em Trancoso.",
        keywords: ["afro house", "organic house", "blog musica eletronica", "curadoria musical", "playlists"],
        canonical: "https://tocaexperience.com.br/Curadoria"
      },
      "Discografia": {
        title: "Discografia Oficial | Tony Monteiro & Enzo Furtado | 500k+ Streams",
        description: "Ouça as produções oficiais de Tony Monteiro e Enzo Furtado. Mais de 500 mil streams, lançamentos em selos internacionais. Afro House, Organic House e MPB Rock Club.",
        keywords: ["tony monteiro", "enzo furtado", "discografia afro house", "producoes musicais", "spotify"],
        canonical: "https://tocaexperience.com.br/Discografia"
      }
    };

    setSeoData(seoConfig[pageName] || null);
  }, [pageName]);

  return seoData;
};