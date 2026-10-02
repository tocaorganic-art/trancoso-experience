import React, { useEffect, useRef, useState } from "react";
import { Minus, X } from "lucide-react";
import { SPOTIFY_PLAYLIST_URL, toEmbedUri } from "@/components/concierge/spotifyConfig";
import { ICONE_CASA, CONCIERGE_COLORS, FONT_UI } from "@/components/concierge/brand";

const EMBED_SCRIPT = "https://open.spotify.com/embed/iframe-api/v1";
const STORAGE_KEY = "toca-spotify-player";
const INTERACTION_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"];

const readStoredMode = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "closed" || saved === "open" || saved === "min") return saved;
  } catch { /* localStorage indisponível: usa padrão */ }
  return "min";
};

export default function FloatingSpotifyPlayer() {
  const embedUri = toEmbedUri(SPOTIFY_PLAYLIST_URL);
  const [mode, setMode] = useState(readStoredMode);
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef(null);
  const controllerRef = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    if (!embedUri) return undefined;
    let disposed = false;

    const play = () => {
      if (modeRef.current === "closed") return;
      try { controllerRef.current?.play(); } catch { /* autoplay bloqueado */ }
    };

    const onFirstInteraction = () => {
      play();
      INTERACTION_EVENTS.forEach((evt) => window.removeEventListener(evt, onFirstInteraction));
    };
    const onPropostaReady = () => play();

    window.addEventListener("proposta-iframe-ready", onPropostaReady);
    INTERACTION_EVENTS.forEach((evt) => window.addEventListener(evt, onFirstInteraction, { passive: true }));

    const createController = (IFrameAPI) => {
      if (disposed || !containerRef.current) return;
      try {
        IFrameAPI.createController(
          containerRef.current,
          {
            uri: embedUri.replace("https://open.spotify.com/embed/playlist/", "spotify:playlist:"),
            width: "100%",
            height: "80",
          },
          (Controller) => {
            if (disposed) return;
            controllerRef.current = Controller;
            try {
              Controller.addListener("playback_update", (e) => {
                setPlaying(Boolean(e?.data?.is_playing));
              });
            } catch { /* sem listener */ }
            play();
          }
        );
      } catch { /* falha silenciosa do embed */ }
    };

    if (window.__tocaSpotifyIframeApi) {
      createController(window.__tocaSpotifyIframeApi);
    } else {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        window.__tocaSpotifyIframeApi = IFrameAPI;
        createController(IFrameAPI);
      };
      if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
        const script = document.createElement("script");
        script.src = EMBED_SCRIPT;
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      disposed = true;
      INTERACTION_EVENTS.forEach((evt) => window.removeEventListener(evt, onFirstInteraction));
      window.removeEventListener("proposta-iframe-ready", onPropostaReady);
      controllerRef.current = null;
    };
  }, [embedUri]);

  if (!embedUri || mode === "closed") return null;

  const changeMode = (next) => {
    setMode(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* ignora */ }
  };

  const isExpanded = mode === "open";

  return (
    <>
      <style>{`
        @keyframes toca-eq-bounce {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        @media (max-width: 767px) {
          .toca-spotify-anchor { bottom: calc(96px + env(safe-area-inset-bottom)) !important; }
        }
      `}</style>
      <div
        className="toca-spotify-anchor fixed left-4 z-[70]"
        style={{ bottom: "calc(16px + env(safe-area-inset-bottom))", fontFamily: FONT_UI }}
      >
        {isExpanded ? (
          <div
            className="flex items-center gap-2 rounded-2xl border p-2"
            style={{
              backgroundColor: "rgba(26,23,20,0.85)",
              borderColor: CONCIERGE_COLORS.border,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              maxWidth: 340,
            }}
          >
            <div
              ref={containerRef}
              style={{ width: "100%", minWidth: 0, height: 80, borderRadius: 12, overflow: "hidden" }}
            />
            <div className="flex flex-col gap-1">
              <button
                type="button"
                aria-label="Minimizar player"
                onClick={() => changeMode("min")}
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
                style={{ borderColor: CONCIERGE_COLORS.border, color: CONCIERGE_COLORS.text, backgroundColor: "transparent" }}
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Fechar player"
                onClick={() => changeMode("closed")}
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
                style={{ borderColor: CONCIERGE_COLORS.border, color: CONCIERGE_COLORS.text, backgroundColor: "transparent" }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            aria-label={playing ? "Player do Spotify tocando, clique para abrir" : "Abrir player do Spotify"}
            onClick={() => changeMode("open")}
            className="relative flex h-14 w-14 items-center justify-center rounded-full border transition-transform duration-200 motion-safe:hover:scale-105"
            style={{
              backgroundColor: "rgba(26,23,20,0.85)",
              borderColor: CONCIERGE_COLORS.border,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            }}
          >
            <img src={ICONE_CASA} alt="" width="24" height="24" className="h-6 w-6 object-contain" />
            <span className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-end gap-[2px]" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-sm"
                  style={{
                    height: 10,
                    backgroundColor: CONCIERGE_COLORS.champagne,
                    transformOrigin: "bottom",
                    transform: "scaleY(0.35)",
                    animation: playing ? `toca-eq-bounce 1s ease-in-out ${i * 0.18}s infinite` : "none",
                  }}
                />
              ))}
            </span>
          </button>
        )}
      </div>
    </>
  );
}