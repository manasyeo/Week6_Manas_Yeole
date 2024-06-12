"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/orders', authMiddleware_1.authenticateUser, orderController_1.createOrderController);
router.get('/orders/:id', authMiddleware_1.authenticateUser, orderController_1.getOrderByIdController);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map