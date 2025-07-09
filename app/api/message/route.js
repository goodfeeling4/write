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

export async function GET(request) {
  try {
    await connectDB();
    
    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    // Get total count for pagination info
    const total = await message.countDocuments();
    
    // Get paginated messages
    const messages = await message.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);
    
    return NextResponse.json({
      thoughts: messages,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + limit < total
      }
    }, {status: 200});
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
