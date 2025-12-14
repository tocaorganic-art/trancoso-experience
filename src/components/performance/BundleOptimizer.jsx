/**
 * BundleOptimizer - Estratégias para reduzir tamanho do bundle
 * 
 * INSTRUÇÕES DE OTIMIZAÇÃO:
 * 
 * 1. CODE SPLITTING AUTOMÁTICO:
 *    - Usar React.lazy() para componentes não-críticos
 *    - Exemplo: const Component = React.lazy(() => import('./Component'))
 * 
 * 2. TREE SHAKING:
 *    - Importar apenas funções específicas: import { function } from 'library'
 *    - Evitar: import * as Library from 'library'
 * 
 * 3. REMOVER DEPENDÊNCIAS NÃO UTILIZADAS:
 *    - Executar: npm prune
 *    - Analisar bundle: npm run build -- --stats
 * 
 * 4. OTIMIZAÇÃO DE LODASH:
 *    - Usar: import debounce from 'lodash/debounce'
 *    - Evitar: import _ from 'lodash'
 * 
 * 5. COMPRIMIR ASSETS:
 *    - Imagens: WebP format
 *    - SVGs: SVGO
 *    - JSON: Minificação
 * 
 * 6. CONFIGURAÇÃO VITE:
 *    - Habilitar minificação terser
 *    - Code splitting por rota
 *    - CSS code splitting
 */

// Configuração sugerida para vite.config.js
export const viteOptimizationConfig = {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libs em chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-popover'],
          'animation-vendor': ['framer-motion'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    // Minificação agressiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs em produção
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    // Code splitting por chunk size
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
  },
  // Otimização de dependências
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
    exclude: ['@base44/sdk'],
  },
};

/**
 * Dynamic imports para rotas
 * Reduz bundle inicial carregando rotas sob demanda
 */
export const lazyRoutes = {
  Home: () => import('@/pages/Home'),
  EventosAnoNovo: () => import('@/pages/EventosAnoNovo'),
  CasamentosTrancoso: () => import('@/pages/CasamentosTrancoso'),
  AluguelEquipamentos: () => import('@/pages/AluguelEquipamentos'),
  Discografia: () => import('@/pages/Discografia'),
  Curadoria: () => import('@/pages/Curadoria'),
  Cotacao: () => import('@/pages/Cotacao'),
};

/**
 * Preload de componentes críticos
 * Carrega em background após page load
 */
export const preloadCriticalComponents = () => {
  // Preload após 3s
  setTimeout(() => {
    lazyRoutes.EventosAnoNovo();
    lazyRoutes.Cotacao();
  }, 3000);
};

export default null;