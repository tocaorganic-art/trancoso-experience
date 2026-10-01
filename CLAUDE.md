# Trancoso Experience — Regras de Trabalho (ordem do Tony, 01/10/2026)

## Execução autônoma até o fim
- Execute a tarefa INTEIRA sozinho: análise → código → testes → branch → PR → merge na main. NÃO pare no meio para pedir confirmação ("pode mergear?", "posso continuar?").
- Mergeie automaticamente quando o PR estiver limpo: sem conflito, mergeable, sem alertas de segurança não resolvidos.
- Avise o Tony APENAS quando: (1) a tarefa estiver 100% concluída e pronta para Publish; ou (2) houver bloqueio que só ele pode decidir (permissão/role, segredo a gerar, escolha de arquitetura, mudança de escopo).

## Divisão de deploy (inegociável)
- Quem clica em Publicar no Base44 é o Tony. Você NUNCA publica nem faz deploy.
- Após cada Publish do Tony, aparecem commits automáticos do base44-builder[bot] na main. Isso é esperado; nunca os altere ou reverta.

## Padrões de código
- Sempre branch novo por tarefa + pull request. Nunca commitar direto na main.
- Nunca hardcodar chave, token ou credencial. Segredos só no backend via Deno.env.get(). Se precisar de chave nova, apenas sinalize.
- Alterações em base44/entities/*.jsonc: mínimas e específicas. Nunca apagar arquivos ou schemas que não entendeu.
- Antes de qualquer alteração, confirme que base44/functions/*/entry.ts e src/lib/* continuam presentes. Se algo estiver ausente, pare e relate.
- Asaas é o gateway oficial de pagamentos do ecossistema. Sinalize referências a outros gateways (Mercado Pago, Stripe) sem remover sem autorização.
- Não invente dados, resultados ou métricas. Diferencie sempre: fato confirmado vs. hipótese vs. pendente.

## Relatório final
Sempre reporte: o que foi feito, o que está pronto (mergeado) e o que o Tony precisa publicar no Base44.
