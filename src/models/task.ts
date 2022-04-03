import { sequelize } from '../utils/db'
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

class Task extends Model<
  InferAttributes<Task>,
  InferCreationAttributes<Task>
> {
  declare id: CreationOptional<number>
  declare userId: number
  declare title: string
  declare description: CreationOptional<string>
  declare status: boolean
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

export default Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    modelName: 'task',
    tableName: 'tasks',
    underscored: true,
    timestamps: true,
    sequelize // passing the `sequelize` instance is required
  }
)
