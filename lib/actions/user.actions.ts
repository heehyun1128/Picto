"use server";

import User from "../database/models/user.model";
import { connectToDB } from "../database/mongoose";
import { revalidatePath } from "next/cache";

type CreateUserParam = {
  clerkId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
};

type UpdateUserParams = {
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

// CREATE A USER
export async function createUser(user: CreateUserParam) {
  try {
    await connectToDB();
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error:${err.message}`);
    } else {
      throw new Error(`${JSON.stringify(err)}`);
    }
  }
}
// GET A USER
export async function getUserById(id: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: id });
    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error:${err.message}`);
    } else {
      throw new Error(`${JSON.stringify(err)}`);
    }
  }
}

// UPDATE A USER
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDB();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("The User Doesn't Exist");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error:${err.message}`);
    } else {
      throw new Error(`${JSON.stringify(err)}`);
    }
  }
}

// DELETE A USER
export async function delUser(clerkId: string) {
  try {
    await connectToDB();
    const deletedUser = await User.findOne({ clerkId });
    if (!deletedUser) throw new Error("The User Doesn't Exist");

    const delUser = await User.findByIdAndDelete(deletedUser._id);

    revalidatePath("/");

    return JSON.parse(JSON.stringify(delUser));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error:${err.message}`);
    } else {
      throw new Error(`${JSON.stringify(err)}`);
    }
  }
}

// MANAGE USER CREDIT BALENCE
export async function updateUserCredits(
  userId: string,
  availableCredit: number
) {
  try {
    await connectToDB();
    const updateCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { availableCredit } },
      { new: true }
    );
    if (!updateCredits) throw new Error("Failed to update user credits.");


    return JSON.parse(JSON.stringify(updateCredits));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error:${err.message}`);
    } else {
      throw new Error(`${JSON.stringify(err)}`);
    }
  }
}
