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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const userService_1 = require("../services/userService");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, userService_1.JWT_SECRET);
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
            const userId = decoded.id;
            const user = yield userModel_1.User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        }
        else {
            throw new Error('Invalid token');
        }
    }
    catch (error) {
        console.error('Error while authenticating user:', error);
        res.status(500).json({ message: 'An error occurred during authentication' });
    }
});
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authMiddleware.js.map