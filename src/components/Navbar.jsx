import { useState, useEffect } from "react";
import { Search, Menu, X, Film, User } from "lucide-react";

const NAV_ITEMS = [
  { id: "now_playing", label: "Em Cartaz" },
  { id: "upcoming", label: "Em Breve" },
  { id: "top_rated", label: "Mais Avaliados" },
  { id: "genres", label: "Gêneros" },
];

export default function Navbar({ searchQuery, onSearchChange, activeTab, onTabChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cine-black/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 shrink-0 group"
            id="nav-logo"
          >
            <Film className="w-7 h-7 text-cine-gold transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-[var(--font-display)] text-xl sm:text-2xl font-bold tracking-tight text-white">
              Cine<span className="text-cine-gold">Flow</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "text-cine-gold bg-cine-gold/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search + Login */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden sm:flex items-center">
              <div
                className={`flex items-center transition-all duration-300 overflow-hidden rounded-full border ${
                  searchOpen
                    ? "w-64 border-cine-gold/40 bg-cine-dark/80"
                    : "w-10 border-transparent bg-transparent"
                }`}
              >
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2.5 shrink-0 text-gray-400 hover:text-cine-gold transition-colors"
                  id="nav-search-toggle"
                  aria-label="Buscar filmes"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
                {searchOpen && (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar filmes..."
                    className="flex-1 bg-transparent text-white text-sm outline-none pr-4 placeholder-gray-500"
                    autoFocus
                    id="nav-search-input"
                  />
                )}
              </div>
            </div>

            {/* Login */}
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-cine-gold/10 border border-cine-gold/20 text-cine-gold text-sm font-medium hover:bg-cine-gold/20 transition-all duration-200"
              id="nav-login"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Entrar</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              id="nav-mobile-toggle"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          {/* Mobile Search */}
          <div className="flex items-center gap-2 px-1 py-3 border-b border-cine-border">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar filmes, gêneros, diretores..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
              id="nav-mobile-search"
            />
          </div>
          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-1 pt-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "text-cine-gold bg-cine-gold/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
