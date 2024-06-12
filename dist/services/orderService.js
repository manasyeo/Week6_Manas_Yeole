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
exports.OrderService = void 0;
const bookModel_1 = require("../models/bookModel");
const paymentModel_1 = require("../models/paymentModel");
const userModel_1 = require("../models/userModel");
const uuid_1 = require("uuid");
const constants = require('gocardless-nodejs/constants');
const gocardless = require('gocardless-nodejs');
const client = gocardless('sandbox_yf-vAid9h0Z23WImcHzGG4UvxBx5tNxwBH2wtctR', constants.Environments.Sandbox);
const generateUniqueId = () => {
    return (0, uuid_1.v4)();
};
class OrderService {
    createOrder(userId, bookId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the book exists
            const book = yield bookModel_1.Book.findByPk(bookId);
            if (!book) {
                throw new Error('Book not found');
            }
            // Check if the user exists
            const user = yield userModel_1.User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            // Create a payment intent with GoCardless
            const billingRequest = yield client.billingRequests.create({
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
            const payment = yield paymentModel_1.Payment.create({
                id: generateUniqueId(),
                userId,
                bookId,
                amount,
                status: billingRequest.status,
                createdAt: new Date(),
            });
            return payment;
        });
    }
    getOrderById(orderId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield paymentModel_1.Payment.findOne({ where: { id: orderId } });
                if (!order) {
                    return null;
                }
                if (order.userId !== userId) {
                    return null;
                }
                return order;
            }
            catch (error) {
                console.error('Error fetching order by ID:', error);
                throw error;
            }
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderService.js.map