import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";
import { NextResponse } from "next/server";


export async function GET(req) {
    await connectDB();
    try {
        const posts = await PostSchema.find({});
        return NextResponse.json(posts, {status : 200});
    } catch (err) {
        return NextResponse.json({ message: "Error GET:", error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    const { id } = params;
    const {posterId, title, imageUrl, content, eventType, clothingItemsInImage, actualItemLinks} = await req.json()
    let clothingItemsInImage_Array = null;
    let actualItemLinks_Array = null;
    if (Array.isArray(clothingItemsInImage)) {
        clothingItemsInImage_Array = clothingItemsInImage.map(item => ({
            color: item.color,
            category: item.category,
            features: item.features
        }));
    }
    if (Array.isArray(actualItemLinks)) {
        actualItemLinks_Array = actualItemLinks.map(link => link);
    }
    await connectDB()
    try {
        const posts = await PostSchema.create({posterId, title, imageUrl, content, eventType, clothingItemsInImage_Array, actualItemLinks_Array})
        return NextResponse.json({message : "post created."}, {status : 200})
    } catch (err) {
        return NextResponse.json({ message: "Error POST:", error: err.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    await connectDB();

    try {
        const deleteResult = await PostSchema.deleteMany({});
        if (deleteResult.deletedCount === 0) {
            return NextResponse.json({ message: "No posts found to delete." }, { status: 404 });
        }
        return NextResponse.json({ message: "All posts deleted." }, {status : 200});
    } catch (err) {
        return NextResponse.json({ message: "Error DELETE:", error: err.message }, { status: 500 });
    }
}