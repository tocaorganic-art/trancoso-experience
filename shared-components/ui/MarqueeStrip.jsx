import React from "react";
import { Sparkles } from "../icons";

/**
 * Faixa em movimento (marquee). A lista é duplicada só para o loop visual: a cópia fica
 * aria-hidden e é ocultada quando o usuário prefere movimento reduzido (vira lista estática).
 * Pausa ao passar o mouse ou receber foco.
 */
export default function MarqueeStrip({ items, ariaLabel = "Nossos serviços", seconds = 45 }) {
  const list = (copy) => (
    <ul
      aria-hidden={copy || undefined}
      className={"flex shrink-0 items-center gap-8 pr-8 " + (copy ? "motion-reduce:hidden" : "motion-reduce:flex-wrap")}
    >
      {items.map((label) => (
        <li key={label} className="flex items-center gap-8 whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.18em] motion-reduce:whitespace-normal">
          {label}
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="overflow-hidden py-4"
      style={{ backgroundColor: "var(--ds-color-laranja)", color: "var(--ds-color-obsidiana)" }}
    >
      <div
        className="group flex w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-safe:animate-[ds-marquee_var(--ds-marquee-s)_linear_infinite] motion-reduce:w-auto motion-reduce:justify-center"
        style={{ "--ds-marquee-s": `${seconds}s` }}
      >
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
