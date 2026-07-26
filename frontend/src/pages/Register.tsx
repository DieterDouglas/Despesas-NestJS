import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../auth/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/expenses');
    } catch (err) {
      if (isAxiosError(err) && err.response?.data?.message) {
        const message = err.response.data.message;
        setError(Array.isArray(message) ? message.join(' ') : message);
      } else {
        setError('Não foi possível registrar. Tente novamente.');
      }
    }
  }

  return (
    <AuthLayout title="Registrar">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Mínimo de 8 caracteres, com maiúscula, minúscula, número e caractere especial.
          </p>
        </div>
        <Button type="submit" className="w-full">
          Criar conta
        </Button>
      </form>
      <FormError message={error} />
      <p className="text-sm text-gray-600 mt-4 text-center">
        Já tem conta?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
