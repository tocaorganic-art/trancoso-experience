import React from "react";

/**
 * Google Tag Manager Component
 * Carrega GTM de forma assíncrona para não impactar performance
 */
export default function GoogleTagManager({ gtmId = "GTM-XXXXXXX" }) {
  React.useEffect(() => {
    // Verificar se GTM já foi carregado (verificar pela tag script)
    if (document.querySelector(`script[src*="${gtmId}"]`)) return;

    // Inicializar dataLayer IMEDIATAMENTE
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Carregar GTM IMEDIATAMENTE (sem delay para permitir detecção pelo Tag Assistant)
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.insertBefore(script, document.head.firstChild);

    // Log para debug
    console.log(`[GTM] Installed: ${gtmId}`);

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