import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-300 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-black rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-black rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Write your message here..."
              className="w-full px-4 py-2 border border-black rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
