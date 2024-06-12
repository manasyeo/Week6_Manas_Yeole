import { Router } from 'express';
import { getRatingsForBookController , addRatingController} from '../controllers/ratingController';
import { authenticateUser } from '../middleware/authMiddleware'; // Ensure this middleware is imported

const router = Router();

router.get('/books/:bookId/ratings',  getRatingsForBookController);
router.post('/books/:bookId/ratings', authenticateUser, addRatingController);

export default router;
