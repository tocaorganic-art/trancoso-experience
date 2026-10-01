import React from "react";
import DsButton from "./DsButton";

/**
 * Barra de ação fixa só no celular (some em md+). Esconde-se (e sai da ordem de tabulação)
 * enquanto o elemento indicado em `hideWhenVisible` (ex.: "#contato") está na tela.
 */
export default function StickyCTA({ label, href, onClick, hideWhenVisible }) {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    if (!hideWhenVisible || typeof IntersectionObserver === "undefined") return undefined;
    const target = document.querySelector(hideWhenVisible);
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hideWhenVisible]);

  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 px-4 pt-3 transition-transform duration-300 md:hidden " +
        (hidden ? "invisible translate-y-full" : "translate-y-0")
      }
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        background: "linear-gradient(180deg, rgba(26,23,20,0) 0%, rgba(26,23,20,0.92) 40%)",
      }}
    >
      <DsButton href={href} onClick={onClick} fullWidth>
        {label}
      </DsButton>
    </div>
  );
}
