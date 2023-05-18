export const UserDto = class {
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

// type UserDtoType = {
//    email: string
//    id: string
//    isActivated: boolean
// }
// export const UserDto = (user: UserSchemaType): UserDtoType => {
//    return {
//       email: user.email,
//       id: user._id,
//       isActivated: user.isActivated,
//    }
// }
