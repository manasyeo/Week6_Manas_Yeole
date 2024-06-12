import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';



export interface AuthorAttributes {
  id: string;
  name: string;
  bio: string;
  birthdate: Date;
  isSystemUser: boolean;
}

class Author extends Model<AuthorAttributes> implements AuthorAttributes {
  public id!: string;
  public name!: string;
  public bio!: string;
  public birthdate!: Date;
  public isSystemUser!: boolean;
}

Author.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isSystemUser: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'authors',
  timestamps: false,
});



export { Author };

