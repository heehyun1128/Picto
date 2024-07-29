import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is missing.", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required.", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required.", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required.", { status: 400 });
    }


   
    const response = await openai.images.generate({
      // model: "dall-e-3",
      prompt,
      n:parseInt(amount,10),
      size:resolution,
    });

    return NextResponse.json(response.data);
  } catch (e) {
    console.log("error:", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
