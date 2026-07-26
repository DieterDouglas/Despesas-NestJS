import { Button, ButtonVariant } from './Button';
import type { Expense } from '../types/expense';
import { EXPENSE_CATEGORY_LABELS } from '../types/expense-category';

interface ExpenseListItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseListItem({ expense, onEdit, onDelete }: ExpenseListItemProps) {
  return (
    <li className="flex items-center justify-between py-4 gap-3 transition-colors duration-150 hover:bg-slate-50 -mx-2 px-2 rounded-lg">
      <div className="min-w-0 text-start">
        <p className="font-medium text-slate-900 truncate">{expense.description}</p>
        <span className="inline-block mt-1 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
          {EXPENSE_CATEGORY_LABELS[expense.category]}
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-semibold text-slate-900 tabular-nums">
          R$ {Number(expense.amount).toFixed(2)}
        </span>
        <Button variant={ButtonVariant.Secondary} onClick={() => onEdit(expense)}>
          Editar
        </Button>
        <Button variant={ButtonVariant.Danger} onClick={() => onDelete(expense.id)}>
          Excluir
        </Button>
      </div>
    </li>
  );
}
