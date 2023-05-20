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
exports.runDb = exports.client = void 0;
const mongodb_1 = require("mongodb");
const mongoURL = process.env.DB_URL || 'mongodb://0.0.0.0:27017';
exports.client = new mongodb_1.MongoClient(mongoURL);
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        yield exports.client.db('users').command({ ping: 1 });
        console.log('success connection to mongoDB');
    }
    catch (e) {
        console.log('cant connect to db');
        yield exports.client.close();
    }
});
exports.runDb = runDb;
//# sourceMappingURL=db.js.map