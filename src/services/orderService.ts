import { Book } from "../models/bookModel";
import { Payment } from "../models/paymentModel";
import { User } from "../models/userModel";
import { v4 as uuidv4 } from 'uuid';


const constants = require('gocardless-nodejs/constants');
const gocardless = require('gocardless-nodejs');
const client = gocardless('sandbox_yf-vAid9h0Z23WImcHzGG4UvxBx5tNxwBH2wtctR', constants.Environments.Sandbox)


const generateUniqueId = (): string => {
    return uuidv4();
  };
export class OrderService {
    public async createOrder(userId: string, bookId: string, amount: number): Promise<Payment> {

      const book = await Book.findByPk(bookId);
      if (!book) {
        throw new Error('Book not found');
      }
  
    
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
  


    const billingRequest = await client.billingRequests.create({
        payment_request: {
          description: "First Payment",
          amount: "500",
          currency: "GBP",
          app_fee: "500",
          metadata: {
                  bookId,
                  userId,
                },
        },
      });
    

     
const payment = await Payment.create({
  id: generateUniqueId(), 
  userId,
  bookId,
  amount,
 status: billingRequest.status,
  createdAt: new Date(),
});
  
      return payment;
    }





    public async getOrderById(orderId: string, userId: string): Promise<Payment | null> {
        try {
      
          const order = await Payment.findOne({ where: { id: orderId } });
    
          if (!order) {
            return null;
          }
    
          if (order.userId !== userId) {
            return null;
          }
    
          return order;
        } catch (error) {
          console.error('Error fetching order by ID:', error);
          throw error;
        }
      }
  }
  

