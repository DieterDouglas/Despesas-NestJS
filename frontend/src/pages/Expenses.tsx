import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { CategoryChart } from './CategoryChart';

interface Expense {
  id: string;
  description: string;
  amount: string;
  category: string;
  createdAt: string;
}

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
    <div>
      <h1>Despesas</h1>
      <button onClick={logout}>Sair</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Salvar' : 'Adicionar'}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>
      {error && <p>{error}</p>}

      <CategoryChart expenses={expenses} />

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} — R$ {Number(expense.amount).toFixed(2)} ({expense.category})
            <button onClick={() => handleEdit(expense)}>Editar</button>
            <button onClick={() => handleDelete(expense.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
