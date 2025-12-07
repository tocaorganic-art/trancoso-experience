import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2, Download, Copy, MessageCircle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export default function CompartilharTodos({ eventos }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const gerarTexto = () => {
    const eventosPorData = eventos.reduce((acc, evento) => {
      if (!acc[evento.data]) acc[evento.data] = [];
      acc[evento.data].push(evento);
      return acc;
    }, {});

    let texto = `🎉 *RÉVEILLON 2025/2026 - TOCA EXPERIENCE*\n`;
    texto += `📍 Trancoso • Caraíva • Arraial d'Ajuda\n`;
    texto += `\n✨ *${eventos.length} EVENTOS EXCLUSIVOS*\n`;
    texto += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    Object.entries(eventosPorData).sort().forEach(([data, eventosData]) => {
      const [year, month, day] = data.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const dataFormatada = format(dateObj, "EEEE, dd 'de' MMMM", { locale: ptBR });
      
      texto += `📅 *${dataFormatada.toUpperCase()}*\n\n`;
      
      eventosData.forEach((evento, idx) => {
        texto += `${idx + 1}. *${evento.nome}*\n`;
        texto += `   📍 ${evento.localidade} - ${evento.local}\n`;
        if (evento.detalhes) {
          texto += `   ℹ️ ${evento.detalhes}\n`;
        }
        if (evento.link_compra) {
          texto += `   🎟️ Ingressos: ${evento.link_compra}\n`;
          texto += `   💰 Use o código: *toca-organic*\n`;
        }
        texto += `\n`;
      });
      
      texto += `\n`;
    });

    texto += `━━━━━━━━━━━━━━━━━━━━\n`;
    texto += `🌐 Mais informações: ${window.location.href}\n`;
    texto += `📱 WhatsApp: +55 21 99773-1321\n`;
    texto += `\n✨ *TOCA EXPERIENCE* - Experiências Exclusivas`;

    return texto;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gerarTexto());
    setCopied(true);
    toast.success("Texto copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const texto = gerarTexto();
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('RÉVEILLON 2025/2026', 105, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'normal');
      doc.text('Toca Experience', 105, 28, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text('Trancoso • Caraíva • Arraial d\'Ajuda', 105, 35, { align: 'center' });
      
      // Total eventos
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`${eventos.length} Eventos Exclusivos`, 105, 45, { align: 'center' });
      
      // Eventos por data
      let y = 55;
      const eventosPorData = eventos.reduce((acc, evento) => {
        if (!acc[evento.data]) acc[evento.data] = [];
        acc[evento.data].push(evento);
        return acc;
      }, {});
      
      Object.entries(eventosPorData).sort().forEach(([data, eventosData]) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        const [year, month, day] = data.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        const dataFormatada = format(dateObj, "EEEE, dd 'de' MMMM", { locale: ptBR });
        
        // Data header
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(dataFormatada.toUpperCase(), 20, y);
        y += 8;
        
        // Eventos
        eventosData.forEach((evento) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          
          doc.setFontSize(10);
          doc.setFont(undefined, 'bold');
          doc.text(evento.nome, 25, y);
          y += 6;
          
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          doc.text(`${evento.localidade} - ${evento.local}`, 25, y);
          y += 5;
          
          if (evento.detalhes) {
            const detalhes = doc.splitTextToSize(evento.detalhes, 160);
            doc.text(detalhes, 25, y);
            y += detalhes.length * 5;
          }
          
          if (evento.link_compra) {
            doc.setTextColor(100, 100, 255);
            doc.text('Ingressos disponíveis - Use código: toca-organic', 25, y);
            doc.setTextColor(0, 0, 0);
            y += 5;
          }
          
          y += 3;
        });
        
        y += 5;
      });
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 105, 285, { align: 'center' });
      doc.text('www.tocaexperience.com.br', 105, 290, { align: 'center' });
      
      doc.save('reveillon-2025-2026-toca-experience.pdf');
      toast.success("PDF baixado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar PDF");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar Todos
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Compartilhar {eventos.length} Eventos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          <Button 
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white justify-start"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Compartilhar no WhatsApp
          </Button>
          
          <Button 
            onClick={handleCopy}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-800 justify-start"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-3 text-green-400" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-3" />
                Copiar Texto
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleDownloadPDF}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-800 justify-start"
          >
            <Download className="w-5 h-5 mr-3" />
            Baixar PDF
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 mt-4 text-center">
          Lista completa com datas, locais e links para ingressos
        </p>
      </DialogContent>
    </Dialog>
  );
}