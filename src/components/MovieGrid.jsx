import MovieCard from "./MovieCard";
import { Film } from "lucide-react";

export default function MovieGrid({ movies, onMovieSelect }) {
  if (!movies.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Film className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Nenhum filme encontrado
          </h3>
          <p className="text-gray-500 text-sm">
            Tente ajustar os filtros ou buscar por outro termo.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      id="movie-grid"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 stagger-children">
        {movies.map((movie, i) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={onMovieSelect}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
