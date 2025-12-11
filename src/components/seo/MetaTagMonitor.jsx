import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, History, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const PAGES_META = [
  {
    page: "Home",
    current: {
      title: "Toca Experience | DJs Tony Monteiro & Enzo Furtado - Afro House & Organic House",
      description: "Toca Experience apresenta Tony Monteiro & Enzo Furtado - duo de DJs especialistas em Afro House, Organic House e House.",
      lastUpdated: new Date("2024-12-01")
    },
    history: [
      { date: new Date("2024-11-15"), title: "Toca Experience | DJs em Trancoso", description: "DJs para eventos em Trancoso" },
      { date: new Date("2024-10-20"), title: "Toca Experience", description: "Experiências musicais únicas" }
    ],
    issues: []
  },
  {
    page: "Ethos",
    current: {
      title: "Ethos - Nossa Essência | Toca Experience",
      description: "Missão, visão e valores da Toca Experience. A música como linguagem universal.",
      lastUpdated: new Date("2024-12-03")
    },
    history: [],
    issues: ["Título pode ser mais descritivo", "Adicionar keywords principais"]
  },
  {
    page: "LocacaoSom",
    current: {
      title: "Locação de Equipamentos de Som para Residências | Som Profissional em Casa",
      description: "Locação de equipamentos de som e iluminação para residências. CDJ Pioneer, subwoofers, caixas de som.",
      lastUpdated: new Date("2024-12-04")
    },
    history: [
      { date: new Date("2024-11-28"), title: "Aluguel de Som - Toca Experience", description: "Aluguel de equipamentos de som" }
    ],
    issues: []
  },
  {
    page: "EventosAnoNovo",
    current: {
      title: "Eventos de Ano Novo | Réveillon 2025 em Trancoso",
      description: "Programação completa de eventos de Ano Novo em Trancoso, Caraíva e Arraial d'Ajuda.",
      lastUpdated: new Date("2024-12-05")
    },
    history: [],
    issues: ["Description curta demais"]
  },
  {
    page: "Curadoria",
    current: {
      title: "Curadoria Toca | Blog de Afro House e Organic House",
      description: "Curadoria Toca: sets exclusivos, playlists curadas e artigos sobre Afro House e Organic House.",
      lastUpdated: new Date("2024-12-02")
    },
    history: [],
    issues: []
  }
];

export default function MetaTagMonitor() {
  const [selectedPage, setSelectedPage] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const getStatusIcon = (issues) => {
    if (issues.length === 0) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (issues.length === 1) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusBadge = (issues) => {
    if (issues.length === 0) return <Badge className="bg-green-100 text-green-700">Otimizado</Badge>;
    if (issues.length === 1) return <Badge className="bg-yellow-100 text-yellow-700">Atenção</Badge>;
    return <Badge className="bg-red-100 text-red-700">Problemas</Badge>;
  };

  const getTitleLength = (title) => {
    const len = title?.length || 0;
    if (len >= 50 && len <= 60) return { color: "text-green-600", status: "Ideal" };
    if (len >= 40 && len <= 70) return { color: "text-yellow-600", status: "Aceitável" };
    return { color: "text-red-600", status: len < 40 ? "Muito curto" : "Muito longo" };
  };

  const getDescLength = (desc) => {
    const len = desc?.length || 0;
    if (len >= 140 && len <= 160) return { color: "text-green-600", status: "Ideal" };
    if (len >= 100 && len <= 180) return { color: "text-yellow-600", status: "Aceitável" };
    return { color: "text-red-600", status: len < 100 ? "Muito curto" : "Muito longo" };
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">
              {PAGES_META.filter(p => p.issues.length === 0).length}
            </p>
            <p className="text-sm text-green-700">Páginas Otimizadas</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-yellow-600">
              {PAGES_META.filter(p => p.issues.length > 0).length}
            </p>
            <p className="text-sm text-yellow-700">Precisam Atenção</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{PAGES_META.length}</p>
            <p className="text-sm text-blue-700">Total de Páginas</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">
              {PAGES_META.reduce((acc, p) => acc + p.history.length, 0)}
            </p>
            <p className="text-sm text-purple-700">Alterações Registradas</p>
          </CardContent>
        </Card>
      </div>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monitoramento de Meta Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {PAGES_META.map((page, i) => (
              <div 
                key={i} 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPage === i ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
                onClick={() => setSelectedPage(selectedPage === i ? null : i)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(page.issues)}
                    <span className="font-semibold">{page.page}</span>
                    {getStatusBadge(page.issues)}
                  </div>
                  <span className="text-xs text-gray-500">
                    Atualizado: {format(page.current.lastUpdated, "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>

                {selectedPage === i && (
                  <div className="mt-4 space-y-4">
                    {/* Current Meta */}
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium mb-3">Meta Tags Atuais</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Title</span>
                            <span className={getTitleLength(page.current.title).color}>
                              {page.current.title?.length || 0} chars - {getTitleLength(page.current.title).status}
                            </span>
                          </div>
                          <p className="text-sm bg-gray-50 p-2 rounded">{page.current.title}</p>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Description</span>
                            <span className={getDescLength(page.current.description).color}>
                              {page.current.description?.length || 0} chars - {getDescLength(page.current.description).status}
                            </span>
                          </div>
                          <p className="text-sm bg-gray-50 p-2 rounded">{page.current.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Issues */}
                    {page.issues.length > 0 && (
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          Problemas Detectados
                        </h4>
                        <ul className="space-y-1">
                          {page.issues.map((issue, j) => (
                            <li key={j} className="text-sm text-yellow-700">• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* History */}
                    {page.history.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <History className="w-4 h-4" />
                          Histórico de Alterações
                        </h4>
                        <div className="space-y-2">
                          {page.history.map((h, j) => (
                            <div key={j} className="text-sm border-l-2 border-gray-300 pl-3 py-1">
                              <p className="text-xs text-gray-500">{format(h.date, "dd/MM/yyyy", { locale: ptBR })}</p>
                              <p className="font-medium">{h.title}</p>
                              <p className="text-gray-500">{h.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}