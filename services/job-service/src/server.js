import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();
connectDB(process.env.MONGO_URI);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_, res) => res.json({ service: 'job-service', status: 'ok' }));
app.use('/api/jobs', jobRoutes);
app.use(errorHandler);

const port = process.env.PORT || 4003;
app.listen(port, () => console.log(`Job Service running on port ${port}`));
