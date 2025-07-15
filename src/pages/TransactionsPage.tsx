import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import AddTransactionModal from "@/components/AddTransactionModal";
import { Timestamp, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  // Categories for AddTransactionModal
  const { categories, fetchCategories } = useCategories();
  const [currentTotalBalance, setCurrentTotalBalance] = useState(0);
  const [currentExpenseTotal, setCurrentExpenseTotal] = useState(0);
  const [currentExpenseCount, setCurrentExpenseCount] = useState(0);
  const [currentIncomeTotal, setCurrentIncomeTotal] = useState(0);
  const [currentIncomeCount, setCurrentIncomeCount] = useState(0);

  function getCurrentTimestamp(): Timestamp {
    const now = new Date();
    return Timestamp.fromDate(now);
  }

  const userId = '36M8TEqJbkWcKu8j8XcJ'
  
  useEffect(() => {
    async function fetchCurrentTotalBalance() {
      try {
        const transactionsRef = collection(db, 'users', userId, 'transactions');

        const endDate = getCurrentTimestamp();
        const constraints = [where('date', '<', endDate)];

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
          constraints.push(where('date', '<', endDate));

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
          constraints.push(where('date', '<', endDate));

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

  const { transactions, loading, error, fetchTransactions } = useTransactions();
  // Fetch all transactions on mount
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

  const handleSaveTransaction = async () => {
    // Optionally, you could call createTransaction from the hook here if you want to add immediately
    // For now, just refetch all transactions after adding
    await fetchTransactions();
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
                            <div className="text-right">
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
                              <p className="text-xs text-gray-500">
                                ID: {transaction.id}
                              </p>
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
    </div>
  );
}

export default TransactionsPage;
