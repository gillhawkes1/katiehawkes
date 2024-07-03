"use client";
import ContactMeForm from "@/components/contactme/ContactForm";
import axios from "axios";
import { ContactFormData } from "../interfaces/ContactMe";

export default function ContactMe() {
  const onSubmit = async (formData: ContactFormData) => {
    //TODO: submit formdata here using nodemailer
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contactme`, formData);
      console.log(response);
    } catch (error) {
      
    }
    return formData;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div>
        <h1 className="text-3xl p-14 font-bold">Contact Me</h1>
        <ContactMeForm onSubmit={onSubmit}/>
      </div>
    </main>
  );
}
