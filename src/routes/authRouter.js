import { Router } from 'express';
import creatUser from '../controllers/authController.js';
import validateNewUser from '../middlewares/validateNewUser.js';

const router = Router()

router.post('/sign-up', validateNewUser, creatUser);
router.post('/log-in');

export default router;