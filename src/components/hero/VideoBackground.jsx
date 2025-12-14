import React from "react";

export default function VideoBackground() {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    // Lazy load video após carregamento inicial
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setShouldLoad(true));
    } else {
      setTimeout(() => setShouldLoad(true), 1000);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shouldLoad && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute w-full h-full object-cover opacity-30"
          poster="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/959573c6d_IMG_1921.png?width=1920&quality=60&format=webp"
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