'use server'

import Stripe from "stripe"

type checkCreditsParams = {
    plan: string;
    credits: number;
    payAmount: number;
    userId: string;
  };

export async function checkCredits(payment:checkCreditsParams){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const payAmount=Number(payment.payAmount)*100

    const session=await stripe.checkout.sessions.create({
        
    })
}