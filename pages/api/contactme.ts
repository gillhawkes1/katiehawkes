import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';
import { ContactFormData } from "@/app/interfaces/ContactMe";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message }: ContactFormData = req.body;
  
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
      subject: `Website message from ${name}`,
      text: `You have received a new message from ${name} (${email}: \n\n${message})`
    };

    await transporter.sendMail(mailParams);

    return res.status(200).json({message: "Message sent."});
  } catch (error) {
    console.log('error sending email', error);
    return res.status(500).json({error: 'error sending email message'});
  }

}