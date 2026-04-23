import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'jobseeker' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-sm border">
      <h1 className="text-3xl font-bold mb-6">Create MediHire account</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="w-full border rounded-lg px-4 py-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="w-full border rounded-lg px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border rounded-lg px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="w-full border rounded-lg px-4 py-3" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-emerald-600 text-white py-3 rounded-lg">Register</button>
      </form>
    </div>
  );
}
