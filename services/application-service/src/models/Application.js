import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  employerId: { type: String, required: true },
  jobSeekerId: { type: String, required: true },
  status: { type: String, enum: ['applied', 'shortlisted', 'rejected', 'interview'], default: 'applied' },
  coverLetter: String
}, { timestamps: true });

applicationSchema.index({ jobId: 1, jobSeekerId: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
