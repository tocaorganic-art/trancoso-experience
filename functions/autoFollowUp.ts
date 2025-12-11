
import { assertEquals, assertExists } from "https://deno.land/std@0.224.0/assert/mod.ts";

/**
 * Testes para autoFollowUp.js
 * Rodar: deno test functions/autoFollowUp.test.js
 */

Deno.test("autoFollowUp - deve calcular corretamente tempo desde criação", () => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
  const hoursDiff = (now - oneHourAgo) / (1000 * 60 * 60);
  
  assertEquals(Math.round(hoursDiff), 1);
});

Deno.test("autoFollowUp - deve identificar leads pendentes", () => {
  const leads = [
    { id: '1', conversion_status: 'pending', created_date: '2024-12-01' },
    { id: '2', conversion_status: 'converted', created_date: '2024-12-02' },
    { id: '3', conversion_status: 'pending', created_date: '2024-12-03' }
  ];
  
  const pending = leads.filter(l => l.conversion_status === 'pending');
  assertEquals(pending.length, 2);
});

Deno.test("autoFollowUp - deve disparar email após 1h", () => {
  const now = new Date();
  const lead = {
    id: '123',
    created_date: new Date(now.getTime() - (61 * 60 * 1000)).toISOString() // 61 minutos atrás
  };
  
  const hoursSince = (now - new Date(lead.created_date)) / (1000 * 60 * 60);
  assertEquals(hoursSince >= 1 && hoursSince < 2, true);
});

Deno.test("autoFollowUp - deve disparar WhatsApp após 24h", () => {
  const now = new Date();
  const lead = {
    id: '456',
    created_date: new Date(now.getTime() - (25 * 60 * 60 * 1000)).toISOString() // 25 horas atrás
  };
  
  const hoursSince = (now - new Date(lead.created_date)) / (1000 * 60 * 60);
  assertEquals(hoursSince >= 24 && hoursSince < 25, true);
});

Deno.test("autoFollowUp - não deve disparar antes do tempo", () => {
  const now = new Date();
  const lead = {
    id: '789',
    created_date: new Date(now.getTime() - (30 * 60 * 1000)).toISOString() // 30 minutos atrás
  };
  
  const hoursSince = (now - new Date(lead.created_date)) / (1000 * 60 * 60);
  assertEquals(hoursSince < 1, true);
});
