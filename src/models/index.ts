import User from './user'
import Task from './task'
import Category from './category'

User.hasMany(Task)
User.hasMany(Category)
Category.hasMany(Task)

User.sync({ alter: true })
Task.sync({ alter: true })
Category.sync({ alter: true })

export {
  User, Task, Category
}
