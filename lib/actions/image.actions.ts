"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/mongoose";

import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";

import { v2 as cloudinary } from 'cloudinary'

type AddImgProps = {
    image: {
      title: string;
      publicId: string;
      processType: string;
      width: number;
      height: number;
      config: any;
      url: string;
      processTypeUrl: string;
      aspectRatio: string | undefined;
      prompt: string | undefined;
      color: string | undefined;
    };
    userId: string;
    path: string;
  };

  type UpdateImgProps = {
    image: {
      _id: string;
      title: string;
      publicId: string;
      processType: string;
      width: number;
      height: number;
      config: any;
      url: string;
      processTypeUrl: string;
      aspectRatio: string | undefined;
      prompt: string | undefined;
      color: string | undefined;
    };
    userId: string;
    path: string;
  };

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName clerkId'
})

// ADD IMAGE
export async function addImage({ image, userId, path }: AddImgProps) {
  try {
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const newImage = await Image.create({
      ...image,
      user: user._id,
    })

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (err) {
    if (err instanceof Error) {
        throw new Error(`Error:${err.message}`);
      } else {
        throw new Error(`${JSON.stringify(err)}`);
      }
  }
}

// UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImgProps) {
  try {
    await connectToDB();

    const imgToUpdate = await Image.findById(image._id);

    if (!imgToUpdate || imgToUpdate.user.toHexString() !== userId) {
      throw new Error("Image not found");
    }

    const updatedImg = await Image.findByIdAndUpdate(
      imgToUpdate._id,
      image,
      { new: true }
    )

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImg));
  } catch (err) {
    if (err instanceof Error) {
        throw new Error(`Error:${err.message}`);
      } else {
        throw new Error(`${JSON.stringify(err)}`);
      }
  }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    await connectToDB();

    await Image.findByIdAndDelete(imageId);
  } catch (err) {
    if (err instanceof Error) {
        throw new Error(`Error:${err.message}`);
      } else {
        throw new Error(`${JSON.stringify(err)}`);
      }
  } finally{
    redirect('/')
  }
}

// GET IMAGE
export async function getImageById(imageId: string) {
  try {
    await connectToDB();

    const image = await populateUser(Image.findById(imageId));

    if(!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (err) {
    if (err instanceof Error) {
        throw new Error(`Error:${err.message}`);
      } else {
        throw new Error(`${JSON.stringify(err)}`);
      }
  }
}

// GET IMAGES
export async function getAllImages({ limit = 10, page = 1, searchQuery = '' }: {
  limit?: number;
  page: number;
  searchQuery?: string;
}) {
  try {
    await connectToDB();

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })

    let expression = 'folder=picto';

    if (searchQuery) {
      expression += ` AND ${searchQuery}`
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceIds = resources.map((resource: any) => resource.public_id);

    let query = {};

    if(searchQuery) {
      query = {
        publicId: {
          $in: resourceIds
        }
      }
    }

    const skipAmount = (Number(page) -1) * limit;

    const images = await populateUser(Image.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);
    
    const totalImages = await Image.find(query).countDocuments();
    const savedImages = await Image.find().countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImages / limit),
      savedImages,
    }
  } catch (err) {
    if (err instanceof Error) {
        throw new Error(`Error:${err.message}`);
      } else {
        throw new Error(`${JSON.stringify(err)}`);
      }
  }
}

// GET IMAGES BY USER
export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    await connectToDB();

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find({ user: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find({ user: userId }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (err) {
    if (err instanceof Error) {
        throw new Error(`Error:${err.message}`);
      } else {
        throw new Error(`${JSON.stringify(err)}`);
      }
  }
}