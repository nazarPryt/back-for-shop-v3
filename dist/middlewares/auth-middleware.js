"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const token_service_1 = __importDefault(require("../services/token-service"));
const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        const userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        // req.user = userData //todo
        next(); //next middleware control
    }
    catch (e) {
        return next(api_error_1.ApiError.UnauthorizedError());
    }
};
exports.authMiddleware = authMiddleware;
//next function call next middleware in chane
//# sourceMappingURL=auth-middleware.js.map