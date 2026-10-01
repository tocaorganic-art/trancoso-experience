# Checklists de deploy — Trancoso Experience

Quem publica é sempre o Tony (Publish no Base44). Cada deploy abaixo corresponde a um PR/merge.
Nunca publique um deploy sem fechar o anterior.

## Deploy 1 — Segurança (P0/P1) · PR #1

Antes do merge
- [ ] Confirmar que a sua conta tem `role: admin` no Base44 (senão perde acesso ao painel).
- [ ] Rotacionar/desativar o admin antigo na entidade `AdminUser` (a credencial fixa segue no histórico Git).
- [ ] Revisar o PR e aguardar o merge na `main`.

Publicar
- [ ] Publish no Base44 e conferir que o commit do `base44-builder[bot]` apareceu na `main`.

Após publicar (sem sessão / janela anônima)
- [ ] `/AdminLogin` mostra botão de login real, sem entrar direto.
- [ ] `/AdminDashboard`, `/RelatorioSEO`, `/ProductionSetup` redirecionam para o login.
- [ ] Com a sua conta admin, o painel abre normalmente.
- [ ] Home: o formulário abre o WhatsApp e NÃO mostra "enviada com sucesso".
- [ ] Código-fonte da Home sem `aggregateRating` e sem depoimentos.
- [ ] Funções `adminAuth` e `createDefaultAdmin` redeployadas (a segunda deve responder 410).

## Deploy 2 — Identidade TOCA (tokens, fontes, hub, rodapé)

- [ ] Home carrega Nunito Sans (interface) e Newsreader (h1/h2); nenhuma requisição ao Google Fonts para essas famílias.
- [ ] Seção "Marcas e serviços Toca" visível, com links funcionando para `tocaconcierge.com.br` e `trancosoresolve.com.br`.
- [ ] Rodapé com links do ecossistema, Política, Termos e dados cadastrais.
- [ ] Navegação por teclado com foco visível; `prefers-reduced-motion` respeitado.
- [ ] Conferir contra as 3 capturas de referência (pendente: arquivos não acessíveis à sessão cloud).
- [ ] Confirmar com contabilidade: razão social/CNPJ no rodapé e situação cadastral atual.

## Deploy 3 — Ativos oficiais do kit (bloqueado)

- [ ] Subir o kit `TOCA-EXPERIENCE-KIT-v1.0` para a sessão/repo e conferir SHA-256 do manifesto.
- [ ] Logo oficial (assinatura ≥ 640 px; símbolo compacto no header estreito) sem alterar a arte.
- [ ] Favicon, ícones, apple-touch-icon e `manifest.json` (hoje o `index.html` aponta para `/manifest.json`, que não existe no repo).

## Pendências humanas

- [ ] Destino real dos leads (entidade/integração com o Concierge OS) e retirar a conversão no front que dispara sem lead entregue.
- [ ] Três números de WhatsApp/telefone diferentes no site: confirmar qual é o oficial.
- [ ] Alvarás/licenças locais e complemento do endereço: revisão contábil/jurídica.
- [ ] RLS das entidades `AdminUser`, `Reservation`, `UserConsent`, `ChatInteraction`, etc.
- [ ] `npm audit`: 21 vulnerabilidades (1 crítica em `jspdf`); bug de sintaxe em `cronFollowUp`; funções `.test` duplicadas.
