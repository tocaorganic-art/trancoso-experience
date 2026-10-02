import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CONCIERGE_COLORS, FONT_TITLE } from "@/components/concierge/brand";
import { fmtBRL } from "./copiarConteudo";

// Visualização completa de um template, com todo o conteúdo salvo.
export default function TemplateViewDialog({ open, onOpenChange, template, children }) {
  if (!template) return null;
  const servicos = template.servicos || [];
  const roteiro = template.roteiro || [];
  const total = fmtBRL(template.valor_total);

  const Secao = ({ titulo, children: conteudo }) => (
    <section className="mt-6">
      <h4 className="text-xs font-bold tracking-[0.25em]" style={{ color: CONCIERGE_COLORS.champagne }}>
        {titulo}
      </h4>
      <div className="mt-3">{conteudo}</div>
    </section>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-[#4D4030] sm:max-w-2xl"
        style={{ backgroundColor: CONCIERGE_COLORS.card, color: CONCIERGE_COLORS.text }}
      >
        <DialogHeader>
          <p className="text-xs font-bold tracking-[0.3em]" style={{ color: CONCIERGE_COLORS.terracota }}>
            {template.nome}
          </p>
          <DialogTitle className="text-left font-medium" style={{ fontFamily: FONT_TITLE }}>
            {template.titulo || template.nome}
          </DialogTitle>
          {template.subtitulo ? (
            <DialogDescription style={{ color: CONCIERGE_COLORS.terracota }}>
              {template.subtitulo}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {template.mensagem ? <p className="text-sm leading-relaxed">{template.mensagem}</p> : null}

        {servicos.length > 0 && (
          <Secao titulo="SERVIÇOS INCLUSOS">
            <ul className="space-y-2">
              {servicos.map((s, i) => {
                const preco = fmtBRL(s.valor);
                return (
                  <li key={i} className="text-sm leading-relaxed">
                    <span className="font-bold">{s.nome || "Serviço"}</span>
                    {s.descricao ? <span>: {s.descricao}</span> : null}
                    {preco ? <span style={{ color: CONCIERGE_COLORS.champagne }}> ({preco})</span> : null}
                  </li>
                );
              })}
            </ul>
          </Secao>
        )}

        {roteiro.length > 0 && (
          <Secao titulo="ROTEIRO">
            <ol className="space-y-3">
              {roteiro.map((r, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  <span className="font-bold">{r.dia || `Dia ${i + 1}`}</span>
                  {r.titulo ? <span>: {r.titulo}</span> : null}
                  {r.descricao ? <span className="block opacity-80">{r.descricao}</span> : null}
                </li>
              ))}
            </ol>
          </Secao>
        )}

        {template.politicas ? (
          <Secao titulo="POLÍTICAS E CONDIÇÕES">
            <p className="whitespace-pre-line text-sm leading-relaxed">{template.politicas}</p>
          </Secao>
        ) : null}

        {total ? (
          <Secao titulo="VALOR TOTAL SUGERIDO">
            <p className="font-bold" style={{ color: CONCIERGE_COLORS.champagne }}>{total}</p>
          </Secao>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}
      </DialogContent>
    </Dialog>
  );
}