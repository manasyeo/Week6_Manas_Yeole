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
exports.addRatingController = exports.getRatingsForBookController = void 0;
const ratingService_1 = require("../services/ratingService");
const ratingService = new ratingService_1.RatingService();
const getRatingsForBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const ratings = yield ratingService.getRatingsForBook(bookId);
        if (!ratings || ratings.length === 0) {
            return res.status(404).json({ message: 'No ratings found for this book' });
        }
        res.status(200).json(ratings);
    }
    catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getRatingsForBookController = getRatingsForBookController;
const addRatingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { rating } = req.body;
        const userId = req.user.id;
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5.' });
        }
        const newRating = yield ratingService.addRating({ userId, bookId, rating });
        res.status(201).json(newRating);
    }
    catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addRatingController = addRatingController;
//# sourceMappingURL=ratingController.js.map