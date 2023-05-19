"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product-controller"));
exports.productRouter = (0, express_1.Router)({});
exports.productRouter.get('/', product_controller_1.default.getAll);
exports.productRouter.post('/', product_controller_1.default.addProduct);
exports.productRouter.get('/:id', product_controller_1.default.getOne);
//# sourceMappingURL=product-router.js.map