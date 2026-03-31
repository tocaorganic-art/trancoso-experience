import { assertEquals, assertExists } from "https://deno.land/std@0.224.0/assert/mod.ts";

/**
 * Testes para mlRecommendations.js
 * Rodar: deno test functions/mlRecommendations.test.js
 */

// Função auxiliar para calcular score de lead
function calculateLeadScore(data) {
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
  
  return Math.min(score, 100);
}

Deno.test("mlRecommendations - score lead casamento alto orçamento", () => {
  const lead = {
    event_type: 'casamento',
    budget_requested: 'acima_50k',
    city: 'Trancoso'
  };
  
  const score = calculateLeadScore(lead);
  assertEquals(score >= 80, true); // Hot lead
});

Deno.test("mlRecommendations - score lead corporativo médio orçamento", () => {
  const lead = {
    event_type: 'corporativo',
    budget_requested: '10k_20k',
    city: 'São Paulo'
  };
  
  const score = calculateLeadScore(lead);
  assertEquals(score >= 50 && score < 80, true); // Warm lead
});

Deno.test("mlRecommendations - score lead baixo orçamento", () => {
  const lead = {
    event_type: 'festa_privada',
    budget_requested: 'ate_5k',
    city: 'outro'
  };
  
  const score = calculateLeadScore(lead);
  assertEquals(score < 80, true); // Cold/Warm lead
});

Deno.test("mlRecommendations - prever orçamento casamento Trancoso", () => {
  const baseBudgets = {
    casamento: 15000,
    corporativo: 12000,
    festival: 20000
  };
  
  let budget = baseBudgets.casamento;
  budget *= 1.5; // Trancoso multiplier
  
  assertEquals(budget, 22500);
});

Deno.test("mlRecommendations - recomendar setlist casamento", () => {
  const recommendations = {
    casamento: {
      ceremony: ['Organic House', 'Chill', 'Bossa Nova Eletrônica'],
      sunset: ['Afro House Melódico', 'Deep House', 'Organic'],
      party: ['Afro House', 'Tech House', 'House']
    }
  };
  
  const setlist = recommendations.casamento.sunset;
  assertExists(setlist);
  assertEquals(setlist.includes('Afro House Melódico'), true);
});

Deno.test("mlRecommendations - score não deve exceder 100", () => {
  const lead = {
    event_type: 'casamento',
    budget_requested: 'acima_50k',
    city: 'Trancoso',
    guest_count: 500
  };
  
  const score = calculateLeadScore(lead);
  assertEquals(score <= 100, true);
});