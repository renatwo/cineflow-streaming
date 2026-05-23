import { useEffect, useCallback, useState } from "react";
import {
  X,
  Star,
  Clock,
  Calendar,
  Users,
  Clapperboard,
  Play,
  Plus,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

function ScoreBar({ label, icon: Icon, score, color }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-xs text-gray-400 w-16">{label}</span>
      <div className="flex-1 h-1.5 bg-cine-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${score}%`,
            backgroundColor:
              score >= 75 ? "#21d07a" : score >= 50 ? "#d2d531" : "#e50914",
          }}
        />
      </div>
      <span className="text-xs font-semibold text-white w-10 text-right">
        {score}%
      </span>
    </div>
  );
}

export default function MovieModal({ movie, onClose }) {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const ratingColor =
    movie.rating >= 7.5
      ? "text-cine-green"
      : movie.rating >= 6.0
      ? "text-cine-yellow"
      : "text-cine-red";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
      id="movie-modal"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 modal-backdrop animate-fade-in-up"
        style={{ animationDuration: "0.3s" }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-4xl mx-4 my-8 sm:my-12 bg-cine-dark rounded-2xl overflow-hidden border border-cine-border shadow-2xl animate-fade-in-up"
        style={{ animationDuration: "0.4s" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white transition-all duration-200 border border-white/10"
          aria-label="Fechar"
          id="modal-close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Backdrop Image / Trailer */}
        <div className="relative aspect-video w-full overflow-hidden">
          {showTrailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1&rel=0`}
              title={`Trailer de ${movie.title}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={movie.backdrop}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cine-dark via-cine-dark/40 to-transparent" />

              {/* Play Trailer Button */}
              <button
                onClick={() => setShowTrailer(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-cine-red/90 hover:bg-cine-red text-white transition-all duration-300 hover:scale-110 shadow-2xl shadow-cine-red/40"
                id="modal-play-trailer"
                aria-label="Assistir trailer"
              >
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1" />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Poster (desktop) */}
            <div className="hidden lg:block shrink-0 -mt-32 relative z-20">
              <img
                src={movie.poster}
                alt={`Pôster de ${movie.title}`}
                className="w-48 rounded-xl shadow-2xl border-2 border-cine-border"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                {movie.title}
              </h2>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {movie.year}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {movie.duration}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="px-2 py-0.5 border border-gray-600 rounded text-xs">
                  {movie.classification}
                </span>
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {movie.genres.map((g) => (
                  <span key={g} className="genre-tag">{g}</span>
                ))}
              </div>

              {/* Ratings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-cine-black/50 rounded-xl border border-cine-border">
                {/* General Rating */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star className="w-5 h-5 fill-cine-gold text-cine-gold" />
                    <span className={`text-2xl font-bold ${ratingColor}`}>
                      {movie.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Nota Geral</span>
                </div>

                {/* Audience */}
                <div className="flex flex-col items-center text-center">
                  <ScoreBar
                    label="Público"
                    icon={ThumbsUp}
                    score={movie.audienceScore}
                    color="text-cine-gold"
                  />
                </div>

                {/* Critics */}
                <div className="flex flex-col items-center text-center">
                  <ScoreBar
                    label="Crítica"
                    icon={MessageSquare}
                    score={movie.criticScore}
                    color="text-cine-gold"
                  />
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Sinopse
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              {/* Cast & Direction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    <Clapperboard className="w-4 h-4" />
                    Direção
                  </h3>
                  <p className="text-white text-sm">{movie.director}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    <Users className="w-4 h-4" />
                    Elenco
                  </h3>
                  <p className="text-white text-sm">
                    {movie.cast.join(", ")}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cine-red hover:bg-cine-red-dark text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                  id="modal-trailer-btn"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Assistir Trailer
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg border border-white/15 transition-all duration-200"
                  id="modal-list-btn"
                >
                  <Plus className="w-4 h-4" />
                  Minha Lista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
