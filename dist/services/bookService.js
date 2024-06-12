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
exports.checkAdmin = exports.bookService = void 0;
const bookModel_1 = require("../models/bookModel");
const userModel_1 = require("../models/userModel");
const autherModel_1 = require("../models/autherModel");
class bookService {
    booklist() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield bookModel_1.Book.findAll();
            return books;
        });
    }
    bookbyid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const abook = yield bookModel_1.Book.findByPk(id);
            return abook;
        });
    }
    createbook(data, authorIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const newbook = yield bookModel_1.Book.create(data);
            if (authorIds && authorIds.length > 0) {
                const authors = yield autherModel_1.Author.findAll({
                    where: { id: authorIds }
                });
                yield newbook.setAuthors(authors);
            }
            return newbook;
        });
    }
    updateBook(id, data, authorIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield bookModel_1.Book.findByPk(id);
            if (book) {
                yield book.update(data);
                if (authorIds && authorIds.length > 0) {
                    const authors = yield autherModel_1.Author.findAll({
                        where: { id: authorIds }
                    });
                    yield book.setAuthors(authors);
                }
                return book;
            }
            return null;
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield bookModel_1.Book.findByPk(id);
            if (book) {
                yield book.destroy();
            }
            else {
                throw new Error('Book not found');
            }
        });
    }
}
exports.bookService = bookService;
const checkAdmin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the user from the database using their user ID
        const user = yield userModel_1.User.findByPk(userId);
        // Check if the user exists and is an admin
        if (user && user.isAdmin) {
            return true; // User is an admin
        }
        else {
            return false; // User is not an admin
        }
    }
    catch (error) {
        console.error('Error checking admin status:', error);
        throw new Error('Internal server error');
    }
});
exports.checkAdmin = checkAdmin;
//# sourceMappingURL=bookService.js.map