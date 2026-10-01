import React from "react";
import { Link } from "react-router-dom";

const VARIANTS = {
  primary: {
    backgroundColor: "var(--ds-color-action)",
    color: "var(--ds-color-on-action)",
    border: "2px solid var(--ds-color-action)",
  },
  "ghost-dark": {
    backgroundColor: "transparent",
    color: "var(--ds-color-text-on-dark)",
    border: "2px solid var(--ds-color-border-on-dark)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--ds-color-text)",
    border: "2px solid var(--ds-color-border)",
  },
};

const isExternal = (href) => /^https?:\/\//i.test(href);

/**
 * Botão/link padronizado. Com `href` vira link (interno via react-router, externo em nova aba
 * com rel seguro); sem `href` vira <button>. Alvo de toque mínimo de 44 px.
 */
export default function DsButton({
  href,
  onClick,
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...rest
}) {
  const classes =
    "inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-3 text-base font-bold " +
    "transition-transform duration-200 motion-safe:hover:-translate-y-0.5 " +
    (fullWidth ? "w-full " : "") +
    className;
  const style = { ...VARIANTS[variant], borderRadius: "var(--ds-radius-pill)" };

  if (href && isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={style} {...rest}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link to={href} className={classes} style={style} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} style={style} {...rest}>
      {children}
    </button>
  );
}
