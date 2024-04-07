"use server"

import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";

export async function populatePostWithItemID(id) {
	await connectDB();
    try {
        const posts = await PostSchema.findById(id);

        // TODO

        return { success: true, error: null, data: posts };
    } catch (err) {
        return { success: false, error: err.message, data: null };
    }
}