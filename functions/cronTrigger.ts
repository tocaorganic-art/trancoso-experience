import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Endpoint de Cron - Triggers Automáticos
 * Executar a cada 1h via GitHub Actions ou serviço externo
 * URL: POST /api/cronTrigger
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const now = new Date();
    const results = {
      emails_sent: 0,
      whatsapp_scheduled: 0,
      leads_updated: 0,
      errors: []
    };

    // Buscar todos os leads pendentes ou em follow-up
    const leads = await base44.asServiceRole.entities.EventData.list();
    
    for (const lead of leads) {
      try {
        const createdDate = new Date(lead.created_date);
        const hoursSince = (now - createdDate) / (1000 * 60 * 60);

        // TRIGGER 1h - Email Confirmação
        if (hoursSince >= 1 && hoursSince < 2) {
          const existing = await base44.asServiceRole.entities.EmailSequence.filter({
            lead_id: lead.id,
            email_type: 'confirmation'
          });

          if (existing.length === 0) {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to: lead.client_email,
              subject: `✅ Recebemos sua proposta, ${lead.client_name}!`,
              body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Olá ${lead.client_name}!</h2>
                  <p>Recebemos sua solicitação para <strong>${lead.event_type}</strong>.</p>
                  <p>Nossa equipe entrará em contato em até 2 horas.</p>
                  <a href="https://wa.me/5521972824659" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                    💬 WhatsApp
                  </a>
                </div>
              `
            });

            await base44.asServiceRole.entities.EmailSequence.create({
              lead_id: lead.id,
              sequence_step: 1,
              email_type: 'confirmation',
              sent_date: now.toISOString(),
              status: 'sent'
            });

            results.emails_sent++;
          }
        }

        // TRIGGER 24h - Email Case Studies
        if (hoursSince >= 24 && hoursSince < 25) {
          const existing = await base44.asServiceRole.entities.EmailSequence.filter({
            lead_id: lead.id,
            email_type: 'services'
          });

          if (existing.length === 0) {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to: lead.client_email,
              subject: `🎉 Veja como transformamos eventos em Trancoso`,
              body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Olá ${lead.client_name}!</h2>
                  <h3>Nossos Cases de Sucesso:</h3>
                  <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <h4>🎊 Casamento Marina & Pedro - Trancoso</h4>
                    <p>"A Toca Experience transformou nosso casamento em algo mágico!"</p>
                  </div>
                  <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <h4>🎆 Réveillon Caraíva - 500 pessoas</h4>
                    <p>"Excelência artística e energia tropical incomparáveis!"</p>
                  </div>
                  <a href="https://wa.me/5521972824659">Fale conosco no WhatsApp</a>
                </div>
              `
            });

            await base44.asServiceRole.entities.EmailSequence.create({
              lead_id: lead.id,
              sequence_step: 2,
              email_type: 'services',
              sent_date: now.toISOString(),
              status: 'sent'
            });

            results.emails_sent++;
          }
        }

        // TRIGGER 72h - Email Oferta
        if (hoursSince >= 72 && hoursSince < 73) {
          const existing = await base44.asServiceRole.entities.EmailSequence.filter({
            lead_id: lead.id,
            email_type: 'offer'
          });

          if (existing.length === 0) {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to: lead.client_email,
              subject: `🎁 Oferta Especial: 15% de Desconto`,
              body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Olá ${lead.client_name}!</h2>
                  <h3 style="color: #667eea;">🎁 Oferta Exclusiva para Você!</h3>
                  <p>15% de desconto para confirmação nas próximas 48h.</p>
                  <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
                    <h2 style="margin: 0;">15% OFF</h2>
                    <p style="margin: 5px 0;">Válido por 48 horas</p>
                  </div>
                  <a href="https://wa.me/5521972824659" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                    Garantir Desconto
                  </a>
                </div>
              `
            });

            await base44.asServiceRole.entities.EmailSequence.create({
              lead_id: lead.id,
              sequence_step: 4,
              email_type: 'offer',
              sent_date: now.toISOString(),
              status: 'sent'
            });

            results.emails_sent++;
          }
        }

        // TRIGGER 7 dias - Última Chance
        if (hoursSince >= 168 && hoursSince < 169) {
          const existing = await base44.asServiceRole.entities.EmailSequence.filter({
            lead_id: lead.id,
            email_type: 'last_chance'
          });

          if (existing.length === 0) {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to: lead.client_email,
              subject: `⏰ ÚLTIMA CHANCE: 20% de Desconto Expira em 24h`,
              body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #d32f2f;">⏰ ${lead.client_name}, essa é sua última chance!</h2>
                  <div style="background: #ffebee; border-left: 4px solid #d32f2f; padding: 20px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Oferta expira em 24 horas</h3>
                    <p style="font-size: 24px; font-weight: bold; color: #d32f2f; margin: 10px 0;">20% DE DESCONTO</p>
                    <p>Não perca esta oportunidade única!</p>
                  </div>
                  <a href="https://wa.me/5521972824659" style="display: inline-block; background: #d32f2f; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    CONFIRMAR AGORA
                  </a>
                </div>
              `
            });

            await base44.asServiceRole.entities.EmailSequence.create({
              lead_id: lead.id,
              sequence_step: 5,
              email_type: 'last_chance',
              sent_date: now.toISOString(),
              status: 'sent'
            });

            results.emails_sent++;
          }
        }

      } catch (error) {
        results.errors.push({
          lead_id: lead.id,
          error: error.message
        });
      }
    }

    return Response.json({
      success: true,
      timestamp: now.toISOString(),
      results: results,
      message: `Cron executado: ${results.emails_sent} emails enviados, ${results.errors.length} erros`
    });

  } catch (error) {
    console.error('Erro no cron trigger:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});