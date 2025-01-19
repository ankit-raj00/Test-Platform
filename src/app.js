import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './middlewares/errorHandler.js';

// Initialize Express App
const app = express();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Change this to your frontend URL if deployed
    credentials: true
}));
app.use(express.json({ limit: '1000kb' }));
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));
app.use(cookieParser());

// Import API Routes
import userRouter from './routes/user.routes.js';
import questionRouter from './routes/question.routes.js';
import testRouter from './routes/test.routes.js';
import responseRouter from './routes/response.routes.js';
import resultRouter from './routes/result.routes.js';
import adminRouter from './routes/admin.routes.js';
import bookmarkRouter from './routes/bookmark.routes.js';

// API Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/test', testRouter);
app.use('/api/v1/response', responseRouter);
app.use('/api/v1/result', resultRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/bookmark', bookmarkRouter);

// Serve React Frontend Static Files from `dist` inside `backend` folder
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-All Route for React Frontend
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

// Error Handling Middleware
app.use(errorHandler);

export { app };
