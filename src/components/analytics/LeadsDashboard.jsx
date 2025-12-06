import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Calendar, Loader2 } from "lucide-react";

/**
 * Dashboard para visualizar métricas de leads e conversões
 */
export default function LeadsDashboard() {
  const { data: eventData = [], isLoading } = useQuery({
    queryKey: ['eventData'],
    queryFn: () => base44.entities.EventData.list('-created_date', 100),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Calcular métricas
  const totalLeads = eventData.length;
  const converted = eventData.filter(e => e.conversion_status === 'converted').length;
  const conversionRate = totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) : 0;
  const avgBudget = eventData
    .filter(e => e.budget_final)
    .reduce((sum, e) => sum + e.budget_final, 0) / (converted || 1);

  const upcomingEvents = eventData.filter(e => 
    e.event_date && new Date(e.event_date) > new Date()
  ).length;

  const metrics = [
    {
      title: "Total de Leads",
      value: totalLeads,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Taxa de Conversão",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Ticket Médio",
      value: `R$ ${avgBudget.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Eventos Futuros",
      value: upcomingEvents,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  // Leads por tipo de evento
  const eventTypeCount = eventData.reduce((acc, e) => {
    acc[e.event_type] = (acc[e.event_type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Leads por Tipo de Evento */}
      <Card>
        <CardHeader>
          <CardTitle>Leads por Tipo de Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(eventTypeCount)
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">
                    {type.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(count / totalLeads) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-800 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Leads Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {eventData.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{lead.client_name || lead.client_email}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {lead.event_type?.replace('_', ' ')} • {lead.city || 'Local não informado'}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  lead.conversion_status === 'converted' ? 'bg-green-100 text-green-700' :
                  lead.conversion_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {lead.conversion_status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}