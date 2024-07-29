"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connectToDB } from "../database/mongoose";
import Payment from "../database/models/payment.model";
import { updateUserCredits } from "./user.actions";

type checkCreditsParams = {
  plan: string;
  credits: number;
  payAmount: number;
  userId: string;
};

type LogPaymentParams = {
  stripeId: string;
  payAmount: number;
  credits: number;
  plan: string;
  userId: string;
  createdAt: Date;
};

export async function checkCredits(payment: checkCreditsParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const payAmount = Number(payment.payAmount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: payAmount,
          product_data: {
            name: payment.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: payment.plan,
      credits: payment.credits,
      userId: payment.userId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  redirect(session.url!);
}

export async function logTransaction(paymentDetails: LogPaymentParams) {
  try {
    await connectToDB();

    // Log a new transaction with a buyerId
    const newLog = await Payment.create({
      ...paymentDetails,
      buyer: paymentDetails.userId,
    });

    await updateUserCredits(paymentDetails.userId, paymentDetails.credits);

    return JSON.parse(JSON.stringify(newLog));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error:${err.message}`);
    } else {
      throw new Error(`${JSON.stringify(err)}`);
    }
  }
}
