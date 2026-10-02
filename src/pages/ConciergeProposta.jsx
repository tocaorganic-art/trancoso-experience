import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import FloatingSpotifyPlayer from "@/components/concierge/FloatingSpotifyPlayer";
import { ICONE_CASA, CONCIERGE_COLORS, FONT_UI, FONT_TITLE } from "@/components/concierge/brand";

// Proposta v6, autocontida em HTML: buscada como texto e renderizada via srcDoc
// para que o navegador a exiba em vez de baixá-la.
// Versão sem a seção "Marca" (documentação interna do kit de marca).
const PROPOSTA_URL = "/propostas/toca-experience-tony-v6-limpa.html";

export default function ConciergeProposta() {
  const [html, setHtml] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    setHtml(null);
    try {
      const res = await fetch(PROPOSTA_URL, { cache: "force-cache" });
      if (!res.ok) throw new Error("resposta inválida");
      setHtml(await res.text());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleIframeLoad = () => {
    window.dispatchEvent(new Event("proposta-iframe-ready"));
  };

  return (
    <div style={{ backgroundColor: CONCIERGE_COLORS.bg }}>
      <style>{`
        @keyframes toca-loader-pulse {
          0%, 100% { opacity: 0.55; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {loading && !html && (
        <div
          aria-live="polite"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6"
          style={{ backgroundColor: CONCIERGE_COLORS.bg, fontFamily: FONT_UI }}
        >
          <img
            src={ICONE_CASA}
            alt=""
            width="72"
            height="72"
            className="h-18 w-18 object-contain"
            style={{ width: 72, height: 72, animation: "toca-loader-pulse 1.6s ease-in-out infinite" }}
          />
          <p className="text-sm font-semibold tracking-[0.2em]" style={{ color: CONCIERGE_COLORS.champagne }}>
            PREPARANDO A PROPOSTA
          </p>
        </div>
      )}

      {error && !html && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 px-6 text-center"
          style={{ backgroundColor: CONCIERGE_COLORS.bg, fontFamily: FONT_UI }}
        >
          <h1
            className="font-medium"
            style={{ fontFamily: FONT_TITLE, fontSize: 28, color: CONCIERGE_COLORS.text }}
          >
            Não foi possível carregar a proposta
          </h1>
          <p className="max-w-md leading-relaxed" style={{ color: CONCIERGE_COLORS.champagne }}>
            Verifique sua conexão e tente novamente em alguns instantes.
          </p>
          <button
            type="button"
            onClick={load}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
            style={{ backgroundColor: CONCIERGE_COLORS.terracota, color: CONCIERGE_COLORS.bg }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Tentar novamente
          </button>
        </div>
      )}

      {html && (
        <>
          <iframe
            srcDoc={html}
            title="Friend's Party Experience · Experiência Tony"
            onLoad={handleIframeLoad}
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
            className="w-full"
            style={{ display: "block", width: "100%", height: "100dvh", border: 0, backgroundColor: CONCIERGE_COLORS.bg }}
          />
          <Link
            to="/concierge/propostas"
            aria-label="Voltar para propostas"
            className="fixed right-4 z-[60] inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors"
            style={{
              top: "calc(64px + env(safe-area-inset-top))",
              backgroundColor: "rgba(26,23,20,0.85)",
              borderColor: CONCIERGE_COLORS.border,
              color: CONCIERGE_COLORS.text,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              fontFamily: FONT_UI,
            }}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Voltar para propostas</span>
          </Link>
        </>
      )}

      <FloatingSpotifyPlayer />
    </div>
  );
}