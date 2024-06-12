import { DataTypes,Model } from "sequelize";
import { sequelize } from "../postgresDB/pgConfig";
import { Author } from "./autherModel";
import { Review } from "./reviewModel";
import { Rating } from "./ratingModel";


export interface BookAttributes{
    id:string;
    bookCode:string;
    title:string;
    description:Text;
    publishedYear:number;
    price:number;
    authors:string[];
    externalId?:string;
}

class Book extends Model<BookAttributes> implements BookAttributes{
    id!:string;
    bookCode!:string;
    title!:string;
    description!:Text;
    publishedYear!:number;  
    price!:number;
    authors!:string[];
    externalId?:string;
}


Book.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      bookCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      publishedYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      authors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
       
      },
      externalId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
   
        
    } ,
    {
        sequelize,
        tableName: 'books',
        timestamps: true,
      },
);

Book.belongsToMany(Author, { through: 'BookAuthors' });
Author.belongsToMany(Book, { through: 'BookAuthors' });
Book.hasMany(Review, { foreignKey: 'bookId', as: 'Reviews' });
Book.hasMany(Rating, { foreignKey: 'bookId', as: 'Ratings' });
Rating.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
export {Book}