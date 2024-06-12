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
exports.deleteReviewController = exports.addBookReviewController = exports.getBookReviewsController = void 0;
const bookService_1 = require("../services/bookService");
const reviewService_1 = require("../services/reviewService");
const reviewservice = new reviewService_1.reviewService();
const getBookReviewsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const reviews = yield reviewservice.getBookReviews(bookId);
        if (!reviews) {
            return res.status(404).json({ message: 'Book not found or no reviews available' });
        }
        res.json(reviews);
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getBookReviewsController = getBookReviewsController;
const addBookReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { content } = req.body;
        const user = req.user;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const newReview = yield reviewservice.addBookReview(req.body);
        res.status(201).json(newReview);
    }
    catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addBookReviewController = addBookReviewController;
const deleteReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const isAdmin = yield (0, bookService_1.checkAdmin)(user.id);
        yield reviewservice.deleteReview(id, user.id, isAdmin);
        res.status(200).json({ message: 'Review deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteReviewController = deleteReviewController;
//# sourceMappingURL=reviewController.js.map