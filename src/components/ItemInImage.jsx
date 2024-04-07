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
  let featureString = ''

  features.forEach(str => {
    featureString += str + ' ';
});


  if (item) {
    return (
      <div className="w-[250px] h-[40px] bg-red-100 rounded-lg mb-[20px] text-center py-2">
        <div className="text-center">{`${color} ${category} with ${featureString}`}</div>
      </div>
    )
  }

  return null;
}