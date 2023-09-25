import { OpenAI } from "openai";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";


const openai = new OpenAI({
    organization: "org-TUVfRcELtetF0e6FbPLcly4l",
    apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: OpenAI.Chat.ChatCompletionMessageParam = {
    role: "user",
    content: "You are a code generator. Unless you are asking for clarifying questions or answering questions not requiring code as a response, you must use code snippets for your explanations and you must answer only using code snippets."
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key Not Configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Messages Are Required", { status: 400 })
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [instructionMessage, ...messages]
        });

        return NextResponse.json(response.choices[0].message)

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}