# Hooks de Requisições

Esta pasta contém hooks customizados para gerenciar requisições HTTP de forma organizada e reutilizável.

## Estrutura

- `useTransactions.ts` - Hook para gerenciar transações
- `useCategories.ts` - Hook para gerenciar categorias  
- `useApi.ts` - Hook genérico para requisições HTTP
- `index.ts` - Exportações centralizadas

## Como usar

### Hook de Transações

```typescript
import { useTransactions } from '../hooks';

function TransactionsPage() {
  const {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
  } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleCreateTransaction = async (data) => {
    try {
      await createTransaction(data);
      // Transação criada com sucesso
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {transactions.map(transaction => (
        <div key={transaction.id}>
          {transaction.description} - R$ {transaction.value}
        </div>
      ))}
    </div>
  );
}
```

### Hook de Categorias

```typescript
import { useCategories } from '../hooks';

function CategoriesPage() {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (name: string) => {
    try {
      await createCategory({ name });
      // Categoria criada com sucesso
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {categories.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}
```

### Hook Genérico (useApi)

```typescript
import { useApi } from '../hooks';

function CustomPage() {
  const [response, methods] = useApi<Transaction[]>();

  const fetchData = async () => {
    try {
      await methods.get('/transactions');
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <div>
      {response.loading && <p>Carregando...</p>}
      {response.error && <p>Erro: {response.error}</p>}
      {response.data && (
        <div>
          {response.data.map(item => (
            <div key={item.id}>{item.description}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Vantagens

1. **Reutilização**: Hooks podem ser usados em múltiplos componentes
2. **Gerenciamento de estado**: Loading, error e data são gerenciados automaticamente
3. **Tipagem**: TypeScript fornece autocomplete e verificação de tipos
4. **Organização**: Código de requisições separado da lógica de UI
5. **Manutenibilidade**: Fácil de manter e estender

## Padrões

- Todos os hooks seguem o mesmo padrão de retorno
- Tratamento de erro consistente
- Estados de loading para melhor UX
- Tipagem forte com TypeScript 