import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, DollarSign, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { useTracking } from "@/components/tracking/TrackingProvider";
import MultiStepQuotationForm from "@/components/ai/MultiStepQuotationForm";
import { Checkbox } from "@/components/ui/checkbox";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function Cotacao() {
  const { trackFormSubmission, trackWhatsAppClick } = useTracking();
  const [showMultiStep, setShowMultiStep] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipoEvento: "",
    data: "",
    horarioInicio: "",
    duracao: "",
    local: "",
    numeroConvidados: "",
    orcamento: "",
    estrutura: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consents, setConsents] = useState({
    privacy: false,
    terms: false,
    marketing: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tipoEventoLabels = {
        casamento: "Casamento",
        aniversario: "Aniversário",
        corporativo: "Evento Corporativo",
        festa_privada: "Festa Privada",
        club: "Club / Boate",
        festival: "Festival",
        sunset: "Sunset / Pool Party",
        reveillon: "Réveillon",
        outro: "Outro"
      };

      const orcamentoLabels = {
        ate_5k: "Até R$ 5.000",
        "5k_10k": "R$ 5.000 - R$ 10.000",
        "10k_20k": "R$ 10.000 - R$ 20.000",
        "20k_50k": "R$ 20.000 - R$ 50.000",
        acima_50k: "Acima de R$ 50.000",
        a_combinar: "A combinar"
      };

      // Mensagem para WhatsApp
      const whatsappMessage = `*NOVA COTAÇÃO - Toca Experience*

📋 *DADOS DO CLIENTE:*
Nome: ${formData.nome}
Email: ${formData.email}
Telefone: ${formData.telefone}

🎉 *DETALHES DO EVENTO:*
Tipo: ${tipoEventoLabels[formData.tipoEvento] || "Não informado"}
Data: ${formData.data || "Não informada"}
Horário: ${formData.horarioInicio || "Não informado"}
Duração: ${formData.duracao ? formData.duracao + "h" : "Não informada"}
Local: ${formData.local || "Não informado"}
Convidados: ${formData.numeroConvidados || "Não informado"}

💰 *ORÇAMENTO:*
${orcamentoLabels[formData.orcamento] || "A combinar"}

🎛️ *ESTRUTURA:*
${formData.estrutura || "Não informada"}

💬 *MENSAGEM ADICIONAL:*
${formData.mensagem || "Nenhuma mensagem adicional"}`;

      // Salvar dados no localStorage para WhatsApp posterior
      localStorage.setItem('whatsapp_message', whatsappMessage);

      trackFormSubmission(formData);
      trackWhatsAppClick();

      // Google Ads Conversion Event
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17649743667/Px_YCKCb3s4bELPuhuBB',
          'value': 1.0,
          'currency': 'BRL'
        });
      }

      toast.success("Proposta enviada com sucesso!", {
        description: "Redirecionando para página de confirmação..."
      });

      // Redirecionar para página de agradecimento (dispara conversão)
      setTimeout(() => {
        window.location.href = createPageUrl("Obrigado");
      }, 800);
    } catch (error) {
      console.error("Erro ao processar cotação:", error);
      toast.error("Erro ao processar cotação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
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
              <DollarSign className="w-4 h-4" />
              Solicite sua Cotação
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Cotação Personalizada
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
              Preencha o formulário e receba uma proposta detalhada para seu evento
            </p>
            <Button
              onClick={() => setShowMultiStep(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Cotação Inteligente (IA)
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: "Solicitar Cotação", page: "Cotacao" }
        ]} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">
            {/* Dados Pessoais */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Dados de Contato</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Nome Completo *</label>
                  <Input
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="bg-gray-50 border-gray-300"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">E-mail *</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-gray-50 border-gray-300"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Telefone / WhatsApp *</label>
                <Input
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="bg-gray-50 border-gray-300"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            {/* Detalhes do Evento */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Detalhes do Evento</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Tipo de Evento *</label>
                  <select
                    required
                    value={formData.tipoEvento}
                    onChange={(e) => setFormData({...formData, tipoEvento: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">Selecione</option>
                    <option value="casamento">Casamento</option>
                    <option value="aniversario">Aniversário</option>
                    <option value="corporativo">Evento Corporativo</option>
                    <option value="festa_privada">Festa Privada</option>
                    <option value="club">Club / Boate</option>
                    <option value="festival">Festival</option>
                    <option value="sunset">Sunset / Pool Party</option>
                    <option value="reveillon">Réveillon</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Data do Evento *</label>
                  <Input
                    required
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    className="bg-gray-50 border-gray-300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Horário Início</label>
                  <Input
                    type="time"
                    value={formData.horarioInicio}
                    onChange={(e) => setFormData({...formData, horarioInicio: e.target.value})}
                    className="bg-gray-50 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Duração (horas)</label>
                  <Input
                    type="number"
                    value={formData.duracao}
                    onChange={(e) => setFormData({...formData, duracao: e.target.value})}
                    className="bg-gray-50 border-gray-300"
                    placeholder="4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Nº Convidados</label>
                  <Input
                    type="number"
                    value={formData.numeroConvidados}
                    onChange={(e) => setFormData({...formData, numeroConvidados: e.target.value})}
                    className="bg-gray-50 border-gray-300"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Local do Evento *</label>
                <Input
                  required
                  value={formData.local}
                  onChange={(e) => setFormData({...formData, local: e.target.value})}
                  className="bg-gray-50 border-gray-300"
                  placeholder="Ex: Trancoso, Bahia"
                />
              </div>
            </div>

            {/* Orçamento e Estrutura */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Orçamento e Infraestrutura</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Orçamento Estimado</label>
                  <select
                    value={formData.orcamento}
                    onChange={(e) => setFormData({...formData, orcamento: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">Selecione</option>
                    <option value="ate_5k">Até R$ 5.000</option>
                    <option value="5k_10k">R$ 5.000 - R$ 10.000</option>
                    <option value="10k_20k">R$ 10.000 - R$ 20.000</option>
                    <option value="20k_50k">R$ 20.000 - R$ 50.000</option>
                    <option value="acima_50k">Acima de R$ 50.000</option>
                    <option value="a_combinar">A combinar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Estrutura Necessária</label>
                  <select
                    value={formData.estrutura}
                    onChange={(e) => setFormData({...formData, estrutura: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">Selecione</option>
                    <option value="apenas_dj">Apenas DJ</option>
                    <option value="dj_som">DJ + Som</option>
                    <option value="dj_som_luz">DJ + Som + Iluminação</option>
                    <option value="completa">Estrutura Completa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Detalhes Adicionais</label>
              <Textarea
                value={formData.mensagem}
                onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                className="bg-gray-50 border-gray-300 min-h-[120px]"
                placeholder="Conte-nos mais sobre suas expectativas, estilo musical preferido, detalhes especiais..."
              />
            </div>

            {/* LGPD Consent */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 text-sm">Consentimento e Termos</h4>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={consents.privacy}
                  onCheckedChange={(checked) => setConsents({...consents, privacy: checked})}
                />
                <span className="text-sm text-gray-700">
                  Concordo com a <Link to={createPageUrl("PoliticaPrivacidade")} target="_blank" className="text-blue-600 underline">Política de Privacidade</Link> *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={consents.terms}
                  onCheckedChange={(checked) => setConsents({...consents, terms: checked})}
                />
                <span className="text-sm text-gray-700">
                  Concordo com os <Link to={createPageUrl("TermosServico")} target="_blank" className="text-blue-600 underline">Termos de Serviço</Link> *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={consents.marketing}
                  onCheckedChange={(checked) => setConsents({...consents, marketing: checked})}
                />
                <span className="text-sm text-gray-700">
                  Desejo receber emails e mensagens sobre eventos, novidades e ofertas especiais
                </span>
              </label>
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting || !consents.privacy || !consents.terms}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "ENVIANDO..." : "SOLICITAR COTAÇÃO"}
            </Button>
            
            {(!consents.privacy || !consents.terms) && (
              <p className="text-xs text-red-600 text-center">
                * Você precisa concordar com a Política de Privacidade e Termos de Serviço
              </p>
            )}
          </form>
        </motion.div>
      </div>

      {/* Multi-Step Form Modal */}
      {showMultiStep && (
        <MultiStepQuotationForm onClose={() => setShowMultiStep(false)} />
      )}
    </div>
  );
}