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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes/routes");
const error_middleware_1 = require("./middlewares/error-middleware");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
//Mongoose Node.js Express TypeScript application boilerplate with best practices for API development.
//https://github.com/chiragmehta900/node-typescript-boilerplate-mongoose
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
exports.app.use('/', routes_1.routes);
exports.app.use(error_middleware_1.errorMiddleware);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
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