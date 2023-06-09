import mongoose, { Schema, InferSchemaType } from 'mongoose'

const OrderSchema = new Schema({
   userID: { type: Schema.Types.ObjectId, ref: 'User' },
   stripeId: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   products: { type: Array },
})

export type OrderSchemaType = InferSchemaType<typeof OrderSchema>

export const OrderModel = mongoose.model('Orders', OrderSchema)
