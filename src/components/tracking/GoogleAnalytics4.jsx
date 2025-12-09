import React from "react";

/**
 * Google Analytics 4 Component
 * Carrega GA4 de forma assíncrona via GTM
 */
export default function GoogleAnalytics4({ measurementId = "G-DJK0KWJ2MH" }) {
  React.useEffect(() => {
    // GA4 será carregado via GTM
    // Este componente apenas garante que o dataLayer está pronto
    window.dataLayer = window.dataLayer || [];
    
    // Push de configuração inicial
    if (window.gtag) {
      window.gtag('config', measurementId);
    }

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