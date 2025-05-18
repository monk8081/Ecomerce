import React from "react";

const aboutusPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          About Us
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p>
            Welcome to <strong>Your Fashion Store</strong>, your go-to destination for
            modern, high-quality, and affordable clothing. Founded in 2021, we’ve made
            it our mission to empower individuals to express themselves through fashion.
          </p>

          <p>
            Whether you're looking for casual everyday wear, elegant outfits for special
            occasions, or bold styles to make a statement — we’ve got you covered. Our
            collection blends timeless pieces with the latest trends, all crafted with
            comfort and style in mind.
          </p>

          <p>
            At <strong>Your Fashion Store</strong>, we believe fashion should be
            inclusive, accessible, and sustainable. That’s why we’re committed to using
            eco-friendly materials and ethical production practices.
          </p>

          <p>
            Thank you for supporting our journey. We’re here to make you look good and
            feel great — every day.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Follow Us</h2>
          <p className="text-gray-600 mb-4">Stay connected on social media for new arrivals and special offers!</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Instagram
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Facebook
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutusPage;
