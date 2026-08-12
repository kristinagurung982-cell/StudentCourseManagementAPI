import { Request, Response, NextFunction } from 'express';

export const validateStudent = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, age } = req.body;
  const errors: string[] = [];

  if (!name) errors.push('Name is required');
  if (!email) errors.push('Email is required');
  if (!phone) errors.push('Phone is required');
  if (!age) errors.push('Age is required');
  
  if (age && age <= 15) errors.push('Age must be greater than 15');
  
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateCourse = (req: Request, res: Response, next: NextFunction) => {
  const { title, duration } = req.body;
  const errors: string[] = [];

  if (!title) errors.push('Course title is required');
  if (!duration) errors.push('Course duration is required');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateEnrollment = (req: Request, res: Response, next: NextFunction) => {
  const { studentId, courseId } = req.body;
  const errors: string[] = [];

  if (!studentId) errors.push('Student ID is required');
  if (!courseId) errors.push('Course ID is required');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};