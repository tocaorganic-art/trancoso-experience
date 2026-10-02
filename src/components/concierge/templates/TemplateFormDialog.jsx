import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import ServicosEditor from "./ServicosEditor";
import RoteiroEditor from "./RoteiroEditor";
import { DARK_CARD_STYLE, INPUT_DARK_CLASS, TEXTAREA_DARK_CLASS } from "./fieldStyles";
import { CONCIERGE_COLORS, FONT_TITLE } from "@/components/concierge/brand";

const TEMPLATE_VAZIO = {
  nome: "", titulo: "", subtitulo: "", mensagem: "",
  servicos: [], roteiro: [], politicas: "", valor_total: null, ativo: true,
};

const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="text-xs font-bold tracking-[0.2em]"
    style={{ color: CONCIERGE_COLORS.champagne }}
  >
    {children}
  </label>
);

// Diálogo de criação e edição de template (exclusivo para administradores).
export default function TemplateFormDialog({ open, onOpenChange, template, onSalvar }) {
  const [dados, setDados] = useState(TEMPLATE_VAZIO);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (open) setDados(template ? { ...TEMPLATE_VAZIO, ...template } : TEMPLATE_VAZIO);
  }, [open, template]);

  const setCampo = (campo, valor) => setDados((d) => ({ ...d, [campo]: valor }));

  const salvar = async () => {
    if (!dados.nome.trim()) {
      window.alert("Informe o nome do template.");
      return;
    }
    setSalvando(true);
    try {
      await onSalvar(dados);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-[#4D4030] sm:max-w-2xl"
        style={DARK_CARD_STYLE}
      >
        <DialogHeader>
          <DialogTitle className="text-left font-medium" style={{ fontFamily: FONT_TITLE }}>
            {template ? "Editar template" : "Novo template"}
          </DialogTitle>
          <DialogDescription style={{ color: CONCIERGE_COLORS.terracota }}>
            Estrutura pré-definida de serviços e roteiro usada como base para novas propostas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="tpl-nome">Nome do template</Label>
              <input
                id="tpl-nome"
                className={INPUT_DARK_CLASS}
                placeholder="Ex: Friend's Party Experience"
                value={dados.nome}
                onChange={(e) => setCampo("nome", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tpl-titulo">Título da proposta</Label>
              <input
                id="tpl-titulo"
                className={INPUT_DARK_CLASS}
                placeholder="Título exibido na proposta"
                value={dados.titulo || ""}
                onChange={(e) => setCampo("titulo", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tpl-subtitulo">Subtítulo (local e período)</Label>
            <input
              id="tpl-subtitulo"
              className={INPUT_DARK_CLASS}
              placeholder="Ex: Praia dos Amores, Balneário Camboriú · 6 noites"
              value={dados.subtitulo || ""}
              onChange={(e) => setCampo("subtitulo", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tpl-mensagem">Mensagem de apresentação</Label>
            <textarea
              id="tpl-mensagem"
              className={TEXTAREA_DARK_CLASS}
              rows={3}
              placeholder="Texto de abertura da proposta"
              value={dados.mensagem || ""}
              onChange={(e) => setCampo("mensagem", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Serviços inclusos</Label>
            <ServicosEditor servicos={dados.servicos || []} onChange={(v) => setCampo("servicos", v)} />
          </div>

          <div className="space-y-2">
            <Label>Roteiro</Label>
            <RoteiroEditor roteiro={dados.roteiro || []} onChange={(v) => setCampo("roteiro", v)} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tpl-politicas">Políticas e condições</Label>
            <textarea
              id="tpl-politicas"
              className={TEXTAREA_DARK_CLASS}
              rows={3}
              placeholder="Reserva, pagamento e observações"
              value={dados.politicas || ""}
              onChange={(e) => setCampo("politicas", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="tpl-valor">Valor total sugerido (R$)</Label>
              <input
                id="tpl-valor"
                className={INPUT_DARK_CLASS}
                type="number"
                min="0"
                placeholder="Ex: 43000"
                value={dados.valor_total ?? ""}
                onChange={(e) => setCampo("valor_total", e.target.value === "" ? null : Number(e.target.value))}
              />
            </div>
            <div className="flex items-end gap-3">
              <Switch
                id="tpl-ativo"
                checked={dados.ativo !== false}
                onCheckedChange={(v) => setCampo("ativo", v)}
              />
              <Label htmlFor="tpl-ativo">Template ativo</Label>
            </div>
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full border px-5 py-2.5 text-sm font-bold"
            style={{ borderColor: CONCIERGE_COLORS.border, color: CONCIERGE_COLORS.text }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={salvar}
            disabled={salvando}
            className="rounded-full px-6 py-2.5 text-sm font-bold disabled:opacity-60"
            style={{ backgroundColor: CONCIERGE_COLORS.champagne, color: CONCIERGE_COLORS.bg }}
          >
            {salvando ? "Salvando..." : "Salvar template"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}