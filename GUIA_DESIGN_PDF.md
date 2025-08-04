# Guia de Personalização do Design do PDF

## 🎨 Como Personalizar o Design

### 1. **Cores do Tema**

#### Cores Principais (atual):
```css
/* Azul principal */
#3498db

/* Cinza escuro para textos */
#2c3e50

/* Cinza claro para textos secundários */
#7f8c8d

/* Verde para sucessos */
#27ae60

/* Vermelho para problemas */
#e74c3c

/* Cinza claro para fundos */
#ecf0f1
#f8f9fa
```

#### Para alterar as cores, modifique no arquivo `src/lib/generatePDF.ts`:

```typescript
// Exemplo: Mudar para tema escuro
const colors = {
  primary: '#1a1a1a',      // Fundo escuro
  secondary: '#ffffff',     // Texto branco
  accent: '#ff6b35',       // Laranja
  success: '#4caf50',      // Verde
  error: '#f44336'         // Vermelho
};
```

### 2. **Fontes**

#### Fonte Atual:
```css
font-family: 'Arial, sans-serif';
font-size: 12px;
```

#### Para alterar:
```typescript
// Exemplo: Usar fonte diferente
mainDiv.style.fontFamily = 'Helvetica, Arial, sans-serif';
mainDiv.style.fontSize = '14px';
```

### 3. **Layout e Espaçamento**

#### Margens e Padding:
```css
/* Atual */
padding: 20px;
margin-bottom: 20px;
gap: 15px;
```

#### Para alterar:
```typescript
// Exemplo: Mais espaçamento
mainDiv.style.padding = '30px';
// Ou menos espaçamento
mainDiv.style.padding = '15px';
```

### 4. **Tabelas**

#### Estilo Atual:
```css
/* Cabeçalho das tabelas */
background-color: #ecf0f1;
padding: 12px;
border: 1px solid #bdc3c7;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
```

#### Para personalizar:
```typescript
// Exemplo: Tabela mais moderna
table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
```

### 5. **Seções de Problemas e Recomendações**

#### Estilo Atual:
```css
/* Problemas */
border: 1px solid #e74c3c;
background-color: #fdf2f2;
border-radius: 5px;

/* Recomendações */
border: 1px solid #27ae60;
background-color: #f0f9f0;
border-radius: 5px;
```

### 6. **Imagens (Anexos)**

#### Layout Atual:
```css
/* Grid responsivo */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 15px;

/* Container da imagem */
border: 2px solid #3498db;
border-radius: 8px;
padding: 15px;
background-color: #f8f9fa;
```

## 🎯 Exemplos de Personalização

### 1. **Tema Corporativo Azul**
```typescript
const corporateBlue = {
  primary: '#1e3a8a',      // Azul escuro
  secondary: '#3b82f6',    // Azul médio
  accent: '#60a5fa',       // Azul claro
  text: '#1f2937',         // Cinza escuro
  background: '#f8fafc'    // Cinza muito claro
};
```

### 2. **Tema Verde (Ecológico)**
```typescript
const greenTheme = {
  primary: '#059669',       // Verde escuro
  secondary: '#10b981',     // Verde médio
  accent: '#34d399',        // Verde claro
  text: '#064e3b',          // Verde muito escuro
  background: '#f0fdf4'     // Verde muito claro
};
```

### 3. **Tema Escuro**
```typescript
const darkTheme = {
  primary: '#1f2937',       // Cinza escuro
  secondary: '#374151',     // Cinza médio
  accent: '#6b7280',        // Cinza claro
  text: '#ffffff',          // Branco
  background: '#111827'     // Preto
};
```

## 🔧 Como Implementar Mudanças

### 1. **Alterar Cores Globais**
```typescript
// No início da função generatePDFRelatorio
const theme = {
  primary: '#3498db',
  secondary: '#2c3e50',
  accent: '#27ae60',
  error: '#e74c3c',
  background: '#ffffff',
  text: '#2c3e50',
  textLight: '#7f8c8d'
};
```

### 2. **Alterar Fontes**
```typescript
mainDiv.style.fontFamily = 'Georgia, serif';  // Fonte serif
// ou
mainDiv.style.fontFamily = 'Courier New, monospace';  // Fonte monospace
```

### 3. **Alterar Tamanhos**
```typescript
// Títulos maiores
h1 style="font-size: 28px;"
h2 style="font-size: 20px;"

// Texto menor
mainDiv.style.fontSize = '10px';
```

### 4. **Adicionar Bordas e Sombras**
```typescript
// Bordas arredondadas
border-radius: 10px;

// Sombras mais pronunciadas
box-shadow: 0 4px 8px rgba(0,0,0,0.2);

// Bordas coloridas
border: 3px solid #3498db;
```

## 📐 Estrutura do HTML

### Seções Principais:
1. **Cabeçalho** - Título e data
2. **Dados do Cliente** - Informações básicas
3. **Equipamentos** - Câmeras e funcionamento
4. **Status dos Equipamentos** - Condição dos sistemas
5. **Análise Técnica** - Problemas e recomendações
6. **Anexos** - Página separada com imagens

### Para adicionar novas seções:
```typescript
// Exemplo: Adicionar seção de observações
<div style="margin-bottom: 20px;">
  <h2 style="font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid ${theme.primary}; padding-bottom: 5px; color: ${theme.text};">OBSERVAÇÕES ADICIONAIS</h2>
  <div style="padding: 15px; border: 1px solid ${theme.accent}; background-color: ${theme.background}; border-radius: 5px;">
    ${data.observacoes || 'Nenhuma observação adicional'}
  </div>
</div>
```

## 🎨 Dicas de Design

### 1. **Consistência**
- Use as mesmas cores em todo o documento
- Mantenha espaçamentos consistentes
- Use hierarquia visual clara

### 2. **Legibilidade**
- Contraste adequado entre texto e fundo
- Tamanho de fonte legível (mínimo 10px)
- Espaçamento suficiente entre elementos

### 3. **Profissionalismo**
- Cores neutras para documentos corporativos
- Layout limpo e organizado
- Informações bem estruturadas

### 4. **Responsividade**
- O PDF se adapta automaticamente ao conteúdo
- Imagens mantêm proporções
- Texto quebra adequadamente

## 🚀 Próximos Passos

1. **Teste as mudanças** no arquivo `src/lib/generatePDF.ts`
2. **Ajuste as cores** conforme sua identidade visual
3. **Modifique fontes** se necessário
4. **Adicione novas seções** conforme necessário
5. **Teste com diferentes dados** para verificar o layout

O design atual é profissional e moderno, mas pode ser facilmente personalizado para atender suas necessidades específicas! 