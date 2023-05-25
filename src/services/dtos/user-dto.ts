export const UserDto = class {
   email
   id
   isActivated
   role

   constructor(model: any) {
      this.email = model.email
      this.id = model._id
      this.isActivated = model.isActivated
      this.role = model.role
   }
}

export type UserDtoType = {
   email: string
   id: string
   isActivated: boolean
   role: 'ADMIN' | 'USER'
}
