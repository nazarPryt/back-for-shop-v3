import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

const mongoURL = process.env.DB_URL || 'local'

export const client = new MongoClient(mongoURL)

export const runDb = async () => {
   try {
      await client.connect()

      await client.db('users').command({ ping: 1 })
      console.log('success connection to mongoDB')
   } catch (e) {
      console.log('cant connect to db')
      await client.close()
   }
}
