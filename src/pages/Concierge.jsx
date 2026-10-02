import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { DsButton } from "@shared";
import { ConciergeBell, ArrowUpRight } from "@shared/icons";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FloatingSpotifyPlayer from "@/components/concierge/FloatingSpotifyPlayer";
import { ICONE_CASA, LOGO_PRINCIPAL } from "@/components/concierge/brand";

// Subcategorias da categoria Concierge. Cada subcategoria tem sua própria página.
const ROTA_PROPOSTAS = "/concierge/propostas";
const ROTA_TEMPLATES = "/concierge/templates";

const SUBCATEGORIAS = [
  {
    id: "propostas",
    nome: "Propostas",
    descricao: "Propostas exclusivas de experiências privativas: concierge, gastronomia, logística e música em destinos premium.",
    quantidade: "1 proposta disponível",
    rota: ROTA_PROPOSTAS,
  },
  {
    id: "templates",
    nome: "Templates",
    descricao: "Estruturas pré-definidas de serviços e roteiros para montar novas propostas sem começar do zero. Criação e edição exclusivas para administradores.",
    quantidade: "Modelos reutilizáveis",
    rota: ROTA_TEMPLATES,
  },
];

export default function Concierge() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Serviços", href: createPageUrl("Home") + "#servicos" },
          { label: "Concierge" },
        ]}
      />

      {/* Cabeçalho da categoria */}
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: "var(--ds-color-obsidiana)", color: "var(--ds-color-text-on-dark)" }}
      >
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div
            className="absolute -left-1/4 top-1/3 h-[60vmin] w-[60vmin] rounded-full opacity-25 blur-3xl"
            style={{ backgroundColor: "var(--ds-color-laranja)" }}
          />
        </div>
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-6 sm:py-24 md:text-left">
          <div className="flex justify-center md:justify-start">
            <img
              src={ICONE_CASA}
              alt=""
              width="48"
              height="48"
              className="h-12 w-12 object-contain sm:hidden"
              loading="lazy"
            />
            <img
              src={LOGO_PRINCIPAL}
              alt="Toca Experience"
              width="220"
              height="220"
              className="hidden w-[220px] max-w-full object-contain sm:block"
              loading="lazy"
            />
          </div>
          <p className="mt-4 text-xs font-bold tracking-[0.3em]" style={{ color: "var(--ds-color-laranja)" }}>
            CONCIERGE
          </p>
          <h1
            className="mt-3 font-medium"
            style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-areia)" }}
          >
            Concierge
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed md:text-lg" style={{ color: "var(--ds-color-text-on-dark-muted)" }}>
            Experiências privativas de ponta a ponta: hospitalidade, gastronomia, logística e música em um só lugar. Explore as subcategorias da categoria e todos os detalhes de cada uma.
          </p>
        </div>
      </section>

      {/* Subcategorias da categoria */}
      <section aria-labelledby="subcategorias-concierge" className="py-20 sm:py-24" style={{ backgroundColor: "var(--ds-color-bg)" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2
            id="subcategorias-concierge"
            className="font-medium"
            style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-text)" }}
          >
            Subcategorias
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {SUBCATEGORIAS.map((sub) => (
              <article
                key={sub.id}
                className="flex flex-col border p-6 transition duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg sm:p-8"
                style={{ backgroundColor: "var(--ds-color-surface)", borderColor: "var(--ds-color-border)", borderRadius: "var(--ds-radius-lg)" }}
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center"
                  style={{ backgroundColor: "var(--ds-color-action)", color: "var(--ds-color-on-action)", borderRadius: "var(--ds-radius-md)" }}
                >
                  <ConciergeBell className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3
                  className="mt-5 font-medium"
                  style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-2xl)", color: "var(--ds-color-text)" }}
                >
                  <Link to={sub.rota} className="hover:underline">
                    {sub.nome}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 leading-relaxed" style={{ color: "var(--ds-color-text-muted)" }}>
                  {sub.descricao}
                </p>
                <p className="mt-4 text-sm font-semibold" style={{ color: "var(--ds-color-text-muted)" }}>
                  {sub.quantidade}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <DsButton href={sub.rota}>Ver {sub.nome.toLowerCase()}</DsButton>
                </div>
                <Link
                  to={sub.rota}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-bold"
                  style={{ color: "var(--ds-color-link)" }}
                >
                  Ver detalhes da subcategoria
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FloatingSpotifyPlayer />
    </div>
  );
}