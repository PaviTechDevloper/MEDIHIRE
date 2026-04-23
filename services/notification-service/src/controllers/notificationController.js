import Notification from '../models/Notification.js';

let ioInstance = null;
export const setSocketInstance = (io) => { ioInstance = io; };

export const createNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create(req.body);
    if (ioInstance) {
      ioInstance.to(notification.userId).emit('notification:new', notification);
    }
    res.status(201).json({ message: 'Notification sent', notification });
  } catch (err) {
    next(err);
  }
};

export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { read: true },
      { new: true }
    );
    res.json({ message: 'Notification updated', notification });
  } catch (err) {
    next(err);
  }
};
