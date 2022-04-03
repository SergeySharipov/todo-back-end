import { Response, Request } from 'express'
import { Task, User } from '../models/'

const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body

    const user = await User.findByPk(req.userId)

    if (user) {
      const task = await Task.create({
        title: title,
        description: description,
        status: status,
        userId: user.id
      })

      res.status(201).json({
        message: 'Task added.',
        task: task
      })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error: ' + error })
  }
}

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body

    const user = await User.findByPk(req.userId)

    if (user) {
      const task = await Task.update({
        title: title,
        description: description,
        status: status
      }, { where: { id: req.params.id, userId: user.id } })

      res.status(201).json({
        message: 'Task updated.',
        task: task
      })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error: ' + error })
  }
}

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId)

    if (user) {
      const numberOfDeletedTasks = await Task.destroy({
        where: {
          id: req.params.id,
          userId: user.id
        }
      })

      res.status(200).json({
        message: 'Task deleted',
        numberOfDeletedTasks: numberOfDeletedTasks
      })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error: ' + error })
  }
}

const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId)
    if (user) {
      const tasks = await Task.findAll({
        where: {
          userId: user.id
        },
        order: [
          ['status', 'ASC'],
          ['updatedAt', 'DESC'],
          ['createdAt', 'DESC']
        ]
      })

      res.status(200).json({ tasks })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error: ' + error })
  }
}

const controller = { getTasks, addTask, updateTask, deleteTask }

export default controller
