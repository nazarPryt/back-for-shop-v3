const userService = require('../service/user-service')

class UserController {
  async registration ( req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.registration(email, password)
      res.cookies('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)

    } catch (e) {
      console.log(e);
    }
  }

  async login () {
    try {

    } catch (e) {

    }
  }

  async logout () {
    try {

    } catch (e) {

    }
  }

  async activate () {
    try {

    } catch (e) {

    }
  }

  async refresh () {
    try {

    } catch (e) {

    }
  }

  async getUsers ( req, res, next) {
    try {
      res.json(['bls', 'fdf'])

    } catch (e) {

    }
  }

}

module.exports = new UserController()