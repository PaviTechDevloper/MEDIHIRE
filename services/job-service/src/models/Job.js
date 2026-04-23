import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  employerId: { type: String, required: true },
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'], required: true },
  specialization: { type: String, required: true },
  experienceLevel: { type: String, enum: ['junior', 'mid', 'senior'], required: true },
  salaryMin: Number,
  salaryMax: Number,
  description: { type: String, required: true },
  skillsRequired: [String],
  qualifications: [String],
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
