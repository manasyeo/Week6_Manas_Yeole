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
exports.reviewService = void 0;
const reviewModel_1 = require("../models/reviewModel");
class reviewService {
    getBookReviews(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield reviewModel_1.Review.findAll({ where: { bookId } });
            if (!reviews.length) {
                return null;
            }
            return reviews;
        });
    }
    addBookReview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reviewModel_1.Review.create(data);
        });
    }
    deleteReview(reviewId, userId, isAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield reviewModel_1.Review.findByPk(reviewId);
            if (!review) {
                throw new Error('Review not found');
            }
            if (review.userId !== userId && !isAdmin) {
                throw new Error('Forbidden. Only admin or the review author can delete the review.');
            }
            yield review.destroy();
        });
    }
}
exports.reviewService = reviewService;
//# sourceMappingURL=reviewService.js.map