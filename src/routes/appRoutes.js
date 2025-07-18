import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getTodo,createTodo,updateTodo,deleteTodo } from '../controllers/appController.js';

const router = express.Router();

router.use(verifyToken);
router.get('/',getTodo);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;