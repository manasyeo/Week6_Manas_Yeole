import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';
import { User } from './userModel';
import { Book } from './bookModel';

export interface ReviewAttributes {
  id: string;
  userId: string;
  bookId: string;
  content: string;
}

class Review extends Model<ReviewAttributes> implements ReviewAttributes {
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public content!: string;
}

Review.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Book,
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'reviews',
  timestamps: false,
});

export { Review };


