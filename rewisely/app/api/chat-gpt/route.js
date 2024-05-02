import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: process.env.NODE_ENV === 'test', 
    })

    //Grabbing the user's input
    const params = await request.json();

    //passing it to Chat GPT API
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "",
            },
            {
                role: "user",
                content: params.prompt // the string that the usesr passes in
            }
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    //send the response to the front end
    return NextResponse.json(response)
}