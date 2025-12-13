import React from "react";
import GoogleTagManager from "./GoogleTagManager";
import GoogleAnalytics4 from "./GoogleAnalytics4";
import MetaPixel from "./MetaPixel";

/**
 * TrackingProvider - Centraliza todos os scripts de rastreamento
 * IDs devem ser configurados aqui
 */
export default function TrackingProvider({ children }) {
  const GTM_ID = "GTM-M6JSFD39";
  const META_PIXEL_ID = "1204913388179659";

  return (
    <>
      {/* Google Tag Manager */}
      <GoogleTagManager gtmId={GTM_ID} />
      
      {/* Google Analytics 4 + Google Ads */}
      <GoogleAnalytics4 measurementId="G-8HTCZ1069J" />
      
      {/* Meta Pixel (Facebook/Instagram) */}
      <MetaPixel pixelId={META_PIXEL_ID} />
      
      {children}
    </>
  );
}

/**
 * Hook customizado para rastreamento
 */
export const useTracking = () => {
  const trackFormSubmission = React.useCallback((formData) => {
    // GTM Event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submission',
        form_name: 'quotation_form',
        form_data: {
          event_type: formData.tipoEvento,
          event_date: formData.data,
          location: formData.local || 'not_specified',
          budget: formData.orcamento || 'not_specified'
        }
      });
    }

    // Meta Pixel Event
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Quotation Form',
        content_category: formData.tipoEvento,
        value: 0,
        currency: 'BRL'
      });
    }

    // Google Ads Conversion (será configurado via GTM)
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-XXXXXXXXX/XXXXX', // Substituir pelo ID real
        'value': 1.0,
        'currency': 'BRL'
      });
    }
  }, []);

  const trackWhatsAppClick = React.useCallback(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        click_type: 'contact_button'
      });
    }

    if (window.fbq) {
      window.fbq('track', 'Contact');
    }
  }, []);

  const trackPreSaveClick = React.useCallback(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'presave_click',
        music_title: 'True To Myself',
        artist: 'Tony Monteiro'
      });
    }

    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_type: 'music',
        content_name: 'True To Myself'
      });
    }
  }, []);

  return {
    trackFormSubmission,
    trackWhatsAppClick,
    trackPreSaveClick
  };
};