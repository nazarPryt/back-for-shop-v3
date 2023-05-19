import { Router } from 'express'
import OrderController from '../controllers/order-controller'

export const orderRouter = Router()

orderRouter.get('/', OrderController.getAll)
orderRouter.post('/', OrderController.createOrder)
