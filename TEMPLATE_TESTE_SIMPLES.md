# Template de Teste Simples

## 🔧 Como Criar um Template de Teste

### 1. **Crie um documento Word simples**

Abra o Microsoft Word e crie um documento com apenas:

```
TESTE DE IMAGENS

Primeira imagem:
{%anexo1}

Segunda imagem:
{%anexo2}

Terceira imagem:
{%anexo3}

Quarta imagem:
{%anexo4}

Quinta imagem:
{%anexo5}
```

### 2. **Salve o arquivo**

- Salve como `template-relatorio-visita.docx`
- Coloque na pasta `public/` do projeto
- Substitua o template atual

### 3. **Teste o sistema**

1. Abra o console (F12)
2. Selecione 1-2 imagens pequenas
3. Preencha o formulário
4. Clique em "Gerar Relatório"
5. Verifique os logs

### 4. **Logs que você deve ver**

```
Conteúdo do template encontrado: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>...
Template tem tags de anexos: true
Tag {%anexo1} encontrada: true
Tag {%anexo2} encontrada: true
Tag {%anexo3} encontrada: true
...
```

### 5. **Se o template não tem as tags**

Se você ver:
```
⚠️ ATENÇÃO: Template não parece ter tags de anexos!
```

Então o problema está no template. Verifique:

1. **Se as tags estão escritas corretamente**: `{%anexo1}`, `{%anexo2}`, etc.
2. **Se não há espaços extras** nas tags
3. **Se o arquivo foi salvo corretamente**

### 6. **Template Alternativo**

Se o problema persistir, tente este template ainda mais simples:

```
{%anexo1}
{%anexo2}
{%anexo3}
```

### 7. **Verificação Manual**

Para verificar se o template tem as tags corretas:

1. Abra o arquivo `template-relatorio-visita.docx` no Word
2. Pressione Ctrl+F para buscar
3. Procure por: `{%anexo1}`
4. Se não encontrar, as tags não estão no template

### 8. **Como Inserir as Tags no Word**

1. Digite: `{%anexo1}`
2. Pressione Enter
3. Digite: `{%anexo2}`
4. Continue até `{%anexo9}`
5. Salve o arquivo

### 9. **Problemas Comuns**

- **Tags com espaços**: `{ %anexo1 }` (errado) vs `{%anexo1}` (correto)
- **Tags em caixa alta**: `{%ANEXO1}` (pode não funcionar)
- **Arquivo corrompido**: Tente recriar o template
- **Localização errada**: Verifique se está em `public/template-relatorio-visita.docx` 