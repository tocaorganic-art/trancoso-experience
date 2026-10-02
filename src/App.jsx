import React, { useEffect } from 'react'
import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import VisualEditAgent from '@/lib/VisualEditAgent'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig, prefetchPages } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import { isInternalPage } from '@/lib/internalPages';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

// Páginas novas (fora do loop legado de pagesConfig).
const Concierge = React.lazy(() => import('./pages/Concierge'));
const ConciergeProposta = React.lazy(() => import('./pages/ConciergeProposta'));
const ConciergePropostas = React.lazy(() => import('./pages/ConciergePropostas'));
const ConciergeTemplates = React.lazy(() => import('./pages/ConciergeTemplates'));
const PropostaEditor = React.lazy(() => import('./pages/PropostaEditor'));

// Fallback leve enquanto o chunk da rota carrega (acessível: anuncia o carregamento).
const PageFallback = () => (
  <div role="status" aria-live="polite" className="flex min-h-[60vh] items-center justify-center">
    <span className="sr-only">Carregando…</span>
    <div aria-hidden="true" className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
  </div>
);

// Rotas de conversão pré-carregadas em tempo ocioso (não roda com economia de dados ou 2G/3G).
const PREFETCH_ROUTES = ['Cotacao', 'CasamentosTrancoso', 'EventosCorporativos', 'LocacaoSom', 'Eventos'];
const usePrefetchCriticalRoutes = () => {
  useEffect(() => {
    const conn = navigator.connection;
    if (conn && (conn.saveData || /(^|-)2g$|3g/.test(conn.effectiveType || ''))) return undefined;
    const run = () => prefetchPages(PREFETCH_ROUTES);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(run, 2500);
    return () => window.clearTimeout(id);
  }, []);
};

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  usePrefetchCriticalRoutes();
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <React.Suspense fallback={<PageFallback />}>
            <MainPage />
          </React.Suspense>
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <React.Suspense fallback={<PageFallback />}>
                {isInternalPage(path) ? <AdminProtectedRoute><Page /></AdminProtectedRoute> : <Page />}
              </React.Suspense>
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/Concierge" element={
        <LayoutWrapper currentPageName="Concierge">
          <React.Suspense fallback={<PageFallback />}>
            <Concierge />
          </React.Suspense>
        </LayoutWrapper>
      } />
      <Route path="/ConciergeProposta" element={
        <LayoutWrapper currentPageName="ConciergeProposta">
          <React.Suspense fallback={<PageFallback />}>
            <ConciergeProposta />
          </React.Suspense>
        </LayoutWrapper>
      } />
      <Route path="/concierge/propostas" element={
        <LayoutWrapper currentPageName="Concierge">
          <React.Suspense fallback={<PageFallback />}>
            <ConciergePropostas />
          </React.Suspense>
        </LayoutWrapper>
      } />
      <Route path="/concierge/propostas/proposta-tony" element={
        <LayoutWrapper currentPageName="ConciergeProposta">
          <React.Suspense fallback={<PageFallback />}>
            <ConciergeProposta />
          </React.Suspense>
        </LayoutWrapper>
      } />
      <Route path="/concierge/templates" element={
        <LayoutWrapper currentPageName="ConciergeTemplates">
          <React.Suspense fallback={<PageFallback />}>
            <ConciergeTemplates />
          </React.Suspense>
        </LayoutWrapper>
      } />
      <Route path="/concierge/editor-proposta" element={
        <LayoutWrapper currentPageName="ConciergePropostaEditor">
          <React.Suspense fallback={<PageFallback />}>
            <AdminProtectedRoute><PropostaEditor /></AdminProtectedRoute>
          </React.Suspense>
        </LayoutWrapper>
      } />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App