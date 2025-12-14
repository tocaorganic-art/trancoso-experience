import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * OptimizedImage - Componente de imagem otimizada com:
 * - Lazy loading nativo
 * - Placeholder blur durante carregamento
 * - Fallback para erros
 * - Suporte a aspect ratio
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  width,
  height,
  aspectRatio = "auto",
  objectFit = "cover",
  placeholder = "blur",
  fallbackSrc = "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=60",
  onLoad,
  onError,
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Começa a carregar 200px antes de entrar na viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Adiciona parâmetros de otimização para URLs - Supabase + Unsplash
  const getOptimizedSrc = (url) => {
    if (!url) return fallbackSrc;
    
    // Para imagens do Supabase Storage, adiciona parâmetros de otimização
    if (url.includes("supabase.co/storage")) {
      const separator = url.includes("?") ? "&" : "?";
      const widthParam = width ? `width=${width}` : 'width=800';
      return `${url}${separator}${widthParam}&quality=80&format=webp`;
    }
    
    // Para imagens do Unsplash, adiciona parâmetros de otimização
    if (url.includes("unsplash.com")) {
      const separator = url.includes("?") ? "&" : "?";
      const widthParam = width ? `w=${width}` : 'w=800';
      return `${url}${separator}${widthParam}&auto=format&fit=crop&q=75&fm=webp`;
    }
    
    return url;
  };

  const imageSrc = hasError ? fallbackSrc : getOptimizedSrc(src);

  const aspectRatioStyles = {
    "1:1": "aspect-square",
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "3:2": "aspect-[3/2]",
    "2:3": "aspect-[2/3]",
    "auto": ""
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-gray-200",
        aspectRatioStyles[aspectRatio],
        containerClassName
      )}
      style={{ width, height }}
    >
      {/* Placeholder blur */}
      {placeholder === "blur" && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Imagem principal */}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            objectFit === "cover" && "object-cover w-full h-full",
            objectFit === "contain" && "object-contain w-full h-full",
            objectFit === "fill" && "object-fill w-full h-full",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}