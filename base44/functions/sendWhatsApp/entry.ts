import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Envia mensagem via WhatsApp sem abrir interface
 * 
 * REQUISITOS:
 * 1. Conta WhatsApp Business API (meta.whatsapp.com/business)
 * 2. Número de telefone verificado
 * 3. Token de acesso (definir secret WHATSAPP_API_TOKEN)
 * 4. Phone Number ID (definir secret WHATSAPP_PHONE_ID)
 * 
 * ALTERNATIVAS:
 * - Twilio WhatsApp API
 * - MessageBird WhatsApp API
 * - 360Dialog
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Somente administrador autenticado pode disparar mensagens pela conta de WhatsApp Business.
    const user = await base44.auth.me().catch(() => null);
    if (!user) {
      return Response.json({ success: false, error: 'Não autenticado' }, { status: 401 });
    }
    if (user.role !== 'admin') {
      return Response.json({ success: false, error: 'Acesso restrito a administradores' }, { status: 403 });
    }
    
    const { phone, message } = await req.json();
    
    if (!phone || !message) {
      return Response.json({ 
        success: false, 
        error: 'Phone e message são obrigatórios' 
      }, { status: 400 });
    }
    
    // Pegar secrets configurados
    const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_API_TOKEN");
    const PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_ID");
    
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      return Response.json({ 
        success: false, 
        error: 'WhatsApp API não configurada. Configure WHATSAPP_API_TOKEN e WHATSAPP_PHONE_ID nos secrets.' 
      }, { status: 500 });
    }
    
    // Formatar número (remover caracteres não numéricos e adicionar código do país)
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    
    // Enviar via WhatsApp Business API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: {
            body: message
          }
        })
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Erro WhatsApp API:', data);
      return Response.json({ 
        success: false, 
        error: 'Erro ao enviar mensagem WhatsApp',
        details: data
      }, { status: 500 });
    }
    
    return Response.json({ 
      success: true, 
      messageId: data.messages?.[0]?.id,
      message: 'Mensagem WhatsApp enviada com sucesso'
    });
    
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
});