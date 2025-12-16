import React, { useState, useEffect, useRef } from "react";

/**
 * LazyImage - Componente de imagem otimizada com lazy loading nativo
 * 
 * @param {Object} props
 * @param {string} props.src - URL da imagem
 * @param {string} props.alt - Texto alternativo
 * @param {string} props.className - Classes CSS
 * @param {boolean} props.priority - Se true, carrega imediatamente (eager)
 */
export default function LazyImage({ 
  src, 
  alt, 
  className = "", 
  priority = false,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  // Otimizar URL para Supabase/Unsplash
  const optimizedSrc = React.useMemo(() => {
    if (!src) return src;
    
    // Supabase optimization
    if (src.includes('supabase.co/storage')) {
      const url = new URL(src);
      url.searchParams.set('width', '800');
      url.searchParams.set('quality', '80');
      return url.toString();
    }
    
    // Unsplash optimization
    if (src.includes('unsplash.com')) {
      return `${src}${src.includes('?') ? '&' : '?'}w=800&q=80&fm=webp`;
    }
    
    return src;
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={optimizedSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      {...props}
    />
  );
}