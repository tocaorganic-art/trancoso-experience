import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Save } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ServicosEditor from "@/components/concierge/templates/ServicosEditor";
import RoteiroEditor from "@/components/concierge/templates/RoteiroEditor";
import { copiarProposta } from "@/components/concierge/templates/copiarConteudo";
import { INPUT_LIGHT_CLASS, TEXTAREA_LIGHT_CLASS } from "@/components/concierge/templates/fieldStyles";
import { createPageUrl } from "@/utils";

const STATUS_OPCOES = ["rascunho", "enviada", "aceita", "fechada"];

// Editor de rascunho de proposta (página interna, acesso exclusivo de admins).
export default function PropostaEditor() {
  const id = new URLSearchParams(window.location.search).get("id");
  const [rascunho, setRascunho] = useState(null);
  const [valores, setValores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    if (!id) {
      setErro("Nenhum rascunho informado. Crie uma proposta a partir de um template.");
      setLoading(false);
      return;
    }
    try {
      const r = await base44.entities.Proposta.get(id);
      setRascunho(r);
      setValores({ ...r });
    } catch {
      setErro("Rascunho não encontrado.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const setCampo = (campo, valor) => setValores((v) => ({ ...v, [campo]: valor }));

  const salvar = async () => {
    setSalvando(true);
    try {
      await base44.entities.Proposta.update(rascunho.id, {
        ...valores,
        valor_total:
          valores.valor_total === "" || valores.valor_total == null ? null : Number(valores.valor_total),
      });
      toast.success("Proposta salva.");
    } catch {
      toast.error("Não foi possível salvar a proposta.");
    } finally {
      setSalvando(false);
    }
  };

  const copiar = async () => {
    try {
      await copiarProposta(valores);
      toast.success("Conteúdo da proposta copiado.");
    } catch {
      toast.error("Não foi possível copiar o conteúdo.");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--ds-color-bg)" }}>
      <Breadcrumbs
        items={[
          { label: "Serviços", href: createPageUrl("Home") + "#servicos" },
          { label: "Concierge", href: "/concierge" },
          { label: "Templates", href: "/concierge/templates" },
          { label: "Editor de proposta" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Link
            to="/concierge/templates"
            className="inline-flex items-center gap-2 text-sm font-bold"
            style={{ color: "var(--ds-color-link)" }}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para templates
          </Link>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1
                className="font-medium"
                style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-text)" }}
              >
                Editor de proposta
              </h1>
              {rascunho?.template_nome ? (
                <p className="mt-1 text-sm font-semibold" style={{ color: "var(--ds-color-text-muted)" }}>
                  Base: template {rascunho.template_nome}
                </p>
              ) : null}
            </div>
            {valores ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copiar}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold"
                  style={{ borderColor: "var(--ds-color-border)", color: "var(--ds-color-text)" }}
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copiar conteúdo
                </button>
                <button
                  type="button"
                  onClick={salvar}
                  disabled={salvando}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold disabled:opacity-60"
                  style={{ backgroundColor: "var(--ds-color-action)", color: "var(--ds-color-on-action)" }}
                >
                  <Save className="h-4 w-4" aria-hidden="true" />
                  {salvando ? "Salvando..." : "Salvar proposta"}
                </button>
              </div>
            ) : null}
          </div>

          {loading ? (
            <div role="status" aria-live="polite" className="mt-16 flex items-center justify-center">
              <span className="sr-only">Carregando proposta</span>
              <div aria-hidden="true" className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
            </div>
          ) : erro ? (
            <div role="alert" className="mt-12 text-center">
              <p style={{ color: "var(--ds-color-text-muted)" }}>{erro}</p>
              <Link
                to="/concierge/templates"
                className="mt-4 inline-block text-sm font-bold"
                style={{ color: "var(--ds-color-link)" }}
              >
                Ver templates disponíveis
              </Link>
            </div>
          ) : valores ? (
            <div className="mt-10 space-y-8">
              <fieldset className="rounded-2xl border p-6" style={{ borderColor: "var(--ds-color-border)", backgroundColor: "var(--ds-color-surface)" }}>
                <legend className="px-2 text-xs font-bold tracking-[0.2em]" style={{ color: "var(--ds-color-text-muted)" }}>
                  CLIENTE
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="prop-cliente" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                      Nome do cliente
                    </label>
                    <input
                      id="prop-cliente"
                      className={INPUT_LIGHT_CLASS}
                      value={valores.cliente_nome || ""}
                      onChange={(e) => setCampo("cliente_nome", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="prop-contato" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                      Contato (e-mail ou WhatsApp)
                    </label>
                    <input
                      id="prop-contato"
                      className={INPUT_LIGHT_CLASS}
                      value={valores.cliente_contato || ""}
                      onChange={(e) => setCampo("cliente_contato", e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="rounded-2xl border p-6" style={{ borderColor: "var(--ds-color-border)", backgroundColor: "var(--ds-color-surface)" }}>
                <legend className="px-2 text-xs font-bold tracking-[0.2em]" style={{ color: "var(--ds-color-text-muted)" }}>
                  PROPOSTA
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="prop-titulo" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                      Título
                    </label>
                    <input
                      id="prop-titulo"
                      className={INPUT_LIGHT_CLASS}
                      value={valores.titulo || ""}
                      onChange={(e) => setCampo("titulo", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="prop-subtitulo" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                      Subtítulo (local e período)
                    </label>
                    <input
                      id="prop-subtitulo"
                      className={INPUT_LIGHT_CLASS}
                      value={valores.subtitulo || ""}
                      onChange={(e) => setCampo("subtitulo", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="prop-convidados" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                      Convidados
                    </label>
                    <input
                      id="prop-convidados"
                      className={INPUT_LIGHT_CLASS}
                      placeholder="Ex: 16 convidados"
                      value={valores.convidados || ""}
                      onChange={(e) => setCampo("convidados", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="prop-valor" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                      Valor total (R$)
                    </label>
                    <input
                      id="prop-valor"
                      className={INPUT_LIGHT_CLASS}
                      type="number"
                      min="0"
                      value={valores.valor_total ?? ""}
                      onChange={(e) => setCampo("valor_total", e.target.value === "" ? null : Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  <label htmlFor="prop-mensagem" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                    Mensagem de apresentação
                  </label>
                  <textarea
                    id="prop-mensagem"
                    className={TEXTAREA_LIGHT_CLASS}
                    rows={3}
                    value={valores.mensagem || ""}
                    onChange={(e) => setCampo("mensagem", e.target.value)}
                  />
                </div>
              </fieldset>

              <fieldset className="rounded-2xl border p-6" style={{ borderColor: "var(--ds-color-border)", backgroundColor: "var(--ds-color-surface)" }}>
                <legend className="px-2 text-xs font-bold tracking-[0.2em]" style={{ color: "var(--ds-color-text-muted)" }}>
                  SERVIÇOS INCLUSOS
                </legend>
                <ServicosEditor servicos={valores.servicos || []} onChange={(v) => setCampo("servicos", v)} dark={false} />
              </fieldset>

              <fieldset className="rounded-2xl border p-6" style={{ borderColor: "var(--ds-color-border)", backgroundColor: "var(--ds-color-surface)" }}>
                <legend className="px-2 text-xs font-bold tracking-[0.2em]" style={{ color: "var(--ds-color-text-muted)" }}>
                  ROTEIRO
                </legend>
                <RoteiroEditor roteiro={valores.roteiro || []} onChange={(v) => setCampo("roteiro", v)} dark={false} />
              </fieldset>

              <fieldset className="rounded-2xl border p-6" style={{ borderColor: "var(--ds-color-border)", backgroundColor: "var(--ds-color-surface)" }}>
                <legend className="px-2 text-xs font-bold tracking-[0.2em]" style={{ color: "var(--ds-color-text-muted)" }}>
                  CONDIÇÕES E STATUS
                </legend>
                <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                  <div className="space-y-1.5">
                    <label htmlFor="prop-politicas" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                      Políticas e condições
                    </label>
                    <textarea
                      id="prop-politicas"
                      className={TEXTAREA_LIGHT_CLASS}
                      rows={3}
                      value={valores.politicas || ""}
                      onChange={(e) => setCampo("politicas", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="prop-status" className="text-xs font-bold tracking-widest" style={{ color: "var(--ds-color-text-muted)" }}>
                      Status
                    </label>
                    <select
                      id="prop-status"
                      className={INPUT_LIGHT_CLASS}
                      value={valores.status || "rascunho"}
                      onChange={(e) => setCampo("status", e.target.value)}
                    >
                      {STATUS_OPCOES.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}