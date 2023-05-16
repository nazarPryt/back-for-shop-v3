import { Router } from 'express'
import UserController from '../controllers/user-controller'

export const userRouter = Router({})

userRouter.post('/registration', UserController.registration)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', UserController.logout)
userRouter.get('/activate/:link', UserController.activate)
userRouter.get('/refresh', UserController.refresh)
userRouter.get('/users', UserController.getUsers)
