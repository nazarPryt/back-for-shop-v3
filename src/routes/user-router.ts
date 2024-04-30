import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import { body } from 'express-validator'
import { authMiddleware } from '../middlewares/auth-middleware'

export const userRouter = Router({})

userRouter.post(
   '/registration',
   body('email').isEmail(),
   body('password').isLength({ min: 3, max: 32 }),
   UserController.registration
)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', UserController.logout)
userRouter.get('/activate/:link', UserController.activate)
userRouter.get('/refresh', UserController.refresh)
userRouter.get('/me', authMiddleware, UserController.me)
userRouter.get('/', authMiddleware, UserController.getUsers)
