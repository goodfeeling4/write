import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import message from "@/models/message";


export async function POST(request) {
  const { title, description } = await request.json();
  await connectDB();
  await message.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const message = await message.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await message.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
