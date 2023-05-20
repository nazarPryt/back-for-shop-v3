import { UserDtoType } from '../services/dtos/user-dto'

export interface UserRefreshTokenInterface {
   accessToken: string
   refreshToken: string
   user: UserDtoType
}
