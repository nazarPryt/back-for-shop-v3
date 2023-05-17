import { ApiError } from '../exceptions/api-error'
import tokenService from '../services/token-service'
import { NextFunction, Request, Response } from 'express'

export const authMiddleware = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader) {
         return next(ApiError.UnauthorizedError())
      }

      const accessToken = authorizationHeader.split(' ')[1]
      if (!accessToken) {
         return next(ApiError.UnauthorizedError())
      }

      const userData = tokenService.validateAccessToken(accessToken)
      if (!userData) {
         return next(ApiError.UnauthorizedError())
      }
      // req.user = userData //todo
      next() //next middleware control
   } catch (e) {
      return next(ApiError.UnauthorizedError())
   }
}
//next function call next middleware in chane
