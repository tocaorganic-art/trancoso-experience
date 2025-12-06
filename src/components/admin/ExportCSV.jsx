import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function ExportCSV() {
  const [isExporting, setIsExporting] = React.useState(false);

  const exportToCSV = async () => {
    setIsExporting(true);
    try {
      const leads = await base44.entities.EventData.list('-created_date', 10000);
      
      // Headers do CSV
      const headers = [
        'ID',
        'Nome',
        'Email',
        'Telefone',
        'Tipo de Evento',
        'Data do Evento',
        'Cidade',
        'Número de Convidados',
        'Orçamento',
        'Status',
        'Data de Criação',
        'Notas'
      ];

      // Mapear dados
      const rows = leads.map(lead => [
        lead.id,
        lead.client_name || '',
        lead.client_email || '',
        lead.client_phone || '',
        lead.event_type || '',
        lead.event_date || '',
        lead.city || '',
        lead.guest_count || '',
        lead.budget_requested || '',
        lead.conversion_status || '',
        lead.created_date ? new Date(lead.created_date).toLocaleDateString('pt-BR') : '',
        lead.notes || ''
      ]);

      // Criar CSV
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      // Download
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `leads_toca_experience_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success(`${leads.length} leads exportados com sucesso!`);
    } catch (error) {
      toast.error('Erro ao exportar CSV');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportToCSV} 
      disabled={isExporting}
      className="bg-gradient-to-r from-green-600 to-green-700 text-white"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Exportando...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </>
      )}
    </Button>
  );
}