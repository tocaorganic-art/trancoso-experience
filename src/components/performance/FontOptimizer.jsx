import { useEffect } from "react";

/**
 * FontOptimizer - Otimiza carregamento de fontes com display swap e subsetting
 * Implementa font-display: swap para evitar FOIT (Flash of Invisible Text)
 */
export default function FontOptimizer() {
  useEffect(() => {
    // Preload critical fonts - apenas Latin subset para reduzir tamanho
    const fonts = [
      {
        family: 'Inter',
        weights: ['400', '500', '600', '700'],
        display: 'swap'
      }
    ];

    fonts.forEach(font => {
      font.weights.forEach(weight => {
        // Criar link para preload de fonte
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = `https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2`;
        
        // Adicionar apenas se não existir
        if (!document.querySelector(`link[href="${link.href}"]`)) {
          document.head.appendChild(link);
        }
      });
    });

    // Adicionar font-display swap via CSS
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup não necessário pois fonts devem persistir
    };
  }, []);

  return null;
}