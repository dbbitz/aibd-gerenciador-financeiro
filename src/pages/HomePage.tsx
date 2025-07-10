import AddTransactionModal from "@/components/AddTransactionModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);

  const handleViewTransactions = () => {
    navigate("/transactions");
  };

  const handleSaveTransaction = (
    transaction: Omit<Transaction, "id" | "createdAt">
  ) => {
    console.log(transaction);
    setIsAddTransactionModalOpen(false);
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
              <div className="text-2xl font-bold">R$ 15.350,00</div>
              <p className="text-xs text-muted-foreground">
                +2.5% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ 8.500,00
              </div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">R$ 3.150,00</div>
              <p className="text-xs text-muted-foreground">
                -5% em relação ao mês passado
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
                R$ 5.350,00
              </div>
              <p className="text-xs text-muted-foreground">
                +8% em relação ao mês passado
              </p>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full" variant="secondary">
                  Ver Relatórios
                </Button>
                <Button className="w-full" variant="ghost">
                  Configurações
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Salário</p>
                      <p className="text-sm text-muted-foreground">Hoje</p>
                    </div>
                  </div>
                  <span className="font-medium text-green-600">
                    +R$ 5.000,00
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Supermercado</p>
                      <p className="text-sm text-muted-foreground">Ontem</p>
                    </div>
                  </div>
                  <span className="font-medium text-red-600">-R$ 350,00</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Conta de Luz</p>
                      <p className="text-sm text-muted-foreground">
                        2 dias atrás
                      </p>
                    </div>
                  </div>
                  <span className="font-medium text-red-600">-R$ 120,00</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleViewTransactions}
              >
                Ver Todas as Transações
              </Button>
            </CardFooter>
          </Card>
        </div>

        <AddTransactionModal
          isOpen={isAddTransactionModalOpen}
          onClose={() => setIsAddTransactionModalOpen(false)}
          onSave={handleSaveTransaction}
        />

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
