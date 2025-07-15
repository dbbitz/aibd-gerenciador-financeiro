import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

function CategoriesPage() {
  const userId = '36M8TEqJbkWcKu8j8XcJ';
  const [categories, setCategories] = useState<Category[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const ref = collection(db, 'users', userId, 'categories');
    const snap = await getDocs(ref);
    setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Category));
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'users', userId, 'categories', id));
    setConfirmId(null);
    fetchCategories();
  };

  // Add the undeletable 'Geral' category to both groups
  const geralCategory: Category = { id: 'geral', name: 'Geral', type: 'expense' };
  const grouped = {
    income: [geralCategory, ...categories.filter(c => c.type === 'income' && c.name !== 'Geral')],
    expense: [geralCategory, ...categories.filter(c => c.type === 'expense' && c.name !== 'Geral')],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>Voltar</Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categorias</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">Gerencie suas categorias de receitas e despesas</p>
            </div>
          </div>
        </div>

        {/* Cards de Categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {['income', 'expense'].map(type => (
            <div key={type}>
              <div className="mb-3">
                <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-gray-200">
                  {type === 'income' ? 'Receitas' : 'Despesas'}
                </h2>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
                <ul className="space-y-2">
                  {grouped[type as 'income' | 'expense'].length === 0 && (
                    <li className="text-gray-500 dark:text-gray-400">Nenhuma categoria cadastrada.</li>
                  )}
                  {grouped[type as 'income' | 'expense'].map(cat => (
                    <li key={cat.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded px-4 py-2 text-gray-900 dark:text-gray-100">
                      <span>{cat.name}</span>
                      {cat.name !== 'Geral' ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
                            onClick={() => setConfirmId(cat.id)}
                            aria-label="Excluir categoria"
                          >
                            <Trash2 />
                          </Button>
                          {confirmId === cat.id && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                              <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg text-center text-gray-900 dark:text-gray-100">
                                <p className="mb-4">Tem certeza que deseja excluir a categoria <b>{cat.name}</b>?</p>
                                <div className="flex gap-4 justify-center">
                                  <Button variant="destructive" onClick={() => handleDelete(cat.id)}>Excluir</Button>
                                  <Button variant="outline" onClick={() => setConfirmId(null)}>Cancelar</Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Gerenciador Financeiro. Desenvolvido com React, TypeScript e shadcn/ui.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
