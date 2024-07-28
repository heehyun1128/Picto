"use client";
import { SignedIn, auth, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Credits = () => {
  const [user, setUser] = useState(null);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      if (!userId) {
        redirect("/sign-in");
      } else {
        const user = await getUserById(userId);
        setUser(user);
      }
    };
    getUserInfo();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <>
      <section>
        <ul className="credits-list">
          {plans.map((plan) => (
            <li key={plan.name} className="credits-item">
              <div className="flex-center flex-col gap-3">
               
                <p className="p-10 mt-2 text-4xl font-semibold">{plan.name}</p>
                <div style={{display:"flex"}}>
                <p className="text-4xl text-dark-600">US ${plan.price}</p>
                <p>Per Month</p>
                </div>
                <h4>{plan.credits} Credits</h4>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button onClick={() => router.push("/")} variant="outline" className="credits-btn">
                  Get Started For Free
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    payAmount={plan.price}
                    credits={plan.credits}
                    userId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;
