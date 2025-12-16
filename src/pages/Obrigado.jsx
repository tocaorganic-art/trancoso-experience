import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function Obrigado() {
  useEffect(() => {
    // Google Ads Conversion Event - Primary
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17649743667/Px_YCKCb3s4bELPuhuBB',
        'value': 1.0,
        'currency': 'BRL'
      });
    }

    // Meta Pixel Lead Event
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proposta Enviada com Sucesso! 🎉
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-6">
            Recebemos sua solicitação de cotação e já estamos preparando uma proposta exclusiva para seu evento.
          </p>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Próximos Passos</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  1
                </div>
                <p className="text-gray-700 pt-1">
                  Nossa equipe analisará os detalhes do seu evento
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  2
                </div>
                <p className="text-gray-700 pt-1">
                  Você receberá nossa proposta personalizada em até 24 horas
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  3
                </div>
                <p className="text-gray-700 pt-1">
                  Entraremos em contato via WhatsApp para finalizar os detalhes
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a 
              href="https://wa.me/557398283579?text=Olá! Acabei de enviar uma cotação pelo site e gostaria de saber mais."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105">
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp Agora
              </Button>
            </a>
            <Link to={createPageUrl("Home")} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-full">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar ao Site
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 mb-2">
              Alguma dúvida urgente?
            </p>
            <p className="text-gray-700 font-semibold">
              WhatsApp: <a href="https://wa.me/557398283579" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">+55 73 9828-3579</a>
            </p>
            <p className="text-gray-700">
              Email: <a href="mailto:eventos@tocaexperience.com.br" className="text-green-600 hover:underline">eventos@tocaexperience.com.br</a>
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 text-sm">
            ✨ Mais de 500 eventos realizados • 🎵 500k+ streams • ⭐ Avaliação 5.0
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}