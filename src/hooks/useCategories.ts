import { useState } from "react";
import api from "../lib/api";

export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

export interface CreateCategoryData {
  name: string;
}

export interface UpdateCategoryData {
  name?: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todas as categorias
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (err) {
      setError("Erro ao buscar categorias");
      console.error("Erro ao buscar categorias:", err);
    } finally {
      setLoading(false);
    }
  };

  // Criar nova categoria
  const createCategory = async (data: CreateCategoryData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/categories", data);
      setCategories((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError("Erro ao criar categoria");
      console.error("Erro ao criar categoria:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar categoria
  const updateCategory = async (id: string, data: UpdateCategoryData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/categories/${id}`, data);
      setCategories((prev) =>
        prev.map((category) => (category.id === id ? response.data : category))
      );
      return response.data;
    } catch (err) {
      setError("Erro ao atualizar categoria");
      console.error("Erro ao atualizar categoria:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deletar categoria
  const deleteCategory = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      setError("Erro ao deletar categoria");
      console.error("Erro ao deletar categoria:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Buscar categoria por ID
  const getCategoryById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (err) {
      setError("Erro ao buscar categoria");
      console.error("Erro ao buscar categoria:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
};
