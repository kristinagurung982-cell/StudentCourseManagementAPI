import express, { Application } from 'express';
import cors from 'cors';
import studentRoutes from './routes/student.routes';
import courseRoutes from './routes/course.routes';
import enrollmentRoutes from './routes/enrollment.routes';
import { errorHandler } from './model/error.middleware';

export const createApp = (): Application => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api/students', studentRoutes);
  app.use('/api/courses', courseRoutes);
  app.use('/api/enrollments', enrollmentRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  });

  // Error handling
  app.use(errorHandler);

  return app;
};