import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  role: { type: String, enum: ['jobseeker', 'employer', 'admin'], required: true },
  phone: String,
  location: String,
  bio: String,
  skills: [String],
  specialization: String,
  education: [String],
  experienceYears: Number,
  resumeUrl: String,
  employerDetails: {
    organizationName: String,
    organizationType: String,
    website: String,
    address: String,
    description: String
  }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
