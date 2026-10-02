import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { DsButton } from "@shared";
import { ConciergeBell, ArrowUpRight } from "@shared/icons";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FloatingSpotifyPlayer from "@/components/concierge/FloatingSpotifyPlayer";
import { ICONE_CASA, LOGO_PRINCIPAL } from "@/components/concierge/brand";

// A proposta sempre abre na página interna, nunca o arquivo cru de armazenamento.
const ROTA_PROPOSTA = "/concierge/proposta-tony";

const PROPOSTA = {
  titulo: "Friend’s Party Experience · Experiência Tony",
  subtitulo: "Praia dos Amores, Balneário Camboriú · 17 a 22 de Novembro · 16 convidados",
  descricao: "Proposta exclusiva Toca Experience: concierge, chef privativo, governança, barman e DJ, logística privativa e noites VIP no Surreal Park e no Green Valley.",
  valor: "A partir de R$ 43.000,00 (R$ 2.687,50 por convidado)",
};


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
          <p className="text-xs font-bold tracking-[0.3em]" style={{ color: "var(--ds-color-laranja)" }}>
            CONCIERGE
          </p>
          <h1
            className="mt-3 font-medium"
            style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-areia)" }}
          >
            Concierge
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed md:text-lg" style={{ color: "var(--ds-color-text-on-dark-muted)" }}>
            Experiências privativas de ponta a ponta: hospitalidade, gastronomia, logística e música em um só lugar. Conheça as propostas disponíveis e todos os detalhes de cada uma.
          </p>
        </div>
      </section>

      {/* Propostas da categoria */}
      <section aria-labelledby="propostas-concierge" className="py-20 sm:py-24" style={{ backgroundColor: "var(--ds-color-bg)" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2
            id="propostas-concierge"
            className="font-medium"
            style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-text)" }}
          >
            Propostas disponíveis
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article
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
                <Link to={ROTA_PROPOSTA} className="hover:underline">
                  {PROPOSTA.titulo}
                </Link>
              </h3>
              <p className="mt-2 text-sm font-semibold" style={{ color: "var(--ds-color-text-muted)" }}>
                {PROPOSTA.subtitulo}
              </p>
              <p className="mt-4 flex-1 leading-relaxed" style={{ color: "var(--ds-color-text-muted)" }}>
                {PROPOSTA.descricao}
              </p>
              <p className="mt-4 font-bold" style={{ color: "var(--ds-color-text)" }}>
                {PROPOSTA.valor}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <DsButton href={ROTA_PROPOSTA}>Ver proposta</DsButton>
                <DsButton variant="ghost" href={`${ROTA_PROPOSTA}?lang=es`}>Ver em castelhano</DsButton>
              </div>
              <Link
                to={ROTA_PROPOSTA}
                className="mt-6 inline-flex items-center gap-1 text-sm font-bold"
                style={{ color: "var(--ds-color-link)" }}
              >
                Ver detalhe da proposta
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>
      <FloatingSpotifyPlayer />
    </div>
  );
}