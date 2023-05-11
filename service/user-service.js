const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const UserDto = require('../service/dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({email})
    if(candidate){
      throw ApiError.BadRequest(`${email} already exists, try a new one`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await UserModel.create({email, password: hashPassword,activationLink})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async activate(activationLink){
    const user = await UserModel.findOne({activationLink})
    if(!user){
      throw ApiError.BadRequest('Incorrect link')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email, password){
  const user = await UserModel.findOne({email})
    if(!user) {
      throw ApiError.BadRequest('User with this email doesnt exist')
    }
    const isPassEquals = await  bcrypt.compare(password, user.password)
    if(!isPassEquals){
      throw ApiError.BadRequest('Incorrect Password !!!')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async logOut(refreshToken){
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken){
    if(!refreshToken){
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)

    if(!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }

    const userDto = await UserModel.findById(userData.id)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async getAllUsers(){
    const users = await UserModel.find() //without parameters - return all users
    return users
  }

}
module.exports = new UserService()