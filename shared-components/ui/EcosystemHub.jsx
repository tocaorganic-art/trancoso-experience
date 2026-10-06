import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Car, Sparkles, Wrench } from "../icons";

// Marcas e serviços relacionados. Descrições curtas, fiéis ao que cada site publica sobre si;
// sem afirmar integração técnica, conta única, reserva integrada ou fusão societária.
// Cada serviço mantém a própria marca: aqui aparece só o nome, um ícone neutro e o link.
//
// Concierge NÃO entra aqui: deixou de ser um produto à parte (o domínio
// tocaconcierge.com.br não representa mais esse serviço) e passou a ser uma
// categoria de serviço dentro da própria Toca Experience, em /Concierge — já
// linkada no menu principal e na grade de serviços da Home. Listá-lo aqui de
// novo, como link externo, duplicaria o item do menu e reafirmaria um domínio
// fora de uso.
export const ECOSYSTEM_LINKS = [
  {
    id: "toca-experience",
    name: "TOCA EXPERIENCE",
    href: "https://www.tocaexperience.com.br/",
    tag: "Eventos, música e concierge",
    description: "Eventos, sonorização, curadoria musical e concierge privativo em Trancoso.",
    Icon: Sparkles,
    current: true,
  },
  {
    id: "trancoso-resolve",
    name: "Trancoso Resolve",
    href: "https://trancosoresolve.com.br/",
    tag: "Profissionais locais",
    description: "Plataforma para encontrar profissionais em Trancoso: diaristas, pedreiros, jardineiros e mais.",
    Icon: Wrench,
  },
  {
    id: "trancoso-move",
    name: "Trancoso Move",
    href: "https://trancosomove.com.br/",
    tag: "Mobilidade",
    description: "Mobilidade e moto-táxi em Trancoso: solicite corridas e avalie o serviço.",
    Icon: Car,
  },
];

const host = (href) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Órbitas decorativas inspiradas no símbolo da marca (sem recriar nem alterar a logo).
function Orbits() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] opacity-30 motion-safe:animate-[spin_90s_linear_infinite]"
    >
      <g fill="none" stroke="var(--toca-laranja)" strokeWidth="1.2">
        <ellipse cx="300" cy="300" rx="280" ry="110" transform="rotate(-24 300 300)" />
        <ellipse cx="300" cy="300" rx="220" ry="80" transform="rotate(32 300 300)" strokeOpacity=".6" />
        <circle cx="300" cy="300" r="150" strokeOpacity=".35" />
      </g>
      <g fill="var(--toca-areia)">
        <circle cx="62" cy="214" r="7" />
        <circle cx="520" cy="372" r="6" />
        <circle cx="300" cy="150" r="5" />
      </g>
    </svg>
  );
}

function ServiceCard({ item }) {
  const { Icon } = item;
  const body = (
    <>
      <span
        className="inline-flex h-12 w-12 items-center justify-center"
        style={{
          backgroundColor: "var(--toca-laranja)",
          color: "var(--toca-obsidiana)",
          borderRadius: "var(--toca-radius-md)",
        }}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span
        className="mt-5 inline-flex w-fit px-3 py-1 text-xs font-bold tracking-wide"
        style={{
          backgroundColor: "rgba(242, 222, 196, 0.12)",
          color: "var(--toca-areia)",
          borderRadius: "var(--toca-radius-pill)",
        }}
      >
        {item.tag}
      </span>
      <h3 className="mt-3 text-2xl font-medium" style={{ fontFamily: "var(--font-editorial)", color: "#FFFFFF" }}>
        {item.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "#E4D5BE" }}>
        {item.description}
      </p>
      <span className="mt-6 inline-flex items-center justify-between gap-3 text-sm font-bold" style={{ color: "var(--toca-areia)" }}>
        <span className="truncate">{host(item.href)}</span>
        <span
          className="inline-flex shrink-0 items-center gap-1 px-4 py-2"
          style={{
            backgroundColor: "var(--toca-action)",
            color: "var(--toca-on-action)",
            borderRadius: "var(--toca-radius-pill)",
          }}
        >
          Visitar
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </span>
    </>
  );

  const cardClass =
    "relative flex h-full flex-col p-6 border transition-transform duration-200 motion-safe:hover:-translate-y-1";
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(242, 222, 196, 0.22)",
    borderRadius: "var(--toca-radius-xl)",
  };

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${item.name} em nova aba`}
      className={cardClass}
      style={cardStyle}
    >
      {body}
    </a>
  );
}

export default function EcosystemHub() {
  const current = ECOSYSTEM_LINKS.find((i) => i.current);
  const others = ECOSYSTEM_LINKS.filter((i) => !i.current);

  return (
    <section
      id="ecossistema"
      aria-labelledby="ecossistema-titulo"
      className="relative overflow-hidden py-24"
      style={{ backgroundColor: "var(--toca-obsidiana)" }}
    >
      <Orbits />
      <div className="container relative mx-auto max-w-6xl px-6">
        <p
          className="text-center text-xs font-bold tracking-[0.3em]"
          style={{ color: "var(--toca-laranja)" }}
        >
          UMA IDENTIDADE. VÁRIOS DESTINOS.
        </p>
        <h2
          id="ecossistema-titulo"
          className="mt-3 text-center text-4xl font-medium md:text-5xl"
          style={{ color: "#FFFFFF" }}
        >
          Marcas e serviços Toca
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center" style={{ color: "#E4D5BE" }}>
          Serviços relacionados, cada um com a sua marca, o seu site e o seu atendimento.
        </p>

        {current && (
          <div
            className="mx-auto mt-12 flex flex-col items-start gap-4 border p-8 md:flex-row md:items-center md:gap-8"
            style={{
              backgroundColor: "rgba(232, 87, 26, 0.10)",
              borderColor: "rgba(232, 87, 26, 0.45)",
              borderRadius: "var(--toca-radius-xl)",
            }}
          >
            <span
              className="inline-flex h-14 w-14 shrink-0 items-center justify-center"
              style={{
                backgroundColor: "var(--toca-laranja)",
                color: "var(--toca-obsidiana)",
                borderRadius: "var(--toca-radius-md)",
              }}
            >
              <current.Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="text-3xl font-medium" style={{ fontFamily: "var(--font-editorial)", color: "#FFFFFF" }}>
                {current.name}
              </h3>
              <p className="mt-1" style={{ color: "#E4D5BE" }}>
                {current.description}
              </p>
              <Link
                to="/Concierge"
                className="mt-3 inline-flex items-center gap-1 text-sm font-bold underline-offset-4 hover:underline"
                style={{ color: "var(--toca-areia)" }}
              >
                Conhecer o Concierge privativo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <span
              className="inline-flex items-center px-4 py-2 text-sm font-bold"
              style={{
                backgroundColor: "var(--toca-areia)",
                color: "var(--toca-ink)",
                borderRadius: "var(--toca-radius-pill)",
              }}
            >
              Você está aqui
            </span>
          </div>
        )}

        <ul className="mt-6 grid max-w-3xl mx-auto gap-6 sm:grid-cols-2">
          {others.map((item) => (
            <li key={item.id}>
              <ServiceCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
