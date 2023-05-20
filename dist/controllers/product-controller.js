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
const product_service_1 = __importDefault(require("../services/product-service"));
const product_model_1 = require("../models/product-model");
const api_error_1 = require("../exceptions/api-error");
class ProductController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_service_1.default.getAll();
                return res.json(products);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    addProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = Object.assign({}, req.body);
                const existed = yield product_model_1.ProductModel.findOne({ title: product.title });
                if (existed) {
                    return next(api_error_1.ApiError.BadRequest(`${product.title} is already exist, can't add one more`));
                }
                const createdProduct = yield product_service_1.default.addProduct(product);
                if (typeof createdProduct !== 'string') {
                    return res.json({
                        createdProduct,
                        message: 'new product was successfully added',
                    });
                }
                return next(api_error_1.ApiError.BadRequest(createdProduct));
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (id) {
                    const product = yield product_service_1.default.getOne(id);
                    return res.json(product);
                }
                return res.json({ message: 'cant find this product' });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product-controller.js.map