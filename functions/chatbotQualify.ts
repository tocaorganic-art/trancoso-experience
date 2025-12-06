import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Qualificação de Leads via Chatbot
 * Analisa conversa e cria lead qualificado
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { messages, userInfo } = await req.json();

    if (!messages || messages.length === 0) {
      return Response.json({ error: 'Mensagens são obrigatórias' }, { status: 400 });
    }

    // Analisar conversa com IA
    const conversationText = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    
    const analysis = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `Analise esta conversa de chatbot e extraia informações de lead:

${conversationText}

Retorne JSON com:
- qualified (boolean): se é um lead qualificado
- client_name (string): nome do cliente se mencionado
- client_email (string): email se mencionado
- client_phone (string): telefone se mencionado
- event_type (string): tipo de evento mencionado
- budget_estimate (string): estimativa de orçamento
- intent_score (number 0-100): nível de intenção de compra
- summary (string): resumo da conversa
- next_action (string): próxima ação recomendada`,
      response_json_schema: {
        type: "object",
        properties: {
          qualified: { type: "boolean" },
          client_name: { type: "string" },
          client_email: { type: "string" },
          client_phone: { type: "string" },
          event_type: { type: "string" },
          budget_estimate: { type: "string" },
          intent_score: { type: "number" },
          summary: { type: "string" },
          next_action: { type: "string" }
        }
      }
    });

    // Se qualificado, criar lead
    if (analysis.qualified && analysis.intent_score >= 60) {
      const leadData = {
        client_name: analysis.client_name || userInfo?.name || 'Lead via Chatbot',
        client_email: analysis.client_email || userInfo?.email || '',
        client_phone: analysis.client_phone || userInfo?.phone || '',
        event_type: analysis.event_type || 'chatbot_inquiry',
        budget_requested: analysis.budget_estimate || 'a_combinar',
        message: analysis.summary,
        conversion_status: 'pending',
        lead_score: analysis.intent_score,
        source: 'chatbot'
      };

      const lead = await base44.asServiceRole.entities.EventData.create(leadData);

      // Enviar notificação para equipe
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: 'tocaorganic@gmail.com',
        subject: `🤖 Lead Qualificado via Chatbot (Score: ${analysis.intent_score})`,
        body: `
          <h2>Lead Qualificado via Chatbot!</h2>
          <p><strong>Score de Intenção:</strong> ${analysis.intent_score}/100</p>
          
          <h3>Informações:</h3>
          <ul>
            <li><strong>Nome:</strong> ${leadData.client_name}</li>
            <li><strong>Email:</strong> ${leadData.client_email || 'Não fornecido'}</li>
            <li><strong>Telefone:</strong> ${leadData.client_phone || 'Não fornecido'}</li>
            <li><strong>Evento:</strong> ${leadData.event_type}</li>
          </ul>

          <h3>Resumo da Conversa:</h3>
          <p>${analysis.summary}</p>

          <h3>Próxima Ação Recomendada:</h3>
          <p>${analysis.next_action}</p>

          <a href="https://wa.me/${leadData.client_phone?.replace(/\D/g, '')}" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
            📱 Contatar no WhatsApp
          </a>
        `
      });

      return Response.json({
        success: true,
        qualified: true,
        lead_id: lead.id,
        analysis,
        message: 'Lead qualificado e criado com sucesso'
      });
    }

    return Response.json({
      success: true,
      qualified: false,
      analysis,
      message: 'Conversa analisada - não qualificado ainda'
    });

  } catch (error) {
    console.error('Erro em chatbotQualify:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});