import React, { useState, FormEvent } from "react";
import { ContactForm, ContactFormData } from "@/app/interfaces/ContactMe";
import styles from "@/styles/ContactMe.module.css";

const ContactMeForm: React.FC<ContactForm> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", subject: "", message: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const submitStatus = await onSubmit(formData);
    submitStatus.status === 200 ? submitSuccess() : handleSubmitError();
  };

  //TODO: placeholder for an error, needs updating
  const handleSubmitError = () => {
    alert('There was an error sending your message.');
  }

  const submitSuccess = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
  }

  return (
    //TODO: add styling
    <div className="flex max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="subject"
            id="subject"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            required
          />
        </div>
        <button className={styles.submitButton} type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactMeForm;
