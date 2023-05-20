export type ApiErrorType = {
   status: number
   errors: []
   message: string
}

export class ApiError extends Error {
   status
   errors

   constructor(status: number, message: string, errors: string[] = []) {
      super(message)
      this.status = status
      this.errors = errors
   }

   static UnauthorizedError() {
      return new ApiError(401, 'You are not authorized! :(')
   }

   static BadRequest(message: string, errors: string[] = []) {
      return new ApiError(400, message, errors)
   }
}
