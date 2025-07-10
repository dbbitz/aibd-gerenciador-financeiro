import { useState, useEffect } from "react";
import api from "../lib/api";

export interface Transaction {
  id: string;
  createdAt: Date;
  type: "income" | "expense";
  value: number;
  categoryId: string;
  categoryName: string;
  description: string;
}

export interface CreateTransactionData {
  type: "income" | "expense";
  value: number;
  categoryId: string;
  description: string;
}

export interface UpdateTransactionData {
  type?: "income" | "expense";
  value?: number;
  categoryId?: string;
  description?: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todas as transações
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (err) {
      setError("Erro ao buscar transações");
      console.error("Erro ao buscar transações:", err);
    } finally {
      setLoading(false);
    }
  };

  // Criar nova transação
  const createTransaction = async (data: CreateTransactionData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/transactions", data);
      setTransactions((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError("Erro ao criar transação");
      console.error("Erro ao criar transação:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar transação
  const updateTransaction = async (id: string, data: UpdateTransactionData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/transactions/${id}`, data);
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === id ? response.data : transaction
        )
      );
      return response.data;
    } catch (err) {
      setError("Erro ao atualizar transação");
      console.error("Erro ao atualizar transação:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deletar transação
  const deleteTransaction = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    } catch (err) {
      setError("Erro ao deletar transação");
      console.error("Erro ao deletar transação:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Buscar transação por ID
  const getTransactionById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/transactions/${id}`);
      return response.data;
    } catch (err) {
      setError("Erro ao buscar transação");
      console.error("Erro ao buscar transação:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
  };
};
