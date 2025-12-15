import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEventSearch } from "./useEventSearch";
import SearchResults from "./SearchResults";

export default function GlobalSearchBar({ className = "" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { results, isSearching } = useEventSearch(searchQuery);
  const searchRef = React.useRef(null);

  // Fechar resultados ao clicar fora
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mostrar resultados quando houver busca
  React.useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setShowResults(true);
    }
  }, [searchQuery, results]);

  const handleClear = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar eventos, locais, artistas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button 
          type="button"
          size="sm"
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
        >
          Buscar
        </Button>
      </div>

      {/* Resultados da busca */}
      {showResults && (
        <SearchResults 
          results={results}
          isSearching={isSearching}
          searchQuery={searchQuery}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
}