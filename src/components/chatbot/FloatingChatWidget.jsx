import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
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
- Contato: (21) 97282-4659

Usuário pergunta: ${text}

Responda de forma amigável, objetiva e útil em até 2 parágrafos. Se for sobre preços, sugira preencher o formulário de cotação.`,
          add_context_from_internet: false
        });
        response = aiResponse || 'Desculpe, não entendi sua pergunta. Pode reformular? Ou fale diretamente com nossa equipe via WhatsApp: (21) 97282-4659';
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Ops, tive um problema. Mas você pode falar diretamente conosco via WhatsApp: (21) 97282-4659' 
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
        className="fixed bottom-24 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-2xl"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
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
            className="fixed bottom-24 right-6 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
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
                      ? 'bg-purple-600 text-white' 
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
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <Button
                  onClick={() => handleSend()}
                  className="rounded-full bg-purple-600 hover:bg-purple-700"
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