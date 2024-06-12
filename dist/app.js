"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const autherRoutes_1 = __importDefault(require("./routes/autherRoutes"));
const ratingRoutes_1 = __importDefault(require("./routes/ratingRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use('/', userRoutes_1.UserRoutes);
app.use('/', bookRoutes_1.default);
app.use('/', autherRoutes_1.default);
app.use('/', reviewRoutes_1.default);
app.use('/', ratingRoutes_1.default);
app.use('/', orderRoutes_1.default);
app.listen(port, () => {
    console.log("HII we are comfortable with nodejs");
});
//# sourceMappingURL=app.js.map