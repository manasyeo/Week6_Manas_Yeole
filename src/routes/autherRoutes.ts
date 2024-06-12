import { Router } from 'express';
import {getauthors,getauthorbyid,createAuthorController,updateAuthorController,delelteAuthorController} from '../controllers/autherController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.get('/authors',getauthors);

router.get('/authors/:id',getauthorbyid);

router.post('/authors',authenticateUser,createAuthorController);

router.put('/authors/:id',authenticateUser,updateAuthorController);

router.delete('/author/:id',authenticateUser,delelteAuthorController);

export default router;