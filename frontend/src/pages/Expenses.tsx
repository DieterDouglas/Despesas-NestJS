import { useAuth } from '../auth/AuthContext';

export function Expenses() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Despesas</h1>
      <p>Em breve: listagem, criação e gráfico de despesas.</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
