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
exports.delelteBookController = exports.updateBookController = exports.createBookController = exports.getbookbyid = exports.getbooks = void 0;
const bookService_1 = require("../services/bookService");
const bookservice = new bookService_1.bookService();
const getbooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allbooks = yield bookservice.booklist();
    res.json(allbooks);
});
exports.getbooks = getbooks;
const getbookbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookid = req.params.id;
    const book = yield bookservice.bookbyid(bookid);
    res.json(book);
});
exports.getbookbyid = getbookbyid;
const createBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = yield (0, bookService_1.checkAdmin)(user.id);
        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create books.' });
        }
        const { authorIds } = req.body;
        const newBook = yield bookservice.createbook(req.body, authorIds);
        res.status(201).json(newBook);
    }
    catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createBookController = createBookController;
const updateBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is an admin (assuming isAdmin property is available in the user object)
        const user = req.user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = yield (0, bookService_1.checkAdmin)(user.id);
        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create books.' });
        }
        const bookId = req.params.id;
        const { authorIds } = req.body;
        const updatedBook = yield bookservice.updateBook(bookId, req.body, authorIds);
        res.status(200).json(updatedBook);
    }
    catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateBookController = updateBookController;
const delelteBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const deletedBook = yield bookservice.deleteBook(bookId);
        res.json({ message: 'Book Deleted Successfully' });
        res.status(200).json(deletedBook);
    }
    catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.delelteBookController = delelteBookController;
//# sourceMappingURL=bookController.js.map