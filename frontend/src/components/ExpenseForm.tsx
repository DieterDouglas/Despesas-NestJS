import type { FormEvent } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { FormError } from './FormError';

interface ExpenseFormProps {
  description: string;
  amount: string;
  category: string;
  isEditing: boolean;
  error: string;
  onDescriptionChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
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
      <Input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        required
        className="sm:w-40"
      />
      <div className="flex gap-2 w-full sm:w-auto">
        <Button type="submit">{isEditing ? 'Salvar' : 'Adicionar'}</Button>
        {isEditing && (
          <Button type="button" variant="secondary" onClick={onCancel}>
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
