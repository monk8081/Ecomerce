const express = require("express");
const router = express.Router();
const { verifyPayment } = require("../controllers/verifyPayment");

router.post("/verify-payment", verifyPayment);

module.exports = router;