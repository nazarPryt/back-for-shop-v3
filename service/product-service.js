const ProductModel = require('../models/token-model')


class ProductService {

  async getAll() {
    const products = await ProductModel.find()
    return products
  }

  async getOne(id) {
    const product = await ProductModel.findById(id)
    return product
  }
}

module.exports = new ProductService()