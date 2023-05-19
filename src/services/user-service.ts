import { UserModel, UserSchemaType } from '../models/user-model'
import bcrypt from 'bcrypt'

import TokenService from './token-service'
import { ApiError } from '../exceptions/api-error'
import { v4 } from 'uuid'
import MailService from './mail-service/mail-service'
import { verifyEmailTamplate } from './mail-service/verifyEmailTemplate'
import { UserDto } from './dtos/user-dto'
import { JwtPayload } from 'jsonwebtoken'

class UserService {
   async registration(email: string, password: string) {
      const candidate = await UserModel.findOne({ email })
      if (candidate) {
         throw ApiError.BadRequest(`${email} already exists, try a new one`)
      }
      const hashPassword = await bcrypt.hash(password, 3)
      const activationLink = v4()

      const user = await UserModel.create({
         email,
         password: hashPassword,
         activationLink,
      })
      const emailTemplate = verifyEmailTamplate({
         title: 'Confirmation link',
         link: 'activation link here',
         site: process.env.CLIENT_URL,
      })
      const mailService = MailService.getInstance()
      await mailService.createConnection()
      await mailService.verifyConnection()
      await mailService.sendMail(activationLink, {
         to: email,
         subject: 'Activation link',
         html: emailTemplate.html,
         from: process.env.CLIENT_URL,
      })

      const userDto = new UserDto(user)
      const tokens = TokenService.generateTokens({ ...userDto })
      await TokenService.saveToken(userDto.id, tokens.refreshToken)

      return { ...tokens, user: userDto }
   }

   async activate(activationLink: string) {
      // const user = await UserModel.findOne({ activationLink })
      // if (!user) {
      //    throw ApiError.BadRequest('Incorrect link')
      // }
      // user.isActivated = true
      // await user.save() //todo
   }

   async login(email: string, password: string) {
      const user: UserSchemaType | null = await UserModel.findOne({ email })
      if (!user) {
         throw ApiError.BadRequest('User with this email doesnt exist')
      }
      const isPassEquals = await bcrypt.compare(password, user.password)
      if (!isPassEquals) {
         throw ApiError.BadRequest('Incorrect Password !!!')
      }
      const userDto = new UserDto(user)
      const tokens = TokenService.generateTokens({ ...userDto })
      await TokenService.saveToken(userDto.id, tokens.refreshToken)

      return { ...tokens, user: userDto }
   }

   async logOut(refreshToken: string) {
      const token = await TokenService.removeToken(refreshToken)
      return token
   }

   async refresh(refreshToken: string) {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError()
      }
      const userData = TokenService.validateRefreshToken(refreshToken)

      const tokenFromDB = await TokenService.findToken(refreshToken)

      if (!userData || !tokenFromDB) {
         throw ApiError.UnauthorizedError()
      }

      const user = await UserModel.findById(userData.id)

      const userDto = new UserDto(user)
      const tokens = TokenService.generateTokens({ ...userDto })

      await TokenService.saveToken(userDto.id, tokens.refreshToken)
      return { ...tokens, user: userDto }
   }

   async getAllUsers() {
      return UserModel.find() //without parameters - return all users
   }
}
export default new UserService()
