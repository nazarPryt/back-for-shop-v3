import { TokenModel, TokenSchemaType } from '../models/token-model'
import jwt from 'jsonwebtoken'

class TokenService {
   generateTokens(payload: any) {
      const accessToken = jwt.sign(
         payload,
         process.env.JWT_ACCESS_SECRET,
         { expiresIn: '30m' },
         {}
      )
      const refreshToken = jwt.sign(
         payload,
         process.env.JWT_REFRESH_SECRET,
         { expiresIn: '30d' },
         {}
      )
      return { accessToken, refreshToken }
   }

   async saveToken(userId: string, refreshToken: string) {
      const tokedData = await TokenModel.findOne({ user: userId })
      if (tokedData) {
         tokedData.updateOne({ refreshToken })
         return
      }
      const token = await TokenModel.create({ user: userId, refreshToken })
      return token
   }

   async removeToken(refreshToken: string) {
      const tokenData = await TokenModel.deleteOne({ refreshToken })
      return tokenData
   }

   async findToken(refreshToken: string) {
      const tokenData = await TokenModel.findOne({ refreshToken })
      console.log('tokenData', tokenData)
      return tokenData
   }

   validateAccessToken(token: string) {
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
         return userData
      } catch (e) {
         return null
      }
   }

   validateRefreshToken(token: string) {
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
         return userData
      } catch (e) {
         return null
      }
   }
}
export default new TokenService()
