import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-center mb-10">
          We'd love to hear from you. Whether you have a question about our clothing,
          shipping, or anything else, our team is ready to answer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 text-gray-700">
            <div>
              <h4 className="text-lg font-semibold">Store Address</h4>
              <p>Fashion Street, Block B-2</p>
              <p>Mumbai, Maharashtra, 400001</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Email</h4>
              <p>support@yourfashionstore.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Phone</h4>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Business Hours</h4>
              <p>Mon - Sat: 10:00 AM – 7:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
