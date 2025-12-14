import React from "react";

/**
 * Performance Optimizer - Melhorias automáticas de performance
 * Implementa técnicas avançadas de otimização web
 */
export default function PerformanceOptimizer() {
  React.useEffect(() => {
    // 1. Preconnect para domínios críticos
    const criticalDomains = [
      { url: 'https://www.googletagmanager.com', crossOrigin: false },
      { url: 'https://www.google-analytics.com', crossOrigin: false },
      { url: 'https://qtrypzzcjebvfcihiynt.supabase.co', crossOrigin: true }
    ];

    criticalDomains.forEach(({ url, crossOrigin }) => {
      if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        if (crossOrigin) link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // 2. Resource Hints para third-party scripts
    const dnsPrefetchDomains = [
      'https://connect.facebook.net',
      'https://fonts.googleapis.com',
      'https://cdn.jsdelivr.net'
    ];

    dnsPrefetchDomains.forEach(url => {
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
      }
    });

    // 3. Defer de scripts não críticos
    const deferScripts = () => {
      const scripts = document.querySelectorAll('script[data-defer="true"]');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.dataset.src;
        newScript.defer = true;
        document.body.appendChild(newScript);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(deferScripts);
    } else {
      setTimeout(deferScripts, 2000);
    }

    // 4. Lazy load de iframes (embeds, etc)
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    if ('IntersectionObserver' in window) {
      const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            iframeObserver.unobserve(iframe);
          }
        });
      }, { rootMargin: '200px' });

      lazyIframes.forEach(iframe => iframeObserver.observe(iframe));
    }

    // 5. Prefetch de páginas importantes
    const prefetchPages = ['/Cotacao', '/EventosAnoNovo', '/CasamentosTrancoso'];
    
    const prefetchLinks = () => {
      prefetchPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        link.as = 'document';
        document.head.appendChild(link);
      });
    };

    // Prefetch após 3 segundos de idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetchLinks, { timeout: 3000 });
    } else {
      setTimeout(prefetchLinks, 3000);
    }

    // 6. Compressão de imagens via CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Force image compression via CSS */
      img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }
      
      /* Smooth scroll */
      html {
        scroll-behavior: smooth;
      }
      
      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return null;
}

/**
 * Hook para lazy load de componentes pesados
 */
export function useLazyComponent(importFn, delay = 0) {
  const [Component, setComponent] = React.useState(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      importFn().then(mod => setComponent(() => mod.default));
    }, delay);

    return () => clearTimeout(timer);
  }, [importFn, delay]);

  return Component;
}

/**
 * Componente para carregar CSS não-crítico de forma assíncrona
 */
export function DeferredCSS({ href }) {
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() { this.media = 'all'; };
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [href]);

  return null;
}