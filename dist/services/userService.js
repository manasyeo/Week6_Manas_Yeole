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
exports.userService = exports.JWT_SECRET = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = 'C56927AB6CFA9DE3198231EC893AC';
class userService {
    registeruser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashpassword = yield bcrypt_1.default.hash(data.password, 10);
            const user = yield userModel_1.User.create(Object.assign(Object.assign({}, data), { password: hashpassword }));
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.User.findOne({ where: { email } });
            if (!user) {
                throw new Error('Invalid Email or Password');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid Email or Password');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email, password: user.password }, exports.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        });
    }
    getCurrentUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify and decode the token
                const decoded = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
                // Extract user details from the decoded token
                const { id, username, email } = decoded;
                // Return user details
                return { id, username, email };
            }
            catch (error) {
                throw new Error('Invalid or expired token');
            }
        });
    }
}
exports.userService = userService;
//# sourceMappingURL=userService.js.map