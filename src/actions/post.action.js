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

export async function getThreePosts() {
    await connectDB();
    try {
        const posts = await PostSchema.find({}).limit(3);
        return { success: true, error: null, data: posts };
    } catch (err) {
        return { success: false, error: err.message, data: null };
    }
}

export async function findThreeTopActivities() {
    await connectDB();
    try {
        const topThreeEventTypes = await PostSchema.aggregate([
            {
                $match: {
                    eventType: { $ne: null }
                }
            },
            
            {
                $group: {
                    _id: "$eventType",
                    count: { $sum: 1 },
                    imageUrl: { $first: "$imageUrl" }
                }
            },
            
            {
                $sort: { count: -1 }
            },
            {
                $limit: 3
            },
            {
                $project: {
                    _id: 0,
                    eventType: "$_id",
                    imageUrl: 1
                }
            }
        ]);
        return { success: true, error: null, data: topThreeEventTypes };
    } catch (err) {
        return { success: false, error: err.message, data: null };
    }
}


export async function deleteAllPostsAction() {
    await connectDB();
    try {
        await PostSchema.deleteMany({});
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}

export async function updatePostByIdAction(id, postData) {
    await connectDB();
    try {
        const updatedPost = await PostSchema.updateOne({ _id: id }, { $set: postData });
        if (updatedPost.nModified === 0) {
            return { success: false, error: 'Post not found', data: null };
        }
        return { success: true, error: null, data: updatedPost };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}

export async function deletePostByIdAction(id) {
    await connectDB();
    try {
        const deletedPost = await PostSchema.deleteOne({ _id: id });
        if (deletedPost.deletedCount === 0) {
            return { success: false, error: 'Post not found', data: null };
        }
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}
