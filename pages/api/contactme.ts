import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';
import { ContactFormData } from "@/app/interfaces/ContactMe";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message }: ContactFormData = req.body;
  
  const transporter = nodemailer.createTransport({
  });
}