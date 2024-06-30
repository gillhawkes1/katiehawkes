import React, { useState } from 'react';
import axios from 'axios';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/contact', {
        name,
        email,
        message,
      });
      if (response.status === 200) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setError('Failed to send message.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </div>
        {success && <p className="text-green-500">Message sent successfully!</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
