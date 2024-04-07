import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";
import { NextResponse } from "next/server";


export async function GET(req) {
    await connectDB();
    try {
        const users = await UserSchema.find({});
        return NextResponse.json(users, {status : 200});
    } catch (err) {
        return NextResponse.json({ message: "Error GET User:", error: err.message }, { status: 500 });
    }
}