import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { amount, currency = "INR" } = body;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt: `rcpt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return new NextResponse("Failed to create Razorpay order", { status: 500 });
  }
}
