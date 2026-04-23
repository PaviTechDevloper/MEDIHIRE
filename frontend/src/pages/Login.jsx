import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-sm border">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="w-full border rounded-lg px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border rounded-lg px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-emerald-600 text-white py-3 rounded-lg">Login</button>
      </form>
      <p className="mt-4 text-sm">No account? <Link className="text-emerald-700" to="/register">Create one</Link></p>
    </div>
  );
}
