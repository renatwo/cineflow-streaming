import { SlidersHorizontal, ArrowUpDown, Hash } from "lucide-react";
import { genres as allGenres } from "../data/movies";

const SORT_OPTIONS = [
  { id: "rating", label: "Mais Avaliados" },
  { id: "release", label: "Lançamentos" },
  { id: "alpha", label: "A–Z" },
];

export default function FilterBar({
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  resultCount,
}) {
  const displayGenres = ["Todos", ...allGenres];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="filter-bar">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 bg-cine-gold rounded-full" />
          <h2 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold text-white">
            Filmes
          </h2>
          <span className="text-sm text-gray-500 ml-1">
            {resultCount} {resultCount === 1 ? "título" : "títulos"}
          </span>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <div className="flex bg-cine-dark rounded-lg border border-cine-border overflow-hidden">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onSortChange(opt.id)}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  sortBy === opt.id
                    ? "bg-cine-gold/15 text-cine-gold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                id={`sort-${opt.id}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="flex items-start gap-3">
        <SlidersHorizontal className="w-4 h-4 text-gray-500 mt-1.5 shrink-0 hidden sm:block" />
        <div className="flex flex-wrap gap-2">
          {displayGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                selectedGenre === genre
                  ? "bg-cine-gold/15 border-cine-gold/40 text-cine-gold"
                  : "bg-cine-dark border-cine-border text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
              id={`genre-${genre.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
