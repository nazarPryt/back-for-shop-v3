"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel = require('./../models/user-model');
const token_service_1 = __importDefault(require("./token-service"));
const api_error_1 = require("../exceptions/api-error");
const uuid_1 = require("uuid");
const mail_service_1 = __importDefault(require("./mail-service/mail-service"));
const verifyEmailTemplate_1 = require("./mail-service/verifyEmailTemplate");
const user_dto_1 = require("./dtos/user-dto");
class UserService {
    registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield UserModel.findOne({ email });
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(`${email} already exists, try a new one`);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const activationLink = (0, uuid_1.v4)();
            const user = yield UserModel.create({
                email,
                password: hashPassword,
                activationLink,
            });
            const emailTemplate = (0, verifyEmailTemplate_1.verifyEmailTamplate)({
                title: 'Confirmation link',
                link: 'activation link here',
                site: process.env.CLIENT_URL,
            });
            const mailService = mail_service_1.default.getInstance();
            yield mailService.createConnection();
            yield mailService.verifyConnection();
            yield mailService.sendMail(activationLink, {
                to: email,
                subject: 'Activation link',
                html: emailTemplate.html,
                from: process.env.CLIENT_URL,
            });
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOne({ activationLink });
            if (!user) {
                throw api_error_1.ApiError.BadRequest('Incorrect link');
            }
            user.isActivated = true;
            return yield user.save();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOne({ email });
            if (!user) {
                throw api_error_1.ApiError.BadRequest('User with this email doesnt exist');
            }
            const isPassEquals = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassEquals) {
                throw api_error_1.ApiError.BadRequest('Incorrect Password !!!');
            }
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logOut(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.default.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDB = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDB) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const user = yield UserModel.findById(userData.id);
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel.find(); //without parameters - return all users
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=user-service.js.map