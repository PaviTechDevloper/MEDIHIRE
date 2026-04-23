import { useEffect, useState } from 'react';
import api from '../api/axios';
import JobCard from '../components/JobCard';
import { useAuth } from '../context/AuthContext';

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ keyword: '', location: '', specialization: '' });

  const fetchJobs = async () => {
    const { data } = await api.get('/jobs', { params: filters });
    setJobs(data.jobs);
  };

  useEffect(() => { fetchJobs(); }, []);

  const applyToJob = async (jobId) => {
    await api.post('/applications', { jobId, coverLetter: 'Interested in this opportunity.' });
    alert('Application submitted');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Medical Jobs</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <input className="border rounded-lg px-4 py-3" placeholder="Keyword" value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <input className="border rounded-lg px-4 py-3" placeholder="Specialization" value={filters.specialization} onChange={(e) => setFilters({ ...filters, specialization: e.target.value })} />
        <button className="bg-emerald-600 text-white rounded-lg px-4 py-3" onClick={fetchJobs}>Search</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onApply={user?.role === 'jobseeker' ? applyToJob : undefined} />
        ))}
      </div>
    </div>
  );
}
