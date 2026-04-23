import { Router } from 'express';
import { createOrUpdateProfile, getMyProfile, getProfileByUserId } from '../controllers/profileController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();
router.get('/me', verifyToken, getMyProfile);
router.post('/', verifyToken, createOrUpdateProfile);
router.get('/:userId', verifyToken, getProfileByUserId);

export default router;
