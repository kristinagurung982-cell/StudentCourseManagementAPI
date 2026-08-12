import { IStudent } from './student.interface';
import { ICourse } from './course.interface';

export interface IEnrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrolledAt: Date;
  isDeleted?: boolean;
}

export interface IEnrollmentCreate {
  studentId: number;
  courseId: number;
}

export interface IEnrollmentResponse {
  student: {
    id: number;
    name: string;
  };
  course: {
    id: number;
    title: string;
  };
}