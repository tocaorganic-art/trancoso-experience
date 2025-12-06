import React from "react";

/**
 * Meta Pixel Component (Facebook/Instagram)
 * Carrega Meta Pixel de forma assíncrona
 */
export default function MetaPixel({ pixelId = "YOUR_PIXEL_ID" }) {
  React.useEffect(() => {
    // Verificar se Pixel já foi carregado
    if (window.fbq) return;

    // Inicializar fbq
    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      
      // Carregar após idle ou após 2s para não impactar performance
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          s.parentNode.insertBefore(t,s);
        });
      } else {
        setTimeout(() => {
          s.parentNode.insertBefore(t,s);
        }, 2000);
      }
    }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    return () => {
      // Cleanup não é necessário
    };
  }, [pixelId]);

  return null;
}

/**
 * Helper para rastrear eventos do Meta Pixel
 */
export const trackMetaEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
  }
};

/**
 * Eventos padrão do Meta Pixel
 */
export const MetaEvents = {
  LEAD: 'Lead',
  CONTACT: 'Contact',
  SUBMIT_APPLICATION: 'SubmitApplication',
  SCHEDULE: 'Schedule',
  VIEW_CONTENT: 'ViewContent',
  INITIATE_CHECKOUT: 'InitiateCheckout'
};