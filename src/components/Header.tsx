import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-sm border-b border-yellow-500/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo-branco.svg"
              alt="IotSec - Automação e Segurança"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("quem-somos")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Quem Somos
            </button>
            <button
              onClick={() => scrollToSection("solucoes")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Soluções
            </button>
            <button
              onClick={() => scrollToSection("diferenciais")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Contato
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("contato")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Solicitar Orçamento
            </button>
            <button
              onClick={() => (window.location.href = "/login")}
              className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            >
              Área Técnica
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("quem-somos")}
                className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-left"
              >
                Quem Somos
              </button>
              <button
                onClick={() => scrollToSection("solucoes")}
                className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-left"
              >
                Soluções
              </button>
              <button
                onClick={() => scrollToSection("diferenciais")}
                className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-left"
              >
                Diferenciais
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-left"
              >
                Contato
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300 w-full text-center"
              >
                Solicitar Orçamento
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300 w-full text-center"
              >
                Área Técnica
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
