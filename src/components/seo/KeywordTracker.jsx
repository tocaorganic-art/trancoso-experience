import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Minus, Plus, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

const MOCK_KEYWORD_DATA = [
  { keyword: "DJ casamento Trancoso", position: 3, change: 2, volume: 1200, difficulty: 45 },
  { keyword: "Afro House Brasil", position: 8, change: -1, volume: 2400, difficulty: 62 },
  { keyword: "DJ eventos Bahia", position: 5, change: 0, volume: 890, difficulty: 38 },
  { keyword: "locação som Trancoso", position: 2, change: 4, volume: 320, difficulty: 22 },
  { keyword: "Organic House DJ", position: 12, change: 3, volume: 1800, difficulty: 55 },
];

const generateHistoricalData = () => {
  const months = ["Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return months.map((month, i) => ({
    month,
    "DJ casamento Trancoso": Math.max(1, 15 - i * 2 + Math.floor(Math.random() * 3)),
    "Afro House Brasil": Math.max(1, 20 - i * 2 + Math.floor(Math.random() * 4)),
    "locação som Trancoso": Math.max(1, 12 - i * 1.5 + Math.floor(Math.random() * 2)),
  }));
};

export default function KeywordTracker() {
  const [keywords, setKeywords] = useState(MOCK_KEYWORD_DATA);
  const [newKeyword, setNewKeyword] = useState("");
  const [historicalData] = useState(generateHistoricalData());
  const [analyzing, setAnalyzing] = useState(false);

  const addKeyword = async () => {
    if (!newKeyword.trim()) return;
    
    setAnalyzing(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Analise a keyword "${newKeyword}" para um site de DJs em Trancoso (Afro House, casamentos, eventos). Estime: posição provável no Google (1-100), volume de busca mensal, dificuldade SEO (0-100).`,
        response_json_schema: {
          type: "object",
          properties: {
            position: { type: "number" },
            volume: { type: "number" },
            difficulty: { type: "number" }
          }
        }
      });
      
      setKeywords([...keywords, {
        keyword: newKeyword,
        position: result.position || 50,
        change: 0,
        volume: result.volume || 500,
        difficulty: result.difficulty || 50
      }]);
      setNewKeyword("");
      toast.success("Keyword adicionada!");
    } catch (error) {
      toast.error("Erro ao analisar keyword");
    } finally {
      setAnalyzing(false);
    }
  };

  const removeKeyword = (kw) => {
    setKeywords(keywords.filter(k => k.keyword !== kw));
  };

  const getTrendIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getDifficultyColor = (diff) => {
    if (diff < 30) return "bg-green-100 text-green-700";
    if (diff < 60) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      {/* Add Keyword */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Adicionar Keyword para Rastrear</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Ex: DJ para casamento na praia"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addKeyword()}
              className="flex-1"
            />
            <Button onClick={addKeyword} disabled={analyzing}>
              {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Keywords Rastreadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Keyword</th>
                  <th className="text-center py-3 px-2">Posição</th>
                  <th className="text-center py-3 px-2">Variação</th>
                  <th className="text-center py-3 px-2">Volume</th>
                  <th className="text-center py-3 px-2">Dificuldade</th>
                  <th className="text-center py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{kw.keyword}</td>
                    <td className="text-center py-3 px-2">
                      <span className="font-bold text-lg">{kw.position}</span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(kw.change)}
                        <span className={kw.change > 0 ? "text-green-600" : kw.change < 0 ? "text-red-600" : "text-gray-400"}>
                          {kw.change > 0 ? `+${kw.change}` : kw.change}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-2">{kw.volume.toLocaleString()}</td>
                    <td className="text-center py-3 px-2">
                      <Badge className={getDifficultyColor(kw.difficulty)}>{kw.difficulty}</Badge>
                    </td>
                    <td className="text-center py-3 px-2">
                      <Button size="icon" variant="ghost" onClick={() => removeKeyword(kw.keyword)}>
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Historical Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evolução de Posições (6 meses)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis reversed domain={[1, 20]} stroke="#6b7280" label={{ value: 'Posição', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="DJ casamento Trancoso" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Afro House Brasil" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="locação som Trancoso" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}