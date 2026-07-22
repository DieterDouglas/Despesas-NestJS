import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Expenses } from './pages/Expenses';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/expenses" element={<Expenses />} />
        </Route>
        <Route path="*" element={<Navigate to="/expenses" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
