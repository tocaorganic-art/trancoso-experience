import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Sistema de Follow-up Automático
 * Executa ações baseadas no tempo desde o último contato
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Buscar leads pendentes
    const leads = await base44.asServiceRole.entities.EventData.filter({
      conversion_status: 'pending'
    });

    const actions = [];
    const now = new Date();

    for (const lead of leads) {
      const createdDate = new Date(lead.created_date);
      const hoursSinceCreated = (now - createdDate) / (1000 * 60 * 60);

      // 1 hora: Email de confirmação
      if (hoursSinceCreated >= 1 && hoursSinceCreated < 2) {
        actions.push(sendConfirmationEmail(base44, lead));
      }

      // 24 horas: Lembrança WhatsApp
      if (hoursSinceCreated >= 24 && hoursSinceCreated < 25) {
        actions.push(scheduleWhatsAppReminder(base44, lead));
      }

      // 72 horas: Email com case studies
      if (hoursSinceCreated >= 72 && hoursSinceCreated < 73) {
        actions.push(sendCaseStudiesEmail(base44, lead));
      }

      // 7 dias: Oferta especial
      if (hoursSinceCreated >= 168 && hoursSinceCreated < 169) {
        actions.push(sendSpecialOfferEmail(base44, lead));
      }
    }

    await Promise.all(actions);

    return Response.json({
      success: true,
      actions_executed: actions.length,
      message: `${actions.length} ações de follow-up executadas`
    });
  } catch (error) {
    console.error('Erro no auto follow-up:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function sendConfirmationEmail(base44, lead) {
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: lead.client_email,
    subject: '✅ Cotação Recebida - Toca Experience',
    body: `
      <h2>Olá ${lead.client_name || 'Cliente'}!</h2>
      <p>Recebemos sua solicitação de cotação para <strong>${lead.event_type}</strong>.</p>
      <p>Nossa equipe está analisando e entrará em contato em breve com uma proposta personalizada.</p>
      <p><strong>Próximos passos:</strong></p>
      <ul>
        <li>Análise das suas necessidades (hoje)</li>
        <li>Envio da proposta detalhada (até 24h)</li>
        <li>Alinhamento de detalhes (após aprovação)</li>
      </ul>
      <p>Qualquer dúvida, estamos à disposição!</p>
      <p>WhatsApp: (21) 97282-4659</p>
    `
  });

  await base44.asServiceRole.entities.EmailSequence.create({
    lead_id: lead.id,
    sequence_step: 1,
    email_type: 'confirmation',
    sent_date: new Date().toISOString(),
    status: 'sent'
  });
}

async function scheduleWhatsAppReminder(base44, lead) {
  // Criar registro de follow-up
  await base44.asServiceRole.entities.LeadFollowUp.create({
    lead_id: lead.id,
    status: 'contacted',
    last_contact_date: new Date().toISOString(),
    next_contact_date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    contact_attempts: 1,
    contact_channel: 'whatsapp',
    notes: 'Lembrete automático via WhatsApp agendado'
  });
}

async function sendCaseStudiesEmail(base44, lead) {
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: lead.client_email,
    subject: '🎉 Cases de Sucesso - Toca Experience',
    body: `
      <h2>Olá ${lead.client_name}!</h2>
      <p>Queremos compartilhar alguns dos nossos eventos mais marcantes:</p>
      
      <h3>🎊 Casamento em Trancoso - 200 convidados</h3>
      <p>"A Toca Experience transformou nosso casamento em algo mágico. A energia da música foi perfeita!" - Marina & Pedro</p>
      
      <h3>🎆 Réveillon Caraíva - 500 pessoas</h3>
      <p>"Desde 2015 acompanho o Tony. A excelência artística e energia tropical são incomparáveis." - Carlos R.</p>
      
      <h3>🌅 Festival AWÊ - Arraial</h3>
      <p>"A fusão entre elementos eletrônicos e brasilidades criou uma atmosfera única!" - Amanda L.</p>
      
      <p><strong>Pronto para criar sua experiência inesquecível?</strong></p>
      <p><a href="https://wa.me/5521972824659">Vamos conversar no WhatsApp</a></p>
    `
  });

  await base44.asServiceRole.entities.EmailSequence.create({
    lead_id: lead.id,
    sequence_step: 3,
    email_type: 'testimonials',
    sent_date: new Date().toISOString(),
    status: 'sent'
  });
}

async function sendSpecialOfferEmail(base44, lead) {
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: lead.client_email,
    subject: '⏰ Oferta Especial para seu Evento - Toca Experience',
    body: `
      <h2>Olá ${lead.client_name}!</h2>
      <p>Temos uma <strong>oferta especial</strong> para seu ${lead.event_type}!</p>
      
      <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3 style="color: #667eea;">🎁 10% de desconto</h3>
        <p>Válido para reservas confirmadas até 7 dias.</p>
      </div>
      
      <p><strong>O que está incluído:</strong></p>
      <ul>
        <li>DJ set profissional (4-6 horas)</li>
        <li>Equipamentos Pioneer de última geração</li>
        <li>Playlist personalizada</li>
        <li>Suporte técnico completo</li>
      </ul>
      
      <p>Esta é sua última chance de garantir essa condição especial!</p>
      <p><a href="https://wa.me/5521972824659" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Garantir Desconto Agora</a></p>
    `
  });

  await base44.asServiceRole.entities.EmailSequence.create({
    lead_id: lead.id,
    sequence_step: 5,
    email_type: 'last_chance',
    sent_date: new Date().toISOString(),
    status: 'sent'
  });
}