import mongoose, { Schema, InferSchemaType } from 'mongoose'

const TokenSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User' },
   refreshToken: { type: String, require: true },
})

export type TokenSchemaType = InferSchemaType<typeof TokenSchema>

export const TokenModel = mongoose.model('Tokens', TokenSchema)
