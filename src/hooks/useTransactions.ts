import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

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

// Buscar todas as transações, com suporte a filtros (apenas client-side)
const fetchTransactions = async (filters?: {
  categoryId?: string;
  type?: "income" | "expense";
  startDate?: Date;
  endDate?: Date;
}) => {
  try {
    setLoading(true);
    setError(null);
    const userId = '36M8TEqJbkWcKu8j8XcJ';
    const transactionsRef = collection(db, 'users', userId, 'transactions');
    const { query, orderBy, getDocs } = await import("firebase/firestore");
    // Busca tudo do Firestore, filtra no client
    const q = query(transactionsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    let txs: Transaction[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt)) : new Date(),
        type: data.type,
        value: data.value,
        categoryId: data.categoryId,
        categoryName: data.categoryName || '',
        description: data.description || '',
      };
    });
    // Filtros client-side
    if (filters) {
      if (filters.categoryId) {
        txs = txs.filter(t => t.categoryId === filters.categoryId);
      }
      if (filters.type) {
        txs = txs.filter(t => t.type === filters.type);
      }
      if (filters.startDate) {
        txs = txs.filter(t => t.createdAt >= filters.startDate!);
      }
      if (filters.endDate) {
        txs = txs.filter(t => t.createdAt <= filters.endDate!);
      }
    }
    setTransactions(txs);
  } catch (err) {
    setError("Erro ao buscar transações");
    console.error("Erro ao buscar transações:", err);
  } finally {
    setLoading(false);
  }
};

  // Criar nova transação
  // Função não implementada sem backend
  const createTransaction = async (data: CreateTransactionData) => {
    throw new Error("createTransaction não implementado para frontend puro");
  };

  // Atualizar transação
  // Função não implementada sem backend
  const updateTransaction = async (id: string, data: UpdateTransactionData) => {
    throw new Error("updateTransaction não implementado para frontend puro");
  };

  // Deletar transação diretamente do Firestore
  const deleteTransaction = async (id: string) => {
    try {
      const userId = '36M8TEqJbkWcKu8j8XcJ';
      await deleteDoc(doc(db, 'users', userId, 'transactions', id));
      await fetchTransactions();
    } catch (error) {
      setError("Erro ao deletar transação");
      console.error("Erro ao deletar transação:", error);
    }
  };

  // Buscar transação por ID
  // Função não implementada sem backend
  const getTransactionById = async (id: string) => {
    throw new Error("getTransactionById não implementado para frontend puro");
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
