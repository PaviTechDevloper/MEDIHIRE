import { Router } from 'express';
import { createNotification, getMyNotifications, markAsRead } from '../controllers/notificationController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();
router.get('/', verifyToken, getMyNotifications);
router.post('/', createNotification);
router.patch('/:id/read', verifyToken, markAsRead);

export default router;
