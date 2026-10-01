import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Notificação de Lead
 * Cria lead no banco e envia emails de notificação
 */

Deno.serve(async (req) => {
  try {
    console.log('=== INICIANDO leadNotification ===');
    const base44 = createClientFromRequest(req);
    const data = await req.json();
    console.log('Dados recebidos (apenas nomes dos campos):', Object.keys(data || {}));

    // Validar dados obrigatórios
    if (!data.client_name || !data.client_email || !data.client_phone) {
      console.error('Validação falhou: dados obrigatórios ausentes');
      return Response.json({ 
        error: 'Nome, email e telefone são obrigatórios' 
      }, { status: 400 });
    }

    // Calcular lead score
    const leadScore = calculateLeadScore(data);
    console.log('Lead score calculado:', leadScore);

    // Criar lead no banco
    console.log('Criando lead no banco...');
    const lead = await base44.asServiceRole.entities.EventData.create({
      client_name: data.client_name,
      client_email: data.client_email,
      client_phone: data.client_phone,
      event_type: data.event_type || 'não especificado',
      event_date: data.event_date || null,
      budget_requested: data.budget_requested || 'a_combinar',
      message: data.message || '',
      conversion_status: 'pending',
      lead_score: leadScore,
      source: 'website'
    });

    console.log('Lead criado com ID:', lead.id);

    // Enviar email para equipe via Brevo
    console.log('Invocando sendEmailBrevo...');
    const emailResult = await base44.asServiceRole.functions.invoke('sendEmailBrevo', {
      subject: `🔥 Novo Lead: ${data.client_name} (Score: ${leadScore})`,
      body: `
        <h2>Novo Lead Recebido!</h2>
        <p><strong>Score:</strong> ${leadScore} ${leadScore >= 80 ? '🔥 HOT' : leadScore >= 60 ? '🌡️ WARM' : '❄️ COLD'}</p>
        
        <h3>Dados do Cliente:</h3>
        <ul>
          <li><strong>Nome:</strong> ${data.client_name}</li>
          <li><strong>Email:</strong> ${data.client_email}</li>
          <li><strong>Telefone:</strong> ${data.client_phone}</li>
        </ul>

        <h3>Detalhes do Evento:</h3>
        <ul>
          <li><strong>Tipo:</strong> ${data.event_type || 'Não especificado'}</li>
          <li><strong>Data:</strong> ${data.event_date || 'Não informada'}</li>
          <li><strong>Orçamento:</strong> ${data.budget_requested || 'A combinar'}</li>
        </ul>

        <p><strong>Mensagem:</strong></p>
        <p>${data.message || 'Sem mensagem adicional'}</p>

        <a href="https://wa.me/${data.client_phone.replace(/\D/g, '')}" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
          📱 Responder no WhatsApp
        </a>
      `
    });
    console.log('Email enviado via Brevo:', emailResult.data);

    // Enviar WhatsApp automaticamente (sem abrir interface)
    try {
      const whatsappText = `*Novo Lead - Toca Experience*

*👤 CONTATO:*
Nome: ${data.client_name}
Email: ${data.client_email}
Telefone: ${data.client_phone}

*🎉 EVENTO:*
Tipo: ${data.event_type || "Não especificado"}
Data: ${data.event_date || "Não informada"}
Orçamento: ${data.budget_requested || "A combinar"}

*💬 MENSAGEM:*
${data.message || "Sem mensagem"}

*📊 Score:* ${leadScore} ${leadScore >= 80 ? '🔥' : leadScore >= 60 ? '🌡️' : '❄️'}`;

      await base44.asServiceRole.functions.invoke('sendWhatsApp', {
        phone: '5521972824659',
        message: whatsappText
      });
    } catch (whatsappError) {
      console.warn("WhatsApp API não configurada:", whatsappError);
    }

    // Nota: Email de confirmação não é enviado ao cliente para evitar problemas com Brevo
    // O cliente receberá resposta via WhatsApp conforme processo definido

    // Criar registro de follow-up
    await base44.asServiceRole.entities.LeadFollowUp.create({
      lead_id: lead.id,
      status: 'contacted',
      last_contact_date: new Date().toISOString(),
      next_contact_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // +2h
      contact_attempts: 0,
      contact_channel: 'email',
      notes: 'Lead criado via website - email de confirmação enviado'
    });

    return Response.json({
      success: true,
      lead_id: lead.id,
      lead_score: leadScore,
      message: 'Lead criado e notificações enviadas'
    });

  } catch (error) {
    console.error('❌ ERRO CRÍTICO em leadNotification:', error);
    console.error('Stack trace:', error.stack);
    return Response.json({ 
      error: error.message,
      stack: error.stack,
      details: 'Erro detalhado no console do servidor'
    }, { status: 500 });
  }
});

function calculateLeadScore(data) {
  let score = 50;

  // Budget score
  const budgetScores = {
    'acima_50k': 30,
    '20k_50k': 25,
    '10k_20k': 20,
    '5k_10k': 10,
    'ate_5k': 5,
    'a_combinar': 15
  };
  score += budgetScores[data.budget_requested] || 10;

  // Event type score
  const eventScores = {
    'casamento': 20,
    'reveillon': 18,
    'festival': 15,
    'corporativo': 12,
    'festa_privada': 10
  };
  score += eventScores[data.event_type] || 8;

  // Has date = more serious
  if (data.event_date) score += 10;

  // Has detailed message
  if (data.message && data.message.length > 50) score += 5;

  return Math.min(score, 100);
}