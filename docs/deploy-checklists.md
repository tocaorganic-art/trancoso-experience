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

## Deploy 3 — Ativos oficiais do kit TOCA v1.0

Origem: `TOCA-EXPERIENCE-KIT-v1.0.zip` (86/86 hashes conferidos contra o `SHA256SUMS.txt` do kit; as 6 cópias usadas no repo conferem byte a byte).
Usados: `logo-web-720.png`, `icone-192/512`, `apple-touch-icon-180`, `favicon.ico`. Não alterados, não recortados, não recoloridos.

- [ ] Aba do navegador mostra o favicon do kit (e não o da Base44) na home e nas demais páginas.
- [ ] `https://www.tocaexperience.com.br/manifest.json` responde 200 (antes o `index.html` apontava para um arquivo inexistente). **Se a Base44 não servir a pasta `public/`, avisar.**
- [ ] Cabeçalho escuro (rgba(26,23,20,.86) + blur 18px) com símbolo oficial; em telas ≥ 640 px aparece também o texto "TOCA EXPERIENCE".
- [ ] Rodapé: logo completa sobre fundo Obsidiana (≥ 700 px de tela) e só o símbolo em telas menores.
- [ ] Adicionar ao celular (iOS/Android): ícone com o símbolo, sem distorção.
- [ ] Imagem de compartilhamento (Open Graph) ainda é a foto antiga; trocar por arte própria quando houver (o kit não traz uma imagem OG 1200×630).

## Pendências humanas

- [ ] Destino real dos leads (entidade/integração com o Concierge OS) e retirar a conversão no front que dispara sem lead entregue.
- [ ] Três números de WhatsApp/telefone diferentes no site: confirmar qual é o oficial.
- [ ] Alvarás/licenças locais e complemento do endereço: revisão contábil/jurídica.
- [ ] RLS das entidades `AdminUser`, `Reservation`, `UserConsent`, `ChatInteraction`, etc.
- [ ] `npm audit`: 21 vulnerabilidades (1 crítica em `jspdf`); bug de sintaxe em `cronFollowUp`; funções `.test` duplicadas.
