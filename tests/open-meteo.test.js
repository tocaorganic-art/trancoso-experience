import { test } from 'node:test';
import assert from 'node:assert/strict';

const store = new Map();
globalThis.window = { localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) } };
const { buscarClimaTrancoso, CACHE_MS } = await import('../src/lib/openMeteo.js');

const resposta = {
  current: { temperature_2m: 29.5, weather_code: 0, wind_speed_10m: 18.9 },
  daily: { time: ['2026-10-31'], weather_code: [51], temperature_2m_max: [30.4], temperature_2m_min: [24.1], precipitation_probability_max: [20] },
};
const ok = () => Promise.resolve({ ok: true, json: () => Promise.resolve(resposta) });

test('erro de rede devolve null (estado vazio)', async () => {
  store.clear();
  assert.equal(await buscarClimaTrancoso({ fetchFn: () => Promise.reject(new Error('offline')) }), null);
});

test('HTTP de erro devolve null', async () => {
  store.clear();
  assert.equal(await buscarClimaTrancoso({ fetchFn: () => Promise.resolve({ ok: false }) }), null);
});

test('usa o cache por 30 min e busca de novo depois', async () => {
  store.clear();
  let chamadas = 0;
  const contar = () => { chamadas += 1; return ok(); };
  const t0 = 1_000_000;
  const d1 = await buscarClimaTrancoso({ fetchFn: contar, agora: t0 });
  assert.equal(d1.atual.temperatura, 30);
  await buscarClimaTrancoso({ fetchFn: contar, agora: t0 + CACHE_MS - 1 });
  assert.equal(chamadas, 1);
  await buscarClimaTrancoso({ fetchFn: contar, agora: t0 + CACHE_MS + 1 });
  assert.equal(chamadas, 2);
});
