import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Ticket, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function TicketSelector({ eventoId, onSelect }) {
  const [selectedTickets, setSelectedTickets] = useState({});

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets', eventoId],
    queryFn: async () => {
      const allTickets = await base44.entities.Ticket.filter({ evento_id: eventoId, ativo: true });
      return allTickets.map(ticket => ({
        ...ticket,
        quantidade_disponivel: ticket.quantidade_total - (ticket.quantidade_vendida || 0)
      }));
    },
    enabled: !!eventoId
  });

  const handleQuantityChange = (ticketId, change) => {
    const ticket = tickets.find(t => t.id === ticketId);
    const currentQty = selectedTickets[ticketId] || 0;
    const newQty = Math.max(0, Math.min(currentQty + change, ticket.quantidade_disponivel, 10));
    
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: newQty
    }));
  };

  const totalValue = tickets.reduce((sum, ticket) => {
    const qty = selectedTickets[ticket.id] || 0;
    return sum + (ticket.preco * qty);
  }, 0);

  const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);

  const handleContinue = () => {
    if (totalTickets === 0) {
      toast.error("Selecione pelo menos um ingresso");
      return;
    }

    const selection = tickets
      .filter(t => selectedTickets[t.id] > 0)
      .map(t => ({
        ticket: t,
        quantidade: selectedTickets[t.id],
        subtotal: t.preco * selectedTickets[t.id]
      }));

    onSelect({ tickets: selection, total: totalValue });
  };

  if (isLoading) {
    return <div className="text-center py-8 text-gray-400">Carregando ingressos...</div>;
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-gray-400">Ingressos não disponíveis para este evento</p>
      </div>
    );
  }

  const tipoColors = {
    pista: "bg-blue-500/20 text-blue-300",
    vip: "bg-purple-500/20 text-purple-300",
    camarote: "bg-pink-500/20 text-pink-300",
    open_bar: "bg-orange-500/20 text-orange-300",
    mesa: "bg-emerald-500/20 text-emerald-300"
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white mb-6">Selecione seus Ingressos</h3>

      {tickets.map(ticket => (
        <Card key={ticket.id} className="bg-white/5 border-white/10 overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-white">{ticket.nome}</CardTitle>
                  <Badge className={tipoColors[ticket.tipo] || "bg-gray-500/20 text-gray-300"}>
                    {ticket.tipo.toUpperCase()}
                  </Badge>
                  {ticket.lote && (
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                      {ticket.lote}
                    </Badge>
                  )}
                </div>
                {ticket.descricao && (
                  <p className="text-sm text-gray-400">{ticket.descricao}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  R$ {ticket.preco.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">por pessoa</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {ticket.beneficios && ticket.beneficios.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-300 mb-2">Inclui:</p>
                <ul className="space-y-1">
                  {ticket.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {beneficio}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(ticket.id, -1)}
                  disabled={!selectedTickets[ticket.id]}
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-bold text-white w-8 text-center">
                  {selectedTickets[ticket.id] || 0}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(ticket.id, 1)}
                  disabled={!ticket.quantidade_disponivel || selectedTickets[ticket.id] >= ticket.quantidade_disponivel}
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400">
                  {ticket.quantidade_disponivel} disponíveis
                </p>
                {selectedTickets[ticket.id] > 0 && (
                  <p className="text-lg font-bold text-green-400">
                    R$ {(ticket.preco * selectedTickets[ticket.id]).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {totalTickets > 0 && (
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-300">Total de Ingressos</p>
                <p className="text-3xl font-bold text-white">{totalTickets}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300">Valor Total</p>
                <p className="text-3xl font-bold text-white">R$ {totalValue.toFixed(2)}</p>
              </div>
            </div>
            <Button 
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-lg"
            >
              <Ticket className="w-5 h-5 mr-2" />
              Continuar para Pagamento
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}