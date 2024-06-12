"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("../postgresDB/pgConfig");
const userModel_1 = require("./userModel");
const bookModel_1 = require("./bookModel");
class Rating extends sequelize_1.Model {
}
exports.Rating = Rating;
Rating.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: userModel_1.User,
            key: 'id',
        },
    },
    bookId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: bookModel_1.Book,
            key: 'id',
        },
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: pgConfig_1.sequelize,
    tableName: 'ratings',
    timestamps: false,
});
// Rating.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
// Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });
//# sourceMappingURL=ratingModel.js.map