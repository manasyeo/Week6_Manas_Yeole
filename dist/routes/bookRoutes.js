"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/books', bookController_1.getbooks);
router.get('/books/:id', bookController_1.getbookbyid);
router.post('/books', authMiddleware_1.authenticateUser, bookController_1.createBookController);
router.put('/books/:id', authMiddleware_1.authenticateUser, bookController_1.updateBookController);
router.delete('/books/:id', authMiddleware_1.authenticateUser, bookController_1.delelteBookController);
exports.default = router;
//# sourceMappingURL=bookRoutes.js.map