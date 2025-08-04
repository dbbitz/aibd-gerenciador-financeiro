# Debug - Problemas com Imagens no Relatório

## 🔍 Como Identificar o Problema

### 1. **Abra o Console do Navegador**
- Pressione F12
- Vá na aba "Console"
- Teste o formulário com imagens

### 2. **Logs que Você Deve Ver**

#### ✅ Logs Normais:
```
=== INÍCIO DO PROCESSAMENTO ===
Dados do relatório de visita técnica: {...}
Arquivos selecionados: [File, File, ...]
Número de arquivos: 2
Template carregado com sucesso
Processando 2 imagens...
Processando imagem 1: foto1.jpg (123456 bytes)
Imagem foto1.jpg convertida para base64, tamanho: 45678 caracteres
Imagem 1 processada com sucesso
...
```

#### ❌ Possíveis Problemas:

**Problema 1: Imagens não estão sendo selecionadas**
```
Arquivos selecionados: []
Número de arquivos: 0
```

**Problema 2: Erro na conversão**
```
Erro ao converter imagem foto1.jpg: FileReader error
```

**Problema 3: Template não encontrado**
```
Erro ao carregar template: 404
```

### 3. **Teste Passo a Passo**

1. **Selecione 1-2 imagens pequenas** (menos de 1MB cada)
2. **Use formato JPG ou PNG**
3. **Abra o console** (F12)
4. **Preencha o formulário** e clique em "Gerar Relatório"
5. **Verifique os logs** no console

### 4. **Possíveis Causas**

#### A) **Template não tem as tags corretas**
- Verifique se o template tem: `{%anexo1}`, `{%anexo2}`, etc.
- As tags devem estar exatamente assim

#### B) **Imagens muito grandes**
- Tente com imagens menores (menos de 500KB)
- O navegador pode ter limite de memória

#### C) **Formato não suportado**
- Use apenas JPG, PNG, GIF
- Evite formatos como WebP, HEIC

#### D) **Problema no template**
- O template pode estar corrompido
- Tente criar um template simples apenas com `{%anexo1}`

### 5. **Template de Teste Simples**

Crie um arquivo Word com apenas:
```
TESTE DE IMAGENS

{%anexo1}

{%anexo2}

{%anexo3}
```

Salve como `template-relatorio-visita.docx` na pasta `public/`

### 6. **Comandos de Debug**

Se você quiser testar manualmente no console:

```javascript
// Testar se o template existe
fetch('/template-relatorio-visita.docx').then(r => console.log('Template:', r.status))

// Testar conversão de imagem
const file = document.querySelector('input[type="file"]').files[0];
const reader = new FileReader();
reader.onload = () => console.log('Base64:', reader.result.split(',')[1].substring(0, 100));
reader.readAsDataURL(file);
```

### 7. **Soluções**

#### Se as imagens não aparecem:
1. **Verifique o console** para erros
2. **Teste com template simples**
3. **Use imagens menores**
4. **Verifique se as tags estão corretas**

#### Se o template não carrega:
1. **Verifique se o arquivo existe** em `public/`
2. **Verifique o nome** do arquivo
3. **Reinicie o servidor** de desenvolvimento

### 8. **Informações para Compartilhar**

Se o problema persistir, compartilhe:
1. **Logs do console** (copie e cole)
2. **Tamanho das imagens** que está testando
3. **Formato das imagens** (JPG, PNG, etc.)
4. **Se o template existe** na pasta public/ 