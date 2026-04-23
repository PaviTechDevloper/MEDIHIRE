import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function EmployerApplications() {
  const [applications, setApplications] = useState([]);

  const load = () => api.get('/applications/employer').then(({ data }) => setApplications(data.applications));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/applications/${id}/status`, { status });
    load();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Employer Applications</h1>
      <div className="space-y-4">
        {applications.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl border p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-semibold">Applicant ID: {item.jobSeekerId}</p>
              <p className="text-slate-500">Job ID: {item.jobId}</p>
              <p className="text-slate-500">Current status: {item.status}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['shortlisted', 'rejected', 'interview'].map((status) => (
                <button key={status} onClick={() => updateStatus(item._id, status)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">{status}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
