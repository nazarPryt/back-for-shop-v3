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
const nodemailer_1 = __importDefault(require("nodemailer"));
//documentation how to send email
//https://medium.com/@chiragmehta900/how-to-send-mail-in-node-js-with-nodemailer-in-typescript-889cc46d1437
class MailService {
    constructor() { }
    //INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    //CREATE CONNECTION FOR LOCAL
    createLocalConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            let account = yield nodemailer_1.default.createTestAccount();
            this.transporter = nodemailer_1.default.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
        });
    }
    //CREATE A CONNECTION FOR LIVE
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter = nodemailer_1.default.createTransport({
                host: String(process.env.SMTP_HOST) || 'local',
                port: Number(process.env.SMTP_PORT) || 0,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
        });
    }
    //SEND MAIL
    sendMail(requestId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transporter.sendMail({
                from: `${process.env.SMTP_USER || options.from}`,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            });
        });
    }
    //VERIFY CONNECTION
    verifyConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transporter.verify((error, success) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Server is ready to take our messages');
                }
            });
        });
    }
    //CREATE TRANSPORTER
    getTransporter() {
        return this.transporter;
    }
}
exports.default = MailService;
//# sourceMappingURL=mail-service.js.map