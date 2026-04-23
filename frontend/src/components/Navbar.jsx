import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-emerald-700">MediHire</Link>
        <nav className="flex gap-4 items-center text-sm font-medium">
          <Link to="/jobs">Jobs</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/notifications">Notifications</Link>
              <button
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                onClick={() => { logout(); navigate('/login'); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
