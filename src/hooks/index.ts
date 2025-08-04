// Exportação centralizada de todos os hooks
export { useTransactions } from "./useTransactions";
export { useCategories } from "./useCategories";
export { useApi } from "./useApi";
export { useAuth } from "./useAuth";

// Re-exportação dos tipos para facilitar o uso
export type {
  Transaction,
  CreateTransactionData,
  UpdateTransactionData,
} from "./useTransactions";
export type {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from "./useCategories";
export type { ApiResponse, ApiMethods } from "./useApi";
