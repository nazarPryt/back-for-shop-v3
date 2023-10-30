import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
   email: { type: String, unique: true, require: true },
   password: { type: String, require: true },
   activationLink: { type: String },
   isActivated: { type: Boolean, require: true, default: false },
   role: { type: String, default: 'USER' },
})

export const UserModel = mongoose.model('Users', UserSchema)
