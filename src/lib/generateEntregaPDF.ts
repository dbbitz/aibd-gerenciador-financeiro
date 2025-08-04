import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface EntregaData {
  // Seção 1: Dados do Cliente e Projeto
  cliente_nome: string;
  cliente_empresa: string;
  cliente_contato: string;
  endereco_servico: string;
  numero_contrato: string;
  data_entrega: string;

  // Seção 2: Descrição do Serviço
  descricao_servico: string;
  servicos_realizados: {
    cftv: boolean;
    controle_acesso: boolean;
    cerca_eletrica: boolean;
    alarme: boolean;
    automacao: boolean;
    infraestrutura: boolean;
  };
  outros_servicos: string;

  // Seção 3: Equipamentos Instalados
  equipamentos: Array<{
    nome: string;
    modelo: string;
    quantidade: string;
    serie: string;
    obs: string;
  }>;

  // Seção 4: Materiais de Infraestrutura
  materiais: Array<{
    tipo: string;
    quantidade: string;
    obs: string;
  }>;

  // Seção 5: Testes e Funcionamento
  testes_realizados: string;
  equipamentos_testados: string;
  resultado_testes: string;
  tem_falha: boolean;
  descricao_falha: string;

  // Seção 6: Condições no Local
  condicoes_ambiente: string;
  restricoes_encontradas: string;
  observacoes_adicionais: string;

  // Seção 8: Responsável pela Execução
  tecnico_nome: string;
  tecnico_contato: string;
  data_preenchimento: string;

  // Seção 9: Anexos
  fotos?: FileList | null;
}

export const generateEntregaPDF = async (
  data: EntregaData,
  selectedFiles: File[],
  clienteAssinatura: string,
  tecnicoAssinatura: string
): Promise<Blob> => {
  // Validar e sanitizar os dados
  const sanitizedData = {
    cliente_nome: data.cliente_nome || "Não informado",
    cliente_empresa: data.cliente_empresa || "Não informado",
    cliente_contato: data.cliente_contato || "Não informado",
    endereco_servico: data.endereco_servico || "Não informado",
    numero_contrato: data.numero_contrato || "Não informado",
    data_entrega: data.data_entrega || new Date().toISOString().split("T")[0],
    descricao_servico: data.descricao_servico || "Não informado",
    servicos_realizados: {
      cftv: data.servicos_realizados?.cftv || false,
      controle_acesso: data.servicos_realizados?.controle_acesso || false,
      cerca_eletrica: data.servicos_realizados?.cerca_eletrica || false,
      alarme: data.servicos_realizados?.alarme || false,
      automacao: data.servicos_realizados?.automacao || false,
      infraestrutura: data.servicos_realizados?.infraestrutura || false,
    },
    outros_servicos: data.outros_servicos || "",
    equipamentos: data.equipamentos || [],
    materiais: data.materiais || [],
    testes_realizados: data.testes_realizados || "Não informado",
    equipamentos_testados: data.equipamentos_testados || "Não informado",
    resultado_testes: data.resultado_testes || "Não informado",
    tem_falha: data.tem_falha || false,
    descricao_falha: data.descricao_falha || "",
    condicoes_ambiente: data.condicoes_ambiente || "Não informado",
    restricoes_encontradas: data.restricoes_encontradas || "Não informado",
    observacoes_adicionais: data.observacoes_adicionais || "Não informado",
    tecnico_nome: data.tecnico_nome || "Não informado",
    tecnico_contato: data.tecnico_contato || "Não informado",
    data_preenchimento:
      data.data_preenchimento || new Date().toISOString().split("T")[0],
  };

  // Criar um elemento div simples para renderizar o conteúdo
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "800px";
  container.style.padding = "20px";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.fontSize = "12px";
  container.style.lineHeight = "1.4";
  container.style.color = "#333";
  container.style.backgroundColor = "white";
  container.style.border = "1px solid #ccc";

  // Criar o conteúdo HTML de forma mais simples - PRIMEIRA PÁGINA (seções 1-5)
  container.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid #666; padding-bottom: 20px; margin-bottom: 30px;">
      <h1 style="margin: 0; color: #333; font-size: 24px;">RELATÓRIO DE ENTREGA DE SERVIÇO</h1>
      <p style="margin: 5px 0; color: #666;">Data: ${new Date(
        sanitizedData.data_preenchimento
      ).toLocaleDateString("pt-BR")}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">1. INFORMAÇÕES GERAIS</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div><strong style="color: #555;">Nome do Cliente:</strong> <span style="color: #333;">${
          sanitizedData.cliente_nome
        }</span></div>
        <div><strong style="color: #555;">Empresa/Condomínio:</strong> <span style="color: #333;">${
          sanitizedData.cliente_empresa
        }</span></div>
        <div><strong style="color: #555;">Contato do Cliente:</strong> <span style="color: #333;">${
          sanitizedData.cliente_contato
        }</span></div>
        <div><strong style="color: #555;">Número do Contrato:</strong> <span style="color: #333;">${
          sanitizedData.numero_contrato
        }</span></div>
        <div><strong style="color: #555;">Data da Entrega:</strong> <span style="color: #333;">${new Date(
          sanitizedData.data_entrega
        ).toLocaleDateString("pt-BR")}</span></div>
      </div>
      <div style="margin-top: 10px;"><strong style="color: #555;">Endereço do Serviço:</strong> <span style="color: #333;">${
        sanitizedData.endereco_servico
      }</span></div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">2. DESCRIÇÃO DOS SERVIÇOS REALIZADOS</h2>
      <div><strong style="color: #555;">Descrição Geral do Serviço:</strong> <span style="color: #333;">${
        sanitizedData.descricao_servico
      }</span></div>
      <div style="margin-top: 10px;">
        <strong style="color: #555;">Tipos de Serviço Realizados:</strong>
        <ul style="margin: 5px 0; padding-left: 20px; color: #333;">
          <li>${
            sanitizedData.servicos_realizados.cftv ? "☑" : "☐"
          } CFTV / Câmeras</li>
          <li>${
            sanitizedData.servicos_realizados.controle_acesso ? "☑" : "☐"
          } Controle de Acesso</li>
          <li>${
            sanitizedData.servicos_realizados.cerca_eletrica ? "☑" : "☐"
          } Cerca Elétrica</li>
          <li>${
            sanitizedData.servicos_realizados.alarme ? "☑" : "☐"
          } Alarme / Segurança</li>
          <li>${
            sanitizedData.servicos_realizados.automacao ? "☑" : "☐"
          } Automação Residencial</li>
          <li>${
            sanitizedData.servicos_realizados.infraestrutura ? "☑" : "☐"
          } Infraestrutura (tubos, caixas, cabeamento)</li>
          ${
            sanitizedData.outros_servicos
              ? `<li>☑ Outros: ${sanitizedData.outros_servicos}</li>`
              : ""
          }
        </ul>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">3. TESTES REALIZADOS E FUNCIONAMENTO</h2>
      <div><strong style="color: #555;">Testes Realizados:</strong> <span style="color: #333;">${
        sanitizedData.testes_realizados
      }</span></div>
      <div><strong style="color: #555;">Equipamentos Testados:</strong> <span style="color: #333;">${
        sanitizedData.equipamentos_testados
      }</span></div>
      <div><strong style="color: #555;">Resultado dos Testes:</strong> <span style="color: #333;">${
        sanitizedData.resultado_testes
      }</span></div>
      <div><strong style="color: #555;">Falhas ou Pendências:</strong> <span style="color: #333;">${
        sanitizedData.tem_falha ? "Sim" : "Não"
      }</span></div>
      ${
        sanitizedData.tem_falha
          ? `<div><strong style="color: #555;">Descrição da Falha:</strong> <span style="color: #333;">${sanitizedData.descricao_falha}</span></div>`
          : ""
      }
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">4. CONDIÇÕES DO AMBIENTE E OBSERVAÇÕES</h2>
      <div><strong style="color: #555;">Condições do Ambiente:</strong> <span style="color: #333;">${
        sanitizedData.condicoes_ambiente
      }</span></div>
      <div><strong style="color: #555;">Restrições Encontradas:</strong> <span style="color: #333;">${
        sanitizedData.restricoes_encontradas
      }</span></div>
      <div><strong style="color: #555;">Observações Adicionais:</strong> <span style="color: #333;">${
        sanitizedData.observacoes_adicionais
      }</span></div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">5. TÉCNICO E RESPONSÁVEL PELA ENTREGA</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div><strong style="color: #555;">Nome do Técnico:</strong> <span style="color: #333;">${
          sanitizedData.tecnico_nome
        }</span></div>
        <div><strong style="color: #555;">Contato do Técnico:</strong> <span style="color: #333;">${
          sanitizedData.tecnico_contato
        }</span></div>
        <div><strong style="color: #555;">Data do Preenchimento:</strong> <span style="color: #333;">${new Date(
          sanitizedData.data_preenchimento
        ).toLocaleDateString("pt-BR")}</span></div>
      </div>
    </div>
  `;

  // Adicionar ao DOM
  document.body.appendChild(container);

  try {
    // Aguardar um pouco para garantir que o DOM foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Capturar o conteúdo
    const canvas = await html2canvas(container, {
      width: 800,
      height: container.scrollHeight || 1000,
      scrollY: 0,
      scrollX: 0,
      logging: true,
      useCORS: true,
      allowTaint: true,
    });

    // Criar PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Adicionar páginas do conteúdo principal
    pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // SEGUNDA PÁGINA - Seções 6-8 (Termos e Assinaturas)
    const segundaPaginaContainer = document.createElement("div");
    segundaPaginaContainer.style.position = "absolute";
    segundaPaginaContainer.style.left = "-9999px";
    segundaPaginaContainer.style.top = "0";
    segundaPaginaContainer.style.width = "800px";
    segundaPaginaContainer.style.padding = "20px";
    segundaPaginaContainer.style.fontFamily = "Arial, sans-serif";
    segundaPaginaContainer.style.fontSize = "12px";
    segundaPaginaContainer.style.backgroundColor = "white";
    segundaPaginaContainer.style.border = "1px solid #ccc";

    segundaPaginaContainer.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #666; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="margin: 0; color: #333; font-size: 24px;">RELATÓRIO DE ENTREGA DE SERVIÇO</h1>
        <p style="margin: 5px 0; color: #666;">Continuação</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">6. DETALHAMENTO DOS EQUIPAMENTOS</h2>
        ${
          sanitizedData.equipamentos.length > 0
            ? `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">` +
              sanitizedData.equipamentos
                .map(
                  (equip, index) => `
            <div style="border: 1px solid #ddd; padding: 12px; border-radius: 8px; background: #f5f5f5; min-height: 120px;">
              <h3 style="margin: 0 0 8px 0; color: #333; font-size: 14px; text-align: center;">Equipamento ${
                index + 1
              }</h3>
              <div style="font-size: 11px; line-height: 1.3;">
                <div style="margin-bottom: 4px;"><strong style="color: #555;">Nome:</strong><br><span style="color: #333;">${
                  equip.nome || "Não informado"
                }</span></div>
                <div style="margin-bottom: 4px;"><strong style="color: #555;">Modelo:</strong><br><span style="color: #333;">${
                  equip.modelo || "Não informado"
                }</span></div>
                <div style="margin-bottom: 4px;"><strong style="color: #555;">Qtd:</strong> <span style="color: #333;">${
                  equip.quantidade || "Não informado"
                }</span></div>
                ${
                  equip.serie
                    ? `<div style="margin-bottom: 4px;"><strong style="color: #555;">Série:</strong><br><span style="color: #333; font-size: 10px;">${equip.serie}</span></div>`
                    : ""
                }
                ${
                  equip.obs
                    ? `<div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #ddd;"><strong style="color: #555;">Obs:</strong><br><span style="color: #333; font-size: 10px;">${equip.obs}</span></div>`
                    : ""
                }
              </div>
            </div>
          `
                )
                .join("") +
              `</div>`
            : '<div style="padding: 10px; background: #f5f5f5; border-radius: 5px; color: #666;">Nenhum equipamento registrado</div>'
        }
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">7. MATERIAIS UTILIZADOS NA INFRAESTRUTURA</h2>
        ${
          sanitizedData.materiais.length > 0
            ? `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">` +
              sanitizedData.materiais
                .map(
                  (mat, index) => `
            <div style="border: 1px solid #ddd; padding: 12px; border-radius: 8px; background: #f5f5f5; min-height: 100px;">
              <h3 style="margin: 0 0 8px 0; color: #333; font-size: 14px; text-align: center;">Material ${
                index + 1
              }</h3>
              <div style="font-size: 11px; line-height: 1.3;">
                <div style="margin-bottom: 4px;"><strong style="color: #555;">Tipo:</strong><br><span style="color: #333;">${
                  mat.tipo || "Não informado"
                }</span></div>
                <div style="margin-bottom: 4px;"><strong style="color: #555;">Quantidade:</strong><br><span style="color: #333;">${
                  mat.quantidade || "Não informado"
                }</span></div>
                ${
                  mat.obs
                    ? `<div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #ddd;"><strong style="color: #555;">Obs:</strong><br><span style="color: #333; font-size: 10px;">${mat.obs}</span></div>`
                    : ""
                }
              </div>
            </div>
          `
                )
                .join("") +
              `</div>`
            : '<div style="padding: 10px; background: #f5f5f5; border-radius: 5px; color: #666;">Nenhum material registrado</div>'
        }
      </div>
    `;

    document.body.appendChild(segundaPaginaContainer);

    // Aguardar um pouco para garantir que o DOM foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    const segundaPaginaCanvas = await html2canvas(segundaPaginaContainer, {
      width: 800,
      height: segundaPaginaContainer.scrollHeight || 1000,
      scrollY: 0,
      scrollX: 0,
      logging: true,
      useCORS: true,
      allowTaint: true,
    });

    const segundaPaginaImgWidth = 210;
    const segundaPaginaImgHeight =
      (segundaPaginaCanvas.height * segundaPaginaImgWidth) /
      segundaPaginaCanvas.width;
    let segundaPaginaHeightLeft = segundaPaginaImgHeight;

    // Adicionar página das seções 6-8
    pdf.addPage();
    pdf.addImage(
      segundaPaginaCanvas,
      "PNG",
      0,
      0,
      segundaPaginaImgWidth,
      segundaPaginaImgHeight
    );
    segundaPaginaHeightLeft -= pageHeight;

    while (segundaPaginaHeightLeft >= 0) {
      const segundaPaginaPosition =
        segundaPaginaHeightLeft - segundaPaginaImgHeight;
      pdf.addPage();
      pdf.addImage(
        segundaPaginaCanvas,
        "PNG",
        0,
        segundaPaginaPosition,
        segundaPaginaImgWidth,
        segundaPaginaImgHeight
      );
      segundaPaginaHeightLeft -= pageHeight;
    }

    // Limpar container da segunda página
    document.body.removeChild(segundaPaginaContainer);

    // TERCEIRA PÁGINA - Anexos
    if (selectedFiles.length > 0) {
      // Criar container para anexos
      const anexosContainer = document.createElement("div");
      anexosContainer.style.position = "absolute";
      anexosContainer.style.left = "-9999px";
      anexosContainer.style.top = "0";
      anexosContainer.style.width = "800px";
      anexosContainer.style.padding = "20px";
      anexosContainer.style.fontFamily = "Arial, sans-serif";
      anexosContainer.style.fontSize = "12px";
      anexosContainer.style.backgroundColor = "white";
      anexosContainer.style.border = "1px solid #ccc";

      anexosContainer.innerHTML = `
        <div style="text-align: center; border-bottom: 2px solid #666; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="margin: 0; color: #333; font-size: 24px;">RELATÓRIO DE ENTREGA DE SERVIÇO</h1>
          <p style="margin: 5px 0; color: #666;">Continuação</p>
        </div>

        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">8. ANEXOS FOTOGRÁFICOS</h2>
        <p style="color: #333;">Documentação fotográfica do serviço realizado:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
          ${selectedFiles
            .map(
              (file, index) => `
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; text-align: center; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between;">
              <img src="${URL.createObjectURL(
                file
              )}" style="max-width: 100%; max-height: 150px; object-fit: cover; border-radius: 3px; flex: 1;" alt="Anexo ${
                index + 1
              }" />
              <div>
                <p style="margin: 5px 0;"><strong style="color: #333;">Anexo ${
                  index + 1
                }</strong></p>
                <p style="font-size: 10px; color: #666; margin: 0;">${
                  file.name
                }</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;

      document.body.appendChild(anexosContainer);

      // Aguardar carregamento das imagens
      const images = anexosContainer.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve(null);
              } else {
                img.onload = () => resolve(null);
              }
            })
        )
      );

      // Aguardar um pouco mais para garantir que tudo foi renderizado
      await new Promise((resolve) => setTimeout(resolve, 200));

      const anexosCanvas = await html2canvas(anexosContainer, {
        width: 800,
        height: anexosContainer.scrollHeight || 1000,
        scrollY: 0,
        scrollX: 0,
        logging: true,
        useCORS: true,
        allowTaint: true,
      });

      const anexosImgWidth = 210;
      const anexosImgHeight =
        (anexosCanvas.height * anexosImgWidth) / anexosCanvas.width;
      let anexosHeightLeft = anexosImgHeight;

      // Adicionar página de anexos
      pdf.addPage();
      pdf.addImage(anexosCanvas, "PNG", 0, 0, anexosImgWidth, anexosImgHeight);
      anexosHeightLeft -= pageHeight;

      while (anexosHeightLeft >= 0) {
        const anexosPosition = anexosHeightLeft - anexosImgHeight;
        pdf.addPage();
        pdf.addImage(
          anexosCanvas,
          "PNG",
          0,
          anexosPosition,
          anexosImgWidth,
          anexosImgHeight
        );
        anexosHeightLeft -= pageHeight;
      }

      // Limpar container de anexos
      document.body.removeChild(anexosContainer);
    }

    // QUARTA PÁGINA - Termos de Garantia e Assinaturas
    const termosContainer = document.createElement("div");
    termosContainer.style.position = "absolute";
    termosContainer.style.left = "-9999px";
    termosContainer.style.top = "0";
    termosContainer.style.width = "800px";
    termosContainer.style.padding = "20px";
    termosContainer.style.fontFamily = "Arial, sans-serif";
    termosContainer.style.fontSize = "12px";
    termosContainer.style.backgroundColor = "white";
    termosContainer.style.border = "1px solid #ccc";

    termosContainer.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #666; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="margin: 0; color: #333; font-size: 24px;">RELATÓRIO DE ENTREGA DE SERVIÇO</h1>
        <p style="margin: 5px 0; color: #666;">Continuação</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">9. TERMOS DE GARANTIA E ASSINATURAS</h2>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0; color: #333;">Termos de Garantia:</h3>
          <ul style="margin: 10px 0; padding-left: 20px; color: #333;">
            <li>Garantia de 90 dias para serviço realizado. Não cobre mau uso, danos por quedas, queima por variações elétricas ou outras causas externas que não má instalação.</li>
            <li>A garantia é válida somente para o serviço executado, não para equipamentos de terceiros.</li>
            <li>O cliente declara estar ciente e de acordo com os termos da garantia.</li>
          </ul>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
          <div style="border: 1px solid #666; padding: 20px; text-align: center; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <strong style="color: #333;">Assinatura do Cliente</strong>
              ${
                clienteAssinatura
                  ? `<img src="${clienteAssinatura}" style="max-width: 100%; max-height: 80px; margin: 10px 0;" alt="Assinatura do Cliente" />`
                  : '<p style="color: #999;">Assinatura não fornecida</p>'
              }
            </div>
            <div>
              <p><strong style="color: #555;">Nome:</strong> <span style="color: #333;">${
                sanitizedData.cliente_nome
              }</span></p>
              <p><strong style="color: #555;">Data:</strong> <span style="color: #333;">${new Date().toLocaleDateString(
                "pt-BR"
              )}</span></p>
            </div>
          </div>
          
          <div style="border: 1px solid #666; padding: 20px; text-align: center; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <strong style="color: #333;">Assinatura do Técnico</strong>
              ${
                tecnicoAssinatura
                  ? `<img src="${tecnicoAssinatura}" style="max-width: 100%; max-height: 80px; margin: 10px 0;" alt="Assinatura do Técnico" />`
                  : '<p style="color: #999;">Assinatura não fornecida</p>'
              }
            </div>
            <div>
              <p><strong style="color: #555;">Nome:</strong> <span style="color: #333;">${
                sanitizedData.tecnico_nome
              }</span></p>
              <p><strong style="color: #555;">Data:</strong> <span style="color: #333;">${new Date().toLocaleDateString(
                "pt-BR"
              )}</span></p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(termosContainer);

    // Aguardar um pouco para garantir que o DOM foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    const termosCanvas = await html2canvas(termosContainer, {
      width: 800,
      height: termosContainer.scrollHeight || 1000,
      scrollY: 0,
      scrollX: 0,
      logging: true,
      useCORS: true,
      allowTaint: true,
    });

    const termosImgWidth = 210;
    const termosImgHeight =
      (termosCanvas.height * termosImgWidth) / termosCanvas.width;
    let termosHeightLeft = termosImgHeight;

    // Adicionar página dos termos e assinaturas
    pdf.addPage();
    pdf.addImage(termosCanvas, "PNG", 0, 0, termosImgWidth, termosImgHeight);
    termosHeightLeft -= pageHeight;

    while (termosHeightLeft >= 0) {
      const termosPosition = termosHeightLeft - termosImgHeight;
      pdf.addPage();
      pdf.addImage(
        termosCanvas,
        "PNG",
        0,
        termosPosition,
        termosImgWidth,
        termosImgHeight
      );
      termosHeightLeft -= pageHeight;
    }

    // Limpar container dos termos
    document.body.removeChild(termosContainer);

    // Converter para blob
    const pdfBlob = pdf.output("blob");

    // Limpar elemento temporário
    document.body.removeChild(container);

    return pdfBlob;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);

    // Limpar elemento temporário em caso de erro
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }

    // Re-throw com mensagem mais clara
    throw new Error(
      `Erro ao gerar PDF do relatório de entrega: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
