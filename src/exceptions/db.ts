import { MongoClient } from 'mongodb'
import * as process from 'process'
import { v2 as cloudinary } from 'cloudinary'

// const mongoURL = process.env.DB_URL || 'mongodb://0.0.0.0:27017'
//
// export const client = new MongoClient(mongoURL)
//
// export const runDb = async () => {
//    try {
//       await client.connect()
//
//       await client.db('users').command({ ping: 1 })
//       console.log('success connection to mongoDB')
//    } catch (e) {
//       console.log('cant connect to db')
//       await client.close()
//    }
// }

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_KEY,
   api_secret: process.env.CLOUDINARY_SECRET,
   secure: true,
})
