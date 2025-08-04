import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log("Formulário enviado:", formData);
    alert("Obrigado pelo contato! Entraremos em contato em breve.");
    setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
  };

  return (
    <section id="contato" className="py-20 bg-black pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
              Entre em Contato
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-6 mb-4">
              Vamos Conversar sobre seu
              <span className="text-yellow-500"> Projeto</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Estamos prontos para transformar sua visão em realidade. Entre em
              contato e descubra como podemos ajudar seu projeto.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Envie sua Mensagem
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-white font-medium mb-2"
                  >
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-medium mb-2"
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-white font-medium mb-2"
                  >
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-white font-medium mb-2"
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300 resize-none"
                    placeholder="Conte-nos sobre seu projeto..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Informações de Contato
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-500 text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        Endereço
                      </h4>
                      <p className="text-gray-300">
                        Rua das Tecnologias, 123
                        <br />
                        Centro - São Paulo/SP
                        <br />
                        CEP: 01234-567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-500 text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        Telefone
                      </h4>
                      <p className="text-gray-300">
                        (11) 99999-9999
                        <br />
                        (11) 88888-8888
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-500 text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">E-mail</h4>
                      <p className="text-gray-300">
                        contato@iotsec.com.br
                        <br />
                        comercial@iotsec.com.br
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-500 text-xl">🕒</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        Horário de Atendimento
                      </h4>
                      <p className="text-gray-300">
                        Segunda a Sexta: 8h às 18h
                        <br />
                        Sábado: 8h às 12h
                        <br />
                        Suporte 24/7 para emergências
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold mb-4">
                  Siga-nos nas Redes Sociais
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center hover:bg-yellow-500/30 transition-colors duration-300"
                  >
                    <span className="text-yellow-500 text-xl">📘</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center hover:bg-yellow-500/30 transition-colors duration-300"
                  >
                    <span className="text-yellow-500 text-xl">📷</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center hover:bg-yellow-500/30 transition-colors duration-300"
                  >
                    <span className="text-yellow-500 text-xl">💼</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center hover:bg-yellow-500/30 transition-colors duration-300"
                  >
                    <span className="text-yellow-500 text-xl">📺</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
