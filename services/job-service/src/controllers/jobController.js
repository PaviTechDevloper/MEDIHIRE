import Job from '../models/Job.js';

export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, employerId: req.user.userId });
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, employerId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });
    res.json({ message: 'Job updated successfully', job });
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ job });
  } catch (err) {
    next(err);
  }
};

export const getEmployerJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ employerId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (err) {
    next(err);
  }
};

export const searchJobs = async (req, res, next) => {
  try {
    const { keyword, location, specialization, employmentType, experienceLevel, minSalary } = req.query;
    const query = { status: 'open' };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { companyName: { $regex: keyword, $options: 'i' } },
        { skillsRequired: { $regex: keyword, $options: 'i' } }
      ];
    }
    if (location) query.location = { $regex: location, $options: 'i' };
    if (specialization) query.specialization = { $regex: specialization, $options: 'i' };
    if (employmentType) query.employmentType = employmentType;
    if (experienceLevel) query.experienceLevel = experienceLevel;
    if (minSalary) query.salaryMin = { $gte: Number(minSalary) };

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (err) {
    next(err);
  }
};
