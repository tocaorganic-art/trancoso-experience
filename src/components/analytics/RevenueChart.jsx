import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Loader2 } from "lucide-react";

export default function RevenueChart() {
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

  const convertedEvents = eventData.filter(e => 
    e.conversion_status === 'converted' && e.budget_final
  );

  const totalRevenue = convertedEvents.reduce((sum, e) => sum + (e.budget_final || 0), 0);
  const avgRevenue = convertedEvents.length > 0 ? totalRevenue / convertedEvents.length : 0;

  // Agrupar por mês
  const revenueByMonth = {};
  convertedEvents.forEach(event => {
    if (event.event_date) {
      const month = new Date(event.event_date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
      revenueByMonth[month] = (revenueByMonth[month] || 0) + (event.budget_final || 0);
    }
  });

  const monthlyData = Object.entries(revenueByMonth)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .slice(-6);

  const maxRevenue = Math.max(...monthlyData.map(([, value]) => value), 1);

  // Receita por tipo de evento
  const revenueByType = {};
  convertedEvents.forEach(event => {
    const type = event.event_type || 'Não especificado';
    revenueByType[type] = (revenueByType[type] || 0) + (event.budget_final || 0);
  });

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {totalRevenue.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ticket Médio</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {avgRevenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Eventos Convertidos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {convertedEvents.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Receita Mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Receita Mensal (últimos 6 meses)</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyData.length > 0 ? (
            <div className="space-y-4">
              {monthlyData.map(([month, revenue]) => (
                <div key={month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">{month}</span>
                    <span className="text-sm font-bold text-gray-900">
                      R$ {revenue.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000"
                      style={{ width: `${(revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">Nenhum dado de receita disponível</p>
          )}
        </CardContent>
      </Card>

      {/* Receita por Tipo de Evento */}
      <Card>
        <CardHeader>
          <CardTitle>Receita por Tipo de Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(revenueByType)
              .sort((a, b) => b[1] - a[1])
              .map(([type, revenue]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {type.replace('_', ' ')}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    R$ {revenue.toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}