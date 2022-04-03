import User from './user'
import Task from './task'

User.hasMany(Task)
Task.belongsTo(User)

User.sync({ alter: true })
Task.sync({ alter: true })

export {
  Task, User
}
