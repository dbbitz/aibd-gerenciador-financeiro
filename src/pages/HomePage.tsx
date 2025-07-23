import AddTransactionModal from "@/components/AddTransactionModal";
import AddCategoryModal from "@/components/AddCategoryModal";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

interface Transaction {
  id: string;
  date: Date;
  createdAt?: Date | string;
  type: "income" | "expense";
  value: number;
  categoryId: string;
  categoryName: string;
  description: string;
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Timestamp, collection, query, where, getDocs, orderBy, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
function HomePage() {
  const navigate = useNavigate();
  const [currentTotalBalance, setCurrentTotalBalance] = useState(0);
  const [lastTotalBalance, setLastTotalBalance] = useState(0);
  const [currentIncomeTotal, setCurrentIncomeTotal] = useState(0);
  const [lastIncomeTotal, setLastIncomeTotal] = useState(0);
  const [currentExpenseTotal, setCurrentExpenseTotal] = useState(0);
  const [lastExpenseTotal, setLastExpenseTotal] = useState(0);
  const [thisMonthEconomy, setThisMonthEconomy] = useState(0);
  // Últimas 5 transações mais recentes
  // (A lista completa não é mais usada na interface)
  const [lastFiveTransactions, setLastFiveTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMessage, setCategoryMessage] = useState<string | null>(null);
  const [transactionMessage, setTransactionMessage] = useState<string | null>(null);
  const userId = '36M8TEqJbkWcKu8j8XcJ';
  // Fetch categories from Firestore
  const fetchCategories = async () => {
    try {
      const categoriesRef = collection(db, 'users', userId, 'categories');
      const snapshot = await getDocs(categoriesRef);
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Category[];
      setCategories(cats);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function getStartOfMonth(monthOffset = 0): Timestamp {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1, 0, 0, 0);
    return Timestamp.fromDate(start);
  }

  function getCurrentTimestamp(): Timestamp {
    const now = new Date();
    return Timestamp.fromDate(now);
  }

  function calculatePercentage(current: number, previous: number): string {
    if (previous <= 0) return "N/A";

    const sign = current >= previous ? "+" : "-";
    const variation = Math.abs((current / previous) - 1);

    return `${sign}${variation.toLocaleString("pt-BR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  
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

      async function fetchLastTotalBalance() {
        try {
          const transactionsRef = collection(db, 'users', userId, 'transactions');

          const endDate = getStartOfMonth();
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
          setLastTotalBalance(total);
        }catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }

      async function fetchCurrentExpenseTotal() {
        try {
          const transactionsRef = collection(db, 'users', userId, 'transactions');

          const constraints = [where('type', '==', 'expense')];

          const endDate = getCurrentTimestamp();
          const startDate = getStartOfMonth();
          constraints.push(where('createdAt', '<', endDate));
          constraints.push(where('createdAt', '>=', startDate));

          const q = query(transactionsRef, ...constraints);
          const snapshot = await getDocs(q);

          let total = 0;
          snapshot.forEach(doc => {
            const data = doc.data();
            if (typeof data.value === 'number') {
              total += data.value;
            }
          });
          setCurrentExpenseTotal(total);
        }catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }

      async function fetchLastExpenseTotal() {
        try {
          const transactionsRef = collection(db, 'users', userId, 'transactions');

          const constraints = [where('type', '==', 'expense')];

          const endDate = getStartOfMonth();
          const startDate = getStartOfMonth(-1);

          constraints.push(where('createdAt', '<', endDate));
          constraints.push(where('createdAt', '>=', startDate));

          const q = query(transactionsRef, ...constraints);
          const snapshot = await getDocs(q);

          let total = 0;
          snapshot.forEach(doc => {
            const data = doc.data();
            if (typeof data.value === 'number') {
              total += data.value;
            }
          });
          setLastExpenseTotal(total);
        }catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }

      async function fetchCurrentIncomeTotal() {
        try {
          const transactionsRef = collection(db, 'users', userId, 'transactions');

          const constraints = [where('type', '==', 'income')];

          const endDate = getCurrentTimestamp();
          const startDate = getStartOfMonth();
          constraints.push(where('createdAt', '<', endDate));
          constraints.push(where('createdAt', '>=', startDate));

          const q = query(transactionsRef, ...constraints);
          const snapshot = await getDocs(q);

          let total = 0;
          snapshot.forEach(doc => {
            const data = doc.data();
            if (typeof data.value === 'number') {
              total += data.value;
            }
          });
          setCurrentIncomeTotal(total);
        }catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }

      async function fetchLastIncomeTotal() {
        try {
          const transactionsRef = collection(db, 'users', userId, 'transactions');

          const constraints = [where('type', '==', 'income')];

          const endDate = getStartOfMonth();
          const startDate = getStartOfMonth(-1);

          constraints.push(where('createdAt', '<', endDate));
          constraints.push(where('createdAt', '>=', startDate));

          const q = query(transactionsRef, ...constraints);
          const snapshot = await getDocs(q);

          let total = 0;
          snapshot.forEach(doc => {
            const data = doc.data();
            if (typeof data.value === 'number') {
              total += data.value;
            }
          });
          setLastIncomeTotal(total);
        }catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }

      async function fetchThisMonthEconomy(){
        try {
          const totalLastMonth = lastTotalBalance;

          setThisMonthEconomy(totalLastMonth);
        }catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }

      async function fetchThisLastTransactions() {
        try {
          const transactionsRef = collection(db, 'users', userId, 'transactions');
          // Busca as transações ordenando por createdAt (mais recentes primeiro)
          const q = query(transactionsRef, orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const transactions = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) as Transaction[];

            const lastFive = transactions.slice(0, 5);
            setLastFiveTransactions(lastFive);
          } else {
            setLastFiveTransactions([]);
          }
        } catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      }
    fetchCurrentTotalBalance()
    fetchCurrentIncomeTotal()
    fetchLastIncomeTotal();
    fetchCurrentExpenseTotal();
    fetchLastExpenseTotal();
    fetchLastTotalBalance();
    fetchThisMonthEconomy();
    fetchThisLastTransactions();
  }, [lastTotalBalance]);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const handleSaveCategory = async (category: Omit<Category, "id">) => {
    // Check for duplicate (case-insensitive, same name and type)
    const isDuplicate = categories.some(
      c => c.name.trim().toLowerCase() === category.name.trim().toLowerCase() && c.type === category.type
    );
    if (isDuplicate) {
      setCategoryMessage("Categoria já criada!");
      setTimeout(() => setCategoryMessage(null), 2500);
      return;
    }
    try {
      const categoriesRef = collection(db, 'users', userId, 'categories');
      await addDoc(categoriesRef, category);
      setCategoryMessage("Categoria criada com sucesso!");
      setTimeout(() => setCategoryMessage(null), 2500);
      await fetchCategories(); // Refresh dropdown
    } catch (error) {
      setCategoryMessage("Erro ao salvar categoria!");
      setTimeout(() => setCategoryMessage(null), 2500);
      console.error('Erro ao salvar categoria:', error);
    }
    setIsAddCategoryModalOpen(false);
  };

  const handleViewTransactions = () => {
    navigate("/transactions");
  };

  const handleSaveTransaction = async (
    transaction: Omit<Transaction, "id" | "date">
  ) => {
    try {
      const transactionsRef = collection(db, 'users', userId, 'transactions');
      await addDoc(transactionsRef, {
        ...transaction,
        createdAt: new Date(),
      });
      setTransactionMessage("Transação criada com sucesso!");
      setTimeout(() => setTransactionMessage(null), 2500);
      // @ts-ignore
      fetchThisLastTransactions();
      setIsAddTransactionModalOpen(false);
    } catch (error) {
      setTransactionMessage("Erro ao salvar transação!");
      setTimeout(() => setTransactionMessage(null), 2500);
      console.error('Erro ao salvar transação:', error);
      // Do not close the modal on error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Gerenciador Financeiro
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Controle suas finanças de forma simples e eficiente
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentTotalBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receitas do mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {currentIncomeTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                {calculatePercentage(currentIncomeTotal, lastIncomeTotal)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas do mês</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {currentExpenseTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                {calculatePercentage(currentExpenseTotal, lastExpenseTotal)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economias</CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {thisMonthEconomy > 0 ? thisMonthEconomy.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0.00"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção de Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Gerencie suas transações financeiras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() => setIsAddTransactionModalOpen(true)}
                >
                  Adicionar Transação
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setIsAddCategoryModalOpen(true)}
                >
                  Adicionar Categoria
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => navigate('/categories')}
                >
                  Lista de Categorias
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Transações</CardTitle>
              <CardDescription>Suas transações mais recentes</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {lastFiveTransactions.length === 0 ? (
                  <p className="text-muted-foreground">Nenhuma transação encontrada.</p>
                ) : (
                  lastFiveTransactions.map((tx) => {
                    const isIncome = tx.type === 'income';
                    const color = isIncome ? 'green' : 'red';
                    const prefix = isIncome ? '+' : '-';
                    const valueFormatted = tx.value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    });
                    return (
                      <div key={tx.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 bg-${color}-500 rounded-full`} />
                          <p className="font-medium">{tx.description}</p>
                        </div>
                        <span className={`font-medium text-${color}-600`}>
                          {prefix}{valueFormatted}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleViewTransactions}>
                Ver Todas as Transações
              </Button>
            </CardFooter>
          </Card>
        </div>

        <AddTransactionModal
          isOpen={isAddTransactionModalOpen}
          onClose={() => setIsAddTransactionModalOpen(false)}
          onSave={handleSaveTransaction}
          categories={categories}
          fetchCategories={fetchCategories}
        />


        {/* Category Modal and Message */}
        <AddCategoryModal
          isOpen={isAddCategoryModalOpen}
          onClose={() => setIsAddCategoryModalOpen(false)}
          onSave={handleSaveCategory}
        />
        {categoryMessage && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-300 shadow-lg px-6 py-3 rounded text-center text-black font-semibold">
            {categoryMessage}
          </div>
        )}
        {transactionMessage && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-300 shadow-lg px-6 py-3 rounded text-center text-black font-semibold">
            {transactionMessage}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Gerenciador Financeiro. Desenvolvido com React, TypeScript e
            shadcn/ui.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
