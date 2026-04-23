import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { setSocketInstance } from './controllers/notificationController.js';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, credentials: true }
});

setSocketInstance(io);
connectDB(process.env.MONGO_URI);

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication error'));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  socket.join(socket.user.userId);
  console.log(`Socket connected: ${socket.user.userId}`);
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_, res) => res.json({ service: 'notification-service', status: 'ok' }));
app.use('/api/notifications', notificationRoutes);
app.use(errorHandler);

const port = process.env.PORT || 4005;
server.listen(port, () => console.log(`Notification Service running on port ${port}`));
