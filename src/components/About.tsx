import React from "react";

const About = () => {
  return (
    <section id="quem-somos" className="py-20 bg-gray-900 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  Quem Somos
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Especialistas em
                <span className="text-yellow-500"> Automação</span> e
                <span className="text-yellow-500"> Segurança</span>
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                A IotSec é uma empresa especializada em soluções de automação e
                segurança que combina tecnologia de ponta com experiência
                consolidada no mercado. Nossa missão é transformar ambientes em
                espaços inteligentes, seguros e eficientes.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Com mais de 10 anos de experiência, nossa equipe técnica
                altamente qualificada desenvolve projetos personalizados que
                atendem às necessidades específicas de cada cliente, desde
                residências até grandes complexos comerciais e industriais.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-3 h-3 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Tecnologia de Ponta
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Soluções com IA e reconhecimento facial
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-3 h-3 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Projetos Personalizados
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Soluções adaptadas às suas necessidades
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-3 h-3 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Suporte 24/7</h4>
                    <p className="text-gray-400 text-sm">
                      Assistência técnica sempre disponível
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-3 h-3 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Garantia Estendida
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Proteção completa para sua tranquilidade
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image/Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-500/20 to-transparent rounded-2xl p-8 border border-yellow-500/30">
                <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center">
                  <img
                    alt="Automação e Segurança"
                    className="w-full h-full object-cover rounded-xl opacity-80"
                    style={{
                      background: "linear-gradient(45deg, #F2B600, #000000)",
                    }}
                  />
                </div>

                {/* Stats Overlay */}
                <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm">Projetos Entregues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
