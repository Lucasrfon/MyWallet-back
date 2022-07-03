import { Router } from 'express';
import { deleteRegister, getRegister, postRegister, updateRegister } from '../controllers/registerController.js';
import validateAuth from '../middlewares/validateAuth.js';
import validateRegister from '../middlewares/validateRegister.js';
import validateRemoveRegister from '../middlewares/validateRemoveRegister.js';
import validateUpdateRegister from '../middlewares/validateUpdateRegister.js';

const router = Router();

router.get('/register', validateAuth, getRegister);
router.post('/register', validateAuth, validateRegister, postRegister);
router.put('/register', validateAuth, validateUpdateRegister, updateRegister);
router.delete('/register', validateAuth, validateRemoveRegister, deleteRegister);

export default router;