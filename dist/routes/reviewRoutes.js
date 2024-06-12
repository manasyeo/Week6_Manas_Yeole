"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/books/:bookId/reviews', reviewController_1.getBookReviewsController);
router.post('/books/:bookId/reviews', authMiddleware_1.authenticateUser, reviewController_1.addBookReviewController);
router.delete('/reviews/:id', authMiddleware_1.authenticateUser, reviewController_1.deleteReviewController);
exports.default = router;
//# sourceMappingURL=reviewRoutes.js.map