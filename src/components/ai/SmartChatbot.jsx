import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

// Knowledge Base simplificada inline
const KNOWLEDGE = {
  faq: [
    { q: "preço", a: "Valores variam de R$ 5k a R$ 50k+ conforme tipo de evento, local e estrutura. Peça cotação personalizada!" },
    { q: "local", a: "Atuamos em Trancoso, Caraíva, Arraial d'Ajuda, São Paulo e Rio. Também fazemos eventos internacionais." },
    { q: "música", a: "Afro House, Organic House e House com brasilidades. Repertório personalizado para cada evento." },
    { q: "equipamento", a: "Trabalhamos com Pioneer CDJ-3000 e DJM-V10. Oferecemos locação completa de som e luz." },
    { q: "duração", a: "Sets de 3-4h para eventos privados, até 8h para casamentos e festivais." }
  ],
  context: `Você é um assistente da Toca Experience - duo de DJs Tony Monteiro & Enzo Furtado especializado em Afro House e Organic House em Trancoso, Bahia. Seja amigável, profissional e direto.`
};

export default function SmartChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá! 👋 Sou o assistente da Toca Experience. Como posso ajudar com seu evento?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Verificar FAQ primeiro (resposta rápida)
      const faqMatch = KNOWLEDGE.faq.find(item => 
        userMessage.toLowerCase().includes(item.q)
      );

      if (faqMatch) {
        setMessages(prev => [...prev, { role: "assistant", content: faqMatch.a }]);
        setIsLoading(false);
        return;
      }

      // Se não encontrar na FAQ, usar LLM
      const prompt = `${KNOWLEDGE.context}

Pergunta do cliente: ${userMessage}

Responda de forma concisa e útil. Se for sobre cotação/preço, sugira preencher o formulário. Máximo 2-3 linhas.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: false
      });

      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: response 
      }]);
    } catch (error) {
      toast.error("Erro ao processar mensagem");
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Desculpe, tive um problema. Entre em contato via eventos@tocaexperience.com.br ou WhatsApp: (21) 97282-4659" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "quotation":
        window.location.href = "/cotacao";
        break;
      case "whatsapp":
        window.open("https://wa.me/5521972824659", "_blank");
        break;
      case "events":
        window.location.href = "/eventos";
        break;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl"
              size="icon"
            >
              <div className="relative">
                <MessageCircle className="w-7 h-7" />
                <Sparkles className="w-3 h-3 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <div>
                  <h3 className="font-bold">Assistente IA</h3>
                  <p className="text-xs opacity-90">Toca Experience</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-600">Pensando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-gray-200">
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => handleQuickAction("quotation")}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  📋 Cotação
                </button>
                <button
                  onClick={() => handleQuickAction("whatsapp")}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  💬 WhatsApp
                </button>
                <button
                  onClick={() => handleQuickAction("events")}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  🎉 Eventos
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua pergunta..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}