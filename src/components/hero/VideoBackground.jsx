import React from "react";

export default function VideoBackground() {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const videoRef = React.useRef(null);

  // URL do vídeo do OneDrive - Cole aqui o link direto do seu vídeo
  // Para obter link direto do OneDrive: abra o vídeo > ... > Incorporar > copie a URL do iframe
  const VIDEO_URL = "https://onedrive.live.com/embed?resid=99F25A081393A902%21s7329dadc59ad34e04ea28cd470517e6ee&authkey=!ALXRo_r5w0R9TkI";
  
  const POSTER_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png?width=1920&quality=60&format=webp";

  React.useEffect(() => {
    // Detectar conexão e dispositivo
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isSlowConnection = 'connection' in navigator && 
      (navigator.connection?.effectiveType === '3g' || 
       navigator.connection?.effectiveType === '2g' ||
       navigator.connection?.saveData);

    // Não carregar vídeo em mobile ou conexão lenta
    if (isMobile || isSlowConnection) {
      return;
    }
    
    // Carregar imediatamente em desktop com boa conexão
    if ('connection' in navigator) {
      const conn = navigator.connection;
      if (conn.effectiveType === '4g' || conn.downlink > 5) {
        setShouldLoad(true);
        return;
      }
    }
    
    // Delay mínimo para outras situações
    const timer = setTimeout(() => setShouldLoad(true), 300);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback silencioso
      });
    }
  }, [shouldLoad]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
      {/* Poster sempre visível */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${POSTER_URL})` }}
      />
      
      {/* Vídeo do OneDrive via iframe - mais leve */}
      {shouldLoad && (
        <iframe
          src={VIDEO_URL}
          className={`absolute w-full h-full object-cover border-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-30' : 'opacity-0'}`}
          allow="autoplay; fullscreen"
          onLoad={() => setIsLoaded(true)}
          style={{ pointerEvents: 'none' }}
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/80 via-gray-100/70 to-gray-200/90" />
    </div>
  );
}