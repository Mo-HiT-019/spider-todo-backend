import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getTodo,createTodo,updateTodo,deleteTodo, assignTaskToUser, getAllUsers, getAssignedTasks, getTasksAssignedByMe } from '../controllers/appController.js';
import { getSalt } from 'bcryptjs';

const router = express.Router();

router.use(verifyToken);
router.get('/',getTodo);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.post('/assign',assignTaskToUser);
router.get('/users',getAllUsers);
router.get('/assigned-to-me',getAssignedTasks);
router.get('/assigned-by-me',getTasksAssignedByMe);
export default router;