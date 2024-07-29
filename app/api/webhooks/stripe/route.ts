/* eslint-disable camelcase */
import { logTransaction } from "@/lib/actions/payment.actions";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const sig = req.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const paymentDetails = {
      stripeId: id,
      payAmount: amount_total ? amount_total / 100 : 0,
      plan: metadata?.plan || "",
      credits: Number(metadata?.credits) || 0,
      userId: metadata?.buyerId || "",
      createdAt: new Date(),
    };

    const newPaymentDetails = await logTransaction(paymentDetails);
    
    return NextResponse.json({ message: "OK", paymentDetails: newPaymentDetails });
  }

  return new Response("", { status: 200 });
}