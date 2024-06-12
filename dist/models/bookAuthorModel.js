"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookAuthor = void 0;
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("../postgresDB/pgConfig");
const bookModel_1 = require("./bookModel");
const autherModel_1 = require("./autherModel");
const BookAuthor = pgConfig_1.sequelize.define('BookAuthor', {
    BookId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    AuthorId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
}, {
    tableName: 'book_authors',
});
exports.BookAuthor = BookAuthor;
BookAuthor.belongsTo(bookModel_1.Book, { foreignKey: 'BookId' });
BookAuthor.belongsTo(autherModel_1.Author, { foreignKey: 'AuthorId' });
//# sourceMappingURL=BookAuthorModel.js.map