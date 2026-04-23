import Hero from '../components/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          ['Trusted Healthcare Hiring', 'Hospitals and clinics can discover relevant professionals faster.'],
          ['Smart Job Discovery', 'Medical professionals can filter by role, location, and specialization.'],
          ['Application Tracking', 'Track shortlist, reject, and interview updates in one place.']
        ].map(([title, text]) => (
          <div key={title} className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-slate-600">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
