// Número já publicado no site. Confirmar se continua válido antes de divulgar em novos canais.
export const WHATSAPP_NUMBER = '557398283579';

// Abre o WhatsApp com a mensagem pronta. O envio só acontece quando a pessoa
// toca em "enviar" no WhatsApp; nada é salvo no navegador nem enviado a terceiros daqui.
export function openWhatsAppLead(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  return Boolean(win);
}
