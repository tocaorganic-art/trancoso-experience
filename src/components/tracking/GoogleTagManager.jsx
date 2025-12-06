import React from "react";

/**
 * Google Tag Manager Component
 * Carrega GTM de forma assíncrona para não impactar performance
 */
export default function GoogleTagManager({ gtmId = "GTM-XXXXXXX" }) {
  React.useEffect(() => {
    // Verificar se GTM já foi carregado
    if (window.dataLayer) return;

    // Inicializar dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Carregar GTM de forma assíncrona
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    
    // Carregar após idle ou após 2s
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        document.head.appendChild(script);
      });
    } else {
      setTimeout(() => {
        document.head.appendChild(script);
      }, 2000);
    }

    return () => {
      // Cleanup não é necessário pois GTM persiste entre navegações
    };
  }, [gtmId]);

  // Noscript fallback
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

/**
 * Helper function para enviar eventos customizados
 */
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
  }
};

/**
 * Helper para rastrear conversões
 */
export const trackConversion = (conversionType, value = null) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    conversion_value: value,
    timestamp: new Date().toISOString()
  });
};