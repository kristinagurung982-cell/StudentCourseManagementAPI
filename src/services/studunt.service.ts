import { StudentModel } from '../models/student.model';
import { IStudentCreate, IStudentUpdate } from '../interfaces/student.interface';

export class StudentService {
  private studentModel = new StudentModel();

  async getAllStudents() {
    return this.studentModel.findAll();
  }

  async getStudentById(id: number) {
    const student = this.studentModel.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  async createStudent(studentData: IStudentCreate) {
    // Check if email exists
    const existingEmail = this.studentModel.findByEmail(studentData.email);
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    // Check if phone exists
    const existingPhone = this.studentModel.findByPhone(studentData.phone);
    if (existingPhone) {
      throw new Error('Phone number already exists');
    }

    // Validate age
    if (studentData.age <= 15) {
      throw new Error('Student age must be greater than 15');
    }

    return this.studentModel.create(studentData);
  }

  async updateStudent(id: number, studentData: IStudentUpdate) {
    const student = await this.getStudentById(id);

    // Check email uniqueness if updating email
    if (studentData.email && studentData.email !== student.email) {
      const existingEmail = this.studentModel.findByEmail(studentData.email);
      if (existingEmail) {
        throw new Error('Email already exists');
      }
    }

    // Check phone uniqueness if updating phone
    if (studentData.phone && studentData.phone !== student.phone) {
      const existingPhone = this.studentModel.findByPhone(studentData.phone);
      if (existingPhone) {
        throw new Error('Phone number already exists');
      }
    }

    // Validate age if updating
    if (studentData.age && studentData.age <= 15) {
      throw new Error('Student age must be greater than 15');
    }

    const updatedStudent = this.studentModel.update(id, studentData);
    if (!updatedStudent) {
      throw new Error('Student not found');
    }
    return updatedStudent;
  }

  async deleteStudent(id: number) {
    const student = await this.getStudentById(id);
    const deleted = this.studentModel.delete(id);
    if (!deleted) {
      throw new Error('Student not found');
    }
    return { message: 'Student deleted successfully' };
  }
}