# Debug - Problema "undefined" no Template

## Possíveis Causas:

### 1. **Template não encontrado**
- Verifique se o arquivo `template-relatorio-visita.docx` existe na pasta `public/`
- O nome deve ser exatamente igual

### 2. **Tags não correspondem**
- Verifique se as tags no template correspondem exatamente às disponíveis
- Tags disponíveis: `{cliente}`, `{local}`, `{data}`, etc.

### 3. **Valores undefined nos dados**
- O sistema agora trata valores undefined com valores padrão
- Verifique o console do navegador para ver os logs

## Como Debugar:

### 1. Verificar Console
Abra o console do navegador (F12) e procure por:
```
Dados do template: {cliente: "...", local: "...", ...}
```

### 2. Verificar Template
Certifique-se que o template tem as tags corretas:

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

Data de geração: {data_formatada}
```

### 3. Teste Simples
Crie um template simples apenas com:
```
Cliente: {cliente}
Local: {local}
```

### 4. Verificar Network
No console do navegador, vá em Network e verifique se o arquivo template está sendo carregado corretamente.

## Soluções Implementadas:

1. **Tratamento de valores undefined** - Agora usa valores padrão
2. **Logs de debug** - Console mostra os dados sendo enviados
3. **Verificação de resposta HTTP** - Erro se template não for encontrado
4. **Conversão segura de valores** - Função `safeValue()` trata undefined/null

## Próximos Passos:

1. Verifique se o template existe em `public/template-relatorio-visita.docx`
2. Abra o console do navegador e teste o formulário
3. Verifique os logs para ver quais dados estão sendo enviados
4. Se o problema persistir, compartilhe os logs do console 