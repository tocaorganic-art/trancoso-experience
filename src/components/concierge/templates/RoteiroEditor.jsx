import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { INPUT_DARK_CLASS, INPUT_LIGHT_CLASS, TEXTAREA_DARK_CLASS, TEXTAREA_LIGHT_CLASS } from "./fieldStyles";
import { CONCIERGE_COLORS } from "@/components/concierge/brand";

// Editor do roteiro dia a dia (dia, título e descrição).
export default function RoteiroEditor({ roteiro, onChange, dark = true }) {
  const inputClass = dark ? INPUT_DARK_CLASS : INPUT_LIGHT_CLASS;
  const textareaClass = dark ? TEXTAREA_DARK_CLASS : TEXTAREA_LIGHT_CLASS;

  const update = (i, campo, valor) =>
    onChange(roteiro.map((r, idx) => (idx === i ? { ...r, [campo]: valor } : r)));
  const remover = (i) => onChange(roteiro.filter((_, idx) => idx !== i));
  const adicionar = () => onChange([...roteiro, { dia: "", titulo: "", descricao: "" }]);

  return (
    <div className="space-y-3">
      {roteiro.map((r, i) => (
        <div
          key={i}
          className="rounded-lg border p-3"
          style={{ borderColor: dark ? CONCIERGE_COLORS.border : "var(--ds-color-border)" }}
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className={`${inputClass} sm:max-w-[160px]`}
              placeholder="Dia (ex: Dia 1)"
              aria-label="Dia do roteiro"
              value={r.dia || ""}
              onChange={(e) => update(i, "dia", e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Título do dia"
              aria-label="Título do dia"
              value={r.titulo || ""}
              onChange={(e) => update(i, "titulo", e.target.value)}
            />
          </div>
          <textarea
            className={`${textareaClass} mt-2`}
            rows={2}
            placeholder="Descrição do dia"
            aria-label="Descrição do dia"
            value={r.descricao || ""}
            onChange={(e) => update(i, "descricao", e.target.value)}
          />
          <button
            type="button"
            onClick={() => remover(i)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300"
            aria-label={`Remover dia ${r.dia || i + 1}`}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Remover dia
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={adicionar}
        className="inline-flex items-center gap-1 text-sm font-bold hover:underline underline-offset-2"
        style={{ color: dark ? CONCIERGE_COLORS.champagne : "var(--ds-color-link)" }}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Adicionar dia
      </button>
    </div>
  );
}