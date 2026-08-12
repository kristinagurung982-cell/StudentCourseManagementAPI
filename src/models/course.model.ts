import { Database } from '../config/database';
import { ICourse, ICourseCreate, ICourseUpdate } from '../interfaces/course.interface';

export class CourseModel {
  private db = Database.getInstance();

  findAll(): ICourse[] {
    return this.db.courses.filter(course => !course.isDeleted);
  }

  findById(id: number): ICourse | undefined {
    return this.db.courses.find(course => course.id === id && !course.isDeleted);
  }

  findByTitle(title: string): ICourse | undefined {
    return this.db.courses.find(course => course.title === title && !course.isDeleted);
  }

  create(courseData: ICourseCreate): ICourse {
    const newCourse: ICourse = {
      id: this.db.getNextCourseId(),
      ...courseData,
    };
    this.db.courses.push(newCourse);
    return newCourse;
  }

  update(id: number, courseData: ICourseUpdate): ICourse | undefined {
    const course = this.findById(id);
    if (course) {
      Object.assign(course, courseData);
      return course;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const course = this.findById(id);
    if (course) {
      course.isDeleted = true;
      return true;
    }
    return false;
  }
}