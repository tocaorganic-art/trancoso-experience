import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function LGPDConsent({ userEmail, onConsent }) {
  const [show, setShow] = useState(true);
  const [consents, setConsents] = useState({
    email: false,
    whatsapp: false,
    sms: false,
    phone: false
  });

  const handleSubmit = async () => {
    try {
      await base44.entities.UserConsent.create({
        user_email: userEmail,
        email_marketing_consent: consents.email,
        whatsapp_consent: consents.whatsapp,
        sms_consent: consents.sms,
        phone_consent: consents.phone,
        consent_date: new Date().toISOString(),
        ip_address: 'client-ip' // Em produção, capturar IP real
      });

      toast.success("Preferências salvas!");
      setShow(false);
      onConsent?.(consents);
    } catch (error) {
      toast.error("Erro ao salvar preferências");
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Suas Preferências de Comunicação
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Respeitamos sua privacidade. Escolha como deseja receber atualizações da Toca Experience.
              </p>

              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <Checkbox
                    checked={consents.email}
                    onCheckedChange={(checked) => setConsents({...consents, email: checked})}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">📧 Email Marketing</p>
                    <p className="text-xs text-gray-500">Novidades, eventos e ofertas</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <Checkbox
                    checked={consents.whatsapp}
                    onCheckedChange={(checked) => setConsents({...consents, whatsapp: checked})}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">💬 WhatsApp</p>
                    <p className="text-xs text-gray-500">Comunicação rápida sobre propostas</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <Checkbox
                    checked={consents.sms}
                    onCheckedChange={(checked) => setConsents({...consents, sms: checked})}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">📱 SMS</p>
                    <p className="text-xs text-gray-500">Lembretes de eventos</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <Checkbox
                    checked={consents.phone}
                    onCheckedChange={(checked) => setConsents({...consents, phone: checked})}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">📞 Telefone</p>
                    <p className="text-xs text-gray-500">Ligações sobre cotações</p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Conforme <a href="/politica-privacidade" className="underline">Política de Privacidade</a> (LGPD)
                </p>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setShow(false)} size="sm">
                    <X className="w-4 h-4 mr-2" /> Recusar Tudo
                  </Button>
                  <Button onClick={handleSubmit} size="sm" className="bg-blue-600">
                    Salvar Preferências
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}