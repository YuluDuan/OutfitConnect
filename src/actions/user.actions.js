"use server"

import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";

export async function getItemsAction() {
	await connectDB();
    try {
        const posts = await ItemSchema.find({});
        return { success: true, error: null, data: posts };
    } catch (err) {
        return { success: false, error: err.message, data: null };
    }
}

export async function postItemsAction(postData) {
    await connectDB()
    try {
        const posts = await ItemSchema.create(postData)
        return { success: true, error: null, data: null };
    } catch (err) {
        return { success: false, error: err.message, data: null };
    }
}

export async function deleteItemsAction(postData) {
    await connectDB()
    try {
        const posts = await ItemSchema.deleteMany({})
        return { success: true, error: null, data: null };
    } catch (err) {
        return { success: false, error: err.message, data: null };
    }
}