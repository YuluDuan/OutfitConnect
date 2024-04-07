'use server'

import {auth} from "../../auth";
import connectDB from "@/db/dbConnect";
import {PostSchema} from "@/db/schema";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export async function getPostById(id) {
  await connectDB();
  const post = await PostSchema.findById(new ObjectId(id));
  return post;
}

export async function updatePostById(id, data) {
  const {eventType, clothingItemsInImage} = data;
  await connectDB();
  await PostSchema.findByIdAndUpdate(new ObjectId(id), {eventType, clothingItemsInImage});
  console.log(`updated post: '${id}'`);
}

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

  let post = null;
  try {
    post = await PostSchema.create({posterId, title, imageUrl, content, eventType, clothingItemsInImage, actualItemLinks})
    console.log("created!", post);
    return { success: true, message: "Posted!", data: {postId: post._id.toString()} };
  } catch (err) {
    console.log(err.message);
    return { success: false, message: err.message, data: null };
  }
}