"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
exports.UserRoutes = router;
router.post('/register', userController_1.registeruser);
router.post('/login', userController_1.loginuser);
router.get('/users/me', userController_1.getCurrentUser);
//# sourceMappingURL=userRoutes.js.map