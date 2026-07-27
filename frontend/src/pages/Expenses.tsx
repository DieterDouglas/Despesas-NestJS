import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { CategoryChart } from './CategoryChart';
import { Card } from '../components/Card';
import { Button, ButtonVariant } from '../components/Button';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseListItem } from '../components/ExpenseListItem';
import { SectionTitle } from '../components/SectionTitle';
import type { Expense } from '../types/expense';
import { ExpenseCategory } from '../types/expense-category';
import { ConfirmDialog } from '../components/ConfirmDialog';

export function Expenses() {
  const { logout } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.OUTROS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  async function loadExpenses() {
    const { data } = await api.get<Expense[]>('/expenses');
    setExpenses(data);
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  function resetForm() {
    setDescription('');
    setAmount('');
    setCategory(ExpenseCategory.OUTROS);
    setEditingId(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    const payload = { description, amount: Number(amount), category };
    try {
      if (editingId) {
        await api.patch(`/expenses/${editingId}`, payload);
      } else {
        await api.post('/expenses', payload);
      }
      resetForm();
      await loadExpenses();
    } catch {
      setError('Não foi possível salvar a despesa');
    }
  }

  function handleEdit(expense: Expense) {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Despesas</h1>
            <p className="text-sm text-slate-500 mt-1">Acompanhe e organize seus gastos por categoria.</p>
          </div>
          <Button variant={ButtonVariant.Secondary} onClick={logout}>
            Sair
          </Button>
        </div>

        <Card>
          <SectionTitle>{editingId ? 'Editar despesa' : 'Nova despesa'}</SectionTitle>
          <ExpenseForm
            description={description}
            amount={amount}
            category={category}
            isEditing={!!editingId}
            error={error}
            onDescriptionChange={setDescription}
            onAmountChange={setAmount}
            onCategoryChange={setCategory}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </Card>

        <Card>
          <SectionTitle>Gastos por categoria</SectionTitle>
          <CategoryChart expenses={expenses} />
        </Card>

        <Card>
          <SectionTitle>Histórico</SectionTitle>
          {expenses.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma despesa cadastrada ainda.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {expenses.map((expense) => (
                <ExpenseListItem
                  key={expense.id}
                  expense={expense}
                  onEdit={handleEdit}
                  onDelete={() => {
                    setIsOpen(true);
                    setSelectedExpense(expense);
                  }}
                />

              ))}
            </ul>
          )}
        </Card>
      </div>
      <ConfirmDialog
        isOpen={isOpen}
        expense={selectedExpense}
        onOpenChange={setIsOpen}
        onConfirmed={async () => { await loadExpenses() }}
      />
    </div>
  );
}
