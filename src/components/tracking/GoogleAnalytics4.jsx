import React from "react";

/**
 * Google Analytics 4 Component
 * Carrega GA4 + Google Ads com gtag.js
 */
export default function GoogleAnalytics4({ measurementId = "G-8HTCZ1069J" }) {
  React.useEffect(() => {
    // Criar script gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Inicializar dataLayer e gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    
    // Configurar Google Analytics
    gtag('config', measurementId);
    
    // Configurar Google Ads Conversion Tracking
    gtag('config', 'AW-17589027735');

    return () => {
      // Cleanup não é necessário
    };
  }, [measurementId]);

  return null;
}

/**
 * Helper para rastrear eventos GA4
 */
export const trackGA4Event = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Helper para rastrear pageviews GA4
 */
export const trackGA4PageView = (pagePath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href
    });
  }
};

/**
 * Eventos customizados GA4
 */
export const GA4Events = {
  LEAD_FORM_SUBMIT: 'lead_form_submit',
  WHATSAPP_CLICK: 'whatsapp_click',
  QUOTATION_REQUEST: 'quotation_request',
  CTA_CLICK: 'cta_click',
  VIDEO_PLAY: 'video_play',
  SCROLL_DEPTH: 'scroll_depth'
};