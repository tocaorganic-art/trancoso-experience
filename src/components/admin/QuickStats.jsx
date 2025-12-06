import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { TrendingUp, Users, DollarSign, Calendar, Loader2 } from "lucide-react";

export default function QuickStats() {
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['allLeads'],
    queryFn: () => base44.entities.EventData.list('-created_date', 1000),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const leadsThisMonth = leads.filter(l => new Date(l.created_date) >= startOfMonth).length;
  const leadsThisWeek = leads.filter(l => new Date(l.created_date) >= startOfWeek).length;
  const converted = leads.filter(l => l.conversion_status === 'converted').length;
  const conversionRate = leads.length > 0 ? ((converted / leads.length) * 100).toFixed(1) : 0;

  const totalRevenue = leads
    .filter(l => l.conversion_status === 'converted' && l.budget_final)
    .reduce((sum, l) => sum + (l.budget_final || 0), 0);

  const avgTicket = converted > 0 ? Math.round(totalRevenue / converted) : 0;

  const stats = [
    {
      title: 'Leads Este Mês',
      value: leadsThisMonth,
      change: `+${leadsThisWeek} esta semana`,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Taxa de Conversão',
      value: `${conversionRate}%`,
      change: `${converted} eventos fechados`,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Receita Total',
      value: `R$ ${(totalRevenue / 1000).toFixed(0)}k`,
      change: `Ticket médio: R$ ${(avgTicket / 1000).toFixed(0)}k`,
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Eventos Futuros',
      value: leads.filter(l => l.event_date && new Date(l.event_date) > today).length,
      change: 'Próximos 90 dias',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <Card key={idx} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 font-medium mb-1">{stat.title}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}