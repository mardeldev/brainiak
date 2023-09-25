
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})


export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt Are Required", { status: 400 })
        }

        const response = await replicate.run(
            "cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
            {
                input: {
                    prompt: prompt
                }
            }
        );

        return NextResponse.json(response)

    } catch (error) {
        console.log("[MUSIC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}