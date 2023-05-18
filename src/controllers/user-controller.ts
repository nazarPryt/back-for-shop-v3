import UserService from '../services/user-service'
import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-error'

class userController {
   async registration(
      req: Request<{}, {}, { password: string; email: string }>,
      res: Response,
      next: NextFunction
   ) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation Error'))
         }
         const { email, password } = req.body

         const userData = await UserService.registration(email, password)
         res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         })

         return res.json(userData)
      } catch (e) {
         next(e)
      }
   }

   async login(
      req: Request<{}, {}, { password: string; email: string }>,
      res: Response,
      next: NextFunction
   ) {
      try {
         const { email, password } = req.body
         const userData = await UserService.login(email, password)

         res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         })
         return res.json(userData)
      } catch (e) {
         next(e)
      }
   }

   async logout(req: Request, res: Response, next: NextFunction) {
      try {
         const { refreshToken } = req.cookies
         await UserService.logOut(refreshToken)
         res.clearCookie('refreshToken')
         return res.status(200).json('logout')
      } catch (e) {
         next(e)
      }
   }

   async activate(req: Request, res: Response, next: NextFunction) {
      // try {
      //    const activationLink = req.params.link
      //    await UserService.activate(activationLink)
      //    return res.redirect(process.env.CLIENT_URL || 'https://google.com')
      // } catch (e) {
      //    next(e)
      // }
   }

   async refresh(req: Request, res: Response, next: NextFunction) {
      // try {
      //    const { refreshToken } = req.cookies
      //    const userData = await UserService.refresh(refreshToken)
      //
      //    res.cookie('refreshToken', userData.refreshToken, {
      //       maxAge: 30 * 24 * 60 * 60 * 1000,
      //       httpOnly: true,
      //    })
      //    return res.json(userData)
      // } catch (e) {
      //    next(e)
      // }
   }

   async getUsers(req: Request, res: Response, next: NextFunction) {
      //    try {
      //       const users = await UserService.getAllUsers()
      //       // const users = ['user-one', 'user-tho']
      //
      //       res.json(users)
      //    } catch (e) {
      //       next(e)
      //    }
   }
}

export const UserController = new userController()
