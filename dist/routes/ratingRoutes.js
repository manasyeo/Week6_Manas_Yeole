"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratingController_1 = require("../controllers/ratingController");
const authMiddleware_1 = require("../middleware/authMiddleware"); // Ensure this middleware is imported
const router = (0, express_1.Router)();
router.get('/books/:bookId/ratings', ratingController_1.getRatingsForBookController);
router.post('/books/:bookId/ratings', authMiddleware_1.authenticateUser, ratingController_1.addRatingController);
exports.default = router;
//# sourceMappingURL=ratingRoutes.js.map