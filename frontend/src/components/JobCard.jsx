export default function JobCard({ job, onApply }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 space-y-3">
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-slate-600">{job.companyName} • {job.location}</p>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full h-fit">{job.employmentType}</span>
      </div>
      <p className="text-sm text-slate-500">Specialization: {job.specialization}</p>
      <p className="text-sm text-slate-500">Experience: {job.experienceLevel}</p>
      <p className="text-sm text-slate-600 line-clamp-3">{job.description}</p>
      {onApply && (
        <button onClick={() => onApply(job._id)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Apply</button>
      )}
    </div>
  );
}
