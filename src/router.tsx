import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TransactionsPage from "./pages/TransactionsPage";
import CategoriesPage from "./pages/CategoriesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/transactions",
    element: <TransactionsPage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
]);
