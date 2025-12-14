import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Trash2, CheckCircle, Calendar, User, Phone, Mail, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function LeadManager() {
  const queryClient = useQueryClient();
  const [selectedLeads, setSelectedLeads] = useState([]);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['pendingLeads'],
    queryFn: () => base44.entities.EventData.filter(
      { conversion_status: { $in: ["pending", "contacted"] } },
      '-created_date',
      50
    ),
  });

  const updateLeadMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.EventData.update(id, { conversion_status: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingLeads'] });
      toast.success("Status do lead atualizado!");
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: (id) => base44.entities.EventData.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingLeads'] });
      toast.success("Lead deletado!");
    },
  });

  const handleWhatsApp = (lead) => {
    const message = `Olá ${lead.client_name}! 👋

Obrigado pelo interesse na Toca Experience!

Recebi sua solicitação para *${lead.event_type}* no dia *${lead.event_date || 'a definir'}*.

Orçamento: ${lead.budget_requested || 'A combinar'}
${lead.message ? `\nMensagem: ${lead.message}` : ''}

Vou preparar uma proposta exclusiva para você! Podemos conversar melhor?`;

    const whatsappUrl = `https://wa.me/557398283579?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Atualizar status automaticamente
    updateLeadMutation.mutate({ id: lead.id, status: 'contacted' });
  };

  const handleBulkDelete = async () => {
    if (selectedLeads.length === 0) {
      toast.error("Selecione pelo menos um lead para deletar");
      return;
    }

    if (!confirm(`Tem certeza que deseja deletar ${selectedLeads.length} lead(s)?`)) {
      return;
    }

    for (const leadId of selectedLeads) {
      await deleteLeadMutation.mutateAsync(leadId);
    }
    setSelectedLeads([]);
  };

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const isDuplicate = (lead, index) => {
    const duplicates = leads.filter(l => 
      l.client_email === lead.client_email &&
      l.event_type === lead.event_type &&
      l.event_date === lead.event_date
    );
    return duplicates.length > 1 && duplicates.indexOf(lead) > 0;
  };

  if (isLoading) {
    return <div className="text-center py-12">Carregando leads...</div>;
  }

  const pendingLeads = leads.filter(l => l.conversion_status === "pending");
  const contactedLeads = leads.filter(l => l.conversion_status === "contacted");

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gestão de Leads ({leads.length})</span>
            {selectedLeads.length > 0 && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Deletar Selecionados ({selectedLeads.length})
              </Button>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-900">{pendingLeads.length}</p>
                <p className="text-sm text-yellow-700">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-900">{contactedLeads.length}</p>
                <p className="text-sm text-blue-700">Contactados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Trash2 className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-900">{leads.filter((l, i) => isDuplicate(l, i)).length}</p>
                <p className="text-sm text-red-700">Duplicados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pendentes */}
      {pendingLeads.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-900">⚠️ Leads Pendentes</h3>
          <div className="space-y-4">
            {pendingLeads.map((lead) => (
              <Card key={lead.id} className={`${isDuplicate(lead, leads.indexOf(lead)) ? 'border-red-400 bg-red-50' : 'border-yellow-200'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLeadSelection(lead.id)}
                        className="mt-1"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-lg">{lead.client_name}</h4>
                          <Badge variant="outline" className="bg-yellow-100">Pendente</Badge>
                          {isDuplicate(lead, leads.indexOf(lead)) && (
                            <Badge variant="destructive">DUPLICADO</Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4" /> {lead.client_email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4" /> {lead.client_phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> 
                            {lead.event_type} {lead.event_date && `• ${format(new Date(lead.event_date), "dd/MM/yyyy", { locale: ptBR })}`}
                          </p>
                          {lead.budget_requested && (
                            <p className="font-semibold text-gray-700">💰 {lead.budget_requested}</p>
                          )}
                          {lead.message && (
                            <p className="text-xs text-gray-500 mt-2 bg-gray-100 p-2 rounded">{lead.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {format(new Date(lead.created_date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleWhatsApp(lead)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contactar WhatsApp
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => updateLeadMutation.mutate({ id: lead.id, status: 'contacted' })}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Marcar Contactado
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        if (confirm('Tem certeza que deseja deletar este lead?')) {
                          deleteLeadMutation.mutate(lead.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Contactados */}
      {contactedLeads.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-blue-900">✅ Leads Contactados</h3>
          <div className="space-y-4">
            {contactedLeads.map((lead) => (
              <Card key={lead.id} className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLeadSelection(lead.id)}
                        className="mt-1"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-lg">{lead.client_name}</h4>
                          <Badge className="bg-blue-600">Contactado</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{lead.client_email} • {lead.client_phone}</p>
                          <p>{lead.event_type} {lead.event_date && `• ${format(new Date(lead.event_date), "dd/MM/yyyy", { locale: ptBR })}`}</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm('Tem certeza que deseja deletar este lead?')) {
                          deleteLeadMutation.mutate(lead.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}