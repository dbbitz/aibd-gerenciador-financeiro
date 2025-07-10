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
import { useState } from "react";
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

// Dados mockados
const mockTransactions: Transaction[] = [
  {
    id: "1",
    createdAt: new Date("2024-01-15"),
    type: "income",
    value: 5000,
    categoryId: "1",
    categoryName: "Salário",
    description: "Salário mensal",
  },
  {
    id: "2",
    createdAt: new Date("2024-01-14"),
    type: "expense",
    value: 350,
    categoryId: "2",
    categoryName: "Alimentação",
    description: "Compras no supermercado",
  },
  {
    id: "3",
    createdAt: new Date("2024-01-13"),
    type: "expense",
    value: 120,
    categoryId: "3",
    categoryName: "Contas",
    description: "Conta de luz",
  },
  {
    id: "4",
    createdAt: new Date("2024-01-12"),
    type: "income",
    value: 1500,
    categoryId: "4",
    categoryName: "Freelance",
    description: "Projeto de design",
  },
  {
    id: "5",
    createdAt: new Date("2024-01-11"),
    type: "expense",
    value: 200,
    categoryId: "5",
    categoryName: "Transporte",
    description: "Combustível",
  },
  {
    id: "6",
    createdAt: new Date("2024-01-10"),
    type: "expense",
    value: 80,
    categoryId: "6",
    categoryName: "Lazer",
    description: "Cinema e jantar",
  },
  {
    id: "7",
    createdAt: new Date("2024-01-09"),
    type: "income",
    value: 800,
    categoryId: "7",
    categoryName: "Investimentos",
    description: "Dividendos",
  },
  {
    id: "8",
    createdAt: new Date("2024-01-08"),
    type: "expense",
    value: 450,
    categoryId: "8",
    categoryName: "Saúde",
    description: "Consulta médica",
  },
];

function TransactionsPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.value, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.value, 0);

  const balance = totalIncome - totalExpenses;

  const handleBack = () => {
    navigate("/");
  };

  const handleAddTransaction = () => {
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (
    newTransaction: Omit<Transaction, "id" | "createdAt">
  ) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(), // ID simples baseado no timestamp
      createdAt: new Date(),
    };

    setTransactions((prev) => [transaction, ...prev]);
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
                  balance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(balance)}
              </div>
              <p className="text-xs text-muted-foreground">
                {balance >= 0 ? "Saldo positivo" : "Saldo negativo"}
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
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground">
                {transactions.filter((t) => t.type === "income").length}{" "}
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
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                {transactions.filter((t) => t.type === "expense").length}{" "}
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
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
      />
    </div>
  );
}

export default TransactionsPage;
