import mongoose, { Schema, InferSchemaType } from 'mongoose'

const ProductSchema = new Schema({
   available: { type: Boolean, require: true },
   description: { type: String, require: true },
   title: { type: String, require: true },
   price: Number,
   oldPrice: { type: Number, require: true },
   quantity: { type: Number, require: true },
   cover: { type: String, require: true },
   imgAll: { type: Array, require: true },
   category: { type: Array, require: true },
})
export type ProductSchemaType = InferSchemaType<typeof ProductSchema>

export const ProductModel = mongoose.model('Products', ProductSchema)
