"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autherController_1 = require("../controllers/autherController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/authors', autherController_1.getauthors);
router.get('/authors/:id', autherController_1.getauthorbyid);
router.post('/authors', authMiddleware_1.authenticateUser, autherController_1.createAuthorController);
router.put('/authors/:id', authMiddleware_1.authenticateUser, autherController_1.updateAuthorController);
router.delete('/author/:id', authMiddleware_1.authenticateUser, autherController_1.delelteAuthorController);
exports.default = router;
//# sourceMappingURL=autherRoutes.js.map