import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-emerald-700 to-cyan-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight">Find the right medical job with MediHire</h1>
          <p className="mt-5 text-lg text-emerald-50">
            Connect hospitals, clinics, and healthcare recruiters with qualified doctors, nurses, lab technicians, and pharmacists.
          </p>
          <div className="mt-8 flex gap-4">
            <Link className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold" to="/jobs">Browse Jobs</Link>
            <Link className="border border-white px-6 py-3 rounded-xl font-semibold" to="/register">Get Started</Link>
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
          <div className="grid grid-cols-2 gap-4">
            {['Doctors', 'Nurses', 'Pharmacists', 'Lab Technicians'].map((item) => (
              <div key={item} className="bg-white text-slate-800 rounded-xl p-5 shadow">
                <h3 className="font-semibold">{item}</h3>
                <p className="text-sm text-slate-500 mt-1">Targeted hiring workflows</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
