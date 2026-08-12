import { Database } from '../config/database';
import { IStudent, IStudentCreate, IStudentUpdate } from '../interfaces/student.interface';

export class StudentModel {
  private db = Database.getInstance();

  findAll(): IStudent[] {
    return this.db.students.filter(student => !student.isDeleted);
  }

  findById(id: number): IStudent | undefined {
    return this.db.students.find(student => student.id === id && !student.isDeleted);
  }

  findByEmail(email: string): IStudent | undefined {
    return this.db.students.find(student => student.email === email && !student.isDeleted);
  }

  findByPhone(phone: string): IStudent | undefined {
    return this.db.students.find(student => student.phone === phone && !student.isDeleted);
  }

  create(studentData: IStudentCreate): IStudent {
    const newStudent: IStudent = {
      id: this.db.getNextStudentId(),
      ...studentData,
    };
    this.db.students.push(newStudent);
    return newStudent;
  }

  update(id: number, studentData: IStudentUpdate): IStudent | undefined {
    const student = this.findById(id);
    if (student) {
      Object.assign(student, studentData);
      return student;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const student = this.findById(id);
    if (student) {
      student.isDeleted = true;
      return true;
    }
    return false;
  }
}