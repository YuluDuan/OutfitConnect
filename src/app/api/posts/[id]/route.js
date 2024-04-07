import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    const { id } = params;
    const {posterId, title, imageUrl, content, eventType, clothingItemsInImage_temp, actualItemLinks} = await req.json()
    const clothingItemsInImage = clothingItemsInImage_temp ? { color, category, features } : null;
    await connectDB();
    await PostSchema.findByIdAndUpdate(id, {posterId, title, imageUrl, content, eventType, clothingItemsInImage, actualItemLinks});
    return NextResponse.json({ message: "Post updated." }, {status : 200});
}

export async function DELETE(req, {params}) {
    const { id } = params;
    // console.log(id)
    await connectDB();

    try {
        const deletedPost = await PostSchema.findByIdAndDelete(id);
        if (!deletedPost) {
            return NextResponse.json({ message: "post not found." }, { status: 404 });
        }
        return NextResponse.json({ message: "post deleted."  }, {status : 200});
    } catch (err) {
        return NextResponse.json({ message: "Error DELETE:", error: err.message }, { status: 500 });
    }
}