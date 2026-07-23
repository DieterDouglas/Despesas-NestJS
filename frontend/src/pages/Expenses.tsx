import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { CategoryChart } from './CategoryChart';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseListItem } from '../components/ExpenseListItem';
import type { Expense } from '../types/expense';

export function Expenses() {
  const { logout } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

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
    setCategory('');
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

  async function handleDelete(id: string) {
    await api.delete(`/expenses/${id}`);
    if (editingId === id) {
      resetForm();
    }
    await loadExpenses();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Despesas</h1>
          <Button variant="secondary" onClick={logout}>
            Sair
          </Button>
        </div>

        <Card>
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
          <CategoryChart expenses={expenses} />
        </Card>

        <Card>
          <ul className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <ExpenseListItem
                key={expense.id}
                expense={expense}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
