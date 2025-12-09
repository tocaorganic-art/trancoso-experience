import React from "react";

/**
 * Schema Markup para Eventos (schema.org/Event)
 * Melhora a exibição nos resultados de busca do Google
 */
export default function EventSchemaMarkup({ evento }) {
  React.useEffect(() => {
    if (!evento) return;

    // Criar schema para o evento
    const eventSchema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": evento.nome || evento.title,
      "startDate": evento.data || evento.event_date,
      "endDate": evento.data || evento.event_date,
      "location": {
        "@type": "Place",
        "name": evento.local || evento.location,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": evento.localidade || "Trancoso",
          "addressRegion": "BA",
          "addressCountry": "BR"
        }
      },
      "description": evento.detalhes || evento.description || `Evento exclusivo em ${evento.localidade || 'Trancoso'}`,
      "organizer": {
        "@type": "Organization",
        "name": "Toca Experience",
        "url": "https://tocaexperience.com.br"
      },
      "performer": {
        "@type": "MusicGroup",
        "name": "Tony Monteiro & Enzo Furtado"
      },
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
    };

    // Adicionar imagem se disponível
    if (evento.imagem || evento.cover_image) {
      eventSchema.image = evento.imagem || evento.cover_image;
    }

    // Adicionar ofertas/ingressos se disponível
    if (evento.link_compra) {
      eventSchema.offers = {
        "@type": "Offer",
        "url": evento.link_compra,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      };
    }

    // Adicionar ao head
    let schemaScript = document.querySelector(`script[data-event-schema="${evento.id}"]`);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute('data-event-schema', evento.id);
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(eventSchema);

    return () => {
      // Cleanup ao desmontar
      const script = document.querySelector(`script[data-event-schema="${evento.id}"]`);
      if (script) script.remove();
    };
  }, [evento]);

  return null;
}

/**
 * Schema Markup para Lista de Eventos (ItemList)
 */
export function EventListSchemaMarkup({ eventos }) {
  React.useEffect(() => {
    if (!eventos || eventos.length === 0) return;

    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": eventos.slice(0, 20).map((evento, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "name": evento.nome || evento.title,
          "url": `https://tocaexperience.com.br/EventosAnoNovo#evento-${evento.id}`,
          "startDate": evento.data || evento.event_date,
          "location": {
            "@type": "Place",
            "name": evento.local || evento.location,
            "address": evento.localidade || "Trancoso"
          }
        }
      }))
    };

    let schemaScript = document.querySelector('script[data-schema="event-list"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute('data-schema', 'event-list');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(listSchema);

    return () => {
      const script = document.querySelector('script[data-schema="event-list"]');
      if (script) script.remove();
    };
  }, [eventos]);

  return null;
}