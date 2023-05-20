import mongoose, { Schema, InferSchemaType } from 'mongoose'
import { randomUUID } from 'crypto'
// id: { type: 'UUID', default: () => randomUUID() },

const UserSchema = new Schema({
   email: { type: String, unique: true, require: true },
   password: { type: String, require: true },
   activationLink: { type: String },
   isActivated: { type: Boolean, default: false },
   role: { type: String, default: 'USER' },
})

export interface UserSchemaType {
   email: string
   password: string
   activationLink: string
   isActivated: boolean
   role: string
   _id: string
}

export const UserModel = mongoose.model('Users', UserSchema)
