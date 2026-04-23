import Profile from '../models/Profile.js';

export const createOrUpdateProfile = async (req, res, next) => {
  try {
    const payload = { ...req.body, userId: req.user.userId, role: req.user.role };
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      payload,
      { new: true, upsert: true }
    );
    res.json({ message: 'Profile saved successfully', profile });
  } catch (err) {
    next(err);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.userId });
    res.json({ profile });
  } catch (err) {
    next(err);
  }
};

export const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json({ profile });
  } catch (err) {
    next(err);
  }
};
