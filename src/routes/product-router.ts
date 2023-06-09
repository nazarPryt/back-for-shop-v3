import { Router } from 'express'
import ProductController from '../controllers/product-controller'

export const productRouter = Router({})

productRouter.get('/', ProductController.getAll)
productRouter.post('/', ProductController.addProduct)
productRouter.get('/:id', ProductController.getOne)
