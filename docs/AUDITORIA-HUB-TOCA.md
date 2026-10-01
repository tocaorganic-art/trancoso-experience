# Auditoria do hub TOCA EXPERIENCE

Data: 01/10/2026. Escopo: app Base44 **Trancoso Experience** (`68f2dbf0b11165a8439c5a8b`), servido em `tocaexperience.com.br`.
Convenção: **[confirmado]** = verificado nesta sessão (código, API Base44 ou site ao vivo); **[hipótese]** = inferido; **[pendente]** = precisa de fonte ou decisão humana.

## 1. Apps e domínios

Domínios lidos pela API do Base44 (somente leitura) e conferidos com `curl` (TLS normal, HTTP 200).

| App | ID | Domínio | O que é (fonte) |
|---|---|---|---|
| Trancoso Experience | 68f2dbf0b11165a8439c5a8b | tocaexperience.com.br | Site público: eventos, sonorização, música, captação de propostas. **[confirmado]** (este repositório) |
| Concierge OS | 6a1f06cb2529a2c8784acc2c | tocaconcierge.com.br | Sistema de gestão para concierges independentes (pipeline de viagens, clientes, finanças), com login e cobrança por assinatura. **[confirmado]** (descrição publicada no próprio site e README do repo). Não é um canal de atendimento direto ao hóspede. |
| Trancoso Resolve | 68eb21726a9614db4a82ba99 | trancosoresolve.com.br | Plataforma para encontrar profissionais em Trancoso (diaristas, pedreiros, jardineiros). **[confirmado]** (descrição publicada) |
| Trancoso Move | 6a615ba22680bca1bda5cbb9 | trancosomove.com.br | Fluxo de transporte, com landing, login e dashboard. **[confirmado]** (estrutura do código). Fora do escopo de marca. |
| Guia Costa Inteligente | 68ec230f7a4062401c4be796 | nenhum | Somente casca de autenticação (sem página de produto). **[confirmado]** Não descrever como serviço ativo. |
| IncomeFlow | 6a96df49d638572cb762b3fc | nenhum | App autenticado com Home e login. **[confirmado]** Fora do escopo público. |

Relação com o ecossistema: o site **não** integra tecnicamente com o Concierge OS. O Concierge OS não tem formulário público de captação: só grava `ServiceRequest` em telas autenticadas (`Dashboard`, `Solicitacoes`), e a entidade `WaitlistEntry` não é usada no código; as rotas públicas são login, cadastro, planos e Obrigado. **[confirmado]** (leitura do código) Portanto o formulário do site grava na entidade `EventData` do próprio app e não aparece no Concierge OS.

Nenhum app além do Trancoso Experience foi alterado.

## 2. Situação ao vivo (01/10/2026)

- `www.tocaexperience.com.br` redireciona para `tocaexperience.com.br`. **[confirmado]**
- A versão publicada já contém o PR #1 (manifest, ícones, `lang="pt-BR"`, sem login por flag). **[confirmado]**
- **Título e descrição vêm da configuração de SEO da plataforma, não do `index.html`**: ao vivo aparece "Trancoso Experience" e "Seu assistente pessoal para gerenciar e otimizar sua experiência em Trancoso, desde reservas até recomendações personalizadas." (descrição genérica, não descreve o serviço). **[confirmado]** Corrigir exige alterar o SEO/metadados no painel Base44: ação do Tony.
- O sitemap publicado lista as páginas internas (AdminDashboard, SEODashboard, TestingDashboard, AdminLogin, relatórios etc.). **[confirmado]** Ele é gerado pela plataforma, não pela função `generateSitemap` do repositório. As páginas agora exigem admin e têm `noindex`, mas continuam listadas no sitemap até a configuração da plataforma mudar. **[pendente: Tony]**
- `robots.txt` publicado: `Allow: /` para tudo. **[confirmado]** O `robots.txt` do Trancoso Resolve, ao contrário, bloqueia as rotas admin.
- `/favicon.ico` publicado responde por redirecionamento (302 na verificação). **[confirmado]**
- Concierge OS ao vivo: `<html lang="en">`, título "Concierge OS", descrição em inglês. **[confirmado]** (fora do escopo de alteração)

## 3. Achados

| Prio | Achado | Evidência | Estado |
|---|---|---|---|
| P0 | Credencial admin fixa e login por flag no navegador | `adminAuth`, `createDefaultAdmin`, `AdminLogin` | Corrigido (PR #1). **Rotação/limpeza do admin antigo pendente (Tony)**; a credencial segue no histórico Git |
| P0 | `sendWhatsApp` aceitava chamadas anônimas: qualquer visitante podia enviar mensagem a qualquer número pela conta de WhatsApp Business | `base44/functions/sendWhatsApp/entry.ts` | Corrigido: só admin autenticado. Nenhuma tela usava a função |
| P1 | 22 páginas internas públicas e sem guard (+ `CampanhaReveillon`, plano de marketing exposto) | `src/lib/internalPages.js` | Corrigido: guard por rota e `noindex`. Sitemap da plataforma pendente (Tony) |
| P1 | Formulários da Home, Cotação, Locação de Som e Aluguel não gravavam o lead (só abriam WhatsApp) e a Home guardava PII em `localStorage` | `Home.jsx`, `Cotacao.jsx`, `LocacaoSom.jsx`, `AluguelEquipamentos.jsx` | Corrigido: gravam em `EventData`, sem WhatsApp, sem PII local, com sucesso só após gravar |
| P1 | Chave da Brevo parcialmente registrada em log e dados de lead (PII) em logs | `sendEmailBrevo`, `testEmailBrevo`, `leadNotification` | Corrigido |
| P1 | Webhook do WhatsApp não valida a assinatura da Meta | `whatsappWebhook` | Validação implementada, ativa quando o secret `WHATSAPP_APP_SECRET` existir. **Secret a criar: Tony** |
| P1 | Crash de JavaScript nas páginas de serviço (Casamentos, Corporativos, Aluguel, Destination Wedding, Cotação, Ethos, entre outras): `Breadcrumbs` chamava `createPageUrl(undefined)` | `src/components/seo/Breadcrumbs.jsx` | Corrigido |
| P1 | `cronFollowUp` não compila (`hoursS inceCreation`, erro de sintaxe) | `base44/functions/cronFollowUp/entry.ts:29` | **Não corrigido** (fora do escopo desta ordem). Pendência |
| P2 | Avaliações 5.0/47, depoimentos nominais, preços e horário 24h em schema | `Home`, `Layout`, `ServiceSchemaMarkup`, `CasamentosTrancoso`, `DestinationWedding` | Removidos |
| P2 | Gateways: o código tem `@stripe/*` no `package.json` (e o Concierge OS tem 4 funções Stripe) | `package.json`; repo do Concierge OS | **Sinalizado, não removido** (Asaas é o gateway oficial). Nenhuma chamada Stripe no front deste app |
| P2 | RLS ausente em 10 das 13 entidades (`AdminUser`, `Reservation`, `UserConsent`, `ChatInteraction`, `EventData` etc.) | `base44/entities/*.jsonc` | Não alterado (schema fora de escopo). **[pendente]** confirmar o comportamento padrão da plataforma |
| P2 | `npm audit`: 21 vulnerabilidades (1 crítica em `jspdf`) | `package-lock.json` | Não alterado (fora de escopo) |
| P2 | Funções `.test` duplicam as funções reais e são deployadas | `base44/functions/*.test` | Não alterado |
| P2 | Três números de contato diferentes no site | ver seção 5 | **[pendente]** |

Varredura de segredos (saída sanitizada): 0 arquivos com padrões de chave conhecidos e 0 com atribuição literal de senha/token em `src` e `base44`. Segredos só via `Deno.env.get`: `BREVO_API_KEY`, `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_TOKEN`, `WHATSAPP_VERIFY_TOKEN` (e `WHATSAPP_APP_SECRET`, ainda não criado).

## 4. Matriz de alegações públicas

| Alegação (texto) | Fonte | Status | Ação |
|---|---|---|---|
| "5.0 / 47 avaliações" e depoimentos nominais (Marina & Pedro, Carlos R., Amanda L., Juliana & Ricardo, Sophie & Pierre, Jessica & Carlos) | Nenhuma encontrada; sem consentimento documentado | Não confirmada | **Removida** |
| Faixas de preço no schema (R$ 5.000 a R$ 100.000, etc.) | Nenhuma | Não confirmada | **Removida** do schema |
| Funcionamento 24h, 7 dias (`openingHours`) | Nenhuma | Não confirmada | **Removida** |
| "Resposta/proposta em até 24 h / 2 h / 24 h úteis", "Orçamento em 24h" | Nenhuma | Não confirmada | **Removida** das páginas públicas (a `CampanhaReveillon`, agora interna, ainda cita) |
| "500 mil streams" | Nenhuma nesta sessão (plataformas de streaming não consultadas) | Não confirmada | **Removida** (número); chatbot e metatags incluídos |
| "Polinésia Francesa, Europa e América do Sul", "turnês internacionais", "residências em clubes" | Nenhuma nesta sessão | Não confirmada | **Mantida** (biografia sem número) e **pendente de confirmação por Tony** |
| "Suporte 24/7", "48h", "200+ parceiros", "15 países" | Aparecem só no TXT/protótipo e no cartão do kit; não estão no código público | Não confirmada | Não publicada |
| Razão social, CNPJ 68.662.845/0001-86, ME, natureza jurídica 234-8, situação ATIVA | Comprovante de inscrição emitido em 19/08/2026 (lido nesta sessão) | Confirmada em 19/08/2026 | Usada no rodapé (só razão social, CNPJ e cidade). Situação vigente **[pendente: consulta oficial atual]** |
| Endereço (R Alameda Bom Jesus, 7, "Antiga Rua Monteio Lobato", Trancoso, CEP 46.098-000) | Mesmo comprovante | Confirmada em 19/08/2026 | **Não publicada** (grafia do complemento a conferir) |
| Telefones (73) 9828-3579 e (21) 9773-1321; e-mail suporte@trancosoresolve.com.br | Mesmo comprovante | Confirmada em 19/08/2026 | Não usados como CTA. WhatsApp removido por regra |
| Descrição do Concierge e do Trancoso Resolve no hub | Texto publicado nos próprios sites (01/10/2026) | Confirmada como autodescrição | Usada, parafraseada |
| Oferta do Trancoso Resolve ("30 dias grátis, 100 primeiras vagas") | Definida pelo Tony | Vigente | Não mencionada no site da Experience |

Dados societários (quadro societário): não lidos e não usados. Certificado de Inova Simples e a declaração sobre requisitos locais da sede: **[pendente: revisão contábil/jurídica]**; nenhuma licença foi afirmada nem negada. O manual duplicado do Inova Simples não estava disponível nesta sessão.

## 5. Contatos divergentes no código público

| Contato | Onde aparece |
|---|---|
| (21) 97282-4659 | botões e formulários (antes da remoção do WhatsApp), chatbots |
| (21) 99773-1321 | Home, Ethos, schema `LocalBusiness` (também consta no comprovante de CNPJ) |
| (73) 9828-3579 | página Obrigado (antes da remoção) e admin (também consta no comprovante) |

Decidir qual é o oficial antes de qualquer publicação em novos canais. Os dois números do comprovante são os únicos com fonte documental (19/08/2026).

## 6. Limitações desta auditoria

- Pastas locais (`C:\Users\...`): documentos do CNPJ além do comprovante, `toca-refactor.html` e as 3 capturas **não** chegaram à sessão. O comparativo antes/depois com as capturas não foi feito.
- Nenhum dado real de hóspede, cliente ou financeiro foi lido. Nenhuma gravação em produção foi feita.
- O login admin não foi testado ao vivo (depende de sessão Base44 com role admin).
