import mongoose, { Schema, InferSchemaType } from 'mongoose'

const ProductCoverSchema = new Schema({
   title: { type: String, length: 255 },
   image: { type: Schema.Types.Mixed },
})
export type ProductCoverSchemaType = InferSchemaType<typeof ProductCoverSchema>

export const ProductCoverModel = mongoose.model(
   'Product-Covers',
   ProductCoverSchema
)
