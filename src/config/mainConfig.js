import nodemailer from 'nodemailer';

import { MAIL_ID, MAIL_PASSWORD } from './serverConfig.js';

export const transporter = nodemailer.createTransport({
    service:'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: MAIL_ID,
      pass: MAIL_PASSWORD
    },
  });