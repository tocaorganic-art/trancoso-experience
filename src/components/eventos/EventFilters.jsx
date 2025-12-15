import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Tag, SlidersHorizontal } from "lucide-react";

export default function EventFilters({ filters, onFilterChange, eventCounts }) {
  const { localidade, ordenacao, mesInicio, mesFim } = filters;

  const MESES = [
    { value: "12", label: "Dezembro" },
    { value: "01", label: "Janeiro" }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-purple-400" />
        <h3 className="text-white font-semibold">Filtros Avançados</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Localidade */}
        <div className="space-y-2">
          <label className="text-xs text-gray-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Localidade
          </label>
          <Select value={localidade} onValueChange={(value) => onFilterChange({ localidade: value })}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todas">Todas ({eventCounts.total})</SelectItem>
              <SelectItem value="Trancoso">🌴 Trancoso ({eventCounts.Trancoso || 0})</SelectItem>
              <SelectItem value="Caraíva">🏝️ Caraíva ({eventCounts.Caraíva || 0})</SelectItem>
              <SelectItem value="Arraial d'Ajuda">🌊 Arraial ({eventCounts["Arraial d'Ajuda"] || 0})</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mês Início */}
        <div className="space-y-2">
          <label className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            De
          </label>
          <Select value={mesInicio} onValueChange={(value) => onFilterChange({ mesInicio: value })}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {MESES.map(mes => (
                <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mês Fim */}
        <div className="space-y-2">
          <label className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Até
          </label>
          <Select value={mesFim} onValueChange={(value) => onFilterChange({ mesFim: value })}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {MESES.map(mes => (
                <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ordenação */}
        <div className="space-y-2">
          <label className="text-xs text-gray-400 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Ordenar por
          </label>
          <Select value={ordenacao} onValueChange={(value) => onFilterChange({ ordenacao: value })}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="data_asc">Data (mais próximo)</SelectItem>
              <SelectItem value="data_desc">Data (mais distante)</SelectItem>
              <SelectItem value="nome_asc">Nome (A-Z)</SelectItem>
              <SelectItem value="nome_desc">Nome (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reset Button */}
      {(localidade !== "Todas" || ordenacao !== "data_asc" || mesInicio !== "todos" || mesFim !== "todos") && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange({ localidade: "Todas", ordenacao: "data_asc", mesInicio: "todos", mesFim: "todos" })}
          className="mt-3 bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          Limpar Filtros
        </Button>
      )}
    </div>
  );
}