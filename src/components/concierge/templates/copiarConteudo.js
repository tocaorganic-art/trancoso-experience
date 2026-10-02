// Formata o conteúdo de um template ou rascunho como texto plano para cópia.
// Sem travessões: usa dois pontos, vírgulas e parênteses.
export const fmtBRL = (v) => {
  const n = Number(v);
  if (v == null || v === "" || Number.isNaN(n)) return null;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export function montarTextoProposta(dados) {
  if (!dados) return "";
  const linhas = [];
  linhas.push(dados.titulo || dados.nome || "Proposta");
  if (dados.subtitulo) linhas.push(dados.subtitulo);
  if (dados.mensagem) linhas.push("", dados.mensagem);

  const servicos = dados.servicos || [];
  if (servicos.length) {
    linhas.push("", "SERVIÇOS INCLUSOS:");
    servicos.forEach((s) => {
      const preco = fmtBRL(s.valor);
      linhas.push(`${s.nome || "Serviço"}${s.descricao ? ": " + s.descricao : ""}${preco ? " (" + preco + ")" : ""}`);
    });
  }

  const roteiro = dados.roteiro || [];
  if (roteiro.length) {
    linhas.push("", "ROTEIRO:");
    roteiro.forEach((r) => {
      linhas.push(`${r.dia || "Dia"}${r.titulo ? ": " + r.titulo : ""}${r.descricao ? " " + r.descricao : ""}`.trim());
    });
  }

  if (dados.politicas) linhas.push("", "POLÍTICAS E CONDIÇÕES:", dados.politicas);
  const total = fmtBRL(dados.valor_total);
  if (total) linhas.push("", `Valor total: ${total}`);
  return linhas.join("\n");
}

export async function copiarProposta(dados) {
  await navigator.clipboard.writeText(montarTextoProposta(dados));
}