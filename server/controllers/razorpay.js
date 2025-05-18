const Razorpay = require("razorpay");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Controller to create a Razorpay order
const createRazorpayOrder = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount } = req.body;

  // Validate amount
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount provided" });
  }

  const options = {
    amount: Math.round(amount * 100), // Convert to paise and ensure integer
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    // Validate and transform the response
    if (!order.id || !order.currency || !order.amount) {
      throw new Error("Invalid Razorpay order response");
    }

    const response = {
      id: order.id,
      currency: order.currency,
      amount: Number(order.amount), // Ensure amount is a number
      status: order.status,
      receipt: order.receipt,
      created_at: order.created_at,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

module.exports = {
  createRazorpayOrder,
};