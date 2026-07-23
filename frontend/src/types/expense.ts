import type { ExpenseCategory } from './expense-category';

export interface Expense {
  id: string;
  description: string;
  amount: string;
  category: ExpenseCategory;
  createdAt: string;
}
