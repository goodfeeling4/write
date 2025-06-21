import connectDB from "@/lib/mongodb";
import message from "@/models/message";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    await connectDB();
    const thought = await message.findOne({ _id: id });
    return NextResponse.json(thought, { status: 200 });
}

export async function PUT(request, { params }) {
    const { id } = params;
    const { title, description } = await request.json();
    await connectDB();
    await message.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Thought updated" }, { status: 200 });
}
