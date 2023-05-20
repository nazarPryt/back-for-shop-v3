import { Router } from 'express'
import OrderController from '../controllers/order-controller'

export const orderRouter = Router()

orderRouter.post('/my', OrderController.getAll)
orderRouter.post('/', OrderController.createOrder)
