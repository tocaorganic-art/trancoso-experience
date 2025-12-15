import React from "react";

export default function VideoBackground() {
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);

  React.useEffect(() => {
    // Detectar dispositivo e conexão
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    // Não carregar em mobile ou conexão lenta
    if (isMobile) return;
    
    if (connection) {
      const { effectiveType, saveData, downlink } = connection;
      if (saveData || effectiveType === '2g' || effectiveType === '3g' || downlink < 2) {
        return;
      }
    }
    
    // Carregar vídeo após delay mínimo
    const timer = setTimeout(() => setShouldLoadVideo(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
      {/* Poster - sempre visível */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png?width=1920&quality=60&format=webp)`,
          backgroundPosition: 'center 40%'
        }}
      />
      
      {/* Vídeo OneDrive - apenas desktop com boa conexão */}
      {shouldLoadVideo && (
        <iframe
          src="https://onedrive.live.com/embed?resid=99F25A081393A902%21s7329dadc59ad34e04ea28cd470517e6ee&authkey=!ALXRo_r5w0R9TkI"
          className="absolute inset-0 w-full h-full border-0 opacity-30"
          allow="autoplay"
          style={{ pointerEvents: 'none' }}
        />
      )}
      
      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/80 via-gray-100/70 to-gray-200/90" />
      
      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}