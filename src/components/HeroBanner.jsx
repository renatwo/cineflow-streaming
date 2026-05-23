import { useState, useEffect, useCallback } from "react";
import { Play, Plus, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner({ movies, onMovieSelect }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % movies.length);
  }, [current, movies.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + movies.length) % movies.length);
  }, [current, movies.length, goTo]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (!movies.length) return null;

  const movie = movies[current];

  return (
    <section className="relative w-full h-[75vh] sm:h-[80vh] lg:h-[85vh] overflow-hidden" id="hero-banner">
      {/* Background Slides */}
      {movies.map((m, i) => (
        <div
          key={m.id}
          className={`absolute inset-0 hero-slide ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={m.backdrop}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-cine-black via-cine-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-cine-black via-transparent to-cine-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20 sm:pb-24 lg:pb-28">
        <div
          className="max-w-2xl animate-fade-in-up"
          key={movie.id}
        >
          {/* Genre tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((g) => (
              <span key={g} className="genre-tag">{g}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            {movie.title}
          </h1>

          {/* Rating + Year + Duration */}
          <div className="flex items-center gap-4 mb-4 text-sm sm:text-base">
            <span className="flex items-center gap-1.5 text-cine-gold font-semibold">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-cine-gold text-cine-gold" />
              {movie.rating.toFixed(1)}
            </span>
            <span className="text-gray-400">{movie.year}</span>
            <span className="text-gray-400">{movie.duration}</span>
            <span className="px-2 py-0.5 border border-gray-500 rounded text-xs text-gray-300">
              {movie.classification}
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
            {movie.synopsisShort}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onMovieSelect(movie)}
              className="flex items-center gap-2 px-6 py-3 bg-cine-red hover:bg-cine-red-dark text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-cine-red/25"
              id="hero-trailer-btn"
            >
              <Play className="w-5 h-5 fill-white" />
              Assistir Trailer
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 transition-all duration-200 backdrop-blur-sm"
              id="hero-list-btn"
            >
              <Plus className="w-5 h-5" />
              Minha Lista
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition-all duration-200 backdrop-blur-sm"
        aria-label="Filme anterior"
        id="hero-prev"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition-all duration-200 backdrop-blur-sm"
        aria-label="Próximo filme"
        id="hero-next"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-cine-gold"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
