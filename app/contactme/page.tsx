"use client";
import ContactMeForm from "@/components/contactme/ContactForm";
import { ContactFormData } from "../interfaces/ContactMe";

//test

export default function ContactMe() {
  const onSubmit = (formData: ContactFormData) => {
    //TODO: submit formdata here using nodemailer
    return formData;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div>
        <h1 className="text-3xl font-bold">Contact Me</h1>
        <ContactMeForm onSubmit={onSubmit}/>
      </div>
    </main>
  );
}
