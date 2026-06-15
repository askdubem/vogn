import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes     from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes  from './routes/productRoutes.js';
import orderRoutes    from './routes/orderRoutes.js';
import errorHandler   from './middlewares/errorHandler.js';

const app = express();

// ── Security ──
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// ── Rate Limiting ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── Body Parsing ──
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Health Check ──
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    brand:   'VŌGN',
    status:  'ok',
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ──
app.use('/api/auth',       authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/orders',     orderRoutes);

// ── 404 ──
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global Error Handler ──
app.use(errorHandler);

export default app;
