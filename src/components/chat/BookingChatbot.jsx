import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const FAQ_DATA = {
  repertorio: "Nosso repertório transita entre Afro House, Organic House e House Music. Criamos sets personalizados para cada evento, do sunset mais intimista ao dancefloor mais intenso.",
  cachê: "O valor varia conforme o tipo de evento, duração e localização. Preencha nosso formulário de proposta para receber um orçamento personalizado!",
  rider: "Nosso rider técnico inclui: 2 CDJs 2000/3000, 1 Mixer DJM 900, sistema de som adequado ao ambiente, e retornos de palco. Enviamos o rider completo após a confirmação do interesse.",
  duracao: "Normalmente tocamos sets de 2 a 6 horas, dependendo do formato do evento. Para festivais e eventos maiores, podemos ajustar conforme a programação.",
  locais: "Atuamos em todo o Brasil e internacionalmente. Tony já tocou na Polinésia Francesa, Europa e América do Sul. Consulte-nos para eventos fora do eixo Rio-SP.",
};

export default function BookingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá! 👋 Sou o assistente da Toca Experience. Posso ajudar com informações sobre repertório, rider técnico, disponibilidade e orçamentos. Como posso ajudar?" }
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
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Você é o assistente virtual da Toca Experience, um duo de DJs formado por Tony Monteiro e Enzo Furtado, especialistas em Afro House, Organic House e House Music.

INFORMAÇÕES SOBRE O DUO:
- Tony Monteiro: Refinamento global, residências em clubes de elite, turnês internacionais (Polinésia Francesa, Europa, América do Sul), projeto MPB Rock Club, +500 mil streams
- Enzo Furtado: 5 anos em Trancoso (Zé Barbudo, Estrela D'Água), atualmente em São Paulo, especialista em Afro House e texturas orgânicas

INFORMAÇÕES FREQUENTES:
- Repertório: ${FAQ_DATA.repertorio}
- Cachê: ${FAQ_DATA.cachê}
- Rider Técnico: ${FAQ_DATA.rider}
- Duração dos Sets: ${FAQ_DATA.duracao}
- Locais de Atuação: ${FAQ_DATA.locais}

REGRAS:
1. Seja simpático e profissional
2. Responda em português brasileiro
3. Para orçamentos específicos, direcione ao formulário de proposta
4. Mantenha respostas concisas (máx 3 frases)
5. Se não souber algo específico, sugira contato direto via WhatsApp

Mensagem do cliente: "${userMessage}"

Responda de forma útil e direcione para ação quando apropriado:`,
        response_json_schema: {
          type: "object",
          properties: {
            response: { type: "string" },
            suggestForm: { type: "boolean" }
          }
        }
      });

      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: response.response,
        suggestForm: response.suggestForm
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Desculpe, tive um problema. Tente novamente ou entre em contato pelo WhatsApp!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    setIsOpen(false);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-[350px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Assistente Toca</p>
                  <p className="text-gray-400 text-xs">Online agora</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === "user" 
                      ? "bg-gray-800 text-white" 
                      : "bg-white border border-gray-200 text-gray-700"
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    {msg.suggestForm && (
                      <Button
                        size="sm"
                        onClick={scrollToForm}
                        className="mt-2 w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white text-xs"
                      >
                        Solicitar Proposta
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-50 border-gray-200"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-gray-800 hover:bg-gray-900"
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