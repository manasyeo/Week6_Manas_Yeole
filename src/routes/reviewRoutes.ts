import {Router} from 'express';
import {getBookReviewsController,addBookReviewController,deleteReviewController} from '../controllers/reviewController';
import { authenticateUser } from '../middleware/authMiddleware';
const router = Router();

router.get('/books/:bookId/reviews',getBookReviewsController);
router.post('/books/:bookId/reviews', authenticateUser, addBookReviewController);
router.delete('/reviews/:id', authenticateUser, deleteReviewController)
export default router;