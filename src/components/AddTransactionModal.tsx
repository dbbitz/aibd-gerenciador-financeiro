import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, Plus, Minus } from "lucide-react";

interface Transaction {
  id: string;
  createdAt: Date;
  type: "income" | "expense";
  value: number;
  categoryId: string;
  categoryName: string;
  description: string;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, "id" | "createdAt">) => void;
}

// Categorias mockadas
const categories = [
  { id: "1", name: "Salário", type: "income" },
  { id: "2", name: "Alimentação", type: "expense" },
  { id: "3", name: "Contas", type: "expense" },
  { id: "4", name: "Freelance", type: "income" },
  { id: "5", name: "Transporte", type: "expense" },
  { id: "6", name: "Lazer", type: "expense" },
  { id: "7", name: "Investimentos", type: "income" },
  { id: "8", name: "Saúde", type: "expense" },
  { id: "9", name: "Educação", type: "expense" },
  { id: "10", name: "Vendas", type: "income" },
];

function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
}: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    type: "expense" as "income" | "expense",
    value: "",
    categoryId: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.value || parseFloat(formData.value) <= 0) {
      newErrors.value = "Valor deve ser maior que zero";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Selecione uma categoria";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const category = categories.find((cat) => cat.id === formData.categoryId);

    if (!category) {
      setErrors({ categoryId: "Categoria inválida" });
      return;
    }

    const newTransaction = {
      type: formData.type,
      value: parseFloat(formData.value),
      categoryId: formData.categoryId,
      categoryName: category.name,
      description: formData.description.trim(),
    };

    onSave(newTransaction);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      type: "expense",
      value: "",
      categoryId: "",
      description: "",
    });
    setErrors({});
    onClose();
  };

  const filteredCategories = categories.filter(
    (cat) => cat.type === formData.type
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg">Adicionar Transação</CardTitle>
            <CardDescription>
              Preencha os dados da nova transação
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tipo de Transação */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Transação</label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={formData.type === "expense" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("type", "expense")}
                  className="flex-1"
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Despesa
                </Button>
                <Button
                  type="button"
                  variant={formData.type === "income" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("type", "income")}
                  className="flex-1"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Receita
                </Button>
              </div>
            </div>

            {/* Valor */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.value ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0,00"
              />
              {errors.value && (
                <p className="text-sm text-red-500">{errors.value}</p>
              )}
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  handleInputChange("categoryId", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.categoryId ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Selecione uma categoria</option>
                {filteredCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-sm text-red-500">{errors.categoryId}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                rows={3}
                placeholder="Descreva a transação..."
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Botões */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Salvar Transação
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddTransactionModal;
