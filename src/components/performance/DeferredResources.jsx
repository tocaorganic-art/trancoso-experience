import React from "react";

/**
 * Deferred Resources Component
 * Carrega recursos não críticos após o carregamento inicial
 */
export default function DeferredResources() {
  React.useEffect(() => {
    // Aguardar idle time para carregar recursos não críticos
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        loadDeferredResources();
      });
    } else {
      setTimeout(loadDeferredResources, 2000);
    }
  }, []);

  const loadDeferredResources = () => {
    // Marcar elementos defer-load como carregados
    const deferredElements = document.querySelectorAll('.defer-load');
    deferredElements.forEach(el => {
      el.classList.add('loaded');
    });

    // Preload de recursos importantes mas não críticos
    const preloadLinks = [
      { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: true }
    ];

    preloadLinks.forEach(link => {
      const linkEl = document.createElement('link');
      Object.keys(link).forEach(key => {
        if (key === 'crossorigin' && link[key]) {
          linkEl.setAttribute('crossorigin', '');
        } else {
          linkEl[key] = link[key];
        }
      });
      document.head.appendChild(linkEl);
    });
  };

  return null;
}