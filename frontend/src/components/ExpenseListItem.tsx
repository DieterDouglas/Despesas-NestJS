import { Button } from './Button';
import type { Expense } from '../types/expense';

interface ExpenseListItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseListItem({ expense, onEdit, onDelete }: ExpenseListItemProps) {
  return (
    <li className="flex items-center justify-between py-3 gap-3">
      <div className="min-w-0">
        <p className="font-medium text-gray-900 truncate">{expense.description}</p>
        <p className="text-sm text-gray-500">{expense.category}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-semibold text-gray-900">
          R$ {Number(expense.amount).toFixed(2)}
        </span>
        <Button variant="secondary" onClick={() => onEdit(expense)}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => onDelete(expense.id)}>
          Excluir
        </Button>
      </div>
    </li>
  );
}
