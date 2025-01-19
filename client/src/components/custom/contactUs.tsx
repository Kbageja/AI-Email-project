import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setMessage(e.target.value);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Only allow numeric input
    if (/^\d*$/.test(input)) {
      if(input.length<=10){
      setPhone(input);
      }
    }
    
  };

  return (
    <div className="flex flex-col my-2 items-center justify-center  p-6">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500 mb-8">Contact Us</h1>

      {/* Contact Form */}
      <form className="w-full max-w-4xl space-y-6">
        {/* Name and Phone Number Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Name Field */}
          <div className="flex-1">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex-1">
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full p-3 border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            className="w-full p-3 border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 h-32 resize-none"
            placeholder="Write your message here (max 500 characters)"
            required
          />
          <p className="text-sm text-gray-500 mt-2">{message.length}/500</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
