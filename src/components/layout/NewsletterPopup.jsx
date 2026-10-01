import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      {isOpen &&
      <>
          {/* Overlay escurecido */}
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]" />
        

          {/* Modal */}
          <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-4 m-auto z-[1001] w-auto max-w-xs h-fit">
          
            


































































































          
          </motion.div>
        </>
      }
    </AnimatePresence>);

}