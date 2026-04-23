import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get('/applications/me').then(({ data }) => setApplications(data.applications));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      <div className="space-y-4">
        {applications.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl border p-5 shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold">Job ID: {item.jobId}</p>
              <p className="text-slate-500">Applied on {new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
