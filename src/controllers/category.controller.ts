import { Response, Request } from 'express'
import { Category, User } from '../models'
import { ICategoryCreation } from '../types/global'

const addCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.body as ICategoryCreation

    const user = await User.findByPk(req.userId)

    if (user) {
      category.userId = user.id

      const newCategory = await Category.create(category)

      res.status(201).json({
        message: 'Category added.',
        category: newCategory
      })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error: ' + error })
  }
}

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.body as ICategoryCreation

    const user = await User.findByPk(req.userId)

    if (user) {
      const updatedCategory = await Category.update(category, { where: { id: req.params.id, userId: user.id } })

      res.status(201).json({
        message: 'Category updated.',
        category: updatedCategory
      })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error: ' + error })
  }
}

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId)

    if (user) {
      const numberOfDeletedCategorys = await Category.destroy({
        where: {
          id: req.params.id,
          userId: user.id
        }
      })

      res.status(200).json({
        message: 'Category deleted',
        numberOfDeletedCategorys: numberOfDeletedCategorys
      })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error: ' + error })
  }
}

const getCategories = async (req: Request, res: Response): Promise<void> => {
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

      res.status(200).json({ categories })
    } else {
      res.status(500).send({ message: 'User not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: 'Error: ' + error })
  }
}

const controller = { getCategories, addCategory, updateCategory, deleteCategory }

export default controller
