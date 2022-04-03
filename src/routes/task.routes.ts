import { Router } from 'express'
import { verifyToken } from '../middlewares/'
import controller from '../controllers/task.controller'

const router: Router = Router()

router.post('/task', [verifyToken], controller.addTask)

router.put('/task/:id', [verifyToken], controller.updateTask)

router.delete('/task/:id', [verifyToken], controller.deleteTask)

router.get('/task', [verifyToken], controller.getTasks)

export default router
