import { Film, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-cine-border bg-cine-dark/50" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-3 group">
              <Film className="w-6 h-6 text-cine-gold transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-[var(--font-display)] text-xl font-bold text-white">
                Cine<span className="text-cine-gold">Flow</span>
              </span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed">
              Sua plataforma de descoberta de filmes em cartaz nos cinemas.
              Avaliações, trailers e muito mais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Navegar</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cine-gold transition-colors">Em Cartaz</a></li>
              <li><a href="#" className="hover:text-cine-gold transition-colors">Em Breve</a></li>
              <li><a href="#" className="hover:text-cine-gold transition-colors">Mais Avaliados</a></li>
              <li><a href="#" className="hover:text-cine-gold transition-colors">Gêneros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Sobre</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cine-gold transition-colors">Quem Somos</a></li>
              <li><a href="#" className="hover:text-cine-gold transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-cine-gold transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-cine-gold transition-colors">Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Comunidade</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cine-gold transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cine-gold transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-cine-gold transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-cine-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2026 CineFlow. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-cine-red fill-cine-red" /> para cinéfilos
          </p>
        </div>
      </div>
    </footer>
  );
}
