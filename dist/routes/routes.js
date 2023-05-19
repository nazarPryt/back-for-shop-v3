"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const user_router_1 = require("./user-router");
const product_router_1 = require("./product-router");
const order_router_1 = require("./order-router");
exports.routes = (0, express_1.Router)({});
exports.routes.use('/users', user_router_1.userRouter);
exports.routes.use('/products', product_router_1.productRouter);
exports.routes.use('/orders', order_router_1.orderRouter);
//# sourceMappingURL=routes.js.map