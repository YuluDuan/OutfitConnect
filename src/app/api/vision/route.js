import OpenAI from "openai";
import {NextResponse} from "next/server";
import {analyze} from "@/utils/prompts";

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { image_url } = await req.json();


  const analysis = await analyze(image_url);
  const {
    eventType,
    clothingItemsCount,
    clothingDescriptions,
  } = analysis;

  console.log({analysis});

  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: "user",
  //       content: [
  //         { type: "text", text: "What’s in this image?" },
  //         {
  //           type: "image_url",
  //           image_url: {
  //             "url": image_url,
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   model: "gpt-4-vision-preview",
  //   stream: false,
  //   max_tokens: 4096,
  // });
  //
  // console.log(completion.choices[0]);

  return NextResponse.json(null);
}