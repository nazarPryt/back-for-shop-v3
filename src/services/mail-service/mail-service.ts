import nodemailer from 'nodemailer'
import { MailInterface } from '../../interfaces/mailInterface'

//documentation how to send email
//https://medium.com/@chiragmehta900/how-to-send-mail-in-node-js-with-nodemailer-in-typescript-889cc46d1437

export default class MailService {
   private static instance: MailService
   private transporter: nodemailer.Transporter

   private constructor() {}

   //INSTANCE CREATE FOR MAIL
   static getInstance() {
      if (!MailService.instance) {
         MailService.instance = new MailService()
      }
      return MailService.instance
   }

   //CREATE CONNECTION FOR LOCAL
   async createLocalConnection() {
      let account = await nodemailer.createTestAccount()
      this.transporter = nodemailer.createTransport({
         host: account.smtp.host,
         port: account.smtp.port,
         secure: account.smtp.secure,
         auth: {
            user: account.user,
            pass: account.pass,
         },
      })
   }

   //CREATE A CONNECTION FOR LIVE
   async createConnection() {
      this.transporter = nodemailer.createTransport({
         host: String(process.env.SMTP_HOST) || 'local',
         port: Number(process.env.SMTP_PORT) || 0,
         secure: false,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
         },
      })
   }

   //SEND MAIL
   async sendMail(
      requestId: string | number | string[],
      options: MailInterface
   ) {
      return await this.transporter.sendMail({
         from: `${process.env.SMTP_USER || options.from}`,
         to: options.to,
         cc: options.cc,
         bcc: options.bcc,
         subject: options.subject,
         text: options.text,
         html: options.html,
      })
   }

   //VERIFY CONNECTION
   async verifyConnection() {
      return this.transporter.verify((error, success) => {
         if (error) {
            console.log(error)
         } else {
            console.log('Server is ready to take our messages')
         }
      })
   }

   //CREATE TRANSPORTER
   getTransporter() {
      return this.transporter
   }
}
