import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';
import { ContactFormData } from "@/app/interfaces/ContactMe";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { name, email, subject, message }: ContactFormData = req.body;
  
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailParams: Object = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New website message: ${subject}`,
      html: `
        <p>${name} sent you a message:</p>
        <p>${message}</p>
        <p><a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)},%0D%0A%0D%0A">Click here to reply</a></p>
      `,
    };

    await transporter.sendMail(mailParams);

    return res.status(200).json({message: "Message sent."});
  } catch (error) {
    console.log('error sending email', error);
    return res.status(500).json({error: 'error sending email message'});
  }

}