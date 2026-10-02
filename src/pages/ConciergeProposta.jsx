import React from "react";
import { createPageUrl } from "@/utils";
import { DsButton } from "@shared";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

const LINK_PROPOSTA = "https://base44.app/api/apps/6a7a395eda6099fa6338eef5/files/mp/public/6a7a395eda6099fa6338eef5/f8e921b98_toca-experience-tony-v5.html";
const LINK_PROPOSTA_ES = `${LINK_PROPOSTA}?lang=es`;

const PROPOSTA = {
  titulo: "Friend’s Party Experience · Experiência Tony",
  subtitulo: "Praia dos Amores, Balneário Camboriú · 17 a 22 de Novembro · 16 convidados",
  descricao: "Proposta exclusiva Toca Experience: concierge, chef privativo, governança, barman e DJ, logística privativa e noites VIP no Surreal Park e no Green Valley.",
  valor: "A partir de R$ 43.000,00 (R$ 2.687,50 por convidado)",
};

export default function ConciergeProposta() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Serviços", href: createPageUrl("Home") + "#servicos" },
          { label: "Concierge", href: createPageUrl("Concierge") },
          { label: "Experiência Tony" },
        ]}
      />

      {/* Cabeçalho da proposta */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: "var(--ds-color-obsidiana)", color: "var(--ds-color-text-on-dark)" }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <p className="text-xs font-bold tracking-[0.3em]" style={{ color: "var(--ds-color-laranja)" }}>
            CONCIERGE · PROPOSTA
          </p>
          <h1
            className="mt-3 font-medium"
            style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-areia)" }}
          >
            {PROPOSTA.titulo}
          </h1>
          <p className="mt-3 font-semibold" style={{ color: "var(--ds-color-text-on-dark-muted)" }}>
            {PROPOSTA.subtitulo}
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed" style={{ color: "var(--ds-color-text-on-dark-muted)" }}>
            {PROPOSTA.descricao}
          </p>
          <p className="mt-4 text-lg font-bold" style={{ color: "var(--ds-color-areia)" }}>
            {PROPOSTA.valor}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DsButton href={LINK_PROPOSTA}>Ver proposta</DsButton>
            <DsButton variant="ghost-dark" href={LINK_PROPOSTA_ES}>Ver em castelhano</DsButton>
          </div>
        </div>
      </section>

      {/* Proposta interativa: iframe responsivo de largura total */}
      <section aria-label="Proposta interativa completa" style={{ backgroundColor: "var(--ds-color-bg)" }}>
        <iframe
          src={LINK_PROPOSTA}
          title={`Proposta interativa: ${PROPOSTA.titulo}`}
          loading="lazy"
          allow="fullscreen"
          className="w-full"
          style={{ display: "block", width: "100%", height: "90vh", minHeight: "90vh", border: 0 }}
        />
      </section>
    </div>
  );
}