const crypto = require("crypto");

const verifyPayment = (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "Razorpay secret not configured" });
  }

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (generatedSignature === signature) {
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false, error: "Invalid signature" });
  }
};

module.exports = {
  verifyPayment,
};