/**
 * ImageOptimization - Utilities e hooks para otimização de imagens
 * 
 * Implementa:
 * - Conversão automática para WebP
 * - Lazy loading inteligente
 * - Redimensionamento dinâmico
 * - Placeholders blur
 */

/**
 * Gera URL otimizada para imagens Supabase
 * @param {string} url - URL original da imagem
 * @param {Object} options - Opções de otimização
 * @returns {string} URL otimizada
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url) return '';
  
  const {
    width = 800,
    quality = 85,
    format = 'webp'
  } = options;

  // Supabase Storage optimization
  if (url.includes('supabase.co/storage')) {
    const hasParams = url.includes('?');
    const separator = hasParams ? '&' : '?';
    return `${url}${separator}width=${width}&quality=${quality}&format=${format}`;
  }

  // Unsplash optimization
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&q=${quality}&fm=${format}&fit=crop`;
  }

  return url;
}

/**
 * Gera srcSet para imagens responsivas
 * @param {string} url - URL base da imagem
 * @param {Array} sizes - Array de larguras [320, 640, 1024, 1920]
 * @returns {string} srcSet string
 */
export function generateSrcSet(url, sizes = [320, 640, 1024, 1920]) {
  return sizes
    .map(size => `${getOptimizedImageUrl(url, { width: size })} ${size}w`)
    .join(', ');
}

/**
 * Hook para detectar se a imagem está no viewport
 * Usado para lazy loading manual
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, {
      rootMargin: '50px',
      threshold: 0.01,
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}

/**
 * Componente Picture otimizado com suporte a WebP
 */
export function OptimizedPicture({ src, alt, className, width, height, priority = false }) {
  const imgRef = React.useRef(null);
  const isVisible = useIntersectionObserver(imgRef);
  const shouldLoad = priority || isVisible;

  return (
    <picture ref={imgRef}>
      {shouldLoad && (
        <>
          <source
            srcSet={getOptimizedImageUrl(src, { format: 'webp', width })}
            type="image/webp"
          />
          <source
            srcSet={getOptimizedImageUrl(src, { format: 'jpeg', width })}
            type="image/jpeg"
          />
        </>
      )}
      <img
        src={shouldLoad ? src : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}