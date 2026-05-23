import { useState, useMemo, useCallback } from "react";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import FilterBar from "./components/FilterBar";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";
import movies from "./data/movies";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("now_playing");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Filter by tab/status
    if (activeTab === "now_playing") {
      result = result.filter((m) => m.status === "now_playing");
    } else if (activeTab === "upcoming") {
      result = result.filter((m) => m.status === "upcoming");
    } else if (activeTab === "top_rated") {
      result = result.filter((m) => m.rating >= 7.5);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q)) ||
          m.director.toLowerCase().includes(q)
      );
    }

    // Filter by genre
    if (selectedGenre !== "Todos") {
      result = result.filter((m) => m.genres.includes(selectedGenre));
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "release") {
      result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    }

    return result;
  }, [searchQuery, activeTab, selectedGenre, sortBy]);

  const featuredMovies = useMemo(
    () => movies.filter((m) => m.featured),
    []
  );

  const handleMovieSelect = useCallback((movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = "hidden";
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <div className="min-h-screen bg-cine-black">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main>
        <HeroBanner
          movies={featuredMovies}
          onMovieSelect={handleMovieSelect}
        />

        <FilterBar
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filteredMovies.length}
        />

        <MovieGrid
          movies={filteredMovies}
          onMovieSelect={handleMovieSelect}
        />
      </main>

      <Footer />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
