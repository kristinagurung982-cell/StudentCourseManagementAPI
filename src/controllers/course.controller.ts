import { Request, Response } from 'express';
import { CourseService } from '../services/course.servic';

const courseService = new CourseService();

export const CourseController = {
  async createCourse(req: Request, res: Response) {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCourseById(req: Request, res: Response) {
    try {
      const course = await courseService.getCourseById(parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10));
      res.status(200).json(course);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  async updateCourse(req: Request, res: Response) {
    try {
      const course = await courseService.updateCourse(parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10), req.body);
      res.status(200).json(course);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteCourse(req: Request, res: Response) {
    try {
      const result = await courseService.deleteCourse(parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },
};