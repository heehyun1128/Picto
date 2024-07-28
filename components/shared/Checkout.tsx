"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkCredits } from "@/lib/actions/payment.actions";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  payAmount,
  credits,
  userId,
}: {
  plan: string;
  payAmount: number;
  credits: number;
  userId: string;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
   
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation soon.",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order is successfully canceled!",
        description: "If you need any assistance or have any questions, feel free to reach out to our support team.",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const checkout = async () => {
    const payment = {
      plan,
      payAmount,
      credits,
      userId,
    };

    await checkCredits(payment);
  };

  return (
    <form action={checkout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Upgrade Plan
        </Button>
      </section>
    </form>
  );
};

export default Checkout;