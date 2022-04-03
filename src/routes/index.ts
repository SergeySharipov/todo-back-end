import { Router } from 'express'
import { verifyToken } from '../middlewares'
import taskRouter from './task.router'
import categoryRouter from './category.router'
import authRouter from './auth.router'

const router: Router = Router()

router.use('/auth', authRouter)
router.use('/task', [verifyToken], taskRouter)
router.use('/category', [verifyToken], categoryRouter)

export default router
