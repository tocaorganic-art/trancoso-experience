import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, User, SortAsc, SlidersHorizontal } from "lucide-react";

const TYPE_LABELS = {
  single: "Singles",
  ep: "EPs",
  remix: "Remixes",
  album: "Álbuns"
};

const ARTIST_LABELS = {
  tony_monteiro: "Tony Monteiro",
  enzo_furtado: "Enzo Furtado",
  toca_experience: "Toca Experience"
};

export default function DiscografiaFilters({ filters, onFilterChange, counts }) {
  const { tipo, artista, ordenacao } = filters;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        <h3 className="text-gray-800 font-semibold">Filtros e Ordenação</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Tipo */}
        <div className="space-y-2">
          <label className="text-xs text-gray-600 flex items-center gap-1">
            <Music className="w-3 h-3" />
            Tipo de Lançamento
          </label>
          <Select value={tipo} onValueChange={(value) => onFilterChange({ tipo: value })}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos ({counts.total})</SelectItem>
              {Object.entries(TYPE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label} ({counts[key] || 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Artista */}
        <div className="space-y-2">
          <label className="text-xs text-gray-600 flex items-center gap-1">
            <User className="w-3 h-3" />
            Artista
          </label>
          <Select value={artista} onValueChange={(value) => onFilterChange({ artista: value })}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {Object.entries(ARTIST_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ordenação */}
        <div className="space-y-2">
          <label className="text-xs text-gray-600 flex items-center gap-1">
            <SortAsc className="w-3 h-3" />
            Ordenar por
          </label>
          <Select value={ordenacao} onValueChange={(value) => onFilterChange({ ordenacao: value })}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="data_desc">Mais Recente</SelectItem>
              <SelectItem value="data_asc">Mais Antigo</SelectItem>
              <SelectItem value="nome_asc">Nome (A-Z)</SelectItem>
              <SelectItem value="nome_desc">Nome (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reset Button */}
      {(tipo !== "all" || artista !== "all" || ordenacao !== "data_desc") && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange({ tipo: "all", artista: "all", ordenacao: "data_desc" })}
          className="mt-3"
        >
          Limpar Filtros
        </Button>
      )}
    </div>
  );
}