"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const express_validator_1 = require("express-validator");
const auth_middleware_1 = require("../middlewares/auth-middleware");
exports.userRouter = (0, express_1.Router)({});
exports.userRouter.post('/registration', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 3, max: 32 }), user_controller_1.UserController.registration);
exports.userRouter.post('/login', user_controller_1.UserController.login);
exports.userRouter.post('/logout', user_controller_1.UserController.logout);
exports.userRouter.get('/activate/:link', user_controller_1.UserController.activate);
exports.userRouter.get('/refresh', user_controller_1.UserController.refresh);
exports.userRouter.get('/', auth_middleware_1.authMiddleware, user_controller_1.UserController.getUsers);
//# sourceMappingURL=user-router.js.map