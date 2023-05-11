const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenService{
  generateTokens(payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'}, {})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'}, {})
    return {accessToken, refreshToken}
  }

  async saveToken (userId, refreshToken) {
    const tokedData = await tokenModel.findOne({user: userId})
    if(tokedData){
      tokedData.refreshToken = refreshToken
      return tokedData.save()
    }
    const token = await tokenModel.create({user: userId, refreshToken})
    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({refreshToken})
    console.log('tokenData', tokenData);
    return tokenData
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData

    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData

    } catch (e) {
      return null
    }
  }

}
module.exports = new TokenService()