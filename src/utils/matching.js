import {StructuredOutputParser} from 'langchain/output_parsers'
import {PromptTemplate} from '@langchain/core/prompts'
import z from 'zod'
import OpenAI from "openai";
import connectDB from "@/db/dbConnect";
import {ItemSchema, PostSchema} from "@/db/schema";

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const itemMatchingParser = StructuredOutputParser.fromZodSchema(
  z.object({
    itemMatches: z
      .array(
        z.string().describe('The unique identifier of the item that matches the inImageItem description.'),
      )
      .describe('An array of strings, each string is the id of items matching the inImageItems descriptions.The length must be the same as inImageItems.'),
  })
);

async function getItemMatchPrompt(items, inImageItems) {
  const formatInstructions = itemMatchingParser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Match each inImageItem with an item from the items array based on the closest description match. Follow the instructions and format your response to match the format instructions, no matter what!!! \n{formatInstructions} \ninImageItems:{inImageItems} \n items:{items}',
    partialVariables: { formatInstructions },
    inputVariables: ['items', 'inImageItems'],
  });

  return await prompt.format({items:JSON.stringify(items), inImageItems:inImageItems});
}

export async function match(inImageItems) {
  await connectDB();
  const rawItems = await ItemSchema.find({}, { _id: 1, description: 1 });
  const items = rawItems.map((i) => ({id: i._id.toString(), description: i.description}))

  const prompt = await getItemMatchPrompt(items, inImageItems);

  console.log(prompt);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
        ],
      },
    ],
    model: "gpt-4",
    stream: false,
    max_tokens: 4096,
  });

  const result = completion.choices[0].message.content;

  try {
    const res = await itemMatchingParser.parse(result);
    console.log({res});
    return res.itemMatches;
  } catch (error) {
    console.log(error)
  }
}