import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Profile = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  return (
    <>
    <div>
        <h1>Hi {user.username}</h1>
    </div>
      <div className="profile">Your have {user.availableCredit} Picto credits</div>
      <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Upgrade Plan
        </Button>
    </>
  );
};

export default Profile;
