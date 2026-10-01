import React from "react";
import { ArrowUpRight } from "lucide-react";

// Marcas e serviços relacionados. Descrições curtas e factuais; sem afirmar
// integração técnica, conta única, reserva integrada ou fusão societária.
export const ECOSYSTEM_LINKS = [
  {
    id: "toca-experience",
    name: "TOCA EXPERIENCE",
    href: "https://www.tocaexperience.com.br/",
    description: "Eventos, sonorização e experiências em Trancoso.",
    current: true,
  },
  {
    id: "toca-concierge",
    name: "Toca Concierge",
    href: "https://tocaconcierge.com.br/",
    description: "Serviço de concierge. Veja no site como funciona.",
  },
  {
    id: "trancoso-resolve",
    name: "Trancoso Resolve",
    href: "https://trancosoresolve.com.br/",
    description: "Marketplace local de serviços em Trancoso.",
  },
];

export default function EcosystemHub() {
  return (
    <section
      id="ecossistema"
      aria-labelledby="ecossistema-titulo"
      className="py-20"
      style={{ backgroundColor: "var(--toca-areia-suave)" }}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <h2
          id="ecossistema-titulo"
          className="text-3xl md:text-4xl font-medium text-center"
          style={{ color: "var(--toca-ink)" }}
        >
          Marcas e serviços Toca
        </h2>
        <p
          className="mt-3 text-center max-w-2xl mx-auto"
          style={{ color: "var(--toca-text-muted)" }}
        >
          Serviços relacionados, cada um com seu próprio site e atendimento.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {ECOSYSTEM_LINKS.map((item) => (
            <li
              key={item.id}
              className="flex flex-col p-6 border bg-white"
              style={{
                borderColor: "var(--toca-border)",
                borderRadius: "var(--toca-radius-lg)",
              }}
            >
              <h3 className="text-lg font-bold" style={{ color: "var(--toca-ink)" }}>
                {item.name}
              </h3>
              <p className="mt-2 flex-1 text-sm" style={{ color: "var(--toca-text-muted)" }}>
                {item.description}
              </p>
              {item.current ? (
                <span
                  className="mt-5 inline-flex w-fit items-center px-4 py-2 text-sm font-semibold"
                  style={{
                    backgroundColor: "var(--toca-areia)",
                    color: "var(--toca-ink)",
                    borderRadius: "var(--toca-radius-pill)",
                  }}
                >
                  Você está aqui
                </span>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${item.name} em nova aba`}
                  className="mt-5 inline-flex w-fit items-center gap-1 px-4 py-2 text-sm font-bold"
                  style={{
                    backgroundColor: "var(--toca-action)",
                    color: "var(--toca-on-action)",
                    borderRadius: "var(--toca-radius-pill)",
                  }}
                >
                  Visitar site
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
