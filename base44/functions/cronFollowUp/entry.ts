import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * CRON Job - Follow-up Automático
 * Executado a cada 5 minutos via GitHub Actions
 * 
 * Triggers:
 * - 1h: Email confirmação + WhatsApp
 * - 24h: Email case studies
 * - 72h: Email oferta 15%
 * - 7d: Email última chance 20%
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Buscar todos os leads pendentes
    const leads = await base44.asServiceRole.entities.EventData.filter({
      conversion_status: 'pending'
    });

    const now = new Date();
    const actions = [];
    const results = [];

    for (const lead of leads) {
      const createdDate = new Date(lead.created_date);
      const hoursSinceCreation = (now - createdDate) / (1000 * 60 * 60);

      try {
        // Trigger 1h: Confirmação
        if (hoursSinceCreation >= 1 && hoursSinceCreation < 1.1) {
          await sendConfirmationEmail(base44, lead);
          results.push({ lead_id: lead.id, action: 'confirmation', status: 'sent' });
        }

        // Trigger 24h: Case Studies
        if (hoursSinceCreation >= 24 && hoursSinceCreation < 24.1) {
          await sendCaseStudiesEmail(base44, lead);
          results.push({ lead_id: lead.id, action: 'case_studies', status: 'sent' });
        }

        // Trigger 72h: Oferta 15%
        if (hoursSinceCreation >= 72 && hoursSinceCreation < 72.1) {
          await sendOfferEmail(base44, lead, 15);
          results.push({ lead_id: lead.id, action: 'offer_15', status: 'sent' });
        }

        // Trigger 7 dias: Última chance 20%
        if (hoursSinceCreation >= 168 && hoursSinceCreation < 168.1) {
          await sendLastChanceEmail(base44, lead, 20);
          results.push({ lead_id: lead.id, action: 'last_chance', status: 'sent' });
        }
      } catch (error) {
        results.push({ 
          lead_id: lead.id, 
          action: 'error', 
          status: 'failed',
          error: error.message 
        });
      }
    }

    return Response.json({
      success: true,
      total_leads: leads.length,
      actions_executed: results.length,
      results
    });

  } catch (error) {
    console.error('Erro no CRON:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function sendConfirmationEmail(base44, lead) {
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: lead.client_email,
    subject: `✅ Proposta Recebida - Toca Experience`,
    body: `
      <h2>Olá ${lead.client_name || 'Cliente'}!</h2>
      <p>Recebemos sua solicitação para <strong>${lead.event_type}</strong>.</p>
      <p>Nossa equipe entrará em contato em até 2 horas.</p>
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

async function sendCaseStudiesEmail(base44, lead) {
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: lead.client_email,
    subject: `🎉 Veja Nossos Casos de Sucesso`,
    body: `
      <h2>Olá ${lead.client_name}!</h2>
      <h3>Casamento Marina & Pedro - Trancoso</h3>
      <p>"A Toca Experience transformou nosso casamento!"</p>
      <h3>Réveillon Caraíva - 500 pessoas</h3>
      <p>"Energia tropical incomparável!"</p>
      <a href="https://wa.me/5521972824659">Agendar Consulta</a>
    `
  });

  await base44.asServiceRole.entities.EmailSequence.create({
    lead_id: lead.id,
    sequence_step: 2,
    email_type: 'services',
    sent_date: new Date().toISOString(),
    status: 'sent'
  });
}

async function sendOfferEmail(base44, lead, discount) {
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: lead.client_email,
    subject: `🎁 Oferta Especial: ${discount}% de Desconto`,
    body: `
      <h2>${discount}% de Desconto!</h2>
      <p>Válido por 48h para seu ${lead.event_type}</p>
      <a href="https://wa.me/5521972824659">Garantir Desconto</a>
    `
  });

  await base44.asServiceRole.entities.EmailSequence.create({
    lead_id: lead.id,
    sequence_step: 4,
    email_type: 'offer',
    sent_date: new Date().toISOString(),
    status: 'sent'
  });
}

async function sendLastChanceEmail(base44, lead, discount) {
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: lead.client_email,
    subject: `⏰ Última Chance: ${discount}% OFF`,
    body: `
      <h2>Proposta Expira em 24h!</h2>
      <p>${discount}% de desconto - última oportunidade</p>
      <a href="https://wa.me/5521972824659">Confirmar Agora</a>
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