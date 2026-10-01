import React from "react";

/**
 * Schema Markup para Serviços (schema.org/Service)
 * Usado nas páginas de serviço (Casamentos, Corporativo, Equipamentos)
 */
export default function ServiceSchemaMarkup({ service }) {
  React.useEffect(() => {
    if (!service) return;

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": service.name,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Toca Experience",
        "url": "https://tocaexperience.com.br",
        "telephone": "+55-21-99773-1321",
        "email": "eventos@tocaexperience.com.br",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Trancoso",
          "addressRegion": "BA",
          "addressCountry": "BR"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": "Trancoso"
      },
      "description": service.description,
      "category": service.category || "DJ Services"
    };

    // Adicionar ao head
    let schemaScript = document.querySelector(`script[data-service-schema="${service.id}"]`);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute('data-service-schema', service.id);
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(serviceSchema);

    return () => {
      const script = document.querySelector(`script[data-service-schema="${service.id}"]`);
      if (script) script.remove();
    };
  }, [service]);

  return null;
}

/**
 * Dados pré-configurados de serviços para SEO
 */
export const serviceData = {
  casamentos: {
    id: "casamentos",
    name: "DJ para Casamento em Trancoso",
    description: "DJ especializado em casamentos de luxo em Trancoso. Equipamentos Pioneer CDJ-3000, som profissional e experiência inesquecível para seu grande dia.",
    category: "Wedding DJ Services"
  },
  corporativo: {
    id: "corporativo",
    name: "DJ para Eventos Corporativos",
    description: "DJs profissionais para eventos empresariais, lançamentos de produtos e confraternizações em Trancoso. Música de alta qualidade e equipamentos de ponta.",
    category: "Corporate DJ Services"
  },
  aluguel: {
    id: "aluguel",
    name: "Aluguel de Equipamentos DJ Pioneer",
    description: "Locação de equipamentos DJ profissionais: Pioneer CDJ-3000, controladoras, caixas RCF e iluminação. Entrega e instalação em Trancoso.",
    category: "DJ Equipment Rental"
  },
  locacao: {
    id: "locacao",
    name: "Locação de Som Profissional",
    description: "Aluguel de som profissional para festas e eventos em Trancoso. Caixas RCF, mixers Pioneer, iluminação LED e instalação completa.",
    category: "Professional Sound Rental"
  }
};