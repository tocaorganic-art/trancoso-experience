import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { INPUT_DARK_CLASS, INPUT_LIGHT_CLASS, TEXTAREA_DARK_CLASS, TEXTAREA_LIGHT_CLASS } from "./fieldStyles";
import { CONCIERGE_COLORS } from "@/components/concierge/brand";

// Editor de lista de serviços (nome, descrição e valor opcional).
export default function ServicosEditor({ servicos, onChange, dark = true }) {
  const inputClass = dark ? INPUT_DARK_CLASS : INPUT_LIGHT_CLASS;
  const textareaClass = dark ? TEXTAREA_DARK_CLASS : TEXTAREA_LIGHT_CLASS;

  const update = (i, campo, valor) =>
    onChange(servicos.map((s, idx) => (idx === i ? { ...s, [campo]: valor } : s)));
  const remover = (i) => onChange(servicos.filter((_, idx) => idx !== i));
  const adicionar = () => onChange([...servicos, { nome: "", descricao: "", valor: null }]);

  return (
    <div className="space-y-3">
      {servicos.map((s, i) => (
        <div
          key={i}
          className="rounded-lg border p-3"
          style={{ borderColor: dark ? CONCIERGE_COLORS.border : "var(--ds-color-border)" }}
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className={inputClass}
              placeholder="Nome do serviço"
              aria-label="Nome do serviço"
              value={s.nome || ""}
              onChange={(e) => update(i, "nome", e.target.value)}
            />
            <input
              className={`${inputClass} sm:max-w-[180px]`}
              type="number"
              min="0"
              placeholder="Valor (opcional)"
              aria-label="Valor do serviço"
              value={s.valor ?? ""}
              onChange={(e) => update(i, "valor", e.target.value === "" ? null : Number(e.target.value))}
            />
          </div>
          <textarea
            className={`${textareaClass} mt-2`}
            rows={2}
            placeholder="Descrição do serviço"
            aria-label="Descrição do serviço"
            value={s.descricao || ""}
            onChange={(e) => update(i, "descricao", e.target.value)}
          />
          <button
            type="button"
            onClick={() => remover(i)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300"
            aria-label={`Remover serviço ${s.nome || i + 1}`}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Remover serviço
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
        Adicionar serviço
      </button>
    </div>
  );
}