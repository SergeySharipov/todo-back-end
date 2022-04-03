import { Router } from 'express'
import { verifyToken } from '../middlewares'
import controller from '../controllers/category.controller'

const router: Router = Router()

router.post('/category', [verifyToken], controller.addCategory)

router.put('/category/:id', [verifyToken], controller.updateCategory)

router.delete('/category/:id', [verifyToken], controller.deleteCategory)

router.get('/category', [verifyToken], controller.getCategories)

export default router
