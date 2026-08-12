import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollmrnt.controller';
import { validateEnrollment } from '../utils/validators';

const router = Router();

router.post('/', validateEnrollment, EnrollmentController.enrollStudent);
router.get('/', EnrollmentController.getAllEnrollments);
router.get('/students/:id/courses', EnrollmentController.getStudentCourses);
router.get('/courses/:id/students', EnrollmentController.getCourseStudents);
router.delete('/:id', EnrollmentController.deleteEnrollment);

export default router;