import OrderService from '../services/order-service'
import { UserModel } from '../models/user-model'
import { Response, Request } from 'express'

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

   async createOrder(req: Request, res: Response) {
      try {
         const userID = req.body.userID
         const products = req.body //TODO

         const user = await UserModel.find({ _id: userID })

         if (user) {
            const order = await OrderService.create(userID, products)
            return res.json(order)
         }
      } catch (e) {
         console.log(e)
      }
   }
}
export default new OrderController()
