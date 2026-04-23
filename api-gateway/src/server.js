import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const proxyOptions = (target, pathRewrite = {}) => ({
  target,
  changeOrigin: true,
  ws: true,
  pathRewrite,
  onError(err, req, res) {
    res.status(502).json({ message: 'Gateway proxy error', service: target, error: err.message });
  }
});

app.get('/health', (_, res) => res.json({ service: 'api-gateway', status: 'ok' }));
app.use('/api/auth', createProxyMiddleware(proxyOptions(process.env.AUTH_SERVICE_URL)));
app.use('/api/profiles', createProxyMiddleware(proxyOptions(process.env.PROFILE_SERVICE_URL)));
app.use('/api/jobs', createProxyMiddleware(proxyOptions(process.env.JOB_SERVICE_URL)));
app.use('/api/applications', createProxyMiddleware(proxyOptions(process.env.APPLICATION_SERVICE_URL)));
app.use('/api/notifications', createProxyMiddleware(proxyOptions(process.env.NOTIFICATION_SERVICE_URL)));

app.use((_, res) => res.status(404).json({ message: 'Route not found in API Gateway' }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API Gateway running on port ${port}`));
