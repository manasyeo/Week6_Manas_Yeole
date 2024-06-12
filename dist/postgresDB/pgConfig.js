"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const credentials_1 = __importDefault(require("../common/credentials"));
const sequelize = new sequelize_1.Sequelize({
    // user: 'postgres',
    username: credentials_1.default.postgres.USERNAME,
    host: credentials_1.default.postgres.HOST,
    database: credentials_1.default.postgres.DATABASE,
    password: credentials_1.default.postgres.PASSWORD,
    port: credentials_1.default.postgres.DBPORT,
    //dialect 
    dialect: "postgres",
});
exports.sequelize = sequelize;
sequelize.authenticate()
    .then(() => {
    console.log('Database connection established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
//Synchronize
sequelize.sync() //--->  sequelize.sync()  --->    sequelize.sync (alter:true)    ---- models ,     sequelize.sync (force:true) , 
    .then(() => {
    console.log('Models synchronized with the database.'); //
})
    .catch((err) => {
    console.error('Unable to synchronize models with the database:', err);
});
//# sourceMappingURL=pgConfig.js.map