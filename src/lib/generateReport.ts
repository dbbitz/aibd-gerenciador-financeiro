import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import { generatePDFRelatorio } from "./generatePDF";

export interface RelatorioVisitaData {
  cliente: string;
  local: string;
  data: string;
  periodo: string;
  tecnico: string;
  cameras_total: string;
  cameras_ok: string;
  limpeza: string;
  status_hd: string;
  status_sistema: string;
  armazenamento_dias: string;
  teste_hd: string;
  teste_gravacoes: string;
  problemas: string;
  recomendacoes: string;
  fotos?: FileList | null;
}

// Função para tratar valores undefined/null
const safeValue = (value: any, defaultValue: string = ""): string => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }
  return String(value);
};

// Função para converter imagem para base64 com prefixo data URL
const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Manter o prefixo data URL completo para docxtemplater
      console.log(
        `Imagem ${file.name} convertida para base64, tamanho: ${result.length} caracteres`
      );
      resolve(result);
    };
    reader.onerror = (error) => {
      console.error(`Erro ao converter imagem ${file.name}:`, error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

// Função para verificar se o template tem as tags de anexos
const checkTemplateForImageTags = (zip: PizZip): boolean => {
  try {
    const content = zip.files["word/document.xml"].asText();
    console.log(
      "Conteúdo do template encontrado:",
      content.substring(0, 500) + "..."
    );

    const hasImageTags =
      content.includes("{%anexo1}") ||
      content.includes("{anexo1}") ||
      content.includes("anexo1");

    console.log("Template tem tags de anexos:", hasImageTags);

    // Verificar todas as tags de anexo
    for (let i = 1; i <= 9; i++) {
      const tag = `{%anexo${i}}`;
      const hasTag = content.includes(tag);
      console.log(`Tag ${tag} encontrada:`, hasTag);
    }

    return hasImageTags;
  } catch (error) {
    console.error("Erro ao verificar template:", error);
    return false;
  }
};

// Função para criar módulo de imagem
const createImageModule = (images: { [key: string]: string }) => {
  return new ImageModule({
    centered: false,
    fileType: "docx",
    getImage: function (tagValue: string): string {
      console.log("Procurando imagem para tag:", tagValue);
      const imageData = images[tagValue];
      if (imageData) {
        console.log("Imagem encontrada para", tagValue);
        return imageData;
      }
      console.log("Imagem não encontrada para", tagValue);
      return "";
    },
    getSize: function (_img: string, _tagValue: string) {
      console.log("Calculando tamanho para", _tagValue);
      // Retornar tamanho padrão (largura: 400px, altura: 300px)
      return { width: 400, height: 300 };
    },
  });
};

// Função alternativa para inserir imagens manualmente
const insertImagesManually = (
  zip: PizZip,
  images: { [key: string]: string }
) => {
  try {
    console.log("Tentando inserção manual de imagens...");

    // Obter o conteúdo XML do documento
    const documentXml = zip.files["word/document.xml"].asText();
    let modifiedXml = documentXml;

    // Para cada imagem, substituir a tag por uma referência de imagem
    Object.keys(images).forEach((key, index) => {
      const tag = `{%${key}}`;
      if (images[key] && images[key] !== "") {
        // Criar uma referência de imagem simples
        const imageRef = `[IMAGEM ${index + 1} - ${key}]`;
        modifiedXml = modifiedXml.replace(new RegExp(tag, "g"), imageRef);
        console.log(`Substituída tag ${tag} por ${imageRef}`);
      } else {
        // Remover tag vazia
        modifiedXml = modifiedXml.replace(new RegExp(tag, "g"), "");
        console.log(`Removida tag vazia ${tag}`);
      }
    });

    // Atualizar o arquivo XML
    zip.file("word/document.xml", modifiedXml);
    console.log("XML do documento atualizado com referências de imagem");

    return true;
  } catch (error) {
    console.error("Erro na inserção manual de imagens:", error);
    return false;
  }
};

export const generateRelatorioVisita = async (
  data: RelatorioVisitaData,
  format: "docx" | "pdf" = "docx"
): Promise<Blob> => {
  try {
    console.log("Iniciando geração do relatório...");
    console.log("Formato solicitado:", format);
    console.log("Dados recebidos:", data);
    console.log("Fotos recebidas:", data.fotos);

    // Se for PDF, usar a função específica
    if (format === "pdf") {
      console.log("Gerando PDF...");

      // Processar imagens para PDF
      const images: string[] = [];
      if (data.fotos && data.fotos.length > 0) {
        console.log(`Processando ${data.fotos.length} imagens para PDF...`);
        const maxImages = Math.min(data.fotos.length, 9);

        for (let i = 0; i < maxImages; i++) {
          try {
            const file = data.fotos[i];
            console.log(`Processando imagem ${i + 1} para PDF: ${file.name}`);
            const base64 = await convertImageToBase64(file);
            images.push(base64);
            console.log(`Imagem ${i + 1} processada para PDF`);
          } catch (error) {
            console.error(`Erro ao processar imagem ${i + 1} para PDF:`, error);
          }
        }
      }

      // Converter FileList para array de Files para o PDF
      const filesArray: File[] = [];
      if (data.fotos) {
        for (let i = 0; i < data.fotos.length; i++) {
          filesArray.push(data.fotos[i]);
        }
      }
      return await generatePDFRelatorio(data, filesArray);
    }

    // Para DOCX, continuar com o processo normal
    // Carregar o template
    const response = await fetch("/template-relatorio-visita.docx");
    if (!response.ok) {
      throw new Error(`Erro ao carregar template: ${response.status}`);
    }
    const templateBuffer = await response.arrayBuffer();
    console.log("Template carregado com sucesso");

    // Criar instância do PizZip
    const zip = new PizZip(templateBuffer);

    // Verificar se o template tem as tags de anexos
    const hasImageTags = checkTemplateForImageTags(zip);
    if (!hasImageTags) {
      console.warn("⚠️ ATENÇÃO: Template não parece ter tags de anexos!");
      console.warn(
        "Verifique se o template tem as tags: {%anexo1}, {%anexo2}, etc."
      );
    }

    // Processar imagens se existirem
    const images: { [key: string]: string } = {};
    if (data.fotos && data.fotos.length > 0) {
      console.log(`Processando ${data.fotos.length} imagens...`);
      const maxImages = Math.min(data.fotos.length, 9);

      for (let i = 0; i < maxImages; i++) {
        try {
          const file = data.fotos[i];
          console.log(
            `Processando imagem ${i + 1}: ${file.name} (${file.size} bytes)`
          );
          const base64 = await convertImageToBase64(file);
          images[`anexo${i + 1}`] = base64;
          console.log(`Imagem ${i + 1} processada com sucesso`);
        } catch (error) {
          console.error(`Erro ao processar imagem ${i + 1}:`, error);
          images[`anexo${i + 1}`] = "";
        }
      }

      // Preencher slots vazios com strings vazias
      for (let i = maxImages; i < 9; i++) {
        images[`anexo${i + 1}`] = "";
        console.log(`Slot ${i + 1} preenchido com string vazia`);
      }
    } else {
      console.log(
        "Nenhuma imagem recebida, preenchendo todos os slots com strings vazias"
      );
      // Se não há imagens, preencher todos os slots com strings vazias
      for (let i = 1; i <= 9; i++) {
        images[`anexo${i}`] = "";
      }
    }

    console.log("Imagens processadas:", Object.keys(images));
    console.log(
      "Slots com imagens:",
      Object.keys(images).filter((key) => images[key] !== "")
    );

    // Tentar usar módulo de imagem primeiro
    let doc: Docxtemplater;
    try {
      const imageModule = createImageModule(images);
      doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        modules: [imageModule],
      });
      console.log("Módulo de imagem configurado com sucesso");
    } catch (error) {
      console.warn(
        "Erro ao configurar módulo de imagem, tentando inserção manual:",
        error
      );

      // Fallback: inserção manual
      insertImagesManually(zip, images);

      doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        modules: [],
      });
    }

    // Preparar dados para substituição com tratamento de valores undefined
    const templateData = {
      cliente: safeValue(data.cliente, "Cliente não informado"),
      local: safeValue(data.local, "Local não informado"),
      data: safeValue(data.data),
      periodo: safeValue(data.periodo, "Período não informado"),
      tecnico: safeValue(data.tecnico, "Técnico não informado"),
      cameras_total: safeValue(data.cameras_total, "0"),
      cameras_ok: safeValue(data.cameras_ok, "0"),
      limpeza: safeValue(data.limpeza, "Não informado"),
      status_hd: safeValue(data.status_hd, "Status não informado"),
      status_sistema: safeValue(data.status_sistema, "Status não informado"),
      armazenamento_dias: safeValue(data.armazenamento_dias, "Não informado"),
      teste_hd: safeValue(data.teste_hd, "Não informado"),
      teste_gravacoes: safeValue(data.teste_gravacoes, "Não informado"),
      problemas: safeValue(data.problemas, "Nenhum problema identificado"),
      recomendacoes: safeValue(
        data.recomendacoes,
        "Nenhuma recomendação específica"
      ),
      data_formatada: data.data
        ? new Date(data.data).toLocaleDateString("pt-BR")
        : "Data não informada",
      percentual_cameras: (() => {
        const total = parseInt(data.cameras_total || "0");
        const ok = parseInt(data.cameras_ok || "0");
        if (total > 0 && ok >= 0) {
          return Math.round((ok / total) * 100);
        }
        return 0;
      })(),
      // Adicionar anexos como dados simples (para compatibilidade)
      ...images,
    };

    // Log para debug
    console.log("Dados do template:", templateData);
    console.log(
      "Tags de anexos disponíveis:",
      Object.keys(templateData).filter((key) => key.startsWith("anexo"))
    );

    // Renderizar o documento
    console.log("Renderizando documento...");
    doc.render(templateData);
    console.log("Documento renderizado com sucesso");

    // Gerar o arquivo final
    console.log("Gerando arquivo final...");
    const output = doc.getZip().generate({ type: "blob" });
    console.log("Arquivo gerado com sucesso, tamanho:", output.size, "bytes");

    return output;
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    throw new Error(`Falha ao gerar o relatório: ${error}`);
  }
};

export const downloadRelatorio = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
