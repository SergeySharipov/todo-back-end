import { Response, Request } from 'express'
import { Category, User } from '../models'
import zod from 'zod'
import status from '../constants/status.constants'

const updateCategoryValidation = zod.object({
  id: zod.number({
    required_error: 'id can\'t be empty',
    invalid_type_error: 'id must be a number'
  }),
  userId: zod.number({
    required_error: 'userId can\'t be empty',
    invalid_type_error: 'userId must be a number'
  }),
  title: zod.string({
    required_error: 'title can\'t be empty',
    invalid_type_error: 'title must be a string'
  }).min(1, { message: 'title can\'t be empty' })
})

const addCategoryValidation = updateCategoryValidation.omit({ id: true })

const addCategory = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.userId)

    if (user) {
      const validCategory = addCategoryValidation.parse({
        ...req.body,
        userId: user.id
      })

      const newCategory = await Category.create(validCategory)

      return res.status(201).json({
        message: 'Category added.',
        category: newCategory
      })
    } else {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'User not found.' })
    }
  } catch (err: unknown) {
    if (err instanceof zod.ZodError) {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err.errors.map(m => m.message) })
    } else {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err })
    }
  }
}

const updateCategory = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.userId)
    const categoryId = Number(req.params.id)

    if (user) {
      const validCategory = updateCategoryValidation.parse({
        ...req.body,
        userId: user.id,
        id: categoryId
      })

      const updatedCategory = await Category.update(validCategory, {
        where: { id: validCategory.id, userId: validCategory.userId }
      })

      return res.status(201).json({
        message: 'Category updated.',
        category: updatedCategory
      })
    } else {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'User not found.' })
    }
  } catch (err: unknown) {
    if (err instanceof zod.ZodError) {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err.errors.map(m => m.message) })
    } else {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err })
    }
  }
}

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.userId)
    const categoryId = Number(req.params.id)

    if (user) {
      const numberOfDeletedCategorys = await Category.destroy({
        where: {
          id: categoryId,
          userId: user.id
        }
      })

      return res.status(status.OK).json({
        message: 'Category deleted',
        numberOfDeletedCategorys: numberOfDeletedCategorys
      })
    } else {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'User not found.' })
    }
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err })
  }
}

const getCategories = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.userId)
    if (user) {
      const categories = await Category.findAll({
        where: {
          userId: user.id
        },
        order: [
          ['updatedAt', 'DESC'],
          ['createdAt', 'DESC']
        ]
      })

      return res.status(status.OK).json({ categories })
    } else {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'User not found.' })
    }
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err })
  }
}

const controller = { getCategories, addCategory, updateCategory, deleteCategory }

export default controller
