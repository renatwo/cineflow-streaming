import { Star } from "lucide-react";

function getRatingColor(rating) {
  if (rating >= 7.5) return "bg-cine-green";
  if (rating >= 6.0) return "bg-cine-yellow";
  return "bg-cine-red";
}

function getCriticColor(score) {
  if (score >= 75) return "text-cine-green";
  if (score >= 50) return "text-cine-yellow";
  return "text-cine-red";
}

function ScoreCircle({ score, size = 40 }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75 ? "#21d07a" : score >= 50 ? "#d2d531" : "#e50914";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="score-ring"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
        style={{ fontSize: size * 0.28 }}
      >
        {score}%
      </span>
    </div>
  );
}

export default function MovieCard({ movie, onSelect, index }) {
  return (
    <article
      className="card-wrapper group cursor-pointer rounded-xl overflow-hidden bg-cine-card border border-cine-border hover:border-cine-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-cine-gold/5"
      onClick={() => onSelect(movie)}
      style={{ animationDelay: `${index * 0.05}s` }}
      id={`movie-card-${movie.id}`}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={`Pôster de ${movie.title}`}
          className="card-poster w-full h-full object-cover"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
          <button className="self-center mb-4 px-5 py-2.5 bg-cine-red hover:bg-cine-red-dark text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-cine-red/30">
            Ver Detalhes
          </button>
        </div>

        {/* Rating Badge */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md ${getRatingColor(
            movie.rating
          )} text-white text-xs font-bold shadow-lg`}
        >
          <Star className="w-3 h-3 fill-white" />
          {movie.rating.toFixed(1)}
        </div>

        {/* Critic Score */}
        <div className="absolute top-3 right-3">
          <ScoreCircle score={movie.criticScore} size={38} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        {/* Title */}
        <h3 className="font-[var(--font-display)] text-sm sm:text-base font-semibold text-white truncate group-hover:text-cine-gold transition-colors duration-200">
          {movie.title}
        </h3>

        {/* Year + Duration */}
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span>{movie.year}</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>{movie.duration}</span>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {movie.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="genre-tag" style={{ fontSize: "0.6rem", padding: "1px 8px" }}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
