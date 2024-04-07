import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";
import { NextResponse } from "next/server";





export async function PUT(req, {params}) {
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
    await connectDB();
    await PostSchema.findByIdAndUpdate(id, {posterId, title, imageUrl, content, eventType, clothingItemsInImage_Array, actualItemLinks});
    return NextResponse.json({ message: "Post updated." }, {status : 200});
}

export async function DELETE(req, {params}) {
    const { id } = params;
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