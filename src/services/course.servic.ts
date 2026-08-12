import { CourseModel } from '../models/course.model';
import { ICourseCreate, ICourseUpdate } from '../interfaces/course.interface';

export class CourseService {
  private courseModel = new CourseModel();

  async getAllCourses() {
    return this.courseModel.findAll();
  }

  async getCourseById(id: number) {
    const course = this.courseModel.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  async createCourse(courseData: ICourseCreate) {
    if (!courseData.title) {
      throw new Error('Course title is required');
    }
    if (!courseData.duration) {
      throw new Error('Course duration is required');
    }

    // Check if course with same title exists
    const existingCourse = this.courseModel.findByTitle(courseData.title);
    if (existingCourse) {
      throw new Error('Course with this title already exists');
    }

    return this.courseModel.create(courseData);
  }

  async updateCourse(id: number, courseData: ICourseUpdate) {
    const course = await this.getCourseById(id);

    // Check title uniqueness if updating
    if (courseData.title && courseData.title !== course.title) {
      const existingCourse = this.courseModel.findByTitle(courseData.title);
      if (existingCourse) {
        throw new Error('Course with this title already exists');
      }
    }

    const updatedCourse = this.courseModel.update(id, courseData);
    if (!updatedCourse) {
      throw new Error('Course not found');
    }
    return updatedCourse;
  }

  async deleteCourse(id: number) {
    const course = await this.getCourseById(id);
    const deleted = this.courseModel.delete(id);
    if (!deleted) {
      throw new Error('Course not found');
    }
    return { message: 'Course deleted successfully' };
  }
}