import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Olá! Sou o assistente da Toca Experience. Como posso ajudar você hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    '💰 Quanto custa?',
    '📍 Onde vocês atuam?',
    '🎵 Que tipo de música?',
    '📅 Como agendar?'
  ];

  const handleQuickQuestion = async (question) => {
    await handleSend(question);
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Respostas FAQ rápidas
      const faqResponses = {
        'quanto custa': 'Nossos valores variam de acordo com o tipo de evento, localização e duração. Para eventos em Trancoso, valores a partir de R$ 15.000. Para uma cotação personalizada, [clique aqui](/cotacao) ou me conte mais sobre seu evento!',
        'onde': 'Atuamos principalmente em Trancoso, Caraíva, Arraial d\'Ajuda e Porto Seguro. Também fazemos eventos em São Paulo, Rio de Janeiro e outras cidades. Onde será seu evento?',
        'música': 'Especializados em Afro House, Organic House e House Music. Tony Monteiro traz influências globais e Enzo Furtado a vibe orgânica de Trancoso. Qual estilo você prefere?',
        'agendar': 'Para agendar uma consulta, você pode preencher nosso [formulário de cotação](/cotacao) ou me enviar os detalhes aqui mesmo: data, local, tipo de evento e orçamento estimado.'
      };

      let response = null;
      const lowerText = text.toLowerCase();
      
      for (const [key, value] of Object.entries(faqResponses)) {
        if (lowerText.includes(key)) {
          response = value;
          break;
        }
      }

      if (!response) {
        // Usar IA para resposta mais complexa
        const aiResponse = await base44.integrations.Core.InvokeLLM({
          prompt: `Você é o assistente virtual da Toca Experience, duo de DJs Tony Monteiro e Enzo Furtado especialistas em Afro House, Organic House e House Music em Trancoso.
          
Informações importantes:
- Atuamos em Trancoso, Caraíva, Arraial d'Ajuda
- Valores a partir de R$ 15.000 para eventos em Trancoso
- Especializados em casamentos, festivais, eventos corporativos, réveillon
- Equipamentos Pioneer de última geração
- Mais de 500 mil streams nas plataformas
- Contato: (73) 98283-579

Usuário pergunta: ${text}

Responda de forma amigável, objetiva e útil em até 2 parágrafos. Se for sobre preços, sugira preencher o formulário de cotação.`,
          add_context_from_internet: false
        });
        response = aiResponse || 'Desculpe, não entendi sua pergunta. Pode reformular? Ou fale diretamente com nossa equipe via WhatsApp: (73) 98283-579';
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Ops, tive um problema. Mas você pode falar diretamente conosco via WhatsApp: (73) 98283-579' 
        }]);
        setIsTyping(false);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-[9998] md:bottom-8 md:right-8"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 animate-pulse"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-6 w-[90vw] max-w-[380px] h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl z-[9998] flex flex-col overflow-hidden border border-gray-200 md:bottom-28 md:right-8"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Toca Experience</h3>
                  <p className="text-xs text-white/80">Online agora</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-[#DCF8C6] text-gray-800' 
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl border border-gray-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 bg-white border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Perguntas rápidas:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
                <Button
                  onClick={() => handleSend()}
                  className="rounded-full bg-[#25D366] hover:bg-[#128C7E]"
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