import {analyze} from "@/utils/prompts";
import {getPostById} from "@/actions/posts";
import {match} from "@/utils/matching";
import connectDB from "@/db/dbConnect";
import {ItemSchema} from "@/db/schema";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import Link from 'next/link'

export default async function Item({itemId}) {
  await connectDB();
  const item = await ItemSchema.findById(new ObjectId(itemId));
  const {url, name} = item;

  console.log(item);

  if (item) {
    return (<Link href={url}>{name}</Link>)
  }

  return null;
}