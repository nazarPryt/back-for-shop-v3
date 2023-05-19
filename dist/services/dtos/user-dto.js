"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const UserDto = class {
    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
};
exports.UserDto = UserDto;
// export const UserDto = (user: UserSchemaType): UserDtoType => {
//    return {
//       email: user.email,
//       id: user._id,
//       isActivated: user.isActivated,
//    }
// }
//# sourceMappingURL=user-dto.js.map