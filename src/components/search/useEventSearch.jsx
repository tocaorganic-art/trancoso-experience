import { useState, useEffect } from "react";
import { events2026, normalizeText, calculateRelevance } from "./events2026";

/**
 * Hook para busca inteligente de eventos sem IA paga
 * Implementa busca full-text com algoritmo de relevância local
 */
export function useEventSearch(searchQuery) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Não buscar se query muito curta
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce de 250ms
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = (query) => {
    const normalizedQuery = normalizeText(query);
    const tokens = normalizedQuery.split(/\s+/).filter(t => t.length > 0);

    // Regras especiais para linguagem natural
    const specialRules = detectSpecialRules(query, tokens);

    let filteredEvents = [...events2026];

    // Aplicar filtros especiais se detectados
    if (specialRules.region) {
      filteredEvents = filteredEvents.filter(e => 
        normalizeText(e.region).includes(normalizeText(specialRules.region))
      );
    }

    if (specialRules.dateFilter) {
      filteredEvents = filteredEvents.filter(e => 
        matchDateFilter(e.date, specialRules.dateFilter)
      );
    }

    if (specialRules.isReveillon) {
      filteredEvents = filteredEvents.filter(e => 
        e.tags.some(tag => normalizeText(tag).includes("reveillon"))
      );
    }

    if (specialRules.hasOpenBar) {
      filteredEvents = filteredEvents.filter(e => 
        e.tags.some(tag => normalizeText(tag).includes("open bar"))
      );
    }

    // Calcular relevância para cada evento
    const scoredEvents = filteredEvents.map(event => ({
      ...event,
      relevanceScore: calculateRelevance(event, tokens)
    }));

    // Filtrar apenas eventos com score > 0
    const relevantEvents = scoredEvents.filter(e => e.relevanceScore > 0);

    // Ordenar por relevância DESC, depois por data ASC
    relevantEvents.sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return new Date(a.date) - new Date(b.date);
    });

    setResults(relevantEvents);
    setIsSearching(false);
  };

  return { results, isSearching };
}

/**
 * Detecta regras especiais na query de busca
 */
function detectSpecialRules(originalQuery, tokens) {
  const normalized = normalizeText(originalQuery);
  const rules = {
    region: null,
    dateFilter: null,
    isReveillon: false,
    hasOpenBar: false
  };

  // Detectar regiões
  if (normalized.includes("trancoso")) rules.region = "Trancoso";
  if (normalized.includes("caraiva")) rules.region = "Caraíva";
  if (normalized.includes("arraial")) rules.region = "Arraial d'Ajuda";

  // Detectar datas especiais
  if (normalized.includes("hoje")) {
    rules.dateFilter = "today";
  } else if (normalized.includes("amanha")) {
    rules.dateFilter = "tomorrow";
  } else if (normalized.includes("fim de ano") || normalized.includes("reveillon")) {
    rules.dateFilter = "newYear";
    rules.isReveillon = true;
  }

  // Detectar open bar
  if (normalized.includes("open bar")) {
    rules.hasOpenBar = true;
  }

  return rules;
}

/**
 * Verifica se data do evento corresponde ao filtro
 */
function matchDateFilter(eventDate, filter) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const eventDateObj = new Date(eventDate);

  switch (filter) {
    case "today":
      return eventDateObj.getTime() === today.getTime();
    
    case "tomorrow":
      return eventDateObj.getTime() === tomorrow.getTime();
    
    case "newYear":
      // Entre 26/12/2025 e 02/01/2026
      const startNewYear = new Date("2025-12-26");
      const endNewYear = new Date("2026-01-02");
      return eventDateObj >= startNewYear && eventDateObj <= endNewYear;
    
    default:
      return true;
  }
}