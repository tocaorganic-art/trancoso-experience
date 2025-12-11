import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";
import { Eye, Clock, MousePointer, Users, TrendingUp, Loader2, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

const TRAFFIC_DATA = [
  { month: "Jul", visitors: 1200, pageviews: 3400, bounceRate: 45 },
  { month: "Ago", visitors: 1450, pageviews: 4100, bounceRate: 42 },
  { month: "Set", visitors: 1380, pageviews: 3900, bounceRate: 44 },
  { month: "Out", visitors: 1800, pageviews: 5200, bounceRate: 38 },
  { month: "Nov", visitors: 2100, pageviews: 6100, bounceRate: 35 },
  { month: "Dez", visitors: 2450, pageviews: 7200, bounceRate: 32 },
];

const PAGE_PERFORMANCE = [
  { page: "Home", views: 4500, avgTime: "2:45", bounceRate: 28 },
  { page: "Ethos", views: 1200, avgTime: "3:10", bounceRate: 35 },
  { page: "LocacaoSom", views: 890, avgTime: "4:20", bounceRate: 22 },
  { page: "EventosAnoNovo", views: 2100, avgTime: "2:30", bounceRate: 40 },
  { page: "Curadoria", views: 780, avgTime: "5:15", bounceRate: 25 },
  { page: "Discografia", views: 650, avgTime: "3:45", bounceRate: 30 },
];

const TRAFFIC_SOURCES = [
  { name: "Orgânico", value: 45, color: "#10b981" },
  { name: "Direto", value: 25, color: "#3b82f6" },
  { name: "Social", value: 18, color: "#f97316" },
  { name: "Referral", value: 8, color: "#8b5cf6" },
  { name: "Pago", value: 4, color: "#ef4444" },
];

const DEVICE_DATA = [
  { device: "Mobile", percentage: 62 },
  { device: "Desktop", percentage: 32 },
  { device: "Tablet", percentage: 6 },
];

export default function EngagementMetrics() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Analise estas métricas de engajamento de um site de DJs (Toca Experience):

Tráfego: ${JSON.stringify(TRAFFIC_DATA)}
Performance por página: ${JSON.stringify(PAGE_PERFORMANCE)}
Fontes de tráfego: ${JSON.stringify(TRAFFIC_SOURCES)}
Dispositivos: ${JSON.stringify(DEVICE_DATA)}

Gere insights acionáveis:
1. 3 principais observações sobre o desempenho
2. 3 recomendações para melhorar engajamento
3. Páginas que precisam de atenção
4. Previsão de tendência para os próximos 3 meses`,
        response_json_schema: {
          type: "object",
          properties: {
            observacoes: { type: "array", items: { type: "string" } },
            recomendacoes: { type: "array", items: { type: "string" } },
            paginas_atencao: { type: "array", items: { type: "string" } },
            tendencia: { type: "string" }
          }
        }
      });
      setInsights(result);
    } catch (error) {
      toast.error("Erro ao gerar insights");
    } finally {
      setLoading(false);
    }
  };

  const totalVisitors = TRAFFIC_DATA.reduce((acc, d) => acc + d.visitors, 0);
  const totalPageviews = TRAFFIC_DATA.reduce((acc, d) => acc + d.pageviews, 0);
  const avgBounceRate = Math.round(TRAFFIC_DATA.reduce((acc, d) => acc + d.bounceRate, 0) / TRAFFIC_DATA.length);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalVisitors.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Visitantes (6m)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPageviews.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Pageviews (6m)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3:12</p>
                <p className="text-sm text-gray-500">Tempo Médio</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <MousePointer className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgBounceRate}%</p>
                <p className="text-sm text-gray-500">Bounce Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evolução de Tráfego</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRAFFIC_DATA}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisitors)" name="Visitantes" />
                <Area type="monotone" dataKey="pageviews" stroke="#10b981" fillOpacity={1} fill="url(#colorPageviews)" name="Pageviews" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fontes de Tráfego</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TRAFFIC_SOURCES}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {TRAFFIC_SOURCES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dispositivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEVICE_DATA} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="device" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Page Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance por Página</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Página</th>
                  <th className="text-center py-3 px-2">Visualizações</th>
                  <th className="text-center py-3 px-2">Tempo Médio</th>
                  <th className="text-center py-3 px-2">Bounce Rate</th>
                  <th className="text-center py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {PAGE_PERFORMANCE.map((page, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{page.page}</td>
                    <td className="text-center py-3 px-2">{page.views.toLocaleString()}</td>
                    <td className="text-center py-3 px-2">{page.avgTime}</td>
                    <td className="text-center py-3 px-2">{page.bounceRate}%</td>
                    <td className="text-center py-3 px-2">
                      <Badge className={page.bounceRate < 30 ? "bg-green-100 text-green-700" : page.bounceRate < 40 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}>
                        {page.bounceRate < 30 ? "Excelente" : page.bounceRate < 40 ? "Bom" : "Atenção"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Insights de Engajamento (IA)
          </CardTitle>
          <Button onClick={generateInsights} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Gerar Análise
          </Button>
        </CardHeader>
        {insights && (
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Observações</h4>
                <ul className="space-y-1">
                  {insights.observacoes?.map((o, i) => (
                    <li key={i} className="text-sm text-blue-700">• {o}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Recomendações</h4>
                <ul className="space-y-1">
                  {insights.recomendacoes?.map((r, i) => (
                    <li key={i} className="text-sm text-green-700">• {r}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Páginas que Precisam de Atenção</h4>
                <ul className="space-y-1">
                  {insights.paginas_atencao?.map((p, i) => (
                    <li key={i} className="text-sm text-yellow-700">• {p}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Tendência (Próximos 3 meses)</h4>
                <p className="text-sm text-purple-700">{insights.tendencia}</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}