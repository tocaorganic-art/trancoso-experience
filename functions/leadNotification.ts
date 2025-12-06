import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Notificação automática de novos leads
 * Envia email quando um novo lead é registrado
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { leadData } = await req.json();

    // Enviar notificação por email
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "tocaorganic@gmail.com",
      subject: `🎯 Novo Lead: ${leadData.event_type || 'Evento'} - ${leadData.client_name || leadData.client_email}`,
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎉 Novo Lead Recebido!</h1>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #333;">Informações do Cliente</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Nome:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${leadData.client_name || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${leadData.client_email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Telefone:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${leadData.client_phone || 'Não informado'}</td>
              </tr>
            </table>

            <h2 style="color: #333; margin-top: 20px;">Detalhes do Evento</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Tipo:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${leadData.event_type || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Data:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${leadData.event_date || 'Não informada'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Local:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${leadData.city || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Convidados:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${leadData.guest_count || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Orçamento:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${leadData.budget_requested || 'Não informado'}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 15px; background: #fff; border-left: 4px solid #667eea;">
              <p style="margin: 0; color: #666;">
                <strong>Ação Requerida:</strong> Entre em contato em até 2 horas para maximizar conversão!
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://wa.me/${leadData.client_phone?.replace(/\D/g, '')}" 
                 style="display: inline-block; padding: 12px 30px; background: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                📱 Contatar via WhatsApp
              </a>
            </div>
          </div>

          <div style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
            <p>Toca Experience - Sistema de Gestão de Leads</p>
          </div>
        </div>
      `
    });

    return Response.json({ 
      success: true, 
      message: 'Notificação enviada com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
});