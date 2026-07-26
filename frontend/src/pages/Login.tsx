import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/expenses');
    } catch {
      setError('Credenciais inválidas');
    }
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
      <FormError message={error} />
      <p className="text-sm text-slate-500 mt-6 text-center">
        Não tem conta?{' '}
        <Link to="/register" className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline">
          Registrar
        </Link>
      </p>
    </AuthLayout>
  );
}
