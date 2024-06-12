import { Router } from 'express';
import {getbooks,getbookbyid,createBookController,updateBookController,delelteBookController} from '../controllers/bookController';
import { authenticateUser  } from '../middleware/authMiddleware';

const router = Router();

router.get('/books',getbooks);

router.get('/books/:id',getbookbyid);

router.post('/books',authenticateUser ,createBookController);

router.put('/books/:id', authenticateUser, updateBookController);

router.delete('/books/:id',authenticateUser,delelteBookController);

export default router;