import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";
import { NextResponse } from "next/server";


export async function GET(req) {
    await connectDB();
    try {
        const posts = await ItemSchema.find({});
        return NextResponse.json(posts, {status : 200});
    } catch (err) {
        return NextResponse.json({ message: "Error GET:", error: err.message }, { status: 500 });
    }
}