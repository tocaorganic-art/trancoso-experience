import React from "react";
import { DsButton } from "@shared";
import { fmtBRL } from "./copiarConteudo";
import { CONCIERGE_COLORS } from "@/components/concierge/brand";

// Card de template no catálogo (seção clara do Concierge).
export default function TemplateCard({ template, isAdmin, criando, onVer, onEditar, onCriarProposta }) {
  const servicos = template.servicos || [];
  const roteiro = template.roteiro || [];
  const total = fmtBRL(template.valor_total);

  return (
    <article
      className="flex flex-col border p-6 transition duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg sm:p-8"
      style={{
        backgroundColor: "var(--ds-color-surface)",
        borderColor: "var(--ds-color-border)",
        borderRadius: "var(--ds-radius-lg)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className="font-medium"
          style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-2xl)", color: "var(--ds-color-text)" }}
        >
          {template.titulo || template.nome}
        </h3>
        {template.ativo === false ? (
          <span
            className="rounded-full border px-3 py-1 text-xs font-bold"
            style={{ borderColor: "var(--ds-color-border)", color: "var(--ds-color-text-muted)" }}
          >
            Inativo
          </span>
        ) : null}
      </div>
      {template.nome && template.titulo ? (
        <p className="mt-1 text-sm font-semibold" style={{ color: "var(--ds-color-text-muted)" }}>
          {template.nome}
        </p>
      ) : null}
      {template.subtitulo ? (
        <p className="mt-2 text-sm font-semibold" style={{ color: "var(--ds-color-text-muted)" }}>
          {template.subtitulo}
        </p>
      ) : null}

      <p className="mt-4 flex-1 leading-relaxed" style={{ color: "var(--ds-color-text-muted)" }}>
        {template.mensagem || "Template de proposta com estrutura pré-definida de serviços e roteiro."}
      </p>

      <p className="mt-4 text-sm font-semibold" style={{ color: "var(--ds-color-text-muted)" }}>
        {servicos.length} {servicos.length === 1 ? "serviço" : "serviços"} · {roteiro.length}{" "}
        {roteiro.length === 1 ? "dia no roteiro" : "dias no roteiro"}
        {total ? ` · ${total}` : ""}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <DsButton onClick={onVer}>Ver detalhes</DsButton>
        <DsButton variant="ghost" onClick={onCriarProposta} disabled={criando}>
          {criando ? "Criando..." : "Criar proposta deste modelo"}
        </DsButton>
        {isAdmin ? (
          <button
            type="button"
            onClick={onEditar}
            className="inline-flex items-center gap-1 text-sm font-bold underline-offset-2 hover:underline"
            style={{ color: CONCIERGE_COLORS.terracota }}
          >
            Editar template
          </button>
        ) : null}
      </div>
    </article>
  );
}