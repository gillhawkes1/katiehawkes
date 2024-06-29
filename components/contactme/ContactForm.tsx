import React, { useState, FormEvent } from "react";
import { ContactForm, ContactFormData } from "@/app/interfaces/ContactMe";
import styles from "@/styles/ContactMe.module.css";

const ContactMeForm: React.FC<ContactForm> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    //TODO: add styling
    <form onSubmit={handleSubmit}>
      <div className="p-10">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="p-10">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="p-10">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button className={styles.submitButton} type="submit">Send</button>
    </form>
  );
};

export default ContactMeForm;
