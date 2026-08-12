import { Request, Response } from 'express';
import { EnrollmentService } from '../services/emrollment.service';

const enrollmentService = new EnrollmentService();

export const EnrollmentController = {
  async enrollStudent(req: Request, res: Response) {
    try {
      const enrollment = await enrollmentService.enrollStudent(req.body);
      res.status(201).json(enrollment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllEnrollments(req: Request, res: Response) {
    try {
      const enrollments = await enrollmentService.getAllEnrollments();
      res.status(200).json(enrollments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStudentCourses(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await enrollmentService.getStudentCourses(parseInt(id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  async getCourseStudents(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await enrollmentService.getCourseStudents(parseInt(id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  async deleteEnrollment(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await enrollmentService.deleteEnrollment(parseInt(id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },
};