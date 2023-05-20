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
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product-model");
class ProductService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel.find();
            return products;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_model_1.ProductModel.findById(id);
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = new product_model_1.ProductModel(product);
                yield newProduct.save();
                return newProduct;
            }
            catch (e) {
                return e.message;
            }
        });
    }
}
exports.default = new ProductService();
//# sourceMappingURL=product-service.js.map