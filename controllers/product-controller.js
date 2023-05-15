const ProductService = require('../service/product-service');

class ProductController {
  async getAll ( req, res, next) {
    try {
      const products = await ProductService.getAll()
      res.json(products)

    } catch (e) {
      next(e)
    }
  }

  async getOne ( req, res, next) {
    try {


    } catch (e) {
      next(e)
    }
  }

}

module.exports = new ProductController()