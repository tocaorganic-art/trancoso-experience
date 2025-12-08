import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, 
  Circle, 
  Download, 
  ArrowLeft, 
  AlertCircle,
  Sparkles,
  Zap,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CHECKLIST_DATA = [
  {
    categoria: "Estrutura do site e usabilidade (UX)",
    prioridade: "crítico",
    items: [
      "Verificar se o site possui navegação intuitiva com menus organizados e fáceis de entender",
      "Confirmar que todas as páginas principais estão acessíveis em no máximo 2 cliques",
      "Analisar clareza visual: contraste adequado, tipografia legível, botões bem destacados",
      "Garantir que não haja páginas com texto truncado, links quebrados ou imagens desalinhadas",
      "Avaliar o fluxo do usuário: verificar se os caminhos até compra, contato e eventos estão claros",
      "Validar que as CTAs (Compre Agora, Saiba Mais) apareçam de forma consistente",
      "Verificar se o site comunica a proposta da marca nos primeiros 3 segundos"
    ]
  },
  {
    categoria: "Ferramentas e integrações",
    prioridade: "crítico",
    items: [
      "Testar o funcionamento de todos os botões de compra, especialmente links para ingressos",
      "Confirmar integração com gateways de pagamento externos (Zig.Tickets, etc.)",
      "Verificar funcionamento dos formulários de contato: envio, recebimento e confirmação",
      "Checar integrações de analytics: Google Analytics, Meta Pixel, Tag Manager",
      "Validar formulários de newsletter e captura de leads",
      "Confirmar que redirecionamentos abrem páginas corretas sem erros 404",
      "Testar pop-ups, banners e scripts de terceiros (chat, automação, cookies)"
    ]
  },
  {
    categoria: "Desempenho e otimização técnica",
    prioridade: "importante",
    items: [
      "Medir velocidade de carregamento no mobile e desktop (Google PageSpeed / GTMetrix)",
      "Verificar tamanho das imagens e aplicar compressão sem perder qualidade",
      "Confirmar otimização de vídeos: carregamento inteligente ou hospedagem externa",
      "Garantir uso de cache, minificação de CSS/JS e lazy loading",
      "Analisar estabilidade do layout (CLS) e performance dos scripts",
      "Validar que não há plugins sobrecarregando o servidor"
    ]
  },
  {
    categoria: "SEO e otimização para mecanismos de busca",
    prioridade: "importante",
    items: [
      "Verificar títulos e meta descriptions únicos para todas as páginas",
      "Confirmar URLs limpas e amigáveis",
      "Checar palavras-chave: réveillon trancoso, eventos premium bahia, festas ano novo 2026",
      "Garantir headers estruturados (H1, H2, H3)",
      "Verificar alt text em todas as imagens",
      "Conferir sitemap.xml e robots.txt",
      "Analisar estrutura para rich snippets (eventos)",
      "Avaliar links internos entre páginas para reforçar SEO",
      "Confirmar página de Eventos com interligação entre datas e atrações"
    ]
  },
  {
    categoria: "Conformidade legal e acessibilidade",
    prioridade: "crítico",
    items: [
      "Garantir conformidade com a LGPD: banner de cookies, política de privacidade",
      "Verificar texto alternativo nas imagens",
      "Testar navegação por teclado",
      "Confirmar botões com contraste suficiente",
      "Validar labels claros em formulários",
      "Confirmar presença de termos de uso e política de privacidade",
      "Verificar certificado SSL (HTTPS) ativo em todas as páginas",
      "Checar se fontes e cores atendem critérios WCAG AA"
    ]
  },
  {
    categoria: "Sugestões específicas para mobile",
    prioridade: "importante",
    items: [
      "Garantir que toda página esteja responsiva e sem cortes laterais",
      "Testar botões e links com o dedo (tamanho mínimo 44px)",
      "Checar desempenho no 4G (tempo máximo aceitável: 3s)",
      "Organizar menus em formato hambúrguer com animação fluida",
      "Otimizar banners para não sobrecarregar carregamento",
      "Evitar pop-ups que cubram toda a tela no celular"
    ]
  },
  {
    categoria: "Checklist final para correções rápidas",
    prioridade: "crítico",
    items: [
      "Eliminar links quebrados",
      "Garantir compatibilidade com Chrome, Safari e Firefox",
      "Confirmar redirecionamentos de compra",
      "Revisar textos e ortografia",
      "Testar fluxo completo: Home → Evento → Card → Compre Agora → Página do ingresso",
      "Confirmar que a imagem do cartaz está aplicada nos cards correspondentes",
      "Realizar último teste de velocidade após todas as inclusões",
      "Publicar e monitorar com Google Analytics e Search Console"
    ]
  }
];

export default function PreLaunchChecklist() {
  const queryClient = useQueryClient();
  const [editingNotes, setEditingNotes] = useState({});

  const { data: checklistItems = [], isLoading } = useQuery({
    queryKey: ['checklistItems'],
    queryFn: () => base44.entities.ChecklistItem.list(),
  });

  // Inicializar checklist se estiver vazio
  useEffect(() => {
    const initChecklist = async () => {
      if (checklistItems.length === 0 && !isLoading) {
        const allItems = CHECKLIST_DATA.flatMap(cat => 
          cat.items.map(item => ({
            categoria: cat.categoria,
            item: item,
            prioridade: cat.prioridade,
            concluido: false
          }))
        );
        
        for (const item of allItems) {
          await base44.entities.ChecklistItem.create(item);
        }
        queryClient.invalidateQueries(['checklistItems']);
        toast.success("Checklist inicializado!");
      }
    };
    initChecklist();
  }, [checklistItems.length, isLoading]);

  const toggleMutation = useMutation({
    mutationFn: ({ id, concluido }) => 
      base44.entities.ChecklistItem.update(id, { concluido }),
    onSuccess: () => {
      queryClient.invalidateQueries(['checklistItems']);
    }
  });

  const updateNotesMutation = useMutation({
    mutationFn: ({ id, observacoes }) => 
      base44.entities.ChecklistItem.update(id, { observacoes }),
    onSuccess: () => {
      queryClient.invalidateQueries(['checklistItems']);
      toast.success("Observação salva!");
    }
  });

  const itemsByCategory = checklistItems.reduce((acc, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {});

  const totalItems = checklistItems.length;
  const completedItems = checklistItems.filter(i => i.concluido).length;
  const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const criticalItems = checklistItems.filter(i => i.prioridade === "crítico");
  const criticalCompleted = criticalItems.filter(i => i.concluido).length;

  const getPriorityColor = (prioridade) => {
    switch (prioridade) {
      case "crítico": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "importante": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "recomendado": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPriorityIcon = (prioridade) => {
    switch (prioridade) {
      case "crítico": return AlertCircle;
      case "importante": return Zap;
      case "recomendado": return TrendingUp;
      default: return Circle;
    }
  };

  const exportToPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Checklist Pré-Lançamento', 20, 20);
    doc.setFontSize(12);
    doc.text('tocaexperience.com.br', 20, 28);
    
    let y = 40;
    
    Object.entries(itemsByCategory).forEach(([categoria, items]) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(categoria, 20, y);
      y += 8;
      
      items.forEach((item) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const checkbox = item.concluido ? '[X]' : '[ ]';
        const text = doc.splitTextToSize(`${checkbox} ${item.item}`, 170);
        doc.text(text, 25, y);
        y += text.length * 5 + 2;
      });
      
      y += 5;
    });
    
    doc.save('checklist-pre-lancamento.pdf');
    toast.success("PDF exportado!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-8 shadow-lg">
        <div className="container mx-auto px-6">
          <Link to={createPageUrl("Home")}>
            <Button variant="ghost" className="text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Checklist Pré-Lançamento
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Análise Completa do Site
            </h1>
            <p className="text-purple-100 text-lg">
              tocaexperience.com.br
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Progresso Total</h3>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {completedItems}/{totalItems}
              </div>
              <Progress value={progressPercent} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">{progressPercent.toFixed(0)}% concluído</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Itens Críticos</h3>
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {criticalCompleted}/{criticalItems.length}
              </div>
              <Progress 
                value={criticalItems.length > 0 ? (criticalCompleted / criticalItems.length) * 100 : 0} 
                className="h-2" 
              />
              <p className="text-xs text-gray-500 mt-2">Prioridade máxima</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Ações</h3>
                <Download className="w-5 h-5 text-purple-600" />
              </div>
              <Button 
                onClick={exportToPDF}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">Download do checklist</p>
            </CardContent>
          </Card>
        </div>

        {/* Checklist Items by Category */}
        <div className="space-y-6">
          {Object.entries(itemsByCategory).map(([categoria, items]) => {
            const categoryPriority = items[0]?.prioridade || "recomendado";
            const PriorityIcon = getPriorityIcon(categoryPriority);
            const categoryCompleted = items.filter(i => i.concluido).length;
            const categoryPercent = (categoryCompleted / items.length) * 100;

            return (
              <motion.div
                key={categoria}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <PriorityIcon className="w-5 h-5 text-gray-600" />
                          <CardTitle className="text-xl">{categoria}</CardTitle>
                          <Badge variant="outline" className={getPriorityColor(categoryPriority)}>
                            {categoryPriority}
                          </Badge>
                        </div>
                        <Progress value={categoryPercent} className="h-2 w-full md:w-64" />
                        <p className="text-xs text-gray-500 mt-1">
                          {categoryCompleted}/{items.length} concluídos
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <Checkbox
                            checked={item.concluido}
                            onCheckedChange={(checked) => 
                              toggleMutation.mutate({ id: item.id, concluido: checked })
                            }
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <p className={`text-sm ${item.concluido ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                              {item.item}
                            </p>
                            {(editingNotes[item.id] || item.observacoes) && (
                              <Textarea
                                placeholder="Adicionar observações..."
                                value={editingNotes[item.id] ?? item.observacoes ?? ''}
                                onChange={(e) => setEditingNotes({ ...editingNotes, [item.id]: e.target.value })}
                                onBlur={() => {
                                  if (editingNotes[item.id] !== undefined) {
                                    updateNotesMutation.mutate({ 
                                      id: item.id, 
                                      observacoes: editingNotes[item.id] 
                                    });
                                  }
                                }}
                                className="mt-2 text-xs"
                                rows={2}
                              />
                            )}
                            {!editingNotes[item.id] && !item.observacoes && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingNotes({ ...editingNotes, [item.id]: '' })}
                                className="mt-1 h-6 text-xs text-gray-500"
                              >
                                + Adicionar observações
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Recomendações */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-purple-900 mb-4">📋 Recomendações Práticas</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
              <div>
                <strong>UX:</strong> Implementar breadcrumbs, realizar teste A/B em CTAs, padronizar elementos visuais
              </div>
              <div>
                <strong>Performance:</strong> Reduzir imagens acima de 300 KB, adotar WebP, ativar pré-carregamento de fontes
              </div>
              <div>
                <strong>SEO:</strong> Criar páginas estáticas para eventos anuais, incluir links internos, configurar Search Console
              </div>
              <div>
                <strong>Acessibilidade:</strong> Adicionar política clara de dados, integrar widget de acessibilidade, ajustar contraste mínimo 4.5:1
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}