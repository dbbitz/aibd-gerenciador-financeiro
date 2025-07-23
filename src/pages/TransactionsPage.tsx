import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, ArrowLeft, TrendingUp, TrendingDown, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Timestamp, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AddTransactionModal from "@/components/AddTransactionModal";


// Tipos baseados na estrutura da collection
interface Transaction {
  id: string;
  createdAt: Date;
  type: "income" | "expense";
  value: number;
  categoryId: string;
  categoryName: string;
  description: string;
}


function TransactionsPage() {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  // Categories for AddTransactionModal (fetch directly from Firestore)
  const [categories, setCategories] = useState<{ id: string; name: string; type: "income" | "expense" }[]>([]);
  const [transactionMessage, setTransactionMessage] = useState<string | null>(null);

  const userId = '36M8TEqJbkWcKu8j8XcJ';

  const fetchCategories = async () => {
    try {
      const categoriesRef = collection(db, 'users', userId, 'categories');
      const snapshot = await getDocs(categoriesRef);
      const cats = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          type: data.type,
        };
      });
      setCategories(cats);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };
  const [currentTotalBalance, setCurrentTotalBalance] = useState(0);
  const [currentExpenseTotal, setCurrentExpenseTotal] = useState(0);
  const [currentExpenseCount, setCurrentExpenseCount] = useState(0);
  const [currentIncomeTotal, setCurrentIncomeTotal] = useState(0);
  const [currentIncomeCount, setCurrentIncomeCount] = useState(0);

  function getCurrentTimestamp(): Timestamp {
    const now = new Date();
    return Timestamp.fromDate(now);
  }

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    async function fetchCurrentTotalBalance() {
      try {
        const transactionsRef = collection(db, 'users', userId, 'transactions');

        const endDate = getCurrentTimestamp();
        const constraints = [where('createdAt', '<', endDate)];

        const q = query(transactionsRef, ...constraints);
        const snapshot = await getDocs(q);

        let total = 0;
        snapshot.forEach(doc => {
          const data = doc.data();
          if (typeof data.value === 'number') {
            if( data.type === 'income') 
              total += data.value;
            else
              total -= data.value;
          }
        });
        setCurrentTotalBalance(total);
      }catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    }

    async function fetchCurrentExpenseTotal() {
        try {
          const transactionsRef = collection(db, 'users', userId, 'transactions');

          const constraints = [where('type', '==', 'expense')];

          const endDate = getCurrentTimestamp();
          constraints.push(where('createdAt', '<', endDate));

          const q = query(transactionsRef, ...constraints);
          const snapshot = await getDocs(q);

          let total = 0;
          let count = 0;
          snapshot.forEach(doc => {
            const data = doc.data();
            if (typeof data.value === 'number') {
              total += data.value;
              count++;
            }
          });
          setCurrentExpenseTotal(total);
          setCurrentExpenseCount(count);
        }catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }
      async function fetchCurrentIncomeTotal() {
        try {
          const transactionsRef = collection(db, 'users', userId, 'transactions');

          const constraints = [where('type', '==', 'income')];

          const endDate = getCurrentTimestamp();
          constraints.push(where('createdAt', '<', endDate));

          const q = query(transactionsRef, ...constraints);
          const snapshot = await getDocs(q);

          let total = 0;
          let count = 0;
          snapshot.forEach(doc => {
            const data = doc.data();
            if (typeof data.value === 'number') {
              total += data.value;
              count++;
            }
          });
          setCurrentIncomeTotal(total);
          setCurrentIncomeCount(count);
        }catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }
    
    fetchCurrentTotalBalance()
    fetchCurrentIncomeTotal()
    fetchCurrentExpenseTotal()
  }, []);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Filtros de transação
  const [filterCategory, setFilterCategory] = useState<string | undefined>(undefined);
  const [filterType, setFilterType] = useState<"income" | "expense" | "" | undefined>("");
  const [filterStartDate, setFilterStartDate] = useState<string>("");
  const [filterEndDate, setFilterEndDate] = useState<string>("");

  const { transactions, loading, error, fetchTransactions, deleteTransaction } = useTransactions();

  // Função para buscar transações com filtros
  // Função para buscar transações com filtros
  const handleFilter = async (params?: {
    categoryId?: string;
    type?: "income" | "expense";
    startDate?: Date;
    endDate?: Date;
  }) => {
    await fetchTransactions({
      categoryId: typeof params?.categoryId !== 'undefined' ? params.categoryId : (filterCategory || undefined),
      type: typeof params?.type !== 'undefined' ? params.type : (filterType ? filterType as "income" | "expense" : undefined),
      startDate: typeof params?.startDate !== 'undefined' ? params.startDate : (filterStartDate ? new Date(filterStartDate) : undefined),
      endDate: typeof params?.endDate !== 'undefined' ? params.endDate : (filterEndDate ? new Date(filterEndDate) : undefined),
    });
  };

  // Buscar todas as transações ao montar
  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // const totalIncome = transactions
  //   .filter((t) => t.type === "income")
  //   .reduce((sum, t) => sum + t.value, 0);

  // const totalExpenses = transactions
  //   .filter((t) => t.type === "expense")
  //   .reduce((sum, t) => sum + t.value, 0);

  // const balance = totalIncome - totalExpenses;

  const handleBack = () => {
    navigate("/");
  };

  const handleAddTransaction = () => {
    setIsModalOpen(true);
  };

  const handleSaveTransaction = async (
    transaction: Omit<Transaction, "id" | "createdAt">
  ) => {
    try {
      const transactionsRef = collection(db, 'users', userId, 'transactions');
      await addDoc(transactionsRef, {
        ...transaction,
        createdAt: new Date(),
      });
      setTransactionMessage("Transação criada com sucesso!");
      setTimeout(() => setTransactionMessage(null), 2500);
      await fetchTransactions();
    } catch (error) {
      setTransactionMessage("Erro ao salvar transação!");
      setTimeout(() => setTransactionMessage(null), 2500);
      console.error('Erro ao salvar transação:', error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Todas as Transações
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Gerencie todas as suas transações financeiras
              </p>
            </div>
          </div>
          <Button onClick={handleAddTransaction}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Transação
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  currentTotalBalance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(currentTotalBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                {currentTotalBalance >= 0 ? "Saldo positivo" : "Saldo negativo"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Receitas
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(currentIncomeTotal)}
              </div>
              <p className="text-xs text-muted-foreground">
                {currentIncomeCount + " "}
                transações
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Despesas
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(currentExpenseTotal)}
              </div>
              <p className="text-xs text-muted-foreground">
                {currentExpenseCount + " "}
                transações
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtrar Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-xs mb-1">Categoria</label>
                <select
                  className="border rounded px-2 py-1 min-w-[120px] bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                  value={filterCategory || ""}
                  onChange={e => {
                    const value = e.target.value || undefined;
                    setFilterCategory(value);
                    handleFilter({ categoryId: value });
                  }}
                >
                  <option value="">Todas</option>
                  {categories
                    .filter(cat => !filterType || cat.type === filterType)
                    .map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Tipo</label>
                <select
                  className="border rounded px-2 py-1 min-w-[120px] bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                  value={filterType}
                  onChange={e => {
                    const value = e.target.value as "income" | "expense" | "";
                    setFilterType(value);
                    // Limpa categoria se não for compatível
                    setFilterCategory(prev => {
                      if (!value) return prev;
                      const cat = categories.find(c => c.id === prev);
                      if (cat && cat.type !== value) return "";
                      return prev;
                    });
                    handleFilter({ type: value ? value as "income" | "expense" : undefined });
                  }}
                >
                  <option value="">Todos</option>
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Data Inicial</label>
                <input
                  type="date"
                  className="border rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                  value={filterStartDate}
                  onChange={e => {
                    setFilterStartDate(e.target.value);
                    handleFilter({ startDate: e.target.value ? new Date(e.target.value) : undefined });
                  }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Data Final</label>
                <input
                  type="date"
                  className="border rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                  value={filterEndDate}
                  onChange={e => {
                    setFilterEndDate(e.target.value);
                    handleFilter({ endDate: e.target.value ? new Date(e.target.value) : undefined });
                  }}
                />
              </div>
              {/* Botão de filtrar removido, pois agora filtra automaticamente */}
              <Button onClick={() => {
                setFilterCategory("");
                setFilterType("");
                setFilterStartDate("");
                setFilterEndDate("");
                fetchTransactions();
              }} variant="ghost">Limpar</Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Transações */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
            <CardDescription>
              {transactions.length} transações encontradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading && <div>Carregando transações...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {!loading && !error && transactions.length === 0 && (
                <div>Nenhuma transação encontrada.</div>
              )}
              {!loading && !error && transactions.length > 0 && (
                <>
                  {(() => {
                    // Agrupa transações por data (yyyy-mm-dd)
                    const grouped: { [date: string]: Transaction[] } = {};
                    transactions.forEach((t) => {
                      const d = new Date(t.createdAt);
                      const key = d.toISOString().slice(0, 10); // yyyy-mm-dd
                      if (!grouped[key]) grouped[key] = [];
                      grouped[key].push(t);
                    });
                    // Ordena datas decrescente
                    const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
                    return sortedDates.map((date) => (
                      <div key={date}>
                        <div className="text-xs font-semibold text-gray-500 mt-4 mb-2">
                          {new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        </div>
                        {grouped[date].map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-2"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  transaction.type === "income"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium">
                                    {transaction.categoryName}
                                  </p>
                                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                    {transaction.type === "income"
                                      ? "Receita"
                                      : "Despesa"}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {transaction.description}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(transaction.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 min-w-[110px]">
                              <p
                                className={`font-bold text-lg ${
                                  transaction.type === "income"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {transaction.type === "income" ? "+" : "-"}
                                {formatCurrency(transaction.value)}
                              </p>
                              {/* <p className="text-xs text-gray-500">ID: {transaction.id}</p> */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
                                onClick={() => setConfirmDeleteId(transaction.id)}
                                aria-label="Excluir transação"
                              >
                                <Trash2 />
                              </Button>
                              {confirmDeleteId === transaction.id && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                                  <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg text-center text-gray-900 dark:text-gray-100">
                                    <p className="mb-4">Tem certeza que deseja excluir a transação de <b>{transaction.categoryName}</b>?</p>
                                    <div className="flex gap-4 justify-center">
                                      <Button variant="destructive" onClick={async () => { await deleteTransaction(transaction.id); setConfirmDeleteId(null); }}>Excluir</Button>
                                      <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancelar</Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ));
                  })()}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Gerenciador Financeiro. Desenvolvido com React, TypeScript e
            shadcn/ui.
          </p>
        </div>
      </div>

      {/* Modal de Adicionar Transação */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        categories={categories}
        fetchCategories={fetchCategories}
      />
      {transactionMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-blue-500 text-white px-6 py-3 rounded shadow-lg animate-fade-in-out text-center font-semibold">
          {transactionMessage}
        </div>
      )}
    </div>
  );
}

export default TransactionsPage;
