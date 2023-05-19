import OrderService from '../services/order-service'
import { Request, Response } from 'express'
import { ProductInterface, ProductModel } from '../models/product-model'
import { OrderModel } from '../models/order-model'

const stripe = require('stripe')(process.env.STRIPE_KEY)

class OrderController {
   async getAll(req: Request, res: Response) {
      try {
         const userID = req.params.userID
         if (userID) {
            const orders = await OrderService.getAll(userID)
            return res.json(orders)
         }
      } catch (e) {
         console.log(e)
      }
   }

   // async createOrder(req: Request, res: Response) {
   //    try {
   //       const userID = req.body.userID
   //       const products = req.body
   //
   //       const user = await UserModel.find({ _id: userID })
   //
   //       if (user) {
   //          const order = await OrderService.create(userID, products)
   //          return res.json(order)
   //       }
   //    } catch (e) {
   //       console.log(e)
   //    }
   // }

   async createOrder(req: Request, res: Response) {
      try {
         const userID = req.body.userID
         const products = req.body.products

         const lineItems = await Promise.all(
            products.map(async (product: any) => {
               const item: ProductInterface | null = await ProductModel.findOne(
                  { _id: product._id }
               )
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
         res.redirect(303, session.url)
      } catch (e) {
         console.log(e)
      }
   }
}
export default new OrderController()
