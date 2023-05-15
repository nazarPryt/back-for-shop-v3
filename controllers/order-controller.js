const OrderService = require('../service/order-service')

class OrderController {

  async getAll (req, res) {
    try {
      const userID = req.params.userID
      if(userID){
        const orders = await OrderService.getAll(userID)
        return res.json(orders)
      }

    } catch (e){
      console.log(e);
    }

  }

  async createOrder (products) {
    try {
      const orders = await OrderService.create(products)


    } catch (e){
      console.log(e);
    }

  }

}

module.exports = new OrderController()