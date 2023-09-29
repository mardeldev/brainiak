import { OpenAI } from "openai";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";
import { isEmptyObj } from "openai/core.mjs";

const openai = new OpenAI({
  organization: "org-TUVfRcELtetF0e6FbPLcly4l",
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
      return new NextResponse("OpenAI API Key Not Configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt Is Required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount Is Required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Amount Is Required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }
    const response = await openai.images.generate({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
        await increaseApiLimit();
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}