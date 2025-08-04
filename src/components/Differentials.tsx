import React from "react";

const Differentials = () => {
  const differentials = [
    {
      icon: "🛡️",
      title: "Garantia Estendida",
      description:
        "Oferecemos garantia estendida em todos os nossos produtos e serviços, garantindo sua tranquilidade e investimento protegido.",
    },
    {
      icon: "👨‍💼",
      title: "Equipe Especializada",
      description:
        "Nossa equipe técnica é altamente qualificada e certificada, com anos de experiência em projetos complexos de automação e segurança.",
    },
    {
      icon: "🔗",
      title: "Integração Total",
      description:
        "Todos os sistemas são desenvolvidos para trabalhar em harmonia, criando uma solução única e integrada para seu ambiente.",
    },
    {
      icon: "📞",
      title: "Pós-venda Eficiente",
      description:
        "Suporte técnico 24/7, manutenção preventiva e assistência remota para garantir o funcionamento perfeito dos sistemas.",
    },
  ];

  return (
    <section id="diferenciais" className="py-20 bg-gray-900 pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
            Por que Escolher a IotSec?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-6 mb-4">
            Nossos
            <span className="text-yellow-500"> Diferenciais</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Combinamos tecnologia de ponta com atendimento personalizado para
            oferecer a melhor experiência em automação e segurança do mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((differential, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="w-20 h-20 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-500/20 group-hover:border-yellow-500/50 transition-all duration-300">
                <span className="text-3xl">{differential.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                {differential.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {differential.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                  500+
                </div>
                <div className="text-gray-300">Projetos Entregues</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                  10+
                </div>
                <div className="text-gray-300">Anos de Experiência</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                  24/7
                </div>
                <div className="text-gray-300">Suporte Técnico</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                  100%
                </div>
                <div className="text-gray-300">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Preview */}
        <div className="mt-16 text-center">
          <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl">⭐</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">João Silva</div>
                <div className="text-gray-400 text-sm">
                  Diretor Comercial - Empresa ABC
                </div>
              </div>
            </div>
            <p className="text-gray-300 italic text-lg">
              "A IotSec transformou completamente nossa segurança. O sistema
              integrado de CFTV com IA nos deu controle total e tranquilidade.
              Equipe extremamente profissional!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
