# Instruções para o Template .docx

## Como criar o template do relatório

1. **Crie um documento Word (.docx)** com o seguinte conteúdo e tags:

### Estrutura sugerida do template:

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

## Tags disponíveis para substituição:

### Dados do Relatório:
- `{cliente}` - Nome do cliente
- `{local}` - Endereço do local
- `{data}` - Data da visita (formato original)
- `{data_formatada}` - Data formatada em português
- `{periodo}` - Período do dia (Manhã/Tarde/Noite)
- `{tecnico}` - Nome do técnico responsável
- `{cameras_total}` - Total de câmeras instaladas
- `{cameras_ok}` - Total de câmeras funcionando
- `{percentual_cameras}` - Percentual de câmeras funcionando
- `{limpeza}` - Status da limpeza (Sim/Não/Parcial)
- `{status_hd}` - Status do HD
- `{status_sistema}` - Status do sistema (Funcionando 100%/Apresenta falhas/Em análise)
- `{armazenamento_dias}` - Tempo de armazenamento
- `{teste_hd}` - Se teste de HD foi realizado
- `{teste_gravacoes}` - Se teste de gravações foi realizado
- `{problemas}` - Problemas identificados
- `{recomendacoes}` - Recomendações para o cliente

### Tags de Anexos (Imagens):
- `{%anexo1}` - Primeira imagem (se enviada)
- `{%anexo2}` - Segunda imagem (se enviada)
- `{%anexo3}` - Terceira imagem (se enviada)
- `{%anexo4}` - Quarta imagem (se enviada)
- `{%anexo5}` - Quinta imagem (se enviada)
- `{%anexo6}` - Sexta imagem (se enviada)
- `{%anexo7}` - Sétima imagem (se enviada)
- `{%anexo8}` - Oitava imagem (se enviada)
- `{%anexo9}` - Nona imagem (se enviada)

**Nota:** As tags de anexos serão preenchidas apenas se imagens forem enviadas. Caso contrário, ficarão vazias.

## Como usar:

1. Crie o documento Word com as tags acima
2. Salve como `template-relatorio-visita.docx` na pasta `public/`
3. O sistema irá substituir automaticamente as tags pelos dados do formulário
4. O arquivo será gerado com nome: `Relatorio_Visita_[CLIENTE]_[DATA].docx`

## Exemplo de nome de arquivo gerado:
`Relatorio_Visita_RKS_MATRIZ_15-01-2025.docx` 