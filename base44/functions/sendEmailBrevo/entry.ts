import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Envia email usando Brevo (Sendinblue) API
 * Com retry automático e tratamento de erros
 */

Deno.serve(async (req) => {
  try {
    console.log('=== INICIANDO sendEmailBrevo ===');
    const base44 = createClientFromRequest(req);
    const data = await req.json();
    console.log('Dados recebidos:', { subject: data.subject, hasBody: !!data.body });

    // Validação
    if (!data.subject || !data.body) {
      console.error('Validação falhou: subject ou body ausente');
      return Response.json({ 
        error: 'Subject e body são obrigatórios' 
      }, { status: 400 });
    }

    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY não encontrada no ambiente');
      throw new Error('BREVO_API_KEY não configurada');
    }
    console.log('BREVO_API_KEY configurada:', BREVO_API_KEY.substring(0, 10) + '...');

    // Configuração do email - sender SEMPRE fixo (não usar email do cliente)
    const emailPayload = {
      sender: {
        name: "Toca Experience",
        email: "contato@tocaexperience.com.br"
      },
      to: [{
        email: "eventos@tocaexperience.com.br"
      }],
      subject: data.subject,
      htmlContent: data.body
    };

    // Função de envio com retry
    const sendWithRetry = async (attempt = 1, maxAttempts = 3) => {
      try {
        console.log(`Tentativa ${attempt} de ${maxAttempts} - Enviando para Brevo...`);
        console.log('Payload:', JSON.stringify(emailPayload, null, 2));
        
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        console.log('Status da resposta:', response.status, response.statusText);
        
        const result = await response.json();
        console.log('Resultado completo:', result);

        if (!response.ok) {
          console.error('❌ Brevo API Error Response:', JSON.stringify(result, null, 2));
          throw new Error(`Brevo API Error (${response.status}): ${JSON.stringify(result)}`);
        }

        console.log('✅ Email enviado com sucesso!', result.messageId);
        return result;
      } catch (error) {
        console.error(`❌ Erro na tentativa ${attempt}:`, error.message);
        if (attempt < maxAttempts) {
          console.log(`Aguardando 5s antes da próxima tentativa...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
          return sendWithRetry(attempt + 1, maxAttempts);
        }
        console.error('❌ Todas as tentativas falharam');
        throw error;
      }
    };

    // Tenta enviar com retry
    const result = await sendWithRetry();

    return Response.json({
      success: true,
      messageId: result.messageId,
      message: 'Email enviado via Brevo com sucesso'
    });

  } catch (error) {
    console.error('Erro ao enviar email via Brevo:', error);
    console.error('Error details:', error.response?.data || error);
    
    // Notificar erro técnico (opcional)
    return Response.json({ 
      error: error.message,
      details: 'Falha ao enviar email após 3 tentativas',
      brevoError: error.response?.data
    }, { status: 500 });
  }
});