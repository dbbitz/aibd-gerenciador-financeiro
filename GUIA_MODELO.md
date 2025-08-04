# 🎨 Guia para Personalizar o Modelo PDF

## 📋 Como Usar o Modelo

### 1. **Abra o Arquivo**
- Abra o arquivo `MODELO_PDF.html` no seu navegador
- Você verá o layout atual do PDF com dados de exemplo

### 2. **Edite o CSS**
- Abra o arquivo em um editor de texto (VS Code, Notepad++, etc.)
- Localize a seção `<style>` no início do arquivo
- Modifique as cores, fontes, layout conforme desejado

### 3. **Teste as Mudanças**
- Salve o arquivo e atualize o navegador (F5)
- Veja como ficou o design
- Ajuste até ficar satisfeito

### 4. **Envie para Implementação**
- Quando estiver pronto, copie todo o CSS modificado
- Envie para mim implementar no código do PDF

## 🎯 Áreas Principais para Personalizar

### **Cores do Tema (CSS Variables)**
```css
:root {
    --primary-color: #3498db;      /* Cor principal */
    --secondary-color: #2c3e50;    /* Cor secundária */
    --accent-color: #27ae60;       /* Cor de destaque */
    --error-color: #e74c3c;        /* Cor de erro */
    --text-light: #7f8c8d;         /* Texto claro */
    --bg-light: #ecf0f1;           /* Fundo claro */
    --bg-lighter: #f8f9fa;         /* Fundo mais claro */
    --border-color: #bdc3c7;       /* Cor das bordas */
}
```

### **Fontes**
```css
body {
    font-family: 'Arial, sans-serif';  /* Mude aqui */
    font-size: 12px;                   /* Tamanho da fonte */
}
```

### **Layout**
```css
body {
    padding: 20px;                     /* Espaçamento geral */
    width: 800px;                      /* Largura do documento */
}

.section {
    margin-bottom: 20px;               /* Espaço entre seções */
}
```

### **Tabelas**
```css
.table {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);  /* Sombra */
}

.table td {
    padding: 12px;                              /* Espaçamento interno */
    border: 1px solid var(--border-color);     /* Bordas */
}
```

## 🎨 Exemplos de Temas

### **Tema Corporativo Azul Escuro**
```css
:root {
    --primary-color: #1e3a8a;
    --secondary-color: #1f2937;
    --accent-color: #3b82f6;
    --error-color: #dc2626;
    --text-light: #6b7280;
    --bg-light: #f1f5f9;
    --bg-lighter: #f8fafc;
    --border-color: #d1d5db;
}
```

### **Tema Verde (Ecológico)**
```css
:root {
    --primary-color: #059669;
    --secondary-color: #064e3b;
    --accent-color: #10b981;
    --error-color: #dc2626;
    --text-light: #6b7280;
    --bg-light: #f0fdf4;
    --bg-lighter: #f9fafb;
    --border-color: #d1fae5;
}
```

### **Tema Escuro**
```css
:root {
    --primary-color: #1f2937;
    --secondary-color: #ffffff;
    --accent-color: #6b7280;
    --error-color: #ef4444;
    --text-light: #9ca3af;
    --bg-light: #374151;
    --bg-lighter: #4b5563;
    --border-color: #6b7280;
}

body {
    background-color: #111827;
    color: #ffffff;
}
```

## 🔧 Modificações Comuns

### **Mudar Tamanho da Fonte**
```css
body {
    font-size: 14px;  /* Maior */
    /* ou */
    font-size: 10px;  /* Menor */
}
```

### **Mudar Fonte**
```css
body {
    font-family: 'Georgia, serif';           /* Serif */
    /* ou */
    font-family: 'Courier New, monospace';   /* Monospace */
    /* ou */
    font-family: 'Helvetica, Arial, sans-serif'; /* Sans-serif */
}
```

### **Mudar Cores das Seções**
```css
.problems .content {
    background-color: #fef2f2;  /* Fundo vermelho claro */
    border-color: #f87171;      /* Borda vermelha */
}

.recommendations .content {
    background-color: #f0fdf4;  /* Fundo verde claro */
    border-color: #4ade80;      /* Borda verde */
}
```

### **Adicionar Bordas Arredondadas**
```css
.table {
    border-radius: 8px;
    overflow: hidden;
}

.attachment-item {
    border-radius: 12px;
}
```

### **Mudar Sombras**
```css
.table {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);  /* Sombra mais forte */
    /* ou */
    box-shadow: none;  /* Sem sombra */
}
```

## 📝 Estrutura do HTML

O modelo inclui:
- **Cabeçalho** com título e data
- **Dados do Cliente** em tabela
- **Equipamentos** com percentual
- **Status dos Equipamentos** detalhado
- **Análise Técnica** com problemas e recomendações
- **Página de Anexos** separada
- **Rodapé** com data/hora

## 🚀 Próximos Passos

1. **Abra** o arquivo `MODELO_PDF.html` no navegador
2. **Edite** o CSS conforme suas preferências
3. **Teste** as mudanças visualmente
4. **Copie** o CSS modificado
5. **Envie** para mim implementar no código

## 💡 Dicas Importantes

- **Mantenha contraste** adequado para legibilidade
- **Use cores consistentes** em todo o documento
- **Teste com diferentes** quantidades de texto
- **Verifique como fica** com muitas imagens
- **Considere a impressão** - cores muito claras podem não aparecer bem

Quando estiver satisfeito com o design, é só enviar o CSS modificado que eu implemento no código do PDF! 🎨 