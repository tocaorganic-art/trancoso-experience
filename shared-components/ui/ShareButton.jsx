import React from "react";
import DsButton from "./DsButton";
import { Share2 } from "../icons";

/**
 * Compartilhar: usa a Web Share API quando existe (celulares) e, se não, copia o link.
 * Compartilha apenas título, texto e URL públicos; nenhum dado pessoal. O resultado é anunciado
 * a leitores de tela por região `status`.
 */
export default function ShareButton({ title, text, url, label = "Compartilhar", variant = "ghost-dark" }) {
  const [message, setMessage] = React.useState("");

  const announce = (msg) => {
    setMessage(msg);
    window.setTimeout(() => setMessage(""), 3000);
  };

  const share = async () => {
    const data = { title, text, url: url || window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(data.url);
      announce("Link copiado");
    } catch (error) {
      if (error && error.name !== "AbortError") announce("Não foi possível compartilhar");
    }
  };

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <DsButton variant={variant} onClick={share} aria-label={`${label} esta página`}>
        <Share2 className="h-5 w-5" aria-hidden="true" />
        {label}
      </DsButton>
      <span role="status" aria-live="polite" className="text-sm" style={{ color: "var(--ds-color-text-on-dark-muted)" }}>
        {message}
      </span>
    </span>
  );
}
