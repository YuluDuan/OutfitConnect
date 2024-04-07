import {analyze} from "@/utils/prompts";
import {getPostById} from "@/actions/posts";
import {match} from "@/utils/matching";
import connectDB from "@/db/dbConnect";
import {ItemSchema} from "@/db/schema";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import Link from 'next/link'

export default async function ItemInImage({item}) {
  const {color, category, features} = item;

  console.log("MYITEM");
  console.log({item});

  if (item) {
    return (
      <div>
        <div>{`${color} ${category} with ${JSON.stringify(features)}`}</div>
      </div>
    )
  }

  return null;
}