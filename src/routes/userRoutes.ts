import {Router} from 'express';
import { registeruser,loginuser,getCurrentUser} from '../controllers/userController';

const router = Router();


router.post('/register',registeruser);

router.post('/login',loginuser);


router.get('/users/me',getCurrentUser);

export { router as UserRoutes};


