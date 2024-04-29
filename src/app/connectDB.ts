import mongoose from 'mongoose'
import { appSettings } from './appSettings'

const DB_URL = appSettings.env.MONGODB_URL

export const connectDB = async () => {
   await mongoose
      .connect(DB_URL)
      .then(() => {
         console.log(`Connected to Database :)`)
      })
      .catch((err) => {
         console.log(`Not Connected to Database DB_URL: ${DB_URL}`, err)
      })
}
