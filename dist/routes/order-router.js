"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controllers/order-controller"));
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.post('/my', order_controller_1.default.getAll);
exports.orderRouter.post('/', order_controller_1.default.createOrder);
//# sourceMappingURL=order-router.js.map