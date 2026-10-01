# shared-components — design system do ecossistema Toca

Fonte única de tokens, ícones e componentes reutilizáveis. Neste repositório (TOCA EXPERIENCE) é importado por `@shared`.

```
shared-components/
  tokens/tokens.css   # variáveis --ds-* (cores, raios, espaçamento, tipografia, sombras, animações)
  icons/index.js      # ícones centralizados (lucide-react)
  ui/                 # DsButton, HeroCinematic, MarqueeStrip, ServiceGrid, StickyCTA, ShareButton, EcosystemHub
  index.js            # barrel
```

## Regras
- Componentes só leem `--ds-*`. Nenhum valor de cor/raio/espaço fixo dentro dos componentes.
- Mobile-first, alvo de toque ≥ 44 px, foco visível, `prefers-reduced-motion` respeitado.
- Texto sobre laranja usa `--ds-color-on-action` (obsidiana, 4,94:1). Branco sobre laranja reprova no AA.
- Cada produto mantém a própria marca: para adotar, sobrescreva os valores `--ds-*` no tema do produto.
  Não aplique a paleta TOCA ao Trancoso Resolve, Move ou Concierge sem decisão do Tony.

## Como usar neste app
```jsx
import { HeroCinematic, MarqueeStrip, ServiceGrid, StickyCTA, ShareButton, DsButton } from "@shared";
```
O alias `@shared` está em `vite.config.js` e `jsconfig.json`; o Tailwind enxerga a pasta em `tailwind.config.js`.
O CSS de tokens entra por `src/styles/brand.css` (`@import`), que só define aliases `--toca-*`.

## Como levar para outro produto (Concierge OS, Trancoso Resolve, Trancoso Move)
1. Copie `shared-components/` para a raiz do repositório do produto (ou use `git subtree`).
2. Adicione o alias `@shared`, o glob no Tailwind e importe `tokens/tokens.css` no CSS global.
3. Defina o tema do produto sobrescrevendo `--ds-*` (ex.: `:root { --ds-color-action: ...; }`).
4. Dependências esperadas: `react`, `react-router-dom`, `lucide-react`. Nenhuma outra.

Sem sincronização automática entre repositórios: mudanças aqui precisam ser copiadas manualmente.
