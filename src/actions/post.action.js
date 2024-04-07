"use server"

import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";


export async function postPostAction(postData) {
    await connectDB()
    try {
        const posts = await PostSchema.create(postData)
        return { success: true, error: null, data: null };
    } catch (err) {
        return { success: false, error: error.message, data: null };
    }
}

export async function getPostsAction() {
    await connectDB();
    try {
        const posts = await PostSchema.find({});
        return { success: true, error: null, data: posts };
    } catch (err) {
        return { success: false, error: err.message, data: null };
    }
}

export async function deleteAllPostsAction() {

    
    try {
        const data = await fetchAPI('posts', 'DELETE');
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}

export async function updatePostByIdAction(id, postData) {
    try {
        const data = await fetchAPI(`post/${id}`, 'PUT', postData);
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}

export async function deletePostByIdAction(id) {
    try {
        const data = await fetchAPI(`post/${id}`, 'DELETE');
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error, data: null };
    }
}