import React from "react";

/**
 * StructuredDataEvents - Schema markup dinâmico para eventos
 * Melhora SEO com rich snippets de eventos no Google
 */
export default function StructuredDataEvents({ eventos = [] }) {
  React.useEffect(() => {
    if (!eventos || eventos.length === 0) return;

    // Criar schema para TODOS os eventos com propriedades completas
    const eventSchemas = eventos.map(evento => {
      const endDate = evento.data === "2025-12-31" || evento.data === "2026-01-01" 
        ? `${evento.data}T06:00:00-03:00` 
        : `${evento.data}T23:59:00-03:00`;

      const schema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": evento.nome,
        "description": evento.detalhes || `${evento.nome} - Evento de Réveillon 2025/2026 em ${evento.localidade}. ${evento.tags?.join(', ') || 'Música ao vivo, DJ sets, festa premium'}`,
        "startDate": `${evento.data}T20:00:00-03:00`,
        "endDate": endDate,
        "eventStatus": evento.status === "Confirmado" ? "https://schema.org/EventScheduled" : "https://schema.org/EventPostponed",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": evento.local,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": evento.local,
            "addressLocality": evento.localidade,
            "addressRegion": "BA",
            "postalCode": evento.localidade === "Trancoso" ? "45818-000" : evento.localidade === "Caraíva" ? "45818-000" : "45816-000",
            "addressCountry": "BR"
          }
        },
        "image": [
          evento.imagem || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png?width=1200&quality=85&format=webp"
        ],
        "organizer": {
          "@type": "Organization",
          "name": "Toca Experience",
          "url": "https://tocaexperience.com.br",
          "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/e3f5d6cf3_LOGO_VERT_POSIT.png"
        },
        "performer": {
          "@type": "MusicGroup",
          "name": evento.nome.split(' - ')[0] || "DJs Internacionais",
          "url": "https://tocaexperience.com.br"
        }
      };

      // Adicionar offers se disponível
      if (evento.link_compra) {
        schema.offers = {
          "@type": "Offer",
          "url": evento.link_compra,
          "availability": "https://schema.org/InStock",
          "priceCurrency": "BRL",
          "validFrom": "2024-12-01T00:00:00-03:00"
        };
      }

      return schema;
    });

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