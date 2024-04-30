import { ApiError } from '../exceptions/api-error'
import tokenService from '../services/token-service'
import { NextFunction, Request, Response } from 'express'
import { UserDtoType } from '../services/dtos/user-dto'

// Define a custom interface that extends the Express Request interface
export interface UserRequest extends Request {
   user?: UserDtoType
}
export const authMiddleware = (
   req: UserRequest,
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
      req.user = userData
      next() //next middleware control
   } catch (e) {
      return next(ApiError.UnauthorizedError())
   }
}
//next function call next middleware in chane
