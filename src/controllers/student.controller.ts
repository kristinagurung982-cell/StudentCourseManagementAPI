import { Request, Response } from 'express';
import { StudentService } from '../services/studunt.service';

const studentService = new StudentService();

export const StudentController = {
  async createStudent(req: Request, res: Response) {
    try {
      const student = await studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllStudents(req: Request, res: Response) {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStudentById(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const student = await studentService.getStudentById(parseInt(id, 10));
      res.status(200).json(student);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  async updateStudent(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const student = await studentService.updateStudent(parseInt(id, 10), req.body);
      res.status(200).json(student);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteStudent(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await studentService.deleteStudent(parseInt(id, 10));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },
};