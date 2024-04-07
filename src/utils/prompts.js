import {StructuredOutputParser} from 'langchain/output_parsers'
import {PromptTemplate} from '@langchain/core/prompts'
import z from 'zod'
import OpenAI from "openai";
import {getPostById, updatePostById} from "@/actions/posts";

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const visionParser = StructuredOutputParser.fromZodSchema(
  z.object({
    eventType: z
      .string()
      .describe('The type of event happening in the image, such as hiking, skiing, etc.'),
    clothingItemsCount: z
      .number()
      .int()
      .nonnegative()
      .describe('The total number of distinct clothing items visible in the image.'),
    clothingDescriptions: z
      .array(
        z.object({
          color: z.string().optional().describe('The primary color of the clothing item.'),
          category: z.string().describe('The category of the clothing item, such as jacket, hat, etc.'),
          features: z.array(z.string()).optional().describe('Any distinctive features of the clothing item, such as patterns, logos, etc.'),
        })
      )
      .describe('An array of objects, each providing a description of a clothing item in terms of color, category, and features.'),
  })
)

async function getVisionPrompt() {
  const format_instructions = visionParser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the image. Follow the instructions and format your response to match the format instructions, no matter what!!! \n{format_instructions}',
    partialVariables: { format_instructions },
    inputVariables: ['input'],
  })

  return await prompt.format({input : ""})
}

export async function analyze(id, image_url) {
  const prompt = await getVisionPrompt()
  console.log(image_url);

  const post = await getPostById(id);
  if (post.eventType) return {
    eventType: post.eventType,
    clothingItemsInImage: post.clothingItemsInImage
  }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              "url": image_url,
            },
          },
        ],
      },
    ],
    model: "gpt-4-vision-preview",
    stream: false,
    max_tokens: 4096,
  });

  const result = completion.choices[0].message.content;

  try {
    const res = await visionParser.parse(result);
    console.log({res});
    const {eventType, clothingDescriptions:clothingItemsInImage} = res;
    console.log(id);
    await updatePostById(id, {eventType, clothingItemsInImage})
    return {eventType, clothingItemsInImage};
  } catch (error) {
    console.log(error)
  }
}