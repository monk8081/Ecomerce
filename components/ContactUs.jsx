export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Get in Touch</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <p className="text-lg mb-4">
            Have questions? We’re here to help! Reach out via:
          </p>
          <p className="mb-4">
            <strong>Email:</strong>{' '}
            <a href="mailto:support@trendythreads.com" className="text-purple-600 hover:underline">
              support@trendythreads.com
            </a>
          </p>
          <p className="mb-4">
            <strong>WhatsApp:</strong>{' '}
            <a href="https://wa.me/1234567890" className="text-purple-600 hover:underline">
              +91 12345 67890
            </a>
          </p>
          <p className="mb-4">
            <strong>Business Hours:</strong> Mon-Fri, 9 AM - 6 PM IST
          </p>
          <p className="text-lg mt-6">Thank you for choosing Trendy Threads!</p>
        </div>
      </div>
    </div>
  );
}