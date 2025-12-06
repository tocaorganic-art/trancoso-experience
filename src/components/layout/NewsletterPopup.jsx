import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { subscribeMailchimp } from "@/functions/subscribeMailchimp";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Verifica se já mostrou o popup nesta sessão
    const hasSeenPopup = sessionStorage.getItem("newsletter_popup_seen");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("newsletter_popup_seen", "true");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await subscribeMailchimp({ email, name });
      console.log('Mailchimp response:', response);
      
      if (response.data?.success) {
        setIsSuccess(true);
        toast.success(response.data.message);
      } else {
        const errorMsg = response.data?.error || response.data?.details || "Erro ao cadastrar.";
        console.error('Mailchimp error:', errorMsg);
        toast.error(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      toast.error(error?.response?.data?.error || error.message || "Erro ao cadastrar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay escurecido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 m-auto z-[1001] w-auto max-w-xs h-fit"
          >
            <div 
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 md:p-8 border border-white/10 shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
              }}
            >
              {/* Botão Fechar */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                <>
                  {/* Tela de Sucesso */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-600 to-green-700 border border-white/10">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h2 className="text-lg md:text-2xl font-bold text-center text-white mb-2">
                    Cadastro Confirmado!
                  </h2>

                  <p className="text-gray-400 text-center text-sm mb-5">
                    Obrigado por se inscrever! Você receberá as melhores novidades sobre eventos, datas e ingressos antecipados diretamente no seu e-mail.
                  </p>

                  <Button
                    onClick={handleClose}
                    className="w-full py-5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Fechar
                  </Button>
                </>
              ) : (
                <>
                  {/* Logo da Toca */}
                                      <div className="flex justify-center mb-4">
                                        <img 
                                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2dbf0b11165a8439c5a8b/8c9bc9739_logo_da_toca_experience_com_cone_branco2.jpg" 
                                          alt="Toca Experience"
                                          className="w-16 h-16 rounded-xl object-cover"
                                        />
                                      </div>

                  {/* Título */}
                  <h2 className="text-lg md:text-2xl font-bold text-center text-white mb-2">
                    Fique por dentro dos melhores eventos da região
                  </h2>

                  {/* Subtítulo */}
                  <p className="text-gray-400 text-center text-sm mb-5">
                    Cadastre-se para receber novidades, datas e ingressos antecipados.
                  </p>

                  {/* Formulário */}
                                      <form onSubmit={handleSubmit} className="space-y-3">
                                        <div className="relative">
                                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                          <Input
                                            type="text"
                                            placeholder="Seu nome"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-11 py-5 text-sm bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 focus:ring-white/20 rounded-xl"
                                          />
                                        </div>

                                        <div className="relative">
                                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                          <Input
                                            type="email"
                                            placeholder="Seu melhor e-mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-11 py-5 text-sm bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 focus:ring-white/20 rounded-xl"
                                          />
                                        </div>

                                        <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isSubmitting ? "Cadastrando..." : "Quero Receber"}
                    </Button>
                  </form>

                  {/* Texto de privacidade */}
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Respeitamos sua privacidade. Sem spam, apenas conteúdo relevante.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}