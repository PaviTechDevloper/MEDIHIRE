import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();
connectDB(process.env.MONGO_URI);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_, res) => res.json({ service: 'auth-service', status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use(errorHandler);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Auth Service running on port ${port}`));
