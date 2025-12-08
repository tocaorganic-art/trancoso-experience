import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Calendar, Music, MapPin, DollarSign, User } from "lucide-react";
import { toast } from "sonner";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { base44 } from "@/api/base44Client";

const STEPS = [
  { id: 1, title: "Sobre Você", icon: User },
  { id: 2, title: "Seu Evento", icon: Calendar },
  { id: 3, title: "Preferências", icon: Music },
  { id: 4, title: "Local & Orçamento", icon: MapPin }
];

export default function MultiStepQuotationForm({ onClose }) {
  const { trackFormSubmission, trackWhatsAppClick } = useTracking();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    nome: "",
    email: "",
    telefone: "",
    // Step 2
    tipoEvento: "",
    data: "",
    horarioInicio: "",
    duracao: "",
    numeroConvidados: "",
    // Step 3
    estilMusical: [],
    momentosEspeciais: "",
    atmosfera: "",
    // Step 4
    local: "",
    localidade: "",
    estruturaNecessaria: "",
    orcamento: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.nome || !formData.email || !formData.telefone) {
          toast.error("Preencha todos os campos obrigatórios");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error("E-mail inválido");
          return false;
        }
        return true;
      case 2:
        if (!formData.tipoEvento || !formData.data) {
          toast.error("Preencha tipo de evento e data");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Salvar lead no banco de dados
      const leadData = {
        client_name: formData.nome,
        client_email: formData.email,
        client_phone: formData.telefone,
        event_type: formData.tipoEvento,
        event_date: formData.data,
        budget_requested: formData.orcamento,
        message: `Horário: ${formData.horarioInicio || "Não especificado"}. Duração: ${formData.duracao || "N/A"} horas. Convidados: ${formData.numeroConvidados || "N/A"}. Local: ${formData.local || "N/A"} (${formData.localidade || "N/A"}). Estrutura: ${formData.estruturaNecessaria || "N/A"}. Estilos: ${formData.estilMusical.join(', ') || "Aberto"}. Atmosfera: ${formData.atmosfera || "N/A"}. Momentos especiais: ${formData.momentosEspeciais || "Nenhum"}`,
        conversion_status: 'pending',
        source: 'website'
      };

      await base44.entities.EventData.create(leadData);

      const message = `*Cotação Multi-Step - Toca Experience*

*👤 CONTATO:*
Nome: ${formData.nome}
E-mail: ${formData.email}
Telefone: ${formData.telefone}

*🎉 EVENTO:*
Tipo: ${formData.tipoEvento}
Data: ${formData.data}
Horário: ${formData.horarioInicio || "Não especificado"}
Duração: ${formData.duracao || "Não especificado"} horas
Convidados: ${formData.numeroConvidados || "Não especificado"}

*🎵 PREFERÊNCIAS MUSICAIS:*
Estilos: ${formData.estilMusical.join(", ") || "Aberto a sugestões"}
Atmosfera: ${formData.atmosfera || "Não especificado"}
Momentos Especiais: ${formData.momentosEspeciais || "Nenhum"}

*📍 LOCAL E ORÇAMENTO:*
Local: ${formData.local || "Não especificado"}
Localidade: ${formData.localidade || "Não especificado"}
Estrutura: ${formData.estruturaNecessaria || "Não especificado"}
Orçamento: ${formData.orcamento || "Não especificado"}`;

      trackFormSubmission(formData);
      trackWhatsAppClick();
      
      window.open(`https://wa.me/5521972824659?text=${encodeURIComponent(message)}`, '_blank');
      
      toast.success("Cotação enviada!");
      onClose?.();
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo *</label>
              <Input
                value={formData.nome}
                onChange={(e) => updateField("nome", e.target.value)}
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">E-mail *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp *</label>
              <Input
                value={formData.telefone}
                onChange={(e) => updateField("telefone", e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Evento *</label>
              <Select value={formData.tipoEvento} onValueChange={(v) => updateField("tipoEvento", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casamento">Casamento</SelectItem>
                  <SelectItem value="aniversario">Aniversário</SelectItem>
                  <SelectItem value="corporativo">Corporativo</SelectItem>
                  <SelectItem value="festa_privada">Festa Privada</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="reveillon">Réveillon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Data *</label>
                <Input
                  type="date"
                  value={formData.data}
                  onChange={(e) => updateField("data", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Horário Início</label>
                <Input
                  type="time"
                  value={formData.horarioInicio}
                  onChange={(e) => updateField("horarioInicio", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Duração (horas)</label>
                <Input
                  type="number"
                  value={formData.duracao}
                  onChange={(e) => updateField("duracao", e.target.value)}
                  placeholder="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nº Convidados</label>
                <Input
                  type="number"
                  value={formData.numeroConvidados}
                  onChange={(e) => updateField("numeroConvidados", e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Estilos Musicais (múltipla escolha)</label>
              <div className="grid grid-cols-2 gap-2">
                {["Afro House", "Organic House", "Tech House", "Deep House", "MPB Eletrônica", "Aberto a sugestões"].map(style => (
                  <button
                    key={style}
                    onClick={() => {
                      const current = formData.estilMusical;
                      updateField("estilMusical", 
                        current.includes(style) 
                          ? current.filter(s => s !== style)
                          : [...current, style]
                      );
                    }}
                    className={`p-2 rounded-lg border text-sm transition-colors ${
                      formData.estilMusical.includes(style)
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Atmosfera Desejada</label>
              <Select value={formData.atmosfera} onValueChange={(v) => updateField("atmosfera", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Como você imagina o evento?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elegante">Elegante e Sofisticado</SelectItem>
                  <SelectItem value="animado">Animado e Festivo</SelectItem>
                  <SelectItem value="relaxado">Relaxado e Tropical</SelectItem>
                  <SelectItem value="energetico">Energético e Dançante</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Momentos Especiais</label>
              <Textarea
                value={formData.momentosEspeciais}
                onChange={(e) => updateField("momentosEspeciais", e.target.value)}
                placeholder="Ex: Entrada dos noivos, primeira dança, músicas especiais..."
                className="h-24"
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Localidade</label>
              <Select value={formData.localidade} onValueChange={(v) => updateField("localidade", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Onde será?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trancoso">Trancoso</SelectItem>
                  <SelectItem value="caraiva">Caraíva</SelectItem>
                  <SelectItem value="arraial">Arraial d'Ajuda</SelectItem>
                  <SelectItem value="sao_paulo">São Paulo</SelectItem>
                  <SelectItem value="rio">Rio de Janeiro</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Local Específico</label>
              <Input
                value={formData.local}
                onChange={(e) => updateField("local", e.target.value)}
                placeholder="Ex: Casa de praia, resort, clube..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estrutura Necessária</label>
              <Select value={formData.estruturaNecessaria} onValueChange={(v) => updateField("estruturaNecessaria", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="O que você precisa?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apenas_dj">Apenas DJ</SelectItem>
                  <SelectItem value="dj_som">DJ + Som</SelectItem>
                  <SelectItem value="dj_som_luz">DJ + Som + Iluminação</SelectItem>
                  <SelectItem value="completa">Estrutura Completa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Orçamento Estimado</label>
              <Select value={formData.orcamento} onValueChange={(v) => updateField("orcamento", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma faixa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ate_5k">Até R$ 5.000</SelectItem>
                  <SelectItem value="5k_10k">R$ 5.000 - R$ 10.000</SelectItem>
                  <SelectItem value="10k_20k">R$ 10.000 - R$ 20.000</SelectItem>
                  <SelectItem value="20k_50k">R$ 20.000 - R$ 50.000</SelectItem>
                  <SelectItem value="acima_50k">Acima de R$ 50.000</SelectItem>
                  <SelectItem value="a_combinar">A combinar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Progress Bar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentStep > step.id ? "bg-green-500 text-white" :
                    currentStep === step.id ? "bg-gray-800 text-white" :
                    "bg-gray-200 text-gray-400"
                  }`}>
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span className="text-xs mt-2 hidden sm:block">{step.title}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-colors ${
                    currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : prevStep}
            disabled={isSubmitting}
          >
            {currentStep === 1 ? "Cancelar" : <><ChevronLeft className="w-4 h-4 mr-2" /> Voltar</>}
          </Button>
          
          {currentStep < STEPS.length ? (
            <Button onClick={nextStep} className="bg-gray-800">
              Próximo <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Enviando..." : "Enviar Cotação"}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}