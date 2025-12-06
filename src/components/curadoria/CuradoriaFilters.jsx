import React from "react";

const CATEGORY_LABELS = {
  afro_house: "Afro House",
  organic_house: "Organic House",
  playlists: "Playlists",
  eventos: "Eventos",
  bastidores: "Bastidores"
};

export default function CuradoriaFilters({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          activeCategory === "all"
            ? "bg-gradient-to-r from-[#FFD700] to-[#40E0D0] text-black"
            : "bg-transparent text-gray-400 border border-gray-700 hover:border-[#FFD700]/50 hover:text-[#FFD700]"
        }`}
      >
        Todos
      </button>
      {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === key
              ? "bg-gradient-to-r from-[#FFD700] to-[#40E0D0] text-black"
              : "bg-transparent text-gray-400 border border-gray-700 hover:border-[#FFD700]/50 hover:text-[#FFD700]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}