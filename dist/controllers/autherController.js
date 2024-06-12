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
exports.delelteAuthorController = exports.updateAuthorController = exports.createAuthorController = exports.getauthorbyid = exports.getauthors = void 0;
const autherService_1 = require("../services/autherService");
const bookService_1 = require("../services/bookService");
const authorservice = new autherService_1.authorService();
const getauthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allbooks = yield authorservice.autherlist();
    res.json(allbooks);
});
exports.getauthors = getauthors;
const getauthorbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorid = req.params.id;
    const author = yield authorservice.autherbyid(authorid);
    res.json(author);
});
exports.getauthorbyid = getauthorbyid;
const createAuthorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = yield (0, bookService_1.checkAdmin)(user.id);
        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create Authors.' });
        }
        const newauthor = yield authorservice.createauthor(req.body);
        res.status(201).json(newauthor);
    }
    catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createAuthorController = createAuthorController;
const updateAuthorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = yield (0, bookService_1.checkAdmin)(user.id);
        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create books.' });
        }
        const bookId = req.params.id;
        const updatedauthor = yield authorservice.updateAuthor(bookId, req.body);
        res.status(200).json(updatedauthor);
    }
    catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateAuthorController = updateAuthorController;
const delelteAuthorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = yield (0, bookService_1.checkAdmin)(user.id);
        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create books.' });
        }
        const authorId = req.params.id;
        const deletedAuthor = yield authorservice.deleteAuthor(authorId);
        res.json({ message: 'Author Deleted Successfully' });
        res.status(200).json(deletedAuthor);
    }
    catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.delelteAuthorController = delelteAuthorController;
//# sourceMappingURL=autherController.js.map