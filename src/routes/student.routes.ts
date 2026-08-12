import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';
import { validateStudent } from '../utils/validators';

const router = Router();

router.post('/', validateStudent, StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getStudentById);
router.put('/:id', validateStudent, StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

export default router;