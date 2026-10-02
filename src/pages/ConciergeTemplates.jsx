import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { DsButton } from "@shared";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FloatingSpotifyPlayer from "@/components/concierge/FloatingSpotifyPlayer";
import { ICONE_CASA, LOGO_PRINCIPAL } from "@/components/concierge/brand";
import TemplateCard from "@/components/concierge/templates/TemplateCard";
import TemplateFormDialog from "@/components/concierge/templates/TemplateFormDialog";
import TemplateViewDialog from "@/components/concierge/templates/TemplateViewDialog";
import { copiarProposta } from "@/components/concierge/templates/copiarConteudo";

// Catálogo de templates de proposta. Visualização pública; criação e edição
// de templates e de rascunhos de proposta exclusivas para administradores.
const ROTA_EDITOR = "/concierge/editor-proposta";

export default function ConciergeTemplates() {
  const { user, isAuthenticated, navigateToLogin } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visualizado, setVisualizado] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [criandoId, setCriandoId] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      setTemplates(await base44.entities.PropostaTemplate.list("-created_date", 50));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // Sincronização em tempo real: cobre mudanças feitas em outra aba ou sessão.
  useEffect(() => {
    const unsubscribe = base44.entities.PropostaTemplate.subscribe((event) => {
      if (event.type === "create") {
        setTemplates((ts) => (ts.some((t) => t.id === event.data.id) ? ts : [event.data, ...ts]));
      } else if (event.type === "update") {
        setTemplates((ts) => ts.map((t) => (t.id === event.data.id ? { ...t, ...event.data } : t)));
      } else if (event.type === "delete") {
        setTemplates((ts) => ts.filter((t) => t.id !== event.id));
      }
    });
    return unsubscribe;
  }, []);

  const visiveis = isAdmin ? templates : templates.filter((t) => t.ativo !== false);

  const copiar = async (t) => {
    try {
      await copiarProposta(t);
      toast.success("Conteúdo do template copiado.");
    } catch {
      toast.error("Não foi possível copiar o conteúdo.");
    }
  };

  const salvarTemplate = async (dados) => {
    try {
      if (editando?.id) {
        await base44.entities.PropostaTemplate.update(editando.id, dados);
        setTemplates((ts) => ts.map((t) => (t.id === editando.id ? { ...t, ...dados } : t)));
        toast.success("Template atualizado.");
      } else {
        const criado = await base44.entities.PropostaTemplate.create(dados);
        setTemplates((ts) => (ts.some((x) => x.id === criado.id) ? ts : [criado, ...ts]));
        toast.success("Template criado.");
      }
      setFormAberto(false);
      setEditando(null);
    } catch {
      toast.error("Não foi possível salvar o template.");
    }
  };

  const excluirTemplate = async (t) => {
    if (!window.confirm(`Excluir o template "${t.nome}"?`)) return;
    try {
      await base44.entities.PropostaTemplate.delete(t.id);
      setTemplates((ts) => ts.filter((x) => x.id !== t.id));
      toast.success("Template excluído.");
    } catch {
      toast.error("Não foi possível excluir o template.");
    }
  };

  const criarProposta = async (t) => {
    if (!isAuthenticated) {
      toast.info("Entre com sua conta de administrador para criar propostas.");
      navigateToLogin();
      return;
    }
    if (!isAdmin) {
      toast.error("A criação de propostas é exclusiva para administradores.");
      return;
    }
    setCriandoId(t.id);
    try {
      const rascunho = await base44.entities.Proposta.create({
        titulo: t.titulo || t.nome,
        subtitulo: t.subtitulo || "",
        cliente_nome: "",
        cliente_contato: "",
        convidados: "",
        mensagem: t.mensagem || "",
        servicos: t.servicos || [],
        roteiro: t.roteiro || [],
        politicas: t.politicas || "",
        valor_total: t.valor_total ?? null,
        template_id: t.id,
        template_nome: t.nome,
        status: "rascunho",
      });
      toast.success("Rascunho criado a partir do template.");
      navigate(`${ROTA_EDITOR}?id=${rascunho.id}`);
    } catch {
      toast.error("Não foi possível criar o rascunho.");
    } finally {
      setCriandoId(null);
    }
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Serviços", href: createPageUrl("Home") + "#servicos" },
          { label: "Concierge", href: "/concierge" },
          { label: "Templates" },
        ]}
      />

      {/* Cabeçalho da subcategoria */}
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
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-6 sm:py-20 md:text-left">
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
            CONCIERGE · TEMPLATES
          </p>
          <h1
            className="mt-3 font-medium"
            style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-areia)" }}
          >
            Templates de Proposta
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed md:text-lg" style={{ color: "var(--ds-color-text-on-dark-muted)" }}>
            Estruturas pré-definidas de serviços e roteiros para montar novas propostas sem começar do zero. Abra um modelo para revisar o conteúdo completo, copiá-lo ou usá-lo como base de uma nova proposta.
          </p>
        </div>
      </section>

      {/* Catálogo de templates */}
      <section aria-labelledby="templates-lista" className="py-20 sm:py-24" style={{ backgroundColor: "var(--ds-color-bg)" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2
              id="templates-lista"
              className="font-medium"
              style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-text)" }}
            >
              Templates disponíveis
            </h2>
            {isAdmin ? (
              <DsButton
                onClick={() => {
                  setEditando(null);
                  setFormAberto(true);
                }}
              >
                Novo template
              </DsButton>
            ) : null}
          </div>

          {loading ? (
            <div role="status" aria-live="polite" className="mt-12 flex items-center justify-center gap-3">
              <span className="sr-only">Carregando templates</span>
              <div aria-hidden="true" className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
            </div>
          ) : visiveis.length === 0 ? (
            <p className="mt-12 text-center" style={{ color: "var(--ds-color-text-muted)" }}>
              {isAdmin
                ? "Nenhum template ainda. Crie o primeiro com a estrutura de serviços e roteiro que mais usa."
                : "Nenhum template disponível no momento."}
            </p>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {visiveis.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  isAdmin={isAdmin}
                  criando={criandoId === t.id}
                  onVer={() => setVisualizado(t)}
                  onEditar={() => {
                    setEditando(t);
                    setFormAberto(true);
                  }}
                  onCriarProposta={() => criarProposta(t)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <TemplateViewDialog
        open={Boolean(visualizado)}
        onOpenChange={(o) => !o && setVisualizado(null)}
        template={visualizado}
      >
        <div className="flex flex-wrap gap-3">
          <DsButton onClick={() => copiar(visualizado)}>Copiar conteúdo</DsButton>
          <DsButton variant="ghost" onClick={() => criarProposta(visualizado)} disabled={criandoId === visualizado?.id}>
            {criandoId === visualizado?.id ? "Criando..." : "Criar proposta deste modelo"}
          </DsButton>
        </div>
      </TemplateViewDialog>

      <TemplateFormDialog
        open={formAberto}
        onOpenChange={setFormAberto}
        template={editando}
        onSalvar={salvarTemplate}
      />

      <FloatingSpotifyPlayer />
    </div>
  );
}