import { sequelize } from '../utils/db'
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>
  declare username: string
  declare email: string
  declare password: string
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

export default User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    modelName: 'task',
    tableName: 'users',
    underscored: true,
    timestamps: true,
    sequelize // passing the `sequelize` instance is required
  }
)
