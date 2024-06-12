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
exports.authorService = void 0;
const autherModel_1 = require("../models/autherModel");
const bookModel_1 = require("../models/bookModel");
class authorService {
    autherlist() {
        return __awaiter(this, void 0, void 0, function* () {
            const authors = yield autherModel_1.Author.findAll();
            return authors;
        });
    }
    autherbyid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = yield autherModel_1.Author.findByPk(id, {
                include: [{ model: bookModel_1.Book, attributes: ['id', 'title', 'description', 'publishedYear', 'price'] }]
            });
            return author;
        });
    }
    createauthor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newauthor = yield autherModel_1.Author.create(data);
            return newauthor;
        });
    }
    updateAuthor(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingAuthor = yield autherModel_1.Author.findByPk(id);
            if (!existingAuthor) {
                throw new Error('Author not found');
            }
            const updatedauthor = yield existingAuthor.update(data);
            return updatedauthor;
        });
    }
    deleteAuthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = yield autherModel_1.Author.findByPk(id);
            if (author) {
                yield author.destroy();
            }
            else {
                throw new Error('Author not found');
            }
        });
    }
}
exports.authorService = authorService;
//# sourceMappingURL=autherService.js.map