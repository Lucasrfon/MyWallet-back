import { Router } from 'express';
import { deleteRegister, getRegister, postRegister, updateRegister } from '../controllers/registerController.js';

const router = Router();

router.get('/register', getRegister);
router.post('/register', postRegister);
router.put('/register', updateRegister);
router.delete('/register', deleteRegister);

export default router;