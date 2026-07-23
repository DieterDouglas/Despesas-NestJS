import type { FormEvent } from 'react';
import { Input } from './Input';
import { Select } from './Select';
import { Button, ButtonVariant } from './Button';
import { FormError } from './FormError';
import { ExpenseCategory, EXPENSE_CATEGORY_LABELS } from '../types/expense-category';

interface ExpenseFormProps {
  description: string;
  amount: string;
  category: ExpenseCategory;
  isEditing: boolean;
  error: string;
  onDescriptionChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: ExpenseCategory) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export function ExpenseForm({
  description,
  amount,
  category,
  isEditing,
  error,
  onDescriptionChange,
  onAmountChange,
  onCategoryChange,
  onSubmit,
  onCancel,
}: ExpenseFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <Input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        required
        className="sm:flex-1"
      />
      <Input
        type="number"
        step="0.01"
        placeholder="Valor"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        required
        className="sm:w-32"
      />
      <Select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as ExpenseCategory)}
        required
        className="sm:w-44"
      >
        {Object.values(ExpenseCategory).map((value) => (
          <option key={value} value={value}>
            {EXPENSE_CATEGORY_LABELS[value]}
          </option>
        ))}
      </Select>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button type="submit">{isEditing ? 'Salvar' : 'Adicionar'}</Button>
        {isEditing && (
          <Button type="button" variant={ButtonVariant.Secondary} onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
      {error && (
        <div className="w-full">
          <FormError message={error} />
        </div>
      )}
    </form>
  );
}
