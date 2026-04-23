import { Router } from 'express';
import { applyToJob, getEmployerApplications, getMyApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { authorize, verifyToken } from '../middleware/auth.js';

const router = Router();
router.get('/me', verifyToken, authorize('jobseeker', 'admin'), getMyApplications);
router.get('/employer', verifyToken, authorize('employer', 'admin'), getEmployerApplications);
router.post('/', verifyToken, authorize('jobseeker', 'admin'), applyToJob);
router.patch('/:id/status', verifyToken, authorize('employer', 'admin'), updateApplicationStatus);

export default router;
