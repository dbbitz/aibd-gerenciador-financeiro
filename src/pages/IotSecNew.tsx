import React, { useState, useRef } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { downloadRelatorio } from "@/lib/generateReport";
import { testImageProcessing } from "@/lib/testImages";
import { generatePDFRelatorio } from "@/lib/generatePDF";
import { generateEntregaPDF } from "@/lib/generateEntregaPDF";
import SignatureCanvas from "react-signature-canvas";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Função para verificar se o template existe
const checkTemplateExists = async (): Promise<boolean> => {
  try {
    const response = await fetch("/template-relatorio-visita.docx");
    return response.ok;
  } catch {
    return false;
  }
};

export default function IotSecNew() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEntrega, setIsOpenEntrega] = useState(false);
  const [isOpenOrcamento, setIsOpenOrcamento] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTestButtons, setShowTestButtons] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFilesEntrega, setSelectedFilesEntrega] = useState<File[]>([]);
  const [selectedFilesOrcamento, setSelectedFilesOrcamento] = useState<File[]>(
    []
  );

  // Estados para o sistema de passos
  const [currentStep, setCurrentStep] = useState(1);
  const [clienteAssinatura, setClienteAssinatura] = useState<string>("");
  const [tecnicoAssinatura, setTecnicoAssinatura] = useState<string>("");
  const [concordaGarantia, setConcordaGarantia] = useState(false);

  // Refs para os canvas de assinatura
  const clienteSignatureRef = useRef<SignatureCanvas>(null);
  const tecnicoSignatureRef = useRef<SignatureCanvas>(null);

  // Função para obter a data atual no formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    cliente: "RKS MATRIZ",
    local: "",
    data: getCurrentDate(),
    periodo: "Manhã",
    tecnico: "",
    cameras_total: "",
    cameras_ok: "",
    limpeza: "Sim",
    status_hd: "Funcionando 100%",
    status_sistema: "Funcionando 100%",
    armazenamento_dias: "",
    teste_hd: "Sim",
    teste_gravacoes: "Sim",
    problemas: "Nenhum problema identificado.",
    recomendacoes: "Nenhuma recomendação específica.",
    fotos: null as FileList | null,
  });

  const [formDataEntrega, setFormDataEntrega] = useState({
    // Seção 1: Dados do Cliente e Projeto
    cliente_nome: "",
    cliente_empresa: "",
    cliente_contato: "",
    endereco_servico: "",
    numero_contrato: "",
    data_entrega: getCurrentDate(),

    // Seção 2: Descrição do Serviço
    descricao_servico: "",
    servicos_realizados: {
      cftv: false,
      controle_acesso: false,
      cerca_eletrica: false,
      alarme: false,
      automacao: false,
      infraestrutura: false,
    },
    outros_servicos: "",

    // Seção 3: Equipamentos Instalados
    equipamentos: [
      {
        nome: "",
        modelo: "",
        quantidade: "",
        serie: "",
        obs: "",
      },
    ],

    // Seção 4: Materiais de Infraestrutura
    materiais: [
      {
        tipo: "",
        quantidade: "",
        obs: "",
      },
    ],

    // Seção 5: Testes e Funcionamento
    testes_realizados: "",
    equipamentos_testados: "",
    resultado_testes: "",
    tem_falha: false,
    descricao_falha: "",

    // Seção 6: Condições no Local
    condicoes_ambiente: "",
    restricoes_encontradas: "",
    observacoes_adicionais: "",

    // Seção 7: Termos e Garantia
    concorda_garantia: false,

    // Seção 8: Responsável pela Execução
    tecnico_nome: "",
    tecnico_contato: "",
    data_preenchimento: getCurrentDate(),

    // Seção 9: Anexos
    fotos: null as FileList | null,
  });

  const [formDataOrcamento, setFormDataOrcamento] = useState({
    // Seção 1: Dados do Cliente
    cliente_responsavel: "",
    empresa_condominio: "",
    endereco_servico: "",
    contato: "",

    // Seção 2: Escopo do Projeto
    tipo_servico: "",
    tecnologias: {
      cftv: false,
      controle_acesso: false,
      cerca_eletrica: false,
      alarme: false,
      automacao: false,
      interfonia: false,
    },
    outras_tecnologias: "",
    descricao_projeto: "",

    // Seção 3: Infraestrutura
    tipo_infraestrutura: "",
    materiais_infraestrutura: {
      eletroduto: false,
      curvas_luvas: false,
      canaletas: false,
      caixas_passagem: false,
      suportes: false,
      fixadores: false,
      tubo_enterrado: false,
    },
    outros_materiais: "",
    observacoes_infraestrutura: "",

    // Seção 4: Equipamentos e Dispositivos
    equipamentos_previstos: "",
    tipo_alimentacao: {
      poe: false,
      fonte_12v_24v: false,
      bateria_nobreak: false,
      disjuntor_dedicado: false,
    },
    outras_alimentacoes: "",

    // Seção 5: Rede e Energia
    tipos_cabos: {
      coaxial: false,
      cabo_rede: false,
      fibra_optica: false,
      cabos_energia: false,
      cabos_automacao: false,
    },
    outros_cabos: "",
    pontos_energia: "",
    protecoes_eletricas: {
      disjuntor_dedicado: false,
      nobreak: false,
      filtro_linha: false,
      nao_se_aplica: false,
    },

    // Seção 6: Serviços Incluídos
    servicos_entregues: {
      projeto_tecnico: false,
      fornecimento_materiais: false,
      mao_obra: false,
      testes_comissionamento: false,
      treinamento: false,
      documentacao_tecnica: false,
    },

    // Seção 7: Observações Técnicas
    infraestrutura_eletrica_pronta: "",
    dependencia_terceiros: "",
    acesso_livre_local: "",
    observacoes_gerais: "",

    // Anexos
    fotos: null as FileList | null,
  });

  // Funções de manipulação de formulários (mantidas as mesmas)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      console.log("=== INÍCIO DO PROCESSAMENTO ===");
      console.log("Dados do relatório de visita técnica:", formData);
      console.log("Arquivos selecionados:", selectedFiles);
      console.log("Número de arquivos:", selectedFiles.length);
      console.log("Formato selecionado: PDF");

      const templateExists = await checkTemplateExists();
      if (!templateExists) {
        alert(
          "Erro: Template não encontrado. Verifique se o arquivo 'template-relatorio-visita.docx' existe na pasta public/"
        );
        return;
      }

      const dataTransfer = new DataTransfer();
      selectedFiles.forEach((file, index) => {
        console.log(
          `Adicionando arquivo ${index + 1}:`,
          file.name,
          file.size,
          file.type
        );
        dataTransfer.items.add(file);
      });
      const fileList = dataTransfer.files;
      console.log("FileList criado:", fileList);
      console.log("Número de arquivos no FileList:", fileList.length);

      const updatedFormData = {
        ...formData,
        fotos: fileList,
      };

      console.log("FormData atualizado:", updatedFormData);
      console.log("Fotos no formData:", updatedFormData.fotos);

      // Testar processamento de imagens
      await testImageProcessing(updatedFormData.fotos);

      // Gerar PDF usando a nova função
      const blob = await generatePDFRelatorio(
        {
          ...updatedFormData,
          fotos: updatedFormData.fotos || null,
        },
        selectedFiles
      );

      const dataFormatada = new Date(formData.data)
        .toLocaleDateString("pt-BR")
        .replace(/\//g, "-");
      const extension = "pdf";
      const filename = `Relatorio_Visita_${formData.cliente.replace(
        /\s+/g,
        "_"
      )}_${dataFormatada}.${extension}`;

      console.log("Nome do arquivo:", filename);
      console.log("Tamanho do blob:", blob.size);

      downloadRelatorio(blob, filename);

      setIsOpen(false);
      setFormData({
        cliente: "RKS MATRIZ",
        local: "",
        data: getCurrentDate(),
        periodo: "Manhã",
        tecnico: "",
        cameras_total: "",
        cameras_ok: "",
        limpeza: "Sim",
        status_hd: "Funcionando 100%",
        status_sistema: "Funcionando 100%",
        armazenamento_dias: "",
        teste_hd: "Sim",
        teste_gravacoes: "Sim",
        problemas: "",
        recomendacoes: "",
        fotos: null,
      });
      setSelectedFiles([]);

      console.log("=== PROCESSAMENTO CONCLUÍDO ===");
      alert("Relatório gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert(`Erro ao gerar o relatório: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 9) {
      alert("Máximo de 9 imagens permitido!");
      return;
    }
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black landing-page">
      {/* Header Section */}
      <div className="bg-black/95 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo-branco.svg"
                alt="iotSec - Segurança e Automação"
                className="h-12 w-auto"
              />
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar || "/logo-branco.svg"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{user?.name}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
            Sistema de Relatórios
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4">
            Relatórios
            <span className="text-yellow-500"> Técnicos</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Formulários oficiais para visitas, orçamentos e entregas de serviço.
            Cada formulário gera um relatório em PDF profissional.
          </p>
        </div>

        {/* Descrição dos Relatórios Técnicos */}
        <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h2 className="text-xl font-semibold text-white mb-3">
            📋 Relatórios Técnicos – Formulários Oficiais
          </h2>
          <p className="text-gray-300">
            Utilize os formulários sempre que realizar uma visita, orçamento ou
            entrega de serviço. Cada formulário gera um relatório em PDF que
            será enviado ao cliente ou arquivado pela empresa.
          </p>
        </div>

        {/* Regras de Preenchimento */}
        <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            📌 Regras de Preenchimento
          </h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start">
              <span className="font-semibold text-yellow-500 mr-3">1.</span>
              <p>
                Preencha todos os campos com atenção e profissionalismo. Evite
                abreviações, gírias ou erros ortográficos.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-yellow-500 mr-3">2.</span>
              <p>
                As fotos devem ser tiradas com o celular na horizontal
                (paisagem). Enquadre bem o local, equipamentos e
                infraestruturas.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-yellow-500 mr-3">3.</span>
              <p>
                Nunca deixe de preencher o relatório. Mesmo que o serviço tenha
                sido simples, o relatório é obrigatório para fins de controle e
                garantia.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-yellow-500 mr-3">4.</span>
              <p>
                Preencha o formulário ainda no local do atendimento. Isso evita
                esquecimento de detalhes importantes.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-yellow-500 mr-3">5.</span>
              <p>
                Somente técnicos autorizados devem preencher. O conteúdo é
                registrado e vinculado ao responsável pela execução.
              </p>
            </div>
          </div>
        </div>

        {/* Cards dos Geradores de Relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card - Relatório de Visita Técnica */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🔧</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Relatório de Visita Técnica
                </h3>
                <p className="text-sm text-gray-400">
                  Manutenção e Diagnóstico
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Usado para registrar manutenções, diagnósticos, suporte e qualquer
              atendimento técnico em campo. Deve ser preenchido imediatamente
              após o atendimento.
            </p>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                  Abrir Formulário
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Relatório de Visita Técnica
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Preencha os dados da visita técnica realizada
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dados do Cliente */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Cliente
                      </label>
                      <input
                        type="text"
                        name="cliente"
                        value={formData.cliente}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Local
                      </label>
                      <input
                        type="text"
                        name="local"
                        value={formData.local}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Data da Visita
                      </label>
                      <input
                        type="date"
                        name="data"
                        value={formData.data}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Período
                      </label>
                      <select
                        name="periodo"
                        value={formData.periodo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Técnico Responsável
                      </label>
                      <input
                        type="text"
                        name="tecnico"
                        value={formData.tecnico}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Status das Câmeras */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Total de Câmeras
                      </label>
                      <input
                        type="number"
                        name="cameras_total"
                        value={formData.cameras_total}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Câmeras Funcionando
                      </label>
                      <input
                        type="number"
                        name="cameras_ok"
                        value={formData.cameras_ok}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Status do Sistema */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Limpeza Realizada
                      </label>
                      <select
                        name="limpeza"
                        value={formData.limpeza}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Status do HD
                      </label>
                      <select
                        name="status_hd"
                        value={formData.status_hd}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="Funcionando 100%">
                          Funcionando 100%
                        </option>
                        <option value="Funcionando parcialmente">
                          Funcionando parcialmente
                        </option>
                        <option value="Com problemas">Com problemas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Status do Sistema
                      </label>
                      <select
                        name="status_sistema"
                        value={formData.status_sistema}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="Funcionando 100%">
                          Funcionando 100%
                        </option>
                        <option value="Funcionando parcialmente">
                          Funcionando parcialmente
                        </option>
                        <option value="Com problemas">Com problemas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Armazenamento (dias)
                      </label>
                      <input
                        type="text"
                        name="armazenamento_dias"
                        value={formData.armazenamento_dias}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Ex: 30 dias"
                      />
                    </div>
                  </div>

                  {/* Testes Realizados */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Teste do HD
                      </label>
                      <select
                        name="teste_hd"
                        value={formData.teste_hd}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Teste de Gravações
                      </label>
                      <select
                        name="teste_gravacoes"
                        value={formData.teste_gravacoes}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                      </select>
                    </div>
                  </div>

                  {/* Problemas e Recomendações */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Problemas Identificados
                    </label>
                    <textarea
                      name="problemas"
                      value={formData.problemas}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Descreva os problemas encontrados..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Recomendações
                    </label>
                    <textarea
                      name="recomendacoes"
                      value={formData.recomendacoes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Descreva as recomendações..."
                    />
                  </div>

                  {/* Upload de Fotos */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Fotos da Visita (máximo 9)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {selectedFiles.length > 0 && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="border-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-400"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isGenerating}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      {isGenerating ? "Gerando..." : "Gerar Relatório"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Card - Relatório de Orçamento Técnico */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Relatório de Orçamento Técnico
                </h3>
                <p className="text-sm text-gray-400">Orçamentos Presenciais</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Para registrar todas as informações de orçamentos presenciais:
              equipamentos que serão orçados, condições do local e fotos do
              ambiente.
            </p>

            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              Abrir Formulário
            </Button>
          </div>

          {/* Card - Relatório de Entrega de Serviço */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Relatório de Entrega de Serviço
                </h3>
                <p className="text-sm text-gray-400">Documento Oficial</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Usado após a finalização do serviço. Deve conter todos os detalhes
              da instalação, materiais usados e fotos da execução. Serve como
              documento oficial de entrega ao cliente.
            </p>

            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              Abrir Formulário
            </Button>
          </div>
        </div>

        {/* Botão para mostrar/ocultar relatórios de teste */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTestButtons(!showTestButtons)}
            className="text-gray-300 border-gray-700 hover:border-yellow-500 hover:text-yellow-400"
          >
            {showTestButtons
              ? "🔒 Ocultar Relatórios Teste"
              : "🧪 Relatórios Teste"}
          </Button>
        </div>

        {/* Botões de teste (ocultos por padrão) */}
        {showTestButtons && (
          <div className="mt-4 p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <h3 className="text-sm font-medium text-white mb-3">
              🧪 Geradores de Teste (Apenas para Desenvolvimento)
            </h3>
            <div className="flex gap-4 mb-4">
              <Button
                variant="outline"
                onClick={async () => {
                  try {
                    console.log("=== GERANDO RELATÓRIO DE VISITA DE TESTE ===");

                    // Dados de teste para relatório de visita
                    const testData = {
                      cliente: "RKS MATRIZ",
                      local: "Rua das Flores, 123 - Centro",
                      data: "2025-01-15",
                      periodo: "Manhã",
                      tecnico: "João Silva",
                      cameras_total: "8",
                      cameras_ok: "7",
                      limpeza: "Sim",
                      status_hd: "Funcionando 100%",
                      status_sistema: "Funcionando 100%",
                      armazenamento_dias: "30 dias",
                      teste_hd: "Sim",
                      teste_gravacoes: "Sim",
                      problemas:
                        "Câmera 3 apresentando falhas intermitentes. Necessário verificar conexões e possível substituição do cabo.",
                      recomendacoes:
                        "Substituir cabo da câmera 3 na próxima visita. Manter monitoramento das demais câmeras. Agendar nova visita em 15 dias.",
                      fotos: null,
                    };

                    // Criar imagens de teste (quadrados vazios)
                    const createTestImage = (
                      width: number,
                      height: number,
                      text: string
                    ) => {
                      const canvas = document.createElement("canvas");
                      canvas.width = width;
                      canvas.height = height;
                      const ctx = canvas.getContext("2d");
                      if (ctx) {
                        // Fundo cinza claro
                        ctx.fillStyle = "#f5f5f5";
                        ctx.fillRect(0, 0, width, height);
                        // Borda cinza
                        ctx.strokeStyle = "#ccc";
                        ctx.lineWidth = 2;
                        ctx.strokeRect(0, 0, width, height);
                        // Texto
                        ctx.fillStyle = "#666";
                        ctx.font = "16px Arial";
                        ctx.textAlign = "center";
                        ctx.fillText(text, width / 2, height / 2);
                      }
                      return new Promise<File>((resolve) => {
                        canvas.toBlob((blob) => {
                          if (blob) {
                            const file = new File([blob], `${text}.png`, {
                              type: "image/png",
                            });
                            resolve(file);
                          }
                        });
                      });
                    };

                    // Gerar imagens de teste
                    const testImages = await Promise.all([
                      createTestImage(
                        400,
                        300,
                        "Foto 1 - Câmera 3 com problema"
                      ),
                      createTestImage(400, 300, "Foto 2 - DVR funcionando"),
                      createTestImage(
                        400,
                        300,
                        "Foto 3 - Câmeras operacionais"
                      ),
                      createTestImage(400, 300, "Foto 4 - Local da instalação"),
                    ]);

                    console.log("Dados de teste:", testData);
                    console.log("Imagens de teste geradas:", testImages.length);

                    // Gerar PDF de teste
                    const blob = await generatePDFRelatorio(
                      testData,
                      testImages
                    );

                    const filename = `Relatorio_Visita_Teste_${new Date()
                      .toISOString()
                      .slice(0, 10)}.pdf`;
                    downloadRelatorio(blob, filename);

                    console.log("=== RELATÓRIO DE VISITA DE TESTE GERADO ===");
                    alert("Relatório de visita de teste gerado com sucesso!");
                  } catch (error) {
                    console.error(
                      "Erro ao gerar relatório de visita de teste:",
                      error
                    );
                    alert(
                      `Erro ao gerar relatório de visita de teste: ${error}`
                    );
                  }
                }}
                className="border-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-400"
              >
                🧪 Gerar Relatório Visita Teste
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
