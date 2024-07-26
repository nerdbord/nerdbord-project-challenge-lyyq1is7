import { NextResponse } from "next/server";
import OpenAI from "openai";

// Authenticate
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { image_url } = await request.json();
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `
            You are a personal financial assistant. Your task is to analyze  the receipt photo from provided link and read the data needed for analysis - what amount was spent, what category of expenses, what it was spent on, in which store, date and time. The description that will be the result of your task should be short and specific.
            Answer ONLY by filling out the JSON structure correctly:
            {
              "expense": {
                "store": "string",
                "expense": "string",
                "amount": "string",
                "expense_category": "string",
                "date": "Date"
              }
            }
          `,
        },
        {
          role: "user",
          content: image_url,
        },
      ],
    });
    return new NextResponse(
      JSON.stringify(response.choices[0].message.content)
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
