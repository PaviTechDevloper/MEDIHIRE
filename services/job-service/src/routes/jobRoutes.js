import { Router } from 'express';
import { createJob, getEmployerJobs, getJobById, searchJobs, updateJob } from '../controllers/jobController.js';
import { authorize, verifyToken } from '../middleware/auth.js';

const router = Router();
router.get('/', searchJobs);
router.get('/my/jobs', verifyToken, authorize('employer', 'admin'), getEmployerJobs);
router.get('/:id', getJobById);
router.post('/', verifyToken, authorize('employer', 'admin'), createJob);
router.put('/:id', verifyToken, authorize('employer', 'admin'), updateJob);

export default router;
