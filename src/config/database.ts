import { IStudent } from '../interfaces/student.interface';
import { ICourse } from '../interfaces/course.interface';
import { IEnrollment } from '../interfaces/enrollment.interface';

// In-memory database
export class Database {
  private static instance: Database;
  public students: IStudent[] = [];
  public courses: ICourse[] = [];
  public enrollments: IEnrollment[] = [];
  private studentIdCounter = 1;
  private courseIdCounter = 1;
  private enrollmentIdCounter = 1;

  private constructor() {
    // Seed some initial data
    this.seedData();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private seedData() {
    this.students = [
      { id: this.studentIdCounter++, name: 'John Doe', email: 'john@example.com', phone: '1234567890', age: 20 },
      { id: this.studentIdCounter++, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', age: 22 },
    ];

    this.courses = [
      { id: this.courseIdCounter++, title: 'Node.js', description: 'Learn Node.js', duration: '8 weeks' },
      { id: this.courseIdCounter++, title: 'React', description: 'Learn React', duration: '6 weeks' },
      { id: this.courseIdCounter++, title: 'TypeScript', description: 'Learn TypeScript', duration: '4 weeks' },
    ];

    this.enrollments = [
      { id: this.enrollmentIdCounter++, studentId: 1, courseId: 1, enrolledAt: new Date() },
      { id: this.enrollmentIdCounter++, studentId: 1, courseId: 2, enrolledAt: new Date() },
    ];
  }

  public getNextStudentId(): number {
    return this.studentIdCounter++;
  }

  public getNextCourseId(): number {
    return this.courseIdCounter++;
  }

  public getNextEnrollmentId(): number {
    return this.enrollmentIdCounter++;
  }
}