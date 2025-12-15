import React from "react";

export default function VideoBackground() {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    // Carregar imediatamente em conexões rápidas
    if ('connection' in navigator) {
      const conn = navigator.connection;
      if (conn.effectiveType === '4g' || conn.downlink > 5) {
        setShouldLoad(true);
        return;
      }
    }
    
    // Para conexões lentas, esperar um pouco
    const timer = setTimeout(() => setShouldLoad(true), 500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback silencioso se autoplay falhar
      });
    }
  }, [shouldLoad]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
      {/* Poster sempre visível para carregamento instantâneo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png?width=1920&quality=60&format=webp)`
        }}
      />
      
      {shouldLoad && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-30' : 'opacity-0'}`}
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-concert-4800-large.mp4" 
            type="video/mp4" 
          />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/80 via-gray-100/70 to-gray-200/90" />
    </div>
  );
}