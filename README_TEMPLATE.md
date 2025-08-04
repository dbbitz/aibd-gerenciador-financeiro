# Sistema de Geração de Relatórios IoT

## ✅ Funcionalidades Implementadas

### 📋 Formulário Completo
- Cliente atendido (select com opções)
- Local/endereço
- Data da visita
- Período do dia
- Técnico responsável
- Contagem de câmeras (total e funcionando)
- Status de limpeza
- Status do HD
- Status do sistema
- Armazenamento em dias
- Testes realizados
- Problemas identificados
- Recomendações
- **Upload de até 9 imagens** (novo)

### 📄 Geração de Relatório .docx
- Template baseado em documento Word
- Substituição automática de tags
- **Inserção automática de imagens** (novo)
- Download automático do arquivo
- Nomeação inteligente do arquivo

### 📸 Sistema de Anexos
- **Máximo de 9 imagens** por relatório
- **Formato paisagem** recomendado
- **Visualização das imagens** selecionadas
- **Remoção individual** de imagens
- **Conversão automática** para base64
- **Tags específicas**: {%anexo1} até {%anexo9}

## 🔧 Como Configurar o Template

### 1. Criar o Template .docx
Crie um documento Word com as seguintes tags de substituição:

```
RELATÓRIO DE VISITA TÉCNICA SEMANAL

Cliente: {cliente}
Local: {local}
Data da visita: {data_formatada}
Período: {periodo}
Técnico responsável: {tecnico}

INFORMAÇÕES TÉCNICAS:
- Total de câmeras instaladas: {cameras_total}
- Total de câmeras funcionando: {cameras_ok}
- Percentual de funcionamento: {percentual_cameras}%
- Limpeza das câmeras: {limpeza}
- Status do HD: {status_hd}
- Status do sistema: {status_sistema}
- Armazenamento: {armazenamento_dias}
- Teste de HD realizado: {teste_hd}
- Teste de gravações realizado: {teste_gravacoes}

PROBLEMAS IDENTIFICADOS:
{problemas}

RECOMENDAÇÕES:
{recomendacoes}

ANEXOS (IMAGENS):
{%anexo1}
{%anexo2}
{%anexo3}
{%anexo4}
{%anexo5}
{%anexo6}
{%anexo7}
{%anexo8}
{%anexo9}

Data de geração: {data_formatada}
```

### 2. Salvar o Template
Salve o documento como `template-relatorio-visita.docx` na pasta `public/`

### 3. Tags Disponíveis

#### Dados do Relatório:
- `{cliente}` - Nome do cliente
- `{local}` - Endereço do local
- `{data}` - Data da visita (formato original)
- `{data_formatada}` - Data formatada em português
- `{periodo}` - Período do dia
- `{tecnico}` - Nome do técnico
- `{cameras_total}` - Total de câmeras instaladas
- `{cameras_ok}` - Total de câmeras funcionando
- `{percentual_cameras}` - Percentual de funcionamento
- `{limpeza}` - Status da limpeza
- `{status_hd}` - Status do HD
- `{status_sistema}` - Status do sistema
- `{armazenamento_dias}` - Tempo de armazenamento
- `{teste_hd}` - Se teste de HD foi realizado
- `{teste_gravacoes}` - Se teste de gravações foi realizado
- `{problemas}` - Problemas identificados
- `{recomendacoes}` - Recomendações

#### Tags de Anexos (Imagens):
- `{%anexo1}` - Primeira imagem
- `{%anexo2}` - Segunda imagem
- `{%anexo3}` - Terceira imagem
- `{%anexo4}` - Quarta imagem
- `{%anexo5}` - Quinta imagem
- `{%anexo6}` - Sexta imagem
- `{%anexo7}` - Sétima imagem
- `{%anexo8}` - Oitava imagem
- `{%anexo9}` - Nona imagem

## 🚀 Como Usar

1. Acesse a página IoT Security
2. Clique em "Gerar Relatório de Visita Técnica"
3. Preencha todos os campos obrigatórios
4. **Selecione até 9 imagens** (formato paisagem recomendado)
5. Clique em "Gerar Relatório"
6. O arquivo .docx será baixado automaticamente

## 📦 Dependências Instaladas

- `docxtemplater` - Para gerar documentos .docx
- `pizzip` - Para manipular arquivos ZIP (necessário para .docx)

## 🎨 Interface

- Design moderno com Tailwind CSS
- Modal responsivo
- Validação de campos
- Estados de loading
- **Visualização de imagens selecionadas**
- **Orientações para formato paisagem**
- **Contador de imagens** (X/9)
- **Botão de remoção** individual

## 📁 Estrutura de Arquivos

```
src/
├── lib/
│   └── generateReport.ts    # Utilitário para gerar relatórios
├── pages/
│   └── IotSec.tsx          # Página principal com formulário
public/
└── template-relatorio-visita.docx  # Template do relatório (você deve criar)
```

## ⚠️ Importante

- O template .docx deve estar na pasta `public/`
- O nome do arquivo deve ser exatamente `template-relatorio-visita.docx`
- As tags devem estar entre chaves `{tag}` ou `{%tag}` para imagens
- O sistema calcula automaticamente o percentual de câmeras funcionando
- **Máximo de 9 imagens** por relatório
- **Formato paisagem** recomendado para melhor visualização
- As imagens são convertidas para base64 e inseridas automaticamente 