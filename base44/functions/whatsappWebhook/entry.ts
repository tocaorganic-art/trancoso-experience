import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * WhatsApp Business API Webhook
 * Recebe e processa mensagens do WhatsApp
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    if (req.method === 'GET') {
      // Verificação do webhook
      const url = new URL(req.url);
      const mode = url.searchParams.get('hub.mode');
      const token = url.searchParams.get('hub.verify_token');
      const challenge = url.searchParams.get('hub.challenge');

      if (mode === 'subscribe' && token === Deno.env.get('WHATSAPP_VERIFY_TOKEN')) {
        return new Response(challenge, { status: 200 });
      }
      return Response.json({ error: 'Verification failed' }, { status: 403 });
    }

    if (req.method === 'POST') {
      const rawBody = await req.text();

      // Validação da assinatura da Meta. Requer o secret WHATSAPP_APP_SECRET (a ser criado pelo Tony).
      // Enquanto o secret não existir, o webhook segue aceitando, mas registra o aviso.
      const appSecret = Deno.env.get('WHATSAPP_APP_SECRET');
      if (appSecret) {
        const signature = req.headers.get('x-hub-signature-256') || '';
        const key = await crypto.subtle.importKey(
          'raw', new TextEncoder().encode(appSecret),
          { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
        );
        const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
        const expected = 'sha256=' + Array.from(new Uint8Array(mac)).map((b) => b.toString(16).padStart(2, '0')).join('');
        if (signature.length !== expected.length || signature !== expected) {
          return Response.json({ error: 'Assinatura inválida' }, { status: 401 });
        }
      } else {
        console.warn('WHATSAPP_APP_SECRET não configurado: assinatura do webhook NÃO está sendo validada.');
      }

      const body = JSON.parse(rawBody);

      // Processar mensagem recebida
      if (body.entry?.[0]?.changes?.[0]?.value?.messages) {
        const message = body.entry[0].changes[0].value.messages[0];
        const from = message.from;
        const text = message.text?.body;

        if (text) {
          // Buscar lead pelo telefone
          const leads = await base44.asServiceRole.entities.EventData.filter({
            client_phone: from
          });

          if (leads.length > 0) {
            // Lead encontrado - atualizar status
            await base44.asServiceRole.entities.LeadFollowUp.create({
              lead_id: leads[0].id,
              status: 'contacted',
              last_contact_date: new Date().toISOString(),
              contact_channel: 'whatsapp',
              notes: `Cliente respondeu: ${text}`
            });
          }

          // Auto-responder baseado em palavras-chave
          const autoResponses = {
            'oi': 'Olá! Obrigado por entrar em contato com a Toca Experience. Como posso ajudar?',
            'preço': 'Nossos valores variam de acordo com o evento. Para uma proposta personalizada, me conte mais sobre: data, local e tipo de evento.',
            'disponibilidade': 'Para verificar disponibilidade, preciso saber a data e local do seu evento. Pode me passar?',
            'sair': 'Tudo bem! Você foi removido da lista de mensagens. Para voltar a receber, basta nos enviar uma mensagem.'
          };

          const lowerText = text.toLowerCase();
          let response = null;

          for (const [key, value] of Object.entries(autoResponses)) {
            if (lowerText.includes(key)) {
              response = value;
              break;
            }
          }

          if (response) {
            await sendWhatsAppMessage(from, response);
          }

          // Se for comando SAIR, atualizar consentimento
          if (lowerText.includes('sair')) {
            const consents = await base44.asServiceRole.entities.UserConsent.filter({
              user_email: from
            });

            if (consents.length > 0) {
              await base44.asServiceRole.entities.UserConsent.update(consents[0].id, {
                whatsapp_consent: false
              });
            }
          }
        }
      }

      return Response.json({ success: true });
    }

    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  } catch (error) {
    console.error('Erro no webhook WhatsApp:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function sendWhatsAppMessage(to, message) {
  const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_TOKEN');
  const WHATSAPP_PHONE_ID = Deno.env.get('WHATSAPP_PHONE_ID');

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          text: { body: message }
        })
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar mensagem WhatsApp:', error);
    throw error;
  }
}