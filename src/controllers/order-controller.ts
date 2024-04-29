import OrderService from '../services/order-service'
import { Request, Response } from 'express'
import { ProductModel, ProductSchemaType } from '../models/product-model'
import { OrderModel } from '../models/order-model'
import dotenv from 'dotenv'
import tokenService from '../services/token-service'
dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_KEY)

class OrderController {
   async getAll(req: Request, res: Response) {
      try {
         const token = req.headers.authorization.split(' ')[1]
         const user = await tokenService.validateAccessToken(token)
         const userID = user.id

         if (userID) {
            const orders = await OrderService.getAll(userID)
            return res.json(orders)
         }
         return res.json({
            message:
               'userID is required, if you want to see orders you should sign in!!!',
         })
      } catch (e) {
         console.log(e)
      }
   }

   async createOrder(req: Request, res: Response) {
      try {
         const userID = req.body.userID
         const products = req.body.products

         const lineItems = await Promise.all(
            products.map(async (product: any) => {
               const item: ProductSchemaType | null =
                  await ProductModel.findOne({
                     _id: product._id,
                  })
               if (item) {
                  return {
                     price_data: {
                        currency: 'usd',
                        product_data: {
                           name: item.title,
                        },
                        unit_amount: Math.round(item.price * 100),
                     },
                     quantity: product.quantity,
                  }
               }
            })
         )

         const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: process.env.CLIENT_URL + '/successPayment',
            cancel_url: process.env.CLIENT_URL + '/errorPayment',
            line_items: lineItems,
         })

         await OrderModel.create({ products, stripeId: session.id, userID })
         res.json({ stripeSession: session })
      } catch (e) {
         console.log(e)
      }
   }
}
export default new OrderController()
