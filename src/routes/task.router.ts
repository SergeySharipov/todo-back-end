import { Router } from 'express'
import controller from '../controllers/task.controller'

const router: Router = Router()

router.post('/', controller.addTask)

router.put('/:id', controller.updateTask)

router.delete('/:id', controller.deleteTask)

router.get('/', controller.getTasks)

export default router
