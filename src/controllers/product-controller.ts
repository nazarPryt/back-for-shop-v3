import ProductService from '../services/product-service'
import { NextFunction, Request, Response } from 'express'
import { ProductModel } from '../models/product-model'
import { ApiError } from '../exceptions/api-error'
import { v2 as cloudinary } from 'cloudinary'
import CloudinaryService from '../services/cloudinary-service'

class ProductController {
   async getAll(req: Request, res: Response) {
      try {
         const products = await ProductService.getAll()
         return res.json(products)
      } catch (e) {
         console.log(e)
      }
   }

   async addProduct(req: Request, res: Response, next: NextFunction) {
      try {
         const productData = JSON.parse(req.body.postData)

         const existed = await ProductModel.findOne({
            title: productData.title,
         })
         if (existed) {
            return next(
               ApiError.BadRequest(
                  `${productData.title} is already exist, can't add one more`
               )
            )
         }
         const cover = await CloudinaryService.uploadProductCover(
            // @ts-ignore
            req.files.cover.tempFilePath
         )
         const imgAll = await CloudinaryService.uploadProductAllImages(
            // @ts-ignore
            req.files.imgAll
         )
         const product = { ...productData, cover, imgAll }

         const createdProduct = await ProductService.addProduct(product)

         if (typeof createdProduct !== 'string') {
            return res.json({
               createdProduct,
               message: 'new product was successfully added',
            })
         }
         return next(ApiError.BadRequest(createdProduct))
      } catch (e) {
         console.log(e)
      }
   }

   async getOne(req: Request, res: Response) {
      try {
         const { id } = req.params
         if (id) {
            const product = await ProductService.getOne(id)
            return res.json(product)
         }
         return res.json({ message: 'cant find this product' })
      } catch (e) {
         console.log(e)
      }
   }

   async uploadCover(req: any, res: Response) {
      try {
         const file = req.files.file.tempFilePath

         await cloudinary.uploader.upload(file).then(async (result) => {
            const cover = await ProductService.addProductCover({
               title: result.original_filename,
               image: result,
            })
            return res.status(200).json(cover)
         })
      } catch (e) {
         console.log(e)
         return res.status(400).json({ message: 'Upload cover error' })
      }
   }
}

export default new ProductController()
