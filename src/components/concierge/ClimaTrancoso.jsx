import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CloudSun } from "lucide-react";
import { buscarClimaTrancoso, descreverTempo, CACHE_MS } from "@/lib/openMeteo";

function rotuloDia(data, i) {
  if (i === 0) return "Hoje";
  if (i === 1) return "Amanhã";
  const nome = new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "long" });
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

export default function ClimaTrancoso() {
  const { data, isLoading } = useQuery({
    queryKey: ["clima-trancoso"],
    queryFn: () => buscarClimaTrancoso(),
    staleTime: CACHE_MS,
    retry: false,
  });

  return (
    <section aria-labelledby="clima-trancoso" className="py-12" style={{ backgroundColor: "var(--ds-color-bg)" }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div
          className="border p-6 sm:p-8"
          style={{ backgroundColor: "var(--ds-color-surface)", borderColor: "var(--ds-color-border)", borderRadius: "var(--ds-radius-lg)" }}
        >
          <h2
            id="clima-trancoso"
            className="flex items-center gap-2 font-medium"
            style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-2xl)", color: "var(--ds-color-text)" }}
          >
            <CloudSun className="h-6 w-6" aria-hidden="true" />
            Tempo em Trancoso
          </h2>

          {isLoading && (
            <p className="mt-4 text-sm" style={{ color: "var(--ds-color-text-muted)" }} data-testid="clima-carregando">
              Carregando a previsão...
            </p>
          )}

          {!isLoading && !data && (
            <p className="mt-4 text-sm" style={{ color: "var(--ds-color-text-muted)" }} data-testid="clima-vazio">
              A previsão do tempo está indisponível no momento. Nosso concierge confirma as condições antes de cada experiência.
            </p>
          )}

          {!isLoading && data && (
            <div data-testid="clima-ok">
              <p className="mt-4" style={{ color: "var(--ds-color-text)" }}>
                Agora: <strong>{data.atual.temperatura}°C</strong>, {descreverTempo(data.atual.codigo).toLowerCase()}, vento de {data.atual.vento} km/h.
              </p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                {data.dias.map((dia, i) => (
                  <li key={dia.data} className="border p-4" style={{ borderColor: "var(--ds-color-border)", borderRadius: "var(--ds-radius-md)" }}>
                    <p className="text-sm font-semibold" style={{ color: "var(--ds-color-text)" }}>{rotuloDia(dia.data, i)}</p>
                    <p className="mt-1 text-sm" style={{ color: "var(--ds-color-text-muted)" }}>{descreverTempo(dia.codigo)}</p>
                    <p className="mt-2" style={{ color: "var(--ds-color-text)" }}>{dia.min}° a {dia.max}°C</p>
                    {dia.chuva !== null && (
                      <p className="text-sm" style={{ color: "var(--ds-color-text-muted)" }}>Chance de chuva: {dia.chuva}%</p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs" style={{ color: "var(--ds-color-text-muted)" }}>
                Dados: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline">Open-Meteo</a>. Atualizado a cada 30 min.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
