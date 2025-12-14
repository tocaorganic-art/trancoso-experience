import { QueryClient } from "@tanstack/react-query";

/**
 * Configuração otimizada do React Query para caching agressivo
 * Reduz requisições desnecessárias e melhora performance
 */
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      // Cache por 10 minutos (eventos não mudam frequentemente)
      staleTime: 1000 * 60 * 10,
      // Cache persistente por 30 minutos
      cacheTime: 1000 * 60 * 30,
      // Retry automático apenas 1 vez
      retry: 1,
      // Não refetch ao focar janela (economiza requests)
      refetchOnWindowFocus: false,
      // Não refetch ao reconectar
      refetchOnReconnect: false,
      // Não refetch ao montar
      refetchOnMount: false,
    },
  },
};

/**
 * Service Worker para cache de assets e API responses
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        registration => {
          console.log('SW registered: ', registration);
        },
        err => {
          console.log('SW registration failed: ', err);
        }
      );
    });
  }
};

/**
 * Cache de imagens usando Intersection Observer
 * Carrega imagens apenas quando estão próximas do viewport
 */
export const setupImageCache = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observer todas as imagens com data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    return imageObserver;
  }
};