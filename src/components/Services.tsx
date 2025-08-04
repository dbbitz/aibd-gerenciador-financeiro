const Services = () => {
  const services = [
    {
      icon: "📹",
      title: "CFTV com Analíticos",
      description:
        "Sistemas de câmeras com inteligência artificial, reconhecimento facial e análise comportamental para máxima segurança.",
      features: [
        "IA Avançada",
        "Reconhecimento Facial",
        "Analíticos de Vídeo",
        "Armazenamento em Nuvem",
      ],
    },
    {
      icon: "🔐",
      title: "Controle de Acesso",
      description:
        "Soluções inteligentes de controle de acesso com biometria, cartões e reconhecimento facial para controle total.",
      features: [
        "Biometria",
        "Reconhecimento Facial",
        "Controle Remoto",
        "Relatórios Detalhados",
      ],
    },
    {
      icon: "🏠",
      title: "Automação Residencial",
      description:
        "Transforme sua casa em um ambiente inteligente com controle de iluminação, climatização e segurança integrada.",
      features: [
        "Iluminação Inteligente",
        "Climatização",
        "Segurança Integrada",
        "Controle por App",
      ],
    },
    {
      icon: "🏢",
      title: "Automação Comercial",
      description:
        "Soluções empresariais para otimizar processos, reduzir custos e aumentar a eficiência operacional.",
      features: [
        "Controle Centralizado",
        "Eficiência Energética",
        "Monitoramento 24/7",
        "Relatórios Avançados",
      ],
    },
    {
      icon: "🚨",
      title: "Sistemas de Alarme",
      description:
        "Sistemas de alarme inteligentes com notificações instantâneas e integração com sistemas de segurança.",
      features: [
        "Detecção Inteligente",
        "Notificações Instantâneas",
        "Integração Total",
        "Backup de Energia",
      ],
    },
    {
      icon: "🌐",
      title: "Redes Estruturadas",
      description:
        "Infraestrutura de rede completa incluindo fibra óptica, cabeamento estruturado e conectividade de alta velocidade.",
      features: [
        "Fibra Óptica",
        "Cabeamento Estruturado",
        "Alta Velocidade",
        "Escalabilidade",
      ],
    },
  ];

  return (
    <section id="solucoes" className="py-20 bg-black pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
            Nossas Soluções
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-6 mb-4">
            Tecnologias
            <span className="text-yellow-500"> Avançadas</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Oferecemos soluções completas em automação e segurança, combinando
            as mais modernas tecnologias para proteger e otimizar seu ambiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{service.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para Transformar seu Ambiente?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para desenvolver a solução perfeita para
              suas necessidades. Solicite um orçamento personalizado e descubra
              como podemos ajudar.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById("contato");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
