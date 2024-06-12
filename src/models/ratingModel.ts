import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';
import { User } from './userModel';
import { Book } from './bookModel';

export interface RatingAttributes {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
}

class Rating extends Model<RatingAttributes> implements RatingAttributes {
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public rating!: number;
}

Rating.init({
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'ratings',
  timestamps: false,
});

export { Rating };
