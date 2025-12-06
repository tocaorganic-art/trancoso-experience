import Home from './pages/Home';
import Curadoria from './pages/Curadoria';
import BlogPost from './pages/BlogPost';
import Discografia from './pages/Discografia';
import EventosAnoNovo from './pages/EventosAnoNovo';
import LocacaoSom from './pages/LocacaoSom';
import Ethos from './pages/Ethos';
import Eventos from './pages/Eventos';
import SEODashboard from './pages/SEODashboard';
import Cotacao from './pages/Cotacao';
import AdminDashboard from './pages/AdminDashboard';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import TermosServico from './pages/TermosServico';
import Documentacao from './pages/Documentacao';
import TestingDashboard from './pages/TestingDashboard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Curadoria": Curadoria,
    "BlogPost": BlogPost,
    "Discografia": Discografia,
    "EventosAnoNovo": EventosAnoNovo,
    "LocacaoSom": LocacaoSom,
    "Ethos": Ethos,
    "Eventos": Eventos,
    "SEODashboard": SEODashboard,
    "Cotacao": Cotacao,
    "AdminDashboard": AdminDashboard,
    "PoliticaPrivacidade": PoliticaPrivacidade,
    "TermosServico": TermosServico,
    "Documentacao": Documentacao,
    "TestingDashboard": TestingDashboard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};