import { Router } from 'express';
import { createOrderController,getOrderByIdController} from '../controllers/orderController'
import { authenticateUser } from '../middleware/authMiddleware'; 

const router = Router();

router.post('/orders',authenticateUser,  createOrderController);
router.get('/orders/:id', authenticateUser, getOrderByIdController);

export default router;