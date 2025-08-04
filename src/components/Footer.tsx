import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img
                src="/logo-branco.svg"
                alt="IotSec - Automação e Segurança"
                className="h-10 w-auto mr-4"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Especialistas em automação e segurança com mais de 10 anos de
              experiência. Transformamos ambientes em espaços inteligentes,
              seguros e eficientes.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center hover:bg-yellow-500/30 transition-colors duration-300"
              >
                <span className="text-yellow-500">📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center hover:bg-yellow-500/30 transition-colors duration-300"
              >
                <span className="text-yellow-500">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center hover:bg-yellow-500/30 transition-colors duration-300"
              >
                <span className="text-yellow-500">💼</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center hover:bg-yellow-500/30 transition-colors duration-300"
              >
                <span className="text-yellow-500">📺</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("quem-somos");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  Quem Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("solucoes");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  Soluções
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("diferenciais");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  Diferenciais
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("contato");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">📍</span>
                <span className="text-gray-300 text-sm">
                  Rua das Tecnologias, 123
                  <br />
                  Centro - São Paulo/SP
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">📞</span>
                <span className="text-gray-300 text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">✉️</span>
                <span className="text-gray-300 text-sm">
                  contato@iotsec.com.br
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 IotSec - Automação e Segurança. Todos os direitos
              reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Termos de Uso
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
