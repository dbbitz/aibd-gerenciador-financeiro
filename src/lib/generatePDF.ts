import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

export const generatePDFRelatorio = async (
  data: RelatorioVisitaData,
  images: File[] = []
): Promise<Blob> => {
  // Calcular percentual de funcionamento
  const total = parseInt(data.cameras_total) || 0;
  const ok = parseInt(data.cameras_ok) || 0;
  const percentual = total > 0 ? Math.round((ok / total) * 100) : 0;

  // Formatar data
  const dataFormatada = data.data
    ? new Date(data.data).toLocaleDateString("pt-BR")
    : "";

  // Criar elemento HTML temporário com estilo similar aos outros relatórios
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "0";
  tempDiv.style.width = "800px";
  tempDiv.style.padding = "20px";
  tempDiv.style.fontFamily = "Arial, sans-serif";
  tempDiv.style.fontSize = "12px";
  tempDiv.style.lineHeight = "1.4";
  tempDiv.style.color = "#333";
  tempDiv.style.backgroundColor = "white";
  tempDiv.style.border = "1px solid #ccc";

  // HTML do relatório com estilo similar aos outros
  const html = `
    <div style="text-align: center; border-bottom: 2px solid #666; padding-bottom: 20px; margin-bottom: 30px;">
      <h1 style="margin: 0; color: #333; font-size: 24px;">RELATÓRIO DE VISITA TÉCNICA SEMANAL</h1>
      <p style="margin: 5px 0; color: #666;">Data: ${dataFormatada}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">1. DADOS DO CLIENTE</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div><strong style="color: #555;">Cliente:</strong> <span style="color: #333;">${
          data.cliente
        }</span></div>
        <div><strong style="color: #555;">Local:</strong> <span style="color: #333;">${
          data.local
        }</span></div>
        <div><strong style="color: #555;">Data da Visita:</strong> <span style="color: #333;">${dataFormatada}</span></div>
        <div><strong style="color: #555;">Período:</strong> <span style="color: #333;">${
          data.periodo
        }</span></div>
        <div><strong style="color: #555;">Técnico Responsável:</strong> <span style="color: #333;">${
          data.tecnico
        }</span></div>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">2. EQUIPAMENTOS</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div><strong style="color: #555;">Total de Câmeras:</strong> <span style="color: #333;">${
          data.cameras_total
        }</span></div>
        <div><strong style="color: #555;">Câmeras Funcionando:</strong> <span style="color: #333;">${
          data.cameras_ok
        }</span></div>
        <div><strong style="color: #555;">Percentual de Funcionamento:</strong> <span style="color: #333; font-weight: bold;">${percentual}%</span></div>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">3. STATUS DOS EQUIPAMENTOS</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div><strong style="color: #555;">Limpeza das Câmeras:</strong> <span style="color: #333;">${
          data.limpeza
        }</span></div>
        <div><strong style="color: #555;">Status do HD:</strong> <span style="color: #333;">${
          data.status_hd
        }</span></div>
        <div><strong style="color: #555;">Status do Sistema:</strong> <span style="color: #333;">${
          data.status_sistema
        }</span></div>
        <div><strong style="color: #555;">Armazenamento (dias):</strong> <span style="color: #333;">${
          data.armazenamento_dias
        }</span></div>
        <div><strong style="color: #555;">Teste de HD:</strong> <span style="color: #333;">${
          data.teste_hd
        }</span></div>
        <div><strong style="color: #555;">Teste de Gravações:</strong> <span style="color: #333;">${
          data.teste_gravacoes
        }</span></div>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">4. ANÁLISE TÉCNICA</h2>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; margin-bottom: 10px;">Problemas Identificados:</h3>
        <div style="padding: 15px; border: 1px solid #ddd; background-color: #f5f5f5; border-radius: 5px; color: #333;">
          ${data.problemas || "Nenhum problema identificado."}
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; margin-bottom: 10px;">Recomendações:</h3>
        <div style="padding: 15px; border: 1px solid #ddd; background-color: #f5f5f5; border-radius: 5px; color: #333;">
          ${data.recomendacoes || "Nenhuma recomendação específica."}
        </div>
      </div>
    </div>
  `;

  // Criar PDF com páginas separadas
  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 295; // A4 height in mm

  // Gerar conteúdo principal
  tempDiv.innerHTML = html;
  document.body.appendChild(tempDiv);

  try {
    const mainCanvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: 800,
      height: tempDiv.scrollHeight,
    });

    const mainImgData = mainCanvas.toDataURL("image/png");
    const mainImgHeight = (mainCanvas.height * imgWidth) / mainCanvas.width;
    let heightLeft = mainImgHeight;
    let position = 0;

    // Adicionar páginas do conteúdo principal
    pdf.addImage(mainImgData, "PNG", 0, position, imgWidth, mainImgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - mainImgHeight;
      pdf.addPage();
      pdf.addImage(mainImgData, "PNG", 0, position, imgWidth, mainImgHeight);
      heightLeft -= pageHeight;
    }

    // Se há imagens, adicionar página separada para anexos
    if (images.length > 0) {
      // Remover conteúdo principal do DOM
      document.body.removeChild(tempDiv);

      // Criar elemento para anexos
      const anexosDiv = document.createElement("div");
      anexosDiv.style.position = "absolute";
      anexosDiv.style.left = "-9999px";
      anexosDiv.style.top = "0";
      anexosDiv.style.width = "800px";
      anexosDiv.style.padding = "20px";
      anexosDiv.style.fontFamily = "Arial, sans-serif";
      anexosDiv.style.fontSize = "12px";
      anexosDiv.style.lineHeight = "1.4";
      anexosDiv.style.color = "#333";
      anexosDiv.style.backgroundColor = "white";
      anexosDiv.style.border = "1px solid #ccc";

      console.log("Gerando anexos para", images.length, "imagens");

      const anexosHTML = `
        <div style="text-align: center; border-bottom: 2px solid #666; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="margin: 0; color: #333; font-size: 24px;">ANEXOS FOTOGRÁFICOS</h1>
          <p style="margin: 5px 0; color: #666;">Continuação</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
          ${images
            .map((image, index) => {
              const imageUrl = URL.createObjectURL(image);
              console.log(
                `Anexo ${index + 1}: ${image.name} - ${image.size} bytes`
              );
              return `
                <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; text-align: center; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between;">
                  <img src="${imageUrl}" style="max-width: 100%; max-height: 150px; object-fit: cover; border-radius: 3px; flex: 1;" alt="Anexo ${
                index + 1
              }" onload="console.log('Imagem ${index + 1} carregada')" />
                  <div>
                    <p style="margin: 5px 0;"><strong style="color: #333;">Anexo ${
                      index + 1
                    }</strong></p>
                    <p style="font-size: 10px; color: #666; margin: 0;">${
                      image.name
                    }</p>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      `;

      anexosDiv.innerHTML = anexosHTML;
      document.body.appendChild(anexosDiv);

      try {
        // Aguardar as imagens carregarem
        const imagePromises = Array.from(anexosDiv.querySelectorAll("img")).map(
          (img) => {
            return new Promise((resolve) => {
              if (img.complete) {
                resolve(null);
              } else {
                img.onload = () => resolve(null);
                img.onerror = () => resolve(null);
              }
            });
          }
        );

        await Promise.all(imagePromises);
        await new Promise((resolve) => setTimeout(resolve, 200)); // Aguardar um pouco mais

        // Calcular altura real do conteúdo
        const realHeight = anexosDiv.scrollHeight;
        console.log("Altura real dos anexos:", realHeight);

        const anexosCanvas = await html2canvas(anexosDiv, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: 800,
          height: realHeight,
          scrollY: 0,
          scrollX: 0,
          logging: true,
        });

        const anexosImgData = anexosCanvas.toDataURL("image/png");
        const anexosImgHeight =
          (anexosCanvas.height * imgWidth) / anexosCanvas.width;
        let anexosHeightLeft = anexosImgHeight;
        let anexosPosition = 0;

        // Adicionar nova página para anexos
        pdf.addPage();
        pdf.addImage(
          anexosImgData,
          "PNG",
          0,
          anexosPosition,
          imgWidth,
          anexosImgHeight
        );
        anexosHeightLeft -= pageHeight;

        // Adicionar páginas adicionais para anexos se necessário
        while (anexosHeightLeft >= 0) {
          anexosPosition = anexosHeightLeft - anexosImgHeight;
          pdf.addPage();
          pdf.addImage(
            anexosImgData,
            "PNG",
            0,
            anexosPosition,
            imgWidth,
            anexosImgHeight
          );
          anexosHeightLeft -= pageHeight;
        }

        // Limpar anexos
        document.body.removeChild(anexosDiv);
      } catch (error) {
        console.error("Erro ao gerar anexos:", error);
        // Se houver erro nos anexos, continuar sem eles
        if (document.body.contains(anexosDiv)) {
          document.body.removeChild(anexosDiv);
        }
      }
    }

    // Gerar blob
    const pdfBlob = pdf.output("blob");
    return pdfBlob;
  } finally {
    // Limpar conteúdo principal
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv);
    }
  }
};

export const downloadRelatorio = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
