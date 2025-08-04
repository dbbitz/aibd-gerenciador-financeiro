// Utilitário para testar o processamento de imagens
export const testImageProcessing = async (files: FileList | null) => {
  console.log("=== TESTE DE PROCESSAMENTO DE IMAGENS ===");

  if (!files || files.length === 0) {
    console.log("Nenhuma imagem fornecida");
    return;
  }

  console.log(`Processando ${files.length} imagens...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(`\n--- Imagem ${i + 1} ---`);
    console.log("Nome:", file.name);
    console.log("Tamanho:", file.size, "bytes");
    console.log("Tipo:", file.type);

    try {
      // Testar conversão para base64
      const base64 = await convertImageToBase64(file);
      console.log("Base64 gerado:", base64.substring(0, 100) + "...");
      console.log("Tamanho do base64:", base64.length, "caracteres");

      // Testar se é uma string válida
      if (base64 && base64.length > 0) {
        console.log("✅ Conversão bem-sucedida");
      } else {
        console.log("❌ Conversão falhou - string vazia");
      }
    } catch (error) {
      console.error("❌ Erro na conversão:", error);
    }
  }

  console.log("=== FIM DO TESTE ===");
};

// Função para converter imagem para base64 (cópia da função original)
const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
