import { Response, Request } from 'express'
import { Task, User } from '../models/'
import zod from 'zod'

const updateTaskValidation = zod.object({
  id: zod.number({
    required_error: 'id can\'t be empty',
    invalid_type_error: 'id must be a number'
  }),
  userId: zod.number({
    required_error: 'userId can\'t be empty',
    invalid_type_error: 'userId must be a number'
  }),
  categoryId: zod.number({
    required_error: 'categoryId can\'t be empty',
    invalid_type_error: 'categoryId must be a number'
  }),
  title: zod.string({
    required_error: 'title can\'t be empty',
    invalid_type_error: 'title must be a string'
  }).min(1, { message: 'title can\'t be empty' }),
  description: zod.string({
    invalid_type_error: 'description must be a string'
  }).optional(),
  status: zod.boolean({
    invalid_type_error: 'status must be a boolean'
  }).optional()
})

const addTaskValidation = updateTaskValidation.omit({ id: true })

const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId)

    if (user) {
      const validTask = addTaskValidation.parse({
        ...req.body,
        userId: user.id
      })

      const newTask = await Task.create(validTask)

      res.status(201).json({
        message: 'Task added.',
        task: newTask
      })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (err: unknown) {
    if (err instanceof zod.ZodError) {
      res.status(500).send({ message: 'Error: ' + err.errors.map(m => m.message) })
    } else {
      res.status(500).send({ message: 'Error: ' + err })
    }
  }
}

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId)
    const taskId = Number(req.params.id)

    if (user) {
      const validTask = updateTaskValidation.parse({
        ...req.body,
        userId: user.id,
        id: taskId
      })

      const updatedTask = await Task.update(validTask, {
        where: { id: validTask.id, userId: validTask.userId }
      })

      res.status(201).json({
        message: 'Task updated.',
        task: updatedTask
      })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (err: unknown) {
    if (err instanceof zod.ZodError) {
      res.status(500).send({ message: 'Error: ' + err.errors.map(m => m.message) })
    } else {
      res.status(500).send({ message: 'Error: ' + err })
    }
  }
}

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId)
    const taskId = Number(req.params.id)

    if (user) {
      const numberOfDeletedTasks = await Task.destroy({
        where: {
          id: taskId,
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
