import { Router } from 'express';
import { getRegister } from '../controllers/registerController.js';

const router = Router();

router.get('/register', getRegister);
router.post('/register');
router.put('/register');
router.delete('/register');

export default router;