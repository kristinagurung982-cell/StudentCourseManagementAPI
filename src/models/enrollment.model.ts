import { Database } from '../config/database';
import { IEnrollment, IEnrollmentCreate } from '../interfaces/enrollment.interface';

export class EnrollmentModel {
  private db = Database.getInstance();

  findAll(): IEnrollment[] {
    return this.db.enrollments.filter(enrollment => !enrollment.isDeleted);
  }

  findById(id: number): IEnrollment | undefined {
    return this.db.enrollments.find(enrollment => enrollment.id === id && !enrollment.isDeleted);
  }

  findByStudentAndCourse(studentId: number, courseId: number): IEnrollment | undefined {
    return this.db.enrollments.find(
      enrollment => enrollment.studentId === studentId && 
                    enrollment.courseId === courseId && 
                    !enrollment.isDeleted
    );
  }

  findByStudentId(studentId: number): IEnrollment[] {
    return this.db.enrollments.filter(
      enrollment => enrollment.studentId === studentId && !enrollment.isDeleted
    );
  }

  findByCourseId(courseId: number): IEnrollment[] {
    return this.db.enrollments.filter(
      enrollment => enrollment.courseId === courseId && !enrollment.isDeleted
    );
  }

  create(enrollmentData: IEnrollmentCreate): IEnrollment {
    const newEnrollment: IEnrollment = {
      id: this.db.getNextEnrollmentId(),
      ...enrollmentData,
      enrolledAt: new Date(),
    };
    this.db.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  delete(id: number): boolean {
    const enrollment = this.findById(id);
    if (enrollment) {
      enrollment.isDeleted = true;
      return true;
    }
    return false;
  }
}