import React, { useState, useRef, useEffect } from "react";
import { Play, Music, Loader2 } from "lucide-react";

export default function LazyEmbed({ type, src, title, height = 352 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getEmbedUrl = () => {
    if (type === "spotify") {
      return src;
    }
    if (type === "soundcloud") {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(src)}&color=%23333333&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
    }
    return src;
  };

  const bgColor = type === "spotify" ? "bg-green-900" : "bg-orange-900";
  const iconColor = type === "spotify" ? "text-green-400" : "text-orange-400";

  return (
    <div 
      ref={containerRef}
      className="relative rounded-lg overflow-hidden bg-gray-100"
      style={{ minHeight: type === "soundcloud" ? 166 : height }}
    >
      {!isVisible ? (
        <div className={`absolute inset-0 ${bgColor} flex flex-col items-center justify-center`}>
          <Music className={`w-12 h-12 ${iconColor} mb-2`} />
          <p className="text-white text-sm">Role para carregar</p>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )}
          <iframe
            src={getEmbedUrl()}
            width="100%"
            height={type === "soundcloud" ? 166 : height}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={title}
            onLoad={() => setIsLoaded(true)}
            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </div>
  );
}