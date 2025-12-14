import React from "react";

/**
 * StructuredDataEvents - Schema markup dinâmico para eventos
 * Melhora SEO com rich snippets de eventos no Google
 */
export default function StructuredDataEvents({ eventos = [] }) {
  React.useEffect(() => {
    if (!eventos || eventos.length === 0) return;

    // Criar schema para os 10 primeiros eventos
    const eventSchemas = eventos.slice(0, 10).map(evento => ({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": evento.nome,
      "description": evento.detalhes || `Evento de Réveillon em ${evento.localidade}`,
      "startDate": `${evento.data}T20:00:00-03:00`,
      "endDate": `${evento.data}T06:00:00-03:00`,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": evento.local,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": evento.localidade,
          "addressRegion": "BA",
          "addressCountry": "BR"
        }
      },
      "image": evento.imagem || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png",
      "organizer": {
        "@type": "Organization",
        "name": "Toca Experience",
        "url": "https://tocaexperience.com.br"
      },
      "performer": {
        "@type": "MusicGroup",
        "name": "Toca Experience"
      },
      ...(evento.link_compra && {
        "offers": {
          "@type": "Offer",
          "url": evento.link_compra,
          "availability": "https://schema.org/InStock",
          "priceCurrency": "BRL"
        }
      })
    }));

    let schemaScript = document.querySelector('script[data-schema="events-list"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-schema', 'events-list');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(eventSchemas);

    return () => {
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript);
      }
    };
  }, [eventos]);

  return null;
}