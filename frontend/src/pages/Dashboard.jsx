import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.fullName}</h1>
      <p className="text-slate-600 mb-8">Role: {user?.role}</p>
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/profile" className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md">
          <h2 className="font-semibold text-xl">Manage Profile</h2>
          <p className="text-slate-500 mt-2">Update medical experience, specialization, and contact details.</p>
        </Link>
        {user?.role === 'jobseeker' && (
          <Link to="/applications" className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md">
            <h2 className="font-semibold text-xl">My Applications</h2>
            <p className="text-slate-500 mt-2">Track application progress and status updates.</p>
          </Link>
        )}
        {user?.role === 'employer' && (
          <>
            <Link to="/post-job" className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md">
              <h2 className="font-semibold text-xl">Post a Job</h2>
              <p className="text-slate-500 mt-2">Create openings for doctors, nurses, technicians, and more.</p>
            </Link>
            <Link to="/employer-applications" className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md">
              <h2 className="font-semibold text-xl">Review Applicants</h2>
              <p className="text-slate-500 mt-2">Shortlist, reject, or move candidates to interview.</p>
            </Link>
          </>
        )}
        <Link to="/notifications" className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md">
          <h2 className="font-semibold text-xl">Notifications</h2>
          <p className="text-slate-500 mt-2">View new alerts and real-time updates.</p>
        </Link>
      </div>
    </div>
  );
}
