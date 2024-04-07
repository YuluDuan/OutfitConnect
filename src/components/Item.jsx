import {analyze} from "@/utils/prompts";
import {getPostById} from "@/actions/posts";
import {match} from "@/utils/matching";
import connectDB from "@/db/dbConnect";
import {ItemSchema} from "@/db/schema";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import Link from 'next/link'
import { IoPricetag } from "react-icons/io5";

export default async function Item({itemId}) {
  function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  if (!isValidObjectId(itemId)) return null;

  await connectDB();
  const item = await ItemSchema.findById(new ObjectId(itemId));

  if (item) {
    const {url, name} = item;
    return (<Link href={url} className="flex flex-row justify-center items-center gap-[10px]"> <IoPricetag /> <div>{name} </div></Link>)
  }

  return null;
}