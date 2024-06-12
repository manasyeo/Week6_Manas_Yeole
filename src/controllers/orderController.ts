import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

const orderService = new OrderService();

export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, bookId, amount } = req.body;
    const payment = await orderService.createOrder(userId, bookId, amount);
    res.status(201).json(payment);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = req.params.id;

      const userId = (req as any).user.id; 
  
    
      const order = await orderService.getOrderById(orderId, userId);
      
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }
  
      // Ensure the retrieved order belongs to the authenticated user
      if (order.userId !== userId) {
        res.status(403).json({ message: 'Unauthorized access to order' });
        return;
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error('Error retrieving order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };