import { useState } from 'react';
import api from '../api/axios';

export default function PostJob() {
  const [form, setForm] = useState({
    title: '', companyName: '', location: '', employmentType: 'full-time', specialization: '',
    experienceLevel: 'junior', salaryMin: '', salaryMax: '', description: '', skillsRequired: '', qualifications: ''
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/jobs', {
      ...form,
      salaryMin: Number(form.salaryMin),
      salaryMax: Number(form.salaryMax),
      skillsRequired: form.skillsRequired.split(',').map((s) => s.trim()).filter(Boolean),
      qualifications: form.qualifications.split(',').map((s) => s.trim()).filter(Boolean)
    });
    alert('Job posted');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white mt-8 rounded-2xl border shadow-sm">
      <h1 className="text-3xl font-bold mb-6">Post Medical Job</h1>
      <form className="grid md:grid-cols-2 gap-4" onSubmit={submit}>
        <input className="border rounded-lg px-4 py-3" placeholder="Job title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Company name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Specialization" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
        <select className="border rounded-lg px-4 py-3" value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })}>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
        <select className="border rounded-lg px-4 py-3" value={form.experienceLevel} onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })}>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
        <input className="border rounded-lg px-4 py-3" placeholder="Minimum salary" value={form.salaryMin} onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Maximum salary" value={form.salaryMax} onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} />
        <textarea className="border rounded-lg px-4 py-3 md:col-span-2" placeholder="Description" rows="5" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Skills required" value={form.skillsRequired} onChange={(e) => setForm({ ...form, skillsRequired: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Qualifications" value={form.qualifications} onChange={(e) => setForm({ ...form, qualifications: e.target.value })} />
        <button className="bg-emerald-600 text-white py-3 rounded-lg md:col-span-2">Publish Job</button>
      </form>
    </div>
  );
}
