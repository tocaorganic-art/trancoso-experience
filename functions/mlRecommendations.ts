import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * Sistema de Recomendações com ML
 * Prevê orçamento e recomenda serviços baseado em histórico
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { action, data } = await req.json();

    let result;

    switch (action) {
      case 'predict_budget':
        result = await predictBudget(base44, data);
        break;
      case 'recommend_setlist':
        result = recommendSetlist(data);
        break;
      case 'score_lead':
        result = scoreLead(data);
        break;
      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    return Response.json(result);
  } catch (error) {
    console.error('Erro em ML recommendations:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function predictBudget(base44, data) {
  const { event_type, city, guest_count, duration_hours } = data;

  const historicalEvents = await base44.asServiceRole.entities.EventData.filter({
    event_type,
    conversion_status: 'converted'
  });

  if (historicalEvents.length === 0) {
    return useFallbackBudget(event_type, city, guest_count);
  }

  const budgets = historicalEvents
    .filter(e => e.budget_final)
    .map(e => e.budget_final);

  const avg = budgets.reduce((a, b) => a + b, 0) / budgets.length;
  const stdDev = Math.sqrt(
    budgets.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / budgets.length
  );

  let prediction = avg;
  if (guest_count > 200) prediction *= 1.3;
  if (duration_hours > 6) prediction *= 1.2;
  if (city === 'trancoso' || city === 'Trancoso') prediction *= 1.5;

  return {
    predicted_budget: Math.round(prediction),
    range_min: Math.round(prediction - stdDev),
    range_max: Math.round(prediction + stdDev),
    confidence: budgets.length > 10 ? 'high' : 'medium',
    sample_size: budgets.length
  };
}

function useFallbackBudget(event_type, city, guest_count) {
  const basePrices = {
    casamento: 15000,
    corporativo: 12000,
    festa_privada: 8000,
    festival: 20000,
    reveillon: 30000
  };

  let base = basePrices[event_type] || 10000;
  if (guest_count > 200) base *= 1.5;
  if (city === 'trancoso') base *= 1.5;

  return {
    predicted_budget: base,
    range_min: Math.round(base * 0.8),
    range_max: Math.round(base * 1.2),
    confidence: 'low',
    sample_size: 0
  };
}

function recommendSetlist(data) {
  const { event_type, atmosphere, music_preference } = data;

  const recommendations = {
    casamento: {
      ceremony: ['Organic House', 'Chill', 'Bossa Nova Eletrônica'],
      sunset: ['Afro House Melódico', 'Deep House', 'Organic'],
      party: ['Afro House', 'Tech House', 'House']
    },
    corporativo: {
      networking: ['Deep House', 'Lounge', 'Nu Jazz'],
      party: ['House', 'Tech House', 'Afro House']
    },
    festival: ['Afro House', 'Tech House', 'Progressive House', 'Tribal'],
    reveillon: ['Afro House High Energy', 'Tech House', 'Brazilian Bass']
  };

  const setlist = recommendations[event_type] || recommendations.festival;

  return {
    recommended_styles: Array.isArray(setlist) ? setlist : setlist.party,
    reasoning: `Baseado em ${event_type} com atmosfera ${atmosphere || 'festiva'}`,
    confidence_score: 0.85,
    alternative_styles: ['Deep House', 'Melodic Techno', 'Organic House']
  };
}

function scoreLead(data) {
  let score = 50;

  const budgetScores = {
    'acima_50k': 30,
    '20k_50k': 25,
    '10k_20k': 20,
    '5k_10k': 10,
    'ate_5k': 5,
    'a_combinar': 15
  };
  score += budgetScores[data.budget_requested] || 10;

  const eventScores = {
    casamento: 20,
    reveillon: 18,
    festival: 15,
    corporativo: 12,
    festa_privada: 10
  };
  score += eventScores[data.event_type] || 8;

  if (data.city === 'Trancoso' || data.city === 'trancoso') score += 15;
  else if (data.city === 'Caraíva' || data.city === 'Arraial d\'Ajuda') score += 12;
  else if (data.city === 'São Paulo' || data.city === 'Rio de Janeiro') score += 10;
  else score += 5;

  if (data.guest_count > 300) score += 10;
  else if (data.guest_count > 150) score += 8;
  else if (data.guest_count > 50) score += 5;
  else score += 2;

  if (data.event_date) {
    const daysUntilEvent = (new Date(data.event_date) - new Date()) / (1000 * 60 * 60 * 24);
    if (daysUntilEvent < 30) score += 10;
    else if (daysUntilEvent < 60) score += 7;
    else if (daysUntilEvent < 90) score += 5;
    else score += 3;
  }

  if (data.client_phone) score += 5;
  if (data.music_preference) score += 5;
  if (data.notes && data.notes.length > 50) score += 5;

  score = Math.min(score, 100);

  let priority, action;
  if (score >= 80) {
    priority = 'hot';
    action = 'Contatar IMEDIATAMENTE via WhatsApp';
  } else if (score >= 60) {
    priority = 'warm';
    action = 'Enviar proposta em até 24h';
  } else {
    priority = 'cold';
    action = 'Incluir em sequência de email marketing';
  }

  return {
    lead_score: score,
    priority,
    recommended_action: action,
    breakdown: {
      budget: budgetScores[data.budget_requested] || 10,
      event_type: eventScores[data.event_type] || 8,
      urgency: score >= 80 ? 10 : 5
    }
  };
}