type Transaction = {
  id: string;
  createdAt: Date;
  type: "income" | "expense";
  value: number;
  categoryId: string;
  categoryName: string;
  description: string;
};