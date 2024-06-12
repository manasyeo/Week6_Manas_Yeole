"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByIdController = exports.createOrderController = void 0;
const orderService_1 = require("../services/orderService");
const orderService = new orderService_1.OrderService();
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, bookId, amount } = req.body;
        const payment = yield orderService.createOrder(userId, bookId, amount);
        res.status(201).json(payment);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createOrderController = createOrderController;
const getOrderByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        // Assuming you have some authentication middleware to verify user role and identity
        const userId = req.user.id; // Assuming user ID is available after authentication
        // Retrieve the order by ID
        const order = yield orderService.getOrderById(orderId, userId);
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
    }
    catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getOrderByIdController = getOrderByIdController;
//# sourceMappingURL=orderController.js.map