import React, { useCallback, useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

// Programa Oficial Balneário Camboriú 2026: web app autocontido em HTML,
// servido como arquivo estático em public/ e exibido via srcDoc em iframe de
// tela cheia (mesmo padrão de ConciergeProposta). O HTML não é alterado.
// Rota privada do cliente: sem Layout (cabeçalho, rodapé, chat, Spotify),
// fora do menu e do sitemap, com noindex, nofollow.
const PROGRAMA_URL = "/experiencias/balneario-camboriu-2026/index.html";
const PAGE_TITLE = "Toca Experience · Programa Oficial Balneário Camboriú 2026";
const BG = "#1A1714";
const TEXT = "#F2DEC4";
const ACCENT = "#D6B680";
const FONT = "Nunito, system-ui, -apple-system, 'Segoe UI', sans-serif";

function useNoIndex() {
  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    const previous = robots ? robots.getAttribute("content") : null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    return () => {
      if (created) robots.remove();
      else robots.setAttribute("content", previous ?? "");
      document.title = previousTitle;
    };
  }, []);
}

export default function ProgramaOficialBC2026() {
  const [html, setHtml] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useNoIndex();

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    setHtml(null);
    try {
      const res = await fetch(PROGRAMA_URL, { cache: "force-cache" });
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

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh" }}>
      <style>{`
        @keyframes toca-programa-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
      `}</style>

      {loading && !html && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ backgroundColor: BG, fontFamily: FONT }}
        >
          <p
            className="text-sm font-bold tracking-[0.2em]"
            style={{ color: ACCENT, animation: "toca-programa-pulse 1.6s ease-in-out infinite" }}
          >
            PREPARANDO O PROGRAMA
          </p>
        </div>
      )}

      {error && !html && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 px-6 text-center"
          style={{ backgroundColor: BG, fontFamily: FONT }}
        >
          <p className="text-2xl font-bold" style={{ color: TEXT }}>
            O programa não pôde ser carregado
          </p>
          <p className="max-w-sm text-sm" style={{ color: TEXT }}>
            Verifique sua conexão e tente novamente em instantes.
          </p>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: ACCENT, color: BG }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Tentar novamente
          </button>
        </div>
      )}

      {html && (
        <iframe
          srcDoc={html}
          title="Programa Oficial Toca Experience · Balneário Camboriú 2026"
          loading="eager"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
          style={{ display: "block", width: "100%", height: "100dvh", border: 0, backgroundColor: BG }}
        />
      )}
    </div>
  );
}
