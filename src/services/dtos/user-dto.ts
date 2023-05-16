// type UserDtoType = {
//    email: string
//    id: string
//    isActivated: boolean
// }

export class UserDto {
   email
   id
   isActivated

   constructor(model: any) {
      this.email = model.email
      this.id = model._id
      this.isActivated = model.isActivated
   }
}
// export default new UserDto()
