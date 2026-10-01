import React from 'react';
import Home from './pages/Home';
import __Layout from './Layout.jsx';

// Divisão de código por rota: cada página (exceto a Home, que é a primeira tela) vira um chunk
// carregado sob demanda. Os loaders ficam em PAGE_LOADERS para também servirem ao prefetch.
const PAGE_LOADERS = {
    Curadoria: () => import('./pages/Curadoria'),
    BlogPost: () => import('./pages/BlogPost'),
    Discografia: () => import('./pages/Discografia'),
    EventosAnoNovo: () => import('./pages/EventosAnoNovo'),
    LocacaoSom: () => import('./pages/LocacaoSom'),
    Ethos: () => import('./pages/Ethos'),
    Eventos: () => import('./pages/Eventos'),
    SEODashboard: () => import('./pages/SEODashboard'),
    Cotacao: () => import('./pages/Cotacao'),
    AdminDashboard: () => import('./pages/AdminDashboard'),
    PoliticaPrivacidade: () => import('./pages/PoliticaPrivacidade'),
    TermosServico: () => import('./pages/TermosServico'),
    Documentacao: () => import('./pages/Documentacao'),
    TestingDashboard: () => import('./pages/TestingDashboard'),
    AdminLogin: () => import('./pages/AdminLogin'),
    ProductionChecklist: () => import('./pages/ProductionChecklist'),
    ProductionSetup: () => import('./pages/ProductionSetup'),
    GettingStarted: () => import('./pages/GettingStarted'),
    RelatorioFinal: () => import('./pages/RelatorioFinal'),
    PreLaunchChecklist: () => import('./pages/PreLaunchChecklist'),
    CasamentosTrancoso: () => import('./pages/CasamentosTrancoso'),
    AluguelEquipamentos: () => import('./pages/AluguelEquipamentos'),
    EventosCorporativos: () => import('./pages/EventosCorporativos'),
    DestinationWedding: () => import('./pages/DestinationWedding'),
    CampanhaReveillon: () => import('./pages/CampanhaReveillon'),
    DocumentacaoWhatsApp: () => import('./pages/DocumentacaoWhatsApp'),
    RelatorioSEO: () => import('./pages/RelatorioSEO'),
    Obrigado: () => import('./pages/Obrigado'),
    SEOStatus: () => import('./pages/SEOStatus'),
    RelatorioRastreamento: () => import('./pages/RelatorioRastreamento'),
    TesteRastreamento: () => import('./pages/TesteRastreamento'),
    RelatorioGoogleAds: () => import('./pages/RelatorioGoogleAds'),
    RelatorioImplementacao: () => import('./pages/RelatorioImplementacao'),
    ConfiguracaoGoogleAds: () => import('./pages/ConfiguracaoGoogleAds'),
    ProximasTarefas: () => import('./pages/ProximasTarefas'),
    RelatorioPresencaDigital: () => import('./pages/RelatorioPresencaDigital'),
    EventCardShowcase: () => import('./pages/EventCardShowcase'),
    ResultadosBusca: () => import('./pages/ResultadosBusca'),
    RelatorioVideoHero: () => import('./pages/RelatorioVideoHero'),
    AdminBlog: () => import('./pages/AdminBlog'),
    PromptManus: () => import('./pages/PromptManus'),
};

// Pré-carrega, em tempo ocioso, as rotas de conversão mais prováveis a partir da Home.
export const prefetchPages = (pageNames) => {
    pageNames.forEach((name) => {
        const load = PAGE_LOADERS[name];
        if (load) load().catch(() => {});
    });
};

export const PAGES = {
    "Home": Home,
    "Curadoria": React.lazy(PAGE_LOADERS.Curadoria),
    "BlogPost": React.lazy(PAGE_LOADERS.BlogPost),
    "Discografia": React.lazy(PAGE_LOADERS.Discografia),
    "EventosAnoNovo": React.lazy(PAGE_LOADERS.EventosAnoNovo),
    "LocacaoSom": React.lazy(PAGE_LOADERS.LocacaoSom),
    "Ethos": React.lazy(PAGE_LOADERS.Ethos),
    "Eventos": React.lazy(PAGE_LOADERS.Eventos),
    "SEODashboard": React.lazy(PAGE_LOADERS.SEODashboard),
    "Cotacao": React.lazy(PAGE_LOADERS.Cotacao),
    "AdminDashboard": React.lazy(PAGE_LOADERS.AdminDashboard),
    "PoliticaPrivacidade": React.lazy(PAGE_LOADERS.PoliticaPrivacidade),
    "TermosServico": React.lazy(PAGE_LOADERS.TermosServico),
    "Documentacao": React.lazy(PAGE_LOADERS.Documentacao),
    "TestingDashboard": React.lazy(PAGE_LOADERS.TestingDashboard),
    "AdminLogin": React.lazy(PAGE_LOADERS.AdminLogin),
    "ProductionChecklist": React.lazy(PAGE_LOADERS.ProductionChecklist),
    "ProductionSetup": React.lazy(PAGE_LOADERS.ProductionSetup),
    "GettingStarted": React.lazy(PAGE_LOADERS.GettingStarted),
    "RelatorioFinal": React.lazy(PAGE_LOADERS.RelatorioFinal),
    "PreLaunchChecklist": React.lazy(PAGE_LOADERS.PreLaunchChecklist),
    "CasamentosTrancoso": React.lazy(PAGE_LOADERS.CasamentosTrancoso),
    "AluguelEquipamentos": React.lazy(PAGE_LOADERS.AluguelEquipamentos),
    "EventosCorporativos": React.lazy(PAGE_LOADERS.EventosCorporativos),
    "DestinationWedding": React.lazy(PAGE_LOADERS.DestinationWedding),
    "CampanhaReveillon": React.lazy(PAGE_LOADERS.CampanhaReveillon),
    "DocumentacaoWhatsApp": React.lazy(PAGE_LOADERS.DocumentacaoWhatsApp),
    "RelatorioSEO": React.lazy(PAGE_LOADERS.RelatorioSEO),
    "Obrigado": React.lazy(PAGE_LOADERS.Obrigado),
    "SEOStatus": React.lazy(PAGE_LOADERS.SEOStatus),
    "RelatorioRastreamento": React.lazy(PAGE_LOADERS.RelatorioRastreamento),
    "TesteRastreamento": React.lazy(PAGE_LOADERS.TesteRastreamento),
    "RelatorioGoogleAds": React.lazy(PAGE_LOADERS.RelatorioGoogleAds),
    "RelatorioImplementacao": React.lazy(PAGE_LOADERS.RelatorioImplementacao),
    "ConfiguracaoGoogleAds": React.lazy(PAGE_LOADERS.ConfiguracaoGoogleAds),
    "ProximasTarefas": React.lazy(PAGE_LOADERS.ProximasTarefas),
    "RelatorioPresencaDigital": React.lazy(PAGE_LOADERS.RelatorioPresencaDigital),
    "EventCardShowcase": React.lazy(PAGE_LOADERS.EventCardShowcase),
    "ResultadosBusca": React.lazy(PAGE_LOADERS.ResultadosBusca),
    "RelatorioVideoHero": React.lazy(PAGE_LOADERS.RelatorioVideoHero),
    "AdminBlog": React.lazy(PAGE_LOADERS.AdminBlog),
    "PromptManus": React.lazy(PAGE_LOADERS.PromptManus),
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
