// Páginas internas (admin, relatórios, documentação, checklists de produção).
// Exigem usuário admin autenticado e nunca devem ser indexadas.
export const INTERNAL_PAGES = [
  'AdminDashboard',
  'AdminBlog',
  'SEODashboard',
  'SEOStatus',
  'TestingDashboard',
  'TesteRastreamento',
  'EventCardShowcase',
  'Documentacao',
  'DocumentacaoWhatsApp',
  'GettingStarted',
  'PreLaunchChecklist',
  'ProductionChecklist',
  'ProductionSetup',
  'PromptManus',
  'ProximasTarefas',
  'ConfiguracaoGoogleAds',
  'RelatorioFinal',
  'RelatorioGoogleAds',
  'RelatorioImplementacao',
  'RelatorioPresencaDigital',
  'RelatorioRastreamento',
  'RelatorioSEO',
  'RelatorioVideoHero',
  'CampanhaReveillon',
];

// Páginas que não devem ser indexadas, mas são públicas (tela de login).
export const NOINDEX_PUBLIC_PAGES = ['AdminLogin', 'OAuthConsent', 'Obrigado', 'ResultadosBusca'];

export const isInternalPage = (name) => INTERNAL_PAGES.includes(name);
export const isNoIndexPage = (name) =>
  isInternalPage(name) || NOINDEX_PUBLIC_PAGES.includes(name);
