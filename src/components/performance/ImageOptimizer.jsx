import React from "react";

/**
 * Utility para otimizar URLs de imagens automaticamente
 * Adiciona parâmetros de compressão e formato WebP
 */

export const optimizeImageUrl = (url, options = {}) => {
  if (!url) return url;

  const {
    width = 800,
    quality = 80,
    format = 'webp'
  } = options;

  // Supabase Storage
  if (url.includes('supabase.co/storage')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${width}&quality=${quality}&format=${format}`;
  }

  // Unsplash
  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&q=${quality}&fm=${format}&auto=format&fit=crop`;
  }

  // Mixkit (videos e imagens)
  if (url.includes('mixkit.co')) {
    // Já otimizado, retorna como está
    return url;
  }

  return url;
};

/**
 * Hook para otimizar múltiplas imagens de uma vez
 */
export const useOptimizedImages = (images = [], options = {}) => {
  return React.useMemo(() => {
    return images.map(img => ({
      ...img,
      src: optimizeImageUrl(img.src, options)
    }));
  }, [images, options]);
};

/**
 * Componente para preload de imagens críticas
 */
export function PreloadImage({ src, as = "image" }) {
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = optimizeImageUrl(src, { width: 1200, quality: 85 });
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [src, as]);

  return null;
}

/**
 * Responsive Image Component com srcset automático
 */
export function ResponsiveImage({ src, alt, className, sizes, priority = false }) {
  const srcset = React.useMemo(() => {
    if (!src) return '';
    
    const widths = [320, 640, 768, 1024, 1280, 1920];
    return widths
      .map(w => `${optimizeImageUrl(src, { width: w, quality: 80 })} ${w}w`)
      .join(', ');
  }, [src]);

  return (
    <img
      src={optimizeImageUrl(src, { width: 800 })}
      srcSet={srcset}
      sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export default {
  optimizeImageUrl,
  useOptimizedImages,
  PreloadImage,
  ResponsiveImage
};