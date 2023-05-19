import { OrderModel } from '../models/order-model'
import { ProductSchemaType } from '../models/product-model'

class OrderService {
   async getAll(userID: string) {
      return OrderModel.find({ userID })
   }

   async create(userID: string, products: ProductSchemaType[]) {
      try {
         const newOrder = await OrderModel.create({ userID, products })
         return newOrder
      } catch (e) {
         console.log(e)
      }
   }
}

export default new OrderService()
