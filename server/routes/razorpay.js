const express = require("express");
const router = express.Router();
const { createRazorpayOrder } = require("../controllers/razorpay");

// Route to create a Razorpay order
router.post("/razorpay", createRazorpayOrder);

module.exports = router;