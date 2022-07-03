import { Router } from 'express';
import { deleteRegister, getRegister, postRegister, updateRegister } from '../controllers/registerController.js';
import validateAuth from '../middlewares/validateAuth.js';

const router = Router();

router.get('/register', validateAuth, getRegister);
router.post('/register', validateAuth, postRegister);
router.put('/register', validateAuth, updateRegister);
router.delete('/register', validateAuth, deleteRegister);

export default router;