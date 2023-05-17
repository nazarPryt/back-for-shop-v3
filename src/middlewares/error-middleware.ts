import { NextFunction, Request, Response } from 'express'
import { ApiErrorType } from '../exceptions/api-error'

const ApiError = require('../exceptions/api-error')

export const errorMiddleware = (
   err: ApiErrorType,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.log(err)

   if (err instanceof ApiError) {
      return res
         .status(err.status)
         .json({ message: err.message, errors: err.errors })
   }
   return res.status(500).json({ message: 'something went wrong' })
}
