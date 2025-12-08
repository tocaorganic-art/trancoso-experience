import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Envia email usando Brevo (Sendinblue) API
 * Com retry automático e tratamento de erros
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const data = await req.json();

    // Validação
    if (!data.subject || !data.body) {
      return Response.json({ 
        error: 'Subject e body são obrigatórios' 
      }, { status: 400 });
    }

    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY não configurada');
    }

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
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        const result = await response.json();

        if (!response.ok) {
          console.error('Brevo API Error Response:', result);
          throw new Error(`Brevo API Error: ${result.message || response.statusText}`);
        }

        return result;
      } catch (error) {
        if (attempt < maxAttempts) {
          // Aguarda 5 segundos antes de tentar novamente
          await new Promise(resolve => setTimeout(resolve, 5000));
          return sendWithRetry(attempt + 1, maxAttempts);
        }
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