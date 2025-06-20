import connectDB from "@/lib/mongodb";
import message from "@/models/message";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {title, description} = await request.json();
    await connectDB();
    await message.create({title, description});
    return NextResponse.json({message: "message created"}, {status: 201});
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      {error: "Failed to create message"}, 
      {status: 500}
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const messages = await message.find();
    return NextResponse.json(messages, {status: 200});
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({error: "Failed to fetch messages"}, {status: 500});
  }
}

// export async function DELETE(request) {
//   try {
//     await connectDB();
//     const {id} = await request.json();
//     await message.findByIdAndDelete(id);
//     return NextResponse.json({message: "message deleted"}, {status: 200});
//   } catch (error) {
//     console.error("Error deleting message:", error);
//     return NextResponse.json({error: "Failed to delete message"}, {status: 500});
//   }
// }


export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await message.findByIdAndDelete(id);
  return NextResponse.json({ message: "thought is deleted"}, {status: 200});
  }