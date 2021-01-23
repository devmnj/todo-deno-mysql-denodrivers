import Controller from '../controllers/Controller.ts';
import { Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
const router = new Router();
router.post('/todo', Controller.newTodo)
router.get('/todo/:id', Controller.findById)
router.put('/todo/:id', Controller.update)
router.delete('/todo/:id', Controller.delete)
router.get('/', Controller.index)
export default router;