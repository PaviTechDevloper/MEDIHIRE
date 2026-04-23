import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';
import EmployerApplications from './pages/EmployerApplications';
import Notifications from './pages/Notifications';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/post-job" element={<ProtectedRoute roles={['employer', 'admin']}><PostJob /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute roles={['jobseeker', 'admin']}><Applications /></ProtectedRoute>} />
        <Route path="/employer-applications" element={<ProtectedRoute roles={['employer', 'admin']}><EmployerApplications /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
