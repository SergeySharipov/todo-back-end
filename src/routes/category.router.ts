import { Router } from 'express'
import controller from '../controllers/category.controller'

const router: Router = Router()

router.post('/', controller.addCategory)

router.put('/:id', controller.updateCategory)

router.delete('/:id', controller.deleteCategory)

router.get('/', controller.getCategories)

export default router
