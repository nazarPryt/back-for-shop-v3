"use strict";
// import express, { Request, Response } from 'express'
//
// const app = express()
// const port = process.env.PORT || 8080
//
// app.get('/', (_req: Request, res: Response) => {
//    return res.send('Express Typescript on Vercel')
// })
//
// app.get('/ping', (_req: Request, res: Response) => {
//    return res.send('pong 🏓')
// })
//
// app.listen(port, () => {
//    return console.log(`Server is listening on ${port}`)
// })
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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes/routes");
const error_middleware_1 = require("./middlewares/error-middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = require("./routes/user-router");
const product_router_1 = require("./routes/product-router");
const order_router_1 = require("./routes/order-router");
//Mongoose Node.js Express TypeScript application boilerplate with best practices for API development.
//https://github.com/chiragmehta900/node-typescript-boilerplate-mongoose
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
// app.use(
//    cors({
//       credentials: true,
//       origin: process.env.CLIENT_URL,
//    })
// )
// app.use('/', routes)
routes_1.routes.use('/api/users', user_router_1.userRouter);
routes_1.routes.use('/api/products', product_router_1.productRouter);
routes_1.routes.use('/api/orders', order_router_1.orderRouter);
routes_1.routes.get('/', (req, res) => {
    return res.send('Server works properly. Express Typescript on Vercel :)');
});
exports.app.use(error_middleware_1.errorMiddleware);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('start');
        yield mongoose_1.default.connect(process.env.DB_URL || 'mongodb://0.0.0.0:27017');
        // await mongoose.connect('mongodb://0.0.0.0:27017')
        exports.app.listen(PORT, () => {
            console.log('Server is running on port' + PORT);
        });
    }
    catch (e) {
        console.log(e);
    }
});
startApp();
// export default app
// const startServer = async () => {
//    try {
//       await runDb()
//
//       app.listen(PORT, () => {
//          console.log(
//             'Server is Successfully Running,and App is listening on port ' +
//                PORT
//          )
//       })
//    } catch (e) {
//       console.log('can not start server :(')
//    }
// }
// startServer()
// app.get('/', async (req: Request, res: Response) => {
//    await mongoose.connect(process.env.DB_URL || 'user')
//    res.send('Back works properly  :)')
// })
//
// app.listen(PORT, () => {
//    console.log(
//       'Server is Successfully Running,and App is listening on port ' + PORT
//    )
// })
//# sourceMappingURL=index.js.map