import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ phone: '', location: '', bio: '', skills: '', specialization: '', education: '', experienceYears: 0, employerDetails: { organizationName: '', website: '', address: '', description: '' } });

  useEffect(() => {
    api.get('/profiles/me').then(({ data }) => {
      if (data.profile) {
        setForm({
          ...data.profile,
          skills: (data.profile.skills || []).join(', '),
          education: (data.profile.education || []).join(', ')
        });
      }
    }).catch(() => {});
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    await api.post('/profiles', {
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      education: form.education.split(',').map((s) => s.trim()).filter(Boolean)
    });
    alert('Profile saved');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white mt-8 rounded-2xl border shadow-sm">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <form className="grid md:grid-cols-2 gap-4" onSubmit={saveProfile}>
        <input className="border rounded-lg px-4 py-3" placeholder="Phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Location" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input className="border rounded-lg px-4 py-3 md:col-span-2" placeholder="Bio" value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Skills (comma separated)" value={form.skills || ''} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Specialization" value={form.specialization || ''} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Education (comma separated)" value={form.education || ''} onChange={(e) => setForm({ ...form, education: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" type="number" placeholder="Experience years" value={form.experienceYears || 0} onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })} />
        {user?.role === 'employer' && (
          <>
            <input className="border rounded-lg px-4 py-3" placeholder="Organization name" value={form.employerDetails?.organizationName || ''} onChange={(e) => setForm({ ...form, employerDetails: { ...form.employerDetails, organizationName: e.target.value } })} />
            <input className="border rounded-lg px-4 py-3" placeholder="Website" value={form.employerDetails?.website || ''} onChange={(e) => setForm({ ...form, employerDetails: { ...form.employerDetails, website: e.target.value } })} />
          </>
        )}
        <button className="bg-emerald-600 text-white py-3 rounded-lg md:col-span-2">Save Profile</button>
      </form>
    </div>
  );
}
