import { Router } from 'express'
import ProductController from '../controllers/product-controller'

export const productRouter = Router({})

productRouter.get('/product', ProductController.getAll)
productRouter.post('/product', ProductController.addProduct)
productRouter.get('/product/:id', ProductController.getOne)

// productRouter.put('/product/:id', (req, res) => {})
// productRouter.delete('/product/:id', (req, res) => {})
