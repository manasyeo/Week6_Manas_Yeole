"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("../postgresDB/pgConfig");
const autherModel_1 = require("./autherModel");
const reviewModel_1 = require("./reviewModel");
const ratingModel_1 = require("./ratingModel");
class Book extends sequelize_1.Model {
}
exports.Book = Book;
Book.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    bookCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    publishedYear: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    authors: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
    },
    externalId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: pgConfig_1.sequelize,
    tableName: 'books',
    timestamps: true,
});
Book.belongsToMany(autherModel_1.Author, { through: 'BookAuthors' });
autherModel_1.Author.belongsToMany(Book, { through: 'BookAuthors' });
Book.hasMany(reviewModel_1.Review, { foreignKey: 'bookId', as: 'Reviews' });
Book.hasMany(ratingModel_1.Rating, { foreignKey: 'bookId', as: 'Ratings' });
ratingModel_1.Rating.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
//# sourceMappingURL=bookModel.js.map