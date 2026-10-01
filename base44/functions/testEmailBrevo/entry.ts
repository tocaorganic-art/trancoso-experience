import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Teste simples do Brevo - apenas envia um email fixo
 */

Deno.serve(async (req) => {
  try {
    console.log('=== TESTE BREVO INICIADO ===');
    
    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    console.log('BREVO_API_KEY existe?', !!BREVO_API_KEY);

    const emailPayload = {
      sender: {
        name: "Toca Experience",
        email: "contato@tocaexperience.com.br"
      },
      to: [{
        email: "eventos@tocaexperience.com.br"
      }],
      subject: "Teste Email Brevo",
      htmlContent: "<h1>Email de teste</h1><p>Se você está lendo isso, o Brevo está funcionando!</p>"
    };

    console.log('Enviando e-mail de teste:', { subject: emailPayload.subject });

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    console.log('Status:', response.status);
    const result = await response.json();
    console.log('Resultado:', JSON.stringify(result, null, 2));

    if (!response.ok) {
      return Response.json({
        error: 'Brevo API Error',
        status: response.status,
        details: result
      }, { status: 500 });
    }

    return Response.json({
      success: true,
      messageId: result.messageId,
      result: result
    });

  } catch (error) {
    console.error('ERRO:', error);
    return Response.json({ 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
});