import nodemailer from 'nodemailer'

class MailService {
   transporter

   constructor() {
      this.transporter = nodemailer.createTransport({
         host: String(process.env.SMTP_HOST),
         port: Number(process.env.SMTP_PORT) || 0,
         secure: false,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
         },
      })
   }
   async sendActivationMail(to: any, link: any) {
      await this.transporter.sendMail({
         from: process.env.SMTP_USER,
         to,
         subject: 'activation account on ' + process.env.API_URL,
         text: '',
         html: `
        <div>
            <h1>For activation click on link</h1>
            <a href="${link}">${link}</a>
        </div>
      `,
      })
   }
}
export default new MailService()
