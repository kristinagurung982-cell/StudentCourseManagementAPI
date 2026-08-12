import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { validateCourse } from '../utils/validators';

const router = Router();

router.post('/', validateCourse, CourseController.createCourse);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);
router.put('/:id', validateCourse, CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

export default router;