import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "../icons";

const needsPlainAnchor = (href) => href.startsWith("#") || /^https?:\/\//i.test(href);

/**
 * Hero cinematográfico mobile-first: fundo escuro com camada de imagem/vídeo, título editorial
 * grande, ações e atalhos. O fundo (`background`) é opcional e fica sempre abaixo de um véu escuro
 * que garante contraste do texto (AA).
 */
export default function HeroCinematic({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  actions,
  shortcuts = [],
  background,
  scrollTargetId,
  scrollLabel = "Rolar para o próximo conteúdo",
}) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      style={{ backgroundColor: "var(--ds-color-obsidiana)", color: "var(--ds-color-text-on-dark)" }}
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {background}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,23,20,0.62) 0%, rgba(26,23,20,0.84) 62%, var(--ds-color-obsidiana) 100%)",
          }}
        />
        <div
          className="absolute -left-1/4 top-1/3 h-[60vmin] w-[60vmin] rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: "var(--ds-color-laranja)" }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-28 text-center sm:px-6 md:text-left">
        {eyebrow && (
          <p
            className="ds-fade-up text-xs font-bold tracking-[0.3em]"
            style={{ color: "var(--ds-color-laranja)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          id="hero-title"
          className="ds-fade-up mt-4 max-w-4xl font-medium leading-[1.05] md:mx-0 mx-auto"
          style={{
            fontFamily: "var(--ds-font-editorial)",
            fontSize: "var(--ds-text-hero)",
            animationDelay: "0.1s",
            color: "#FFFFFF",
          }}
        >
          {title}
          {titleAccent && (
            <>
              {" "}
              <span style={{ color: "var(--ds-color-laranja)" }}>{titleAccent}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p
            className="ds-fade-up mx-auto mt-6 max-w-2xl text-lg md:mx-0 md:text-xl"
            style={{ animationDelay: "0.25s", color: "var(--ds-color-text-on-dark-muted)" }}
          >
            {subtitle}
          </p>
        )}
        {actions && (
          <div
            className="ds-fade-up mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start"
            style={{ animationDelay: "0.4s" }}
          >
            {actions}
          </div>
        )}
        {shortcuts.length > 0 && (
          <nav aria-label="Atalhos" className="ds-fade-up mt-8" style={{ animationDelay: "0.55s" }}>
            <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
              {shortcuts.map(({ label, href, Icon }) => {
                const content = (
                  <>
                    {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                    {label}
                  </>
                );
                const cls = "inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-sm font-semibold";
                const style = {
                  color: "var(--ds-color-areia)",
                  border: "1px solid var(--ds-color-border-on-dark)",
                  borderRadius: "var(--ds-radius-pill)",
                };
                return (
                  <li key={href}>
                    {needsPlainAnchor(href) ? (
                      <a href={href} className={cls} style={style}>{content}</a>
                    ) : (
                      <Link to={href} className={cls} style={style}>{content}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      {scrollTargetId && (
        <a
          href={`#${scrollTargetId}`}
          aria-label={scrollLabel}
          className="absolute bottom-6 left-1/2 inline-flex h-11 w-11 -translate-x-1/2 items-center justify-center motion-safe:animate-bounce"
          style={{ color: "var(--ds-color-areia)" }}
        >
          <ChevronDown className="h-7 w-7" aria-hidden="true" />
        </a>
      )}
    </section>
  );
}
