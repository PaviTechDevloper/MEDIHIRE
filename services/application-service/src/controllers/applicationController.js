import Application from '../models/Application.js';
import { fetchJob, pushNotification } from '../services/integrationService.js';

export const applyToJob = async (req, res, next) => {
  try {
    const job = await fetchJob(req.body.jobId);
    const application = await Application.create({
      jobId: req.body.jobId,
      employerId: job.employerId,
      jobSeekerId: req.user.userId,
      coverLetter: req.body.coverLetter
    });

    await pushNotification({
      userId: job.employerId,
      title: 'New job application',
      message: `${req.user.fullName} applied for ${job.title}`,
      type: 'application'
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'You already applied to this job' });
    next(err);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobSeekerId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ applications });
  } catch (err) {
    next(err);
  }
};

export const getEmployerApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ employerId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ applications });
  } catch (err) {
    next(err);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, employerId: req.user.userId },
      { status: req.body.status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });

    await pushNotification({
      userId: application.jobSeekerId,
      title: 'Application status updated',
      message: `Your application status is now ${application.status}`,
      type: 'status'
    });

    res.json({ message: 'Application status updated', application });
  } catch (err) {
    next(err);
  }
};
