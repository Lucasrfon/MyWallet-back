import { Router } from 'express';
import {creatUser, loginUser} from '../controllers/authController.js';
import validateNewUser from '../middlewares/validateNewUser.js';
import validateLogin from '../middlewares/validateLogin.js';

const router = Router();

router.post('/signup', validateNewUser, creatUser);
router.post('/login',validateLogin , loginUser);

export default router;