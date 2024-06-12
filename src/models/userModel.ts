import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';


export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  email: string;
  isAdmin:boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public isAdmin!: boolean;
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isAdmin :{
    type:DataTypes.BOOLEAN,
    allowNull:false
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: false,
});





export { User };
