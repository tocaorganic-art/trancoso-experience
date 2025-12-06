import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * AI-Powered Quotation Function
 * Usa LLM para processar cotações e fornecer recomendações inteligentes
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { formData, action } = await req.json();

    // Carregar knowledge base
    const knowledgeBase = await loadKnowledgeBase();

    let response;

    switch (action) {
      case 'analyze_quotation':
        response = await analyzeQuotation(base44, formData, knowledgeBase);
        break;
      
      case 'recommend_services':
        response = await recommendServices(base44, formData, knowledgeBase);
        break;
      
      case 'estimate_price':
        response = await estimatePrice(base44, formData, knowledgeBase);
        break;
      
      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    return Response.json(response);
  } catch (error) {
    console.error('Error in aiQuotation:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function loadKnowledgeBase() {
  // Em produção, carregar de arquivo ou database
  // Por enquanto, retornar estrutura básica
  return {
    services: {
      dj_sets: { price_range: [5000, 50000] },
      sound_rental: { price_range: [2000, 10000] }
    },
    locations: {
      trancoso: { premium_multiplier: 1.5 },
      caraiva: { premium_multiplier: 1.3 },
      arraial: { premium_multiplier: 1.2 }
    }
  };
}

async function analyzeQuotation(base44, formData, knowledge) {
  const prompt = `Você é um assistente especializado em eventos com DJs em Trancoso, Caraíva e Arraial d'Ajuda.

Analise a seguinte cotação e forneça recomendações:

**Dados do Cliente:**
- Nome: ${formData.nome}
- Tipo de Evento: ${formData.tipoEvento}
- Data: ${formData.data}
- Local: ${formData.local || 'Não especificado'}
- Número de Convidados: ${formData.numeroConvidados || 'Não especificado'}
- Orçamento: ${formData.orcamento || 'Não especificado'}
- Estilos Musicais: ${formData.estilMusical?.join(', ') || 'Não especificado'}
- Atmosfera: ${formData.atmosfera || 'Não especificado'}

Forneça:
1. Análise do perfil do evento
2. Recomendações de serviços
3. Sugestões de melhorias
4. Próximos passos

Seja conciso e profissional.`;

  const result = await base44.integrations.Core.InvokeLLM({
    prompt,
    response_json_schema: {
      type: "object",
      properties: {
        event_profile: { type: "string" },
        recommended_services: { type: "array", items: { type: "string" } },
        suggestions: { type: "array", items: { type: "string" } },
        next_steps: { type: "array", items: { type: "string" } }
      }
    }
  });

  return result;
}

async function recommendServices(base44, formData, knowledge) {
  const prompt = `Com base nos dados do evento, recomende serviços específicos:

Tipo de Evento: ${formData.tipoEvento}
Convidados: ${formData.numeroConvidados}
Local: ${formData.localidade}
Orçamento: ${formData.orcamento}

Recomende:
- Pacote de DJ (horas, equipamento)
- Sistema de som adequado
- Iluminação (sim/não)
- Serviços adicionais

Seja específico e justifique cada recomendação.`;

  const result = await base44.integrations.Core.InvokeLLM({
    prompt,
    response_json_schema: {
      type: "object",
      properties: {
        dj_package: { type: "string" },
        sound_system: { type: "string" },
        lighting: { type: "string" },
        additional_services: { type: "array", items: { type: "string" } },
        justification: { type: "string" }
      }
    }
  });

  return result;
}

async function estimatePrice(base44, formData, knowledge) {
  // Lógica simplificada de estimativa de preço
  let basePrice = 8000;
  
  // Multiplicadores
  if (formData.numeroConvidados > 200) basePrice *= 1.5;
  if (formData.duracao > 5) basePrice *= 1.3;
  if (formData.localidade === 'trancoso') basePrice *= 1.5;
  if (formData.tipoEvento === 'casamento') basePrice *= 1.2;
  
  const estimated_min = Math.round(basePrice * 0.8);
  const estimated_max = Math.round(basePrice * 1.2);

  return {
    estimated_range: `R$ ${estimated_min.toLocaleString('pt-BR')} - R$ ${estimated_max.toLocaleString('pt-BR')}`,
    breakdown: {
      base_service: 'DJ Set 4-6 horas',
      location_premium: formData.localidade === 'trancoso' ? '+50%' : 'Standard',
      event_complexity: formData.numeroConvidados > 200 ? 'Alta' : 'Média'
    },
    note: 'Estimativa preliminar. Cotação final enviada via WhatsApp.'
  };
}