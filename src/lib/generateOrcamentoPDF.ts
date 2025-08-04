import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface OrcamentoData {
  // Seção 1: Dados do Cliente
  cliente_responsavel: string;
  empresa_condominio: string;
  endereco_servico: string;
  contato: string;

  // Seção 2: Escopo do Projeto
  tipo_servico: string;
  tecnologias: {
    cftv: boolean;
    controle_acesso: boolean;
    cerca_eletrica: boolean;
    alarme: boolean;
    automacao: boolean;
    interfonia: boolean;
  };
  outras_tecnologias: string;
  descricao_projeto: string;

  // Seção 3: Infraestrutura
  tipo_infraestrutura: string;
  materiais_infraestrutura: {
    eletroduto: boolean;
    curvas_luvas: boolean;
    canaletas: boolean;
    caixas_passagem: boolean;
    suportes: boolean;
    fixadores: boolean;
    tubo_enterrado: boolean;
  };
  outros_materiais: string;
  observacoes_infraestrutura: string;

  // Seção 4: Equipamentos e Dispositivos
  equipamentos_previstos: string;
  tipo_alimentacao: {
    poe: boolean;
    fonte_12v_24v: boolean;
    bateria_nobreak: boolean;
    disjuntor_dedicado: boolean;
  };
  outras_alimentacoes: string;

  // Seção 5: Rede e Energia
  tipos_cabos: {
    coaxial: boolean;
    cabo_rede: boolean;
    fibra_optica: boolean;
    cabos_energia: boolean;
    cabos_automacao: boolean;
  };
  outros_cabos: string;
  pontos_energia: string;
  protecoes_eletricas: {
    disjuntor_dedicado: boolean;
    nobreak: boolean;
    filtro_linha: boolean;
    nao_se_aplica: boolean;
  };

  // Seção 6: Serviços Incluídos
  servicos_entregues: {
    projeto_tecnico: boolean;
    fornecimento_materiais: boolean;
    mao_obra: boolean;
    testes_comissionamento: boolean;
    treinamento: boolean;
    documentacao_tecnica: boolean;
  };

  // Seção 7: Observações Técnicas
  infraestrutura_eletrica_pronta: string;
  dependencia_terceiros: string;
  acesso_livre_local: string;
  observacoes_gerais: string;

  // Anexos
  fotos?: FileList | null;
}

export const generateOrcamentoPDF = async (
  data: OrcamentoData,
  selectedFiles: File[]
): Promise<Blob> => {
  // Validar e sanitizar os dados
  const sanitizedData = {
    cliente_responsavel: data.cliente_responsavel || "Não informado",
    empresa_condominio: data.empresa_condominio || "Não informado",
    endereco_servico: data.endereco_servico || "Não informado",
    contato: data.contato || "Não informado",
    tipo_servico: data.tipo_servico || "Não informado",
    tecnologias: {
      cftv: data.tecnologias?.cftv || false,
      controle_acesso: data.tecnologias?.controle_acesso || false,
      cerca_eletrica: data.tecnologias?.cerca_eletrica || false,
      alarme: data.tecnologias?.alarme || false,
      automacao: data.tecnologias?.automacao || false,
      interfonia: data.tecnologias?.interfonia || false,
    },
    outras_tecnologias: data.outras_tecnologias || "",
    descricao_projeto: data.descricao_projeto || "Não informado",
    tipo_infraestrutura: data.tipo_infraestrutura || "Não informado",
    materiais_infraestrutura: {
      eletroduto: data.materiais_infraestrutura?.eletroduto || false,
      curvas_luvas: data.materiais_infraestrutura?.curvas_luvas || false,
      canaletas: data.materiais_infraestrutura?.canaletas || false,
      caixas_passagem: data.materiais_infraestrutura?.caixas_passagem || false,
      suportes: data.materiais_infraestrutura?.suportes || false,
      fixadores: data.materiais_infraestrutura?.fixadores || false,
      tubo_enterrado: data.materiais_infraestrutura?.tubo_enterrado || false,
    },
    outros_materiais: data.outros_materiais || "",
    observacoes_infraestrutura:
      data.observacoes_infraestrutura || "Não informado",
    equipamentos_previstos: data.equipamentos_previstos || "Não informado",
    tipo_alimentacao: {
      poe: data.tipo_alimentacao?.poe || false,
      fonte_12v_24v: data.tipo_alimentacao?.fonte_12v_24v || false,
      bateria_nobreak: data.tipo_alimentacao?.bateria_nobreak || false,
      disjuntor_dedicado: data.tipo_alimentacao?.disjuntor_dedicado || false,
    },
    outras_alimentacoes: data.outras_alimentacoes || "",
    tipos_cabos: {
      coaxial: data.tipos_cabos?.coaxial || false,
      cabo_rede: data.tipos_cabos?.cabo_rede || false,
      fibra_optica: data.tipos_cabos?.fibra_optica || false,
      cabos_energia: data.tipos_cabos?.cabos_energia || false,
      cabos_automacao: data.tipos_cabos?.cabos_automacao || false,
    },
    outros_cabos: data.outros_cabos || "",
    pontos_energia: data.pontos_energia || "Não informado",
    protecoes_eletricas: {
      disjuntor_dedicado: data.protecoes_eletricas?.disjuntor_dedicado || false,
      nobreak: data.protecoes_eletricas?.nobreak || false,
      filtro_linha: data.protecoes_eletricas?.filtro_linha || false,
      nao_se_aplica: data.protecoes_eletricas?.nao_se_aplica || false,
    },
    servicos_entregues: {
      projeto_tecnico: data.servicos_entregues?.projeto_tecnico || false,
      fornecimento_materiais:
        data.servicos_entregues?.fornecimento_materiais || false,
      mao_obra: data.servicos_entregues?.mao_obra || false,
      testes_comissionamento:
        data.servicos_entregues?.testes_comissionamento || false,
      treinamento: data.servicos_entregues?.treinamento || false,
      documentacao_tecnica:
        data.servicos_entregues?.documentacao_tecnica || false,
    },
    infraestrutura_eletrica_pronta:
      data.infraestrutura_eletrica_pronta || "Não informado",
    dependencia_terceiros: data.dependencia_terceiros || "Não informado",
    acesso_livre_local: data.acesso_livre_local || "Não informado",
    observacoes_gerais: data.observacoes_gerais || "Não informado",
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

  // Criar o conteúdo HTML
  container.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid #666; padding-bottom: 20px; margin-bottom: 30px;">
      <h1 style="margin: 0; color: #333; font-size: 24px;">ORÇAMENTO TÉCNICO</h1>
      <p style="margin: 5px 0; color: #666;">Data: ${new Date().toLocaleDateString(
        "pt-BR"
      )}</p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">1. DADOS DO CLIENTE</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div><strong style="color: #555;">Cliente Responsável:</strong> <span style="color: #333;">${
          sanitizedData.cliente_responsavel
        }</span></div>
        <div><strong style="color: #555;">Empresa/Condomínio:</strong> <span style="color: #333;">${
          sanitizedData.empresa_condominio
        }</span></div>
        <div><strong style="color: #555;">Contato:</strong> <span style="color: #333;">${
          sanitizedData.contato
        }</span></div>
      </div>
      <div style="margin-top: 10px;"><strong style="color: #555;">Endereço do Serviço:</strong> <span style="color: #333;">${
        sanitizedData.endereco_servico
      }</span></div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">2. ESCOPO DO PROJETO</h2>
      <div><strong style="color: #555;">Tipo de Serviço:</strong> <span style="color: #333;">${
        sanitizedData.tipo_servico
      }</span></div>
      <div style="margin-top: 10px;">
        <strong style="color: #555;">Tecnologias Envolvidas:</strong>
        <ul style="margin: 5px 0; padding-left: 20px; color: #333;">
          <li>${sanitizedData.tecnologias.cftv ? "☑" : "☐"} CFTV / Câmeras</li>
          <li>${
            sanitizedData.tecnologias.controle_acesso ? "☑" : "☐"
          } Controle de Acesso</li>
          <li>${
            sanitizedData.tecnologias.cerca_eletrica ? "☑" : "☐"
          } Cerca Elétrica</li>
          <li>${sanitizedData.tecnologias.alarme ? "☑" : "☐"} Alarme</li>
          <li>${sanitizedData.tecnologias.automacao ? "☑" : "☐"} Automação</li>
          <li>${
            sanitizedData.tecnologias.interfonia ? "☑" : "☐"
          } Interfonia</li>
          ${
            sanitizedData.outras_tecnologias
              ? `<li>☑ Outro: ${sanitizedData.outras_tecnologias}</li>`
              : ""
          }
        </ul>
      </div>
      <div style="margin-top: 10px;"><strong style="color: #555;">Descrição Geral do Projeto:</strong> <span style="color: #333;">${
        sanitizedData.descricao_projeto
      }</span></div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">3. INFRAESTRUTURA</h2>
      <div><strong style="color: #555;">Tipo de Infraestrutura:</strong> <span style="color: #333;">${
        sanitizedData.tipo_infraestrutura
      }</span></div>
      <div style="margin-top: 10px;">
        <strong style="color: #555;">Materiais Previstos:</strong>
        <ul style="margin: 5px 0; padding-left: 20px; color: #333;">
          <li>${
            sanitizedData.materiais_infraestrutura.eletroduto ? "☑" : "☐"
          } Eletroduto (PVC / galvanizado / corrugado)</li>
          <li>${
            sanitizedData.materiais_infraestrutura.curvas_luvas ? "☑" : "☐"
          } Curvas / luvas</li>
          <li>${
            sanitizedData.materiais_infraestrutura.canaletas ? "☑" : "☐"
          } Canaletas</li>
          <li>${
            sanitizedData.materiais_infraestrutura.caixas_passagem ? "☑" : "☐"
          } Caixas de passagem</li>
          <li>${
            sanitizedData.materiais_infraestrutura.suportes ? "☑" : "☐"
          } Suportes</li>
          <li>${
            sanitizedData.materiais_infraestrutura.fixadores ? "☑" : "☐"
          } Fixadores (parafusos, buchas, arruelas)</li>
          <li>${
            sanitizedData.materiais_infraestrutura.tubo_enterrado ? "☑" : "☐"
          } Tubo enterrado</li>
          ${
            sanitizedData.outros_materiais
              ? `<li>☑ Outro: ${sanitizedData.outros_materiais}</li>`
              : ""
          }
        </ul>
      </div>
      <div style="margin-top: 10px;"><strong style="color: #555;">Observações sobre a Infraestrutura:</strong> <span style="color: #333;">${
        sanitizedData.observacoes_infraestrutura
      }</span></div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">4. EQUIPAMENTOS E DISPOSITIVOS</h2>
      <div><strong style="color: #555;">Lista dos Equipamentos Previstos:</strong> <span style="color: #333;">${
        sanitizedData.equipamentos_previstos
      }</span></div>
      <div style="margin-top: 10px;">
        <strong style="color: #555;">Tipo de Alimentação:</strong>
        <ul style="margin: 5px 0; padding-left: 20px; color: #333;">
          <li>${sanitizedData.tipo_alimentacao.poe ? "☑" : "☐"} PoE</li>
          <li>${
            sanitizedData.tipo_alimentacao.fonte_12v_24v ? "☑" : "☐"
          } Fonte 12V / 24V</li>
          <li>${
            sanitizedData.tipo_alimentacao.bateria_nobreak ? "☑" : "☐"
          } Bateria / No-break</li>
          <li>${
            sanitizedData.tipo_alimentacao.disjuntor_dedicado ? "☑" : "☐"
          } Disjuntor dedicado</li>
          ${
            sanitizedData.outras_alimentacoes
              ? `<li>☑ Outro: ${sanitizedData.outras_alimentacoes}</li>`
              : ""
          }
        </ul>
      </div>
    </div>


  `;

  // Adicionar ao DOM
  document.body.appendChild(container);

  try {
    // Aguardar um pouco para garantir que o DOM foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Capturar o conteúdo principal (seções 1-4)
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

    // Adicionar páginas do conteúdo principal (seções 1-4)
    pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Criar container específico para seções 5, 6 e 7
    const secoes567Container = document.createElement("div");
    secoes567Container.style.position = "absolute";
    secoes567Container.style.left = "-9999px";
    secoes567Container.style.top = "0";
    secoes567Container.style.width = "800px";
    secoes567Container.style.padding = "20px";
    secoes567Container.style.fontFamily = "Arial, sans-serif";
    secoes567Container.style.fontSize = "12px";
    secoes567Container.style.backgroundColor = "white";
    secoes567Container.style.border = "1px solid #ccc";

    secoes567Container.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #666; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="margin: 0; color: #333; font-size: 24px;">ORÇAMENTO TÉCNICO</h1>
        <p style="margin: 5px 0; color: #666;">Continuação</p>
      </div>

      <div style="margin-bottom: 15px;">
        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">5. REDE E ENERGIA</h2>
        <div style="margin-bottom: 8px;">
          <strong style="color: #555;">Tipos de Cabos Previstos:</strong>
          <ul style="margin: 3px 0; padding-left: 20px; color: #333;">
            <li>${sanitizedData.tipos_cabos.coaxial ? "☑" : "☐"} Coaxial</li>
            <li>${
              sanitizedData.tipos_cabos.cabo_rede ? "☑" : "☐"
            } Cabo de rede (Cat5e, Cat6)</li>
            <li>${
              sanitizedData.tipos_cabos.fibra_optica ? "☑" : "☐"
            } Fibra óptica</li>
            <li>${
              sanitizedData.tipos_cabos.cabos_energia ? "☑" : "☐"
            } Cabos de energia</li>
            <li>${
              sanitizedData.tipos_cabos.cabos_automacao ? "☑" : "☐"
            } Cabos de automação (ex: 4x0,5 / 2x26AWG)</li>
            ${
              sanitizedData.outros_cabos
                ? `<li>☑ Outro: ${sanitizedData.outros_cabos}</li>`
                : ""
            }
          </ul>
        </div>
        <div style="margin-bottom: 8px;"><strong style="color: #555;">Pontos de Energia Existentes:</strong> <span style="color: #333;">${
          sanitizedData.pontos_energia
        }</span></div>
        <div style="margin-bottom: 8px;">
          <strong style="color: #555;">Proteções Elétricas Previstas:</strong>
          <ul style="margin: 3px 0; padding-left: 20px; color: #333;">
            <li>${
              sanitizedData.protecoes_eletricas.disjuntor_dedicado ? "☑" : "☐"
            } Disjuntor dedicado</li>
            <li>${
              sanitizedData.protecoes_eletricas.nobreak ? "☑" : "☐"
            } Nobreak</li>
            <li>${
              sanitizedData.protecoes_eletricas.filtro_linha ? "☑" : "☐"
            } Filtro de linha</li>
            <li>${
              sanitizedData.protecoes_eletricas.nao_se_aplica ? "☑" : "☐"
            } Não se aplica</li>
          </ul>
        </div>
      </div>

      <div style="margin-bottom: 15px;">
        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">6. SERVIÇOS INCLUÍDOS</h2>
        <div>
          <strong style="color: #555;">Serviços que Serão Entregues:</strong>
          <ul style="margin: 3px 0; padding-left: 20px; color: #333;">
            <li>${
              sanitizedData.servicos_entregues.projeto_tecnico ? "☑" : "☐"
            } Projeto técnico e especificações</li>
            <li>${
              sanitizedData.servicos_entregues.fornecimento_materiais
                ? "☑"
                : "☐"
            } Fornecimento de materiais</li>
            <li>${
              sanitizedData.servicos_entregues.mao_obra ? "☑" : "☐"
            } Mão de obra especializada</li>
            <li>${
              sanitizedData.servicos_entregues.testes_comissionamento
                ? "☑"
                : "☐"
            } Testes e comissionamento</li>
            <li>${
              sanitizedData.servicos_entregues.treinamento ? "☑" : "☐"
            } Treinamento para o cliente</li>
            <li>${
              sanitizedData.servicos_entregues.documentacao_tecnica ? "☑" : "☐"
            } Documentação técnica (diagramas, IPs, senhas)</li>
          </ul>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">7. OBSERVAÇÕES TÉCNICAS</h2>
        <div style="margin-bottom: 5px;"><strong style="color: #555;">A infraestrutura elétrica está pronta?</strong> <span style="color: #333;">${
          sanitizedData.infraestrutura_eletrica_pronta
        }</span></div>
        <div style="margin-bottom: 5px;"><strong style="color: #555;">Existe dependência de terceiros para execução?</strong> <span style="color: #333;">${
          sanitizedData.dependencia_terceiros
        }</span></div>
        <div style="margin-bottom: 5px;"><strong style="color: #555;">Há acesso livre ao local da instalação?</strong> <span style="color: #333;">${
          sanitizedData.acesso_livre_local
        }</span></div>
        <div style="margin-top: 8px;"><strong style="color: #555;">Observações Gerais sobre o Projeto:</strong> <span style="color: #333;">${
          sanitizedData.observacoes_gerais
        }</span></div>
      </div>
    `;

    document.body.appendChild(secoes567Container);

    // Aguardar um pouco para garantir que o DOM foi renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    const secoes567Canvas = await html2canvas(secoes567Container, {
      width: 800,
      height: secoes567Container.scrollHeight || 1000,
      scrollY: 0,
      scrollX: 0,
      logging: true,
      useCORS: true,
      allowTaint: true,
    });

    const secoes567ImgWidth = 210;
    const secoes567ImgHeight =
      (secoes567Canvas.height * secoes567ImgWidth) / secoes567Canvas.width;
    let secoes567HeightLeft = secoes567ImgHeight;

    // Adicionar página das seções 5, 6 e 7
    pdf.addPage();
    pdf.addImage(
      secoes567Canvas,
      "PNG",
      0,
      0,
      secoes567ImgWidth,
      secoes567ImgHeight
    );
    secoes567HeightLeft -= pageHeight;

    while (secoes567HeightLeft >= 0) {
      const secoes567Position = secoes567HeightLeft - secoes567ImgHeight;
      pdf.addPage();
      pdf.addImage(
        secoes567Canvas,
        "PNG",
        0,
        secoes567Position,
        secoes567ImgWidth,
        secoes567ImgHeight
      );
      secoes567HeightLeft -= pageHeight;
    }

    // Limpar container das seções 5, 6 e 7
    document.body.removeChild(secoes567Container);

    // Se há anexos, adicionar em página separada
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
          <h1 style="margin: 0; color: #333; font-size: 24px;">ORÇAMENTO TÉCNICO</h1>
          <p style="margin: 5px 0; color: #666;">Continuação</p>
        </div>

        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px;">8. ANEXOS FOTOGRÁFICOS</h2>
        <p style="color: #333;">Documentação fotográfica do local e projeto:</p>
        
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
      `Erro ao gerar PDF do orçamento técnico: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
