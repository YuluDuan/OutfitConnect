import connectDB from "@/db/dbConnect";
import { UserSchema, ItemSchema, PostSchema } from "@/db/schema";
import { NextResponse } from "next/server";





export async function PUT(req, {params}) {
    const { id } = params;
    const {email, name} = await req.json()
    await connectDB();
    await UserSchema.findByIdAndUpdate(id, {email, name});
    return NextResponse.json({ message: "User updated." }, {status : 200});
}

export async function DELETE(req, {params}) {
    const { id } = params;
    // console.log(id)
    await connectDB();

    try {
        const deletedPost = await UserSchema.findByIdAndDelete(id);
        if (!deletedPost) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted."  }, {status : 200});
    } catch (err) {
        return NextResponse.json({ message: "Error DELETE User:", error: err.message }, { status: 500 });
    }
}