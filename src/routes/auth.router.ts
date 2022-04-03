import { Router } from 'express'
import controller from '../controllers/auth.controller'

const router: Router = Router()

router.post('/signup', controller.signup)

router.post('/signin', controller.signin)

export default router
