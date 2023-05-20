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
const order_service_1 = __importDefault(require("../services/order-service"));
const product_model_1 = require("../models/product-model");
const order_model_1 = require("../models/order-model");
const stripe = require('stripe')(process.env.STRIPE_KEY);
class OrderController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.body.userID;
                if (userID) {
                    const orders = yield order_service_1.default.getAll(userID);
                    return res.json(orders);
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    // async createOrder(req: Request, res: Response) {
    //    try {
    //       const userID = req.body.userID
    //       const products = req.body
    //
    //       const user = await UserModel.find({ _id: userID })
    //
    //       if (user) {
    //          const order = await OrderService.create(userID, products)
    //          return res.json(order)
    //       }
    //    } catch (e) {
    //       console.log(e)
    //    }
    // }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.body.userID;
                const products = req.body.products;
                const lineItems = yield Promise.all(products.map((product) => __awaiter(this, void 0, void 0, function* () {
                    const item = yield product_model_1.ProductModel.findOne({ _id: product._id });
                    if (item) {
                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: item.title,
                                },
                                unit_amount: Math.round(item.price * 100),
                            },
                            quantity: product.quantity,
                        };
                    }
                })));
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    success_url: process.env.CLIENT_URL + '/successPayment',
                    cancel_url: process.env.CLIENT_URL + '/errorPayment',
                    line_items: lineItems,
                });
                yield order_model_1.OrderModel.create({ products, stripeId: session.id, userID });
                res.json({ stripeSession: session });
                res.redirect(303, session.url);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new OrderController();
//# sourceMappingURL=order-controller.js.map