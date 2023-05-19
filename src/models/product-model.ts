import mongoose, { Schema, InferSchemaType } from 'mongoose'

// interface ProductInterface {
//    available: boolean
//    description: string
//    title: string
//    price: number
//    oldPrice: number
//    quantity: number
//    cover: string
//    imgAll: Types.Array<string>
//    category: Types.Array<string>
// }
const ProductSchema = new Schema({
   available: { type: Boolean, required: true },
   description: { type: String, required: true },
   title: { type: String, required: true },
   price: { type: Number, required: true },
   oldPrice: { type: Number, required: true },
   quantity: { type: Number, required: true },
   cover: { type: String, required: true },
   imgAll: { type: [String], required: true },
   category: { type: [String], required: true },
})
export type ProductSchemaType = InferSchemaType<typeof ProductSchema>

export const ProductModel = mongoose.model('Products', ProductSchema)
