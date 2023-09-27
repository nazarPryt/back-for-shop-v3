import mongoose, { Schema, InferSchemaType } from 'mongoose'

const ProductSchema = new Schema({
   available: { type: Boolean, required: true },
   description: { type: String, required: true },
   title: { type: String, required: true },
   price: { type: Number, required: true },
   oldPrice: { type: Number, required: true },
   quantity: { type: Number, default: 1 },
   cover: { type: Schema.Types.Mixed },
   imgAll: { type: [String], required: true },
   category: { type: [String], required: true },
})
export type ProductSchemaType = InferSchemaType<typeof ProductSchema>

export const ProductModel = mongoose.model('Products', ProductSchema)
