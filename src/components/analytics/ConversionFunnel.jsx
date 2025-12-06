import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Loader2 } from "lucide-react";

export default function ConversionFunnel() {
  const { data: eventData = [], isLoading } = useQuery({
    queryKey: ['eventData'],
    queryFn: () => base44.entities.EventData.list('-created_date', 1000),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const totalLeads = eventData.length;
  const contacted = eventData.filter(e => e.client_phone).length;
  const quoted = eventData.filter(e => e.budget_requested).length;
  const converted = eventData.filter(e => e.conversion_status === 'converted').length;

  const stages = [
    { name: "Leads Gerados", count: totalLeads, color: "bg-blue-500" },
    { name: "Contatos Qualificados", count: contacted, color: "bg-green-500" },
    { name: "Cotações Enviadas", count: quoted, color: "bg-yellow-500" },
    { name: "Conversões", count: converted, color: "bg-purple-500" }
  ];

  const maxCount = Math.max(...stages.map(s => s.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5" />
          Funil de Conversão
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stages.map((stage, idx) => {
            const percentage = totalLeads > 0 ? ((stage.count / totalLeads) * 100).toFixed(1) : 0;
            const width = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
            
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{stage.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{percentage}%</span>
                    <span className="text-lg font-bold text-gray-900">{stage.count}</span>
                  </div>
                </div>
                <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${stage.color} transition-all duration-1000 flex items-center justify-center text-white font-bold`}
                    style={{ width: `${width}%` }}
                  >
                    {stage.count > 0 && <span>{stage.count}</span>}
                  </div>
                </div>
                {idx < stages.length - 1 && (
                  <div className="text-center text-sm text-gray-400 py-1">
                    ↓ {stages[idx + 1].count > 0 ? ((stages[idx + 1].count / stage.count) * 100).toFixed(0) : 0}% conversão
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Insights</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Taxa geral de conversão: <strong>{totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) : 0}%</strong></li>
            <li>• Leads qualificados: <strong>{totalLeads > 0 ? ((contacted / totalLeads) * 100).toFixed(0) : 0}%</strong></li>
            <li>• Taxa de cotação para conversão: <strong>{quoted > 0 ? ((converted / quoted) * 100).toFixed(0) : 0}%</strong></li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}