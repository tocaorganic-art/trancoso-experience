import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FloatingSpotifyPlayer from "@/components/concierge/FloatingSpotifyPlayer";
import { CONCIERGE_COLORS, FONT_UI, FONT_TITLE } from "@/components/concierge/brand";
import propostaHtml from "@/assets/proposta-tony-jacuma.html?raw";

// Proposta Nº 0034-26 (sonorização com DJ ao vivo, Reserva Jacumã Boutique),
// autocontida em HTML e importada como texto para renderização via srcDoc,
// garantindo que o navegador a exiba em vez de baixá-la.
export default function ConciergeProposta() {
  const html = propostaHtml;

  useEffect(() => {
    window.dispatchEvent(new Event("proposta-iframe-ready"));
  }, []);

  return (
    <div style={{ backgroundColor: CONCIERGE_COLORS.bg }}>
      {html && (
        <>
          <iframe
            srcDoc={html}
            title="Proposta Nº 0034-26 · Sonorização com DJ ao vivo"
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