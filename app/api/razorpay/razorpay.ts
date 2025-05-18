import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

interface OrderResponse {
  id: string;
  currency: string;
  amount: number;
  status: string;
  receipt?: string; // Made optional since it might be undefined
  created_at: number;
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponse | { error: string }>
) {
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
    
    // Transform the Razorpay response to match our interface
    const response: OrderResponse = {
      id: order.id,
      currency: order.currency,
      amount: Number(order.amount), // Ensure amount is a number
      status: order.status,
      receipt: order.receipt, // Now optional in the interface
      created_at: order.created_at,
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
}