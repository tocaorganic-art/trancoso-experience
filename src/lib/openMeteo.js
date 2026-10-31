// Previsão do tempo de Trancoso via Open-Meteo (sem chave, CORS liberado).
// Cache de 30 min no localStorage; em erro ou timeout devolve null (a UI mostra estado vazio).
const TRANCOSO = { latitude: -16.5904, longitude: -39.096 };
const CACHE_KEY = "toca:clima-trancoso:v1";
export const CACHE_MS = 30 * 60 * 1000;
const TIMEOUT_MS = 8000;

export const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast" +
  `?latitude=${TRANCOSO.latitude}&longitude=${TRANCOSO.longitude}` +
  "&current=temperature_2m,weather_code,wind_speed_10m" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
  "&timezone=America%2FBahia&forecast_days=3";

const DESCRICAO_WMO = {
  0: "Céu limpo", 1: "Predomínio de sol", 2: "Parcialmente nublado", 3: "Nublado",
  45: "Neblina", 48: "Neblina", 51: "Garoa fraca", 53: "Garoa", 55: "Garoa forte",
  61: "Chuva fraca", 63: "Chuva", 65: "Chuva forte", 80: "Pancadas de chuva",
  81: "Pancadas de chuva", 82: "Pancadas fortes", 95: "Trovoadas", 96: "Trovoadas", 99: "Trovoadas",
};

export function descreverTempo(code) {
  return DESCRICAO_WMO[code] || "Tempo variável";
}

export function normalizarResposta(json) {
  if (!json?.current || !json?.daily?.time?.length) return null;
  return {
    atual: {
      temperatura: Math.round(json.current.temperature_2m),
      vento: Math.round(json.current.wind_speed_10m),
      codigo: json.current.weather_code,
    },
    dias: json.daily.time.map((data, i) => ({
      data,
      codigo: json.daily.weather_code[i],
      max: Math.round(json.daily.temperature_2m_max[i]),
      min: Math.round(json.daily.temperature_2m_min[i]),
      chuva: json.daily.precipitation_probability_max?.[i] ?? null,
    })),
  };
}

function lerCache(agora) {
  try {
    const salvo = JSON.parse(window.localStorage.getItem(CACHE_KEY) || "null");
    if (salvo && agora - salvo.em < CACHE_MS) return salvo.dados;
  } catch {
    // localStorage indisponível ou corrompido: segue sem cache
  }
  return null;
}

function gravarCache(dados, agora) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ em: agora, dados }));
  } catch {
    // sem espaço ou modo privado: ignora
  }
}

export async function buscarClimaTrancoso({ fetchFn = fetch, agora = Date.now() } = {}) {
  const emCache = lerCache(agora);
  if (emCache) return emCache;
  const controle = new AbortController();
  const timer = setTimeout(() => controle.abort(), TIMEOUT_MS);
  try {
    const resp = await fetchFn(OPEN_METEO_URL, { signal: controle.signal });
    if (!resp.ok) return null;
    const dados = normalizarResposta(await resp.json());
    if (dados) gravarCache(dados, agora);
    return dados;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
