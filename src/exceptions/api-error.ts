export class ApiError extends Error {
   status
   errors

   constructor(status: any, message: any, errors: any = []) {
      super(message)
      this.status = status
      this.errors = errors
   }

   static UnauthorizedError() {
      return new ApiError(401, 'User is not authorized')
   }

   static BadRequest(message: string, errors: any = []) {
      return new ApiError(400, message, errors)
   }
}
