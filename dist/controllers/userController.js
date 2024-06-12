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
exports.getCurrentUser = exports.loginuser = exports.registeruser = void 0;
const userService_1 = require("../services/userService");
const userservice = new userService_1.userService();
const registeruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newuser = yield userservice.registeruser(req.body);
        res.json(newuser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.registeruser = registeruser;
const loginuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token } = yield userservice.login(email, password);
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginuser = loginuser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from the Authorization header
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided' });
        }
        // Fetch current user details using the token
        const user = yield userservice.getCurrentUser(token);
        // Return user details
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error while fetching current user:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=userController.js.map