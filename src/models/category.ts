import { sequelize } from '../utils/db'
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import User from './user'

class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>
  declare userId: number
  declare title: string
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>
}

export default Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: 'id' }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    modelName: 'category',
    tableName: 'categories',
    underscored: true,
    timestamps: true,
    sequelize // passing the `sequelize` instance is required
  }
)
