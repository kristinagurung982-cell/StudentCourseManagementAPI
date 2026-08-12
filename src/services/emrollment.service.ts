import { EnrollmentModel } from '../models/enrollment.model';
import { StudentModel } from '../models/student.model';
import { CourseModel } from '../models/course.model';
import { IEnrollmentCreate } from '../interfaces/enrollment.interface';

export class EnrollmentService {
  private enrollmentModel = new EnrollmentModel();
  private studentModel = new StudentModel();
  private courseModel = new CourseModel();

  async getAllEnrollments() {
    const enrollments = this.enrollmentModel.findAll();
    return enrollments.map(enrollment => ({
      student: {
        id: enrollment.studentId,
        name: this.studentModel.findById(enrollment.studentId)?.name || 'Unknown',
      },
      course: {
        id: enrollment.courseId,
        title: this.courseModel.findById(enrollment.courseId)?.title || 'Unknown',
      },
    }));
  }

  async enrollStudent(enrollmentData: IEnrollmentCreate) {
    // Check if student exists
    const student = this.studentModel.findById(enrollmentData.studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    // Check if course exists
    const course = this.courseModel.findById(enrollmentData.courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    // Check if already enrolled
    const existingEnrollment = this.enrollmentModel.findByStudentAndCourse(
      enrollmentData.studentId,
      enrollmentData.courseId
    );
    if (existingEnrollment) {
      throw new Error('Student already enrolled in this course');
    }

    return this.enrollmentModel.create(enrollmentData);
  }

  async getStudentCourses(studentId: number) {
    const student = this.studentModel.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    const enrollments = this.enrollmentModel.findByStudentId(studentId);
    const courses = enrollments
      .map(enrollment => this.courseModel.findById(enrollment.courseId))
      .filter(course => course !== undefined)
      .map(course => course!.title);

    return {
      student: student.name,
      courses,
    };
  }

  async getCourseStudents(courseId: number) {
    const course = this.courseModel.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const enrollments = this.enrollmentModel.findByCourseId(courseId);
    const students = enrollments
      .map(enrollment => this.studentModel.findById(enrollment.studentId))
      .filter(student => student !== undefined)
      .map(student => ({
        id: student!.id,
        name: student!.name,
        email: student!.email,
      }));

    return {
      course: course.title,
      students,
    };
  }

  async deleteEnrollment(id: number) {
    const enrollment = this.enrollmentModel.findById(id);
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    const deleted = this.enrollmentModel.delete(id);
    if (!deleted) {
      throw new Error('Enrollment not found');
    }
    return { message: 'Enrollment deleted successfully' };
  }
}