'use server'

import {auth} from "../../auth";
import connectDB from "@/db/dbConnect";
import {PostSchema} from "@/db/schema";
import {revalidatePath} from "next/cache";

export async function createPost(prevState, formData) {
  const session = await auth();
  const user = session.user;

  const title = formData.get('title');
  const content = formData.get('content');
  const imageUrl = formData.get('imageUrl');
  const posterId = user.id;

  console.log({title, content, imageUrl})

  const clothingItemsInImage = null;
  const eventType = null;
  const actualItemLinks =  null;
  await connectDB();
  try {
    const posts = await PostSchema.create({posterId, title, imageUrl, content, eventType, clothingItemsInImage, actualItemLinks})
    revalidatePath("/");
    return { success: true, message: "Posted!", data: null };
  } catch (err) {
    console.log(err.message);
    return { success: false, message: err.message, data: null };
  }

}