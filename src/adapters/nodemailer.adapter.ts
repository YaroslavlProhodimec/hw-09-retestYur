import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const { createTransport } = nodemailer;

const transporterEmail = process.env.EMAIL_ADDRESS;
const transporterPassword = process.env.EMAIL_PASSWORD;

type EmailInfo = { email: string; subject: string; message: string };

// Presentation layer
// 1. Коммуникация по http / graphQL / webSocket (запрос - ответ).
// 2. Отвечает за подготовку (маппинг) данных для пользователей (напр., фронтов, других бэкендов).
// 3. Парсит body, query, URI параметры.
// 4. При query запросе правильнее обращаться напрямую к Data access слою.
export class NodemailerAdapter {
  async sendMessage({ email, subject, message }: EmailInfo): Promise<boolean> {
    const transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: transporterEmail,
        pass: transporterPassword,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `"" <${transporterEmail}>`,
        to: email,
        subject,
        html: message,
      });

      return !!info.accepted.length;
    } catch (error) {
      console.log('Error while sending email: ', error);

      return false;
    }
  }
}
