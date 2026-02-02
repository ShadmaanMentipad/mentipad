import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Mentor from "@/models/Mentor";
import { Types } from "mongoose";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid mentor id" },
        { status: 400 }
      );
    }

    await connectDB();

    const mentor = await Mentor.findById(id);

    if (!mentor || !mentor.isActive) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("GET mentor error:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentor" },
      { status: 500 }
    );
  }
}



export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid mentor id" },
        { status: 400 }
      );
    }

    await connectDB();

    const mentor = await Mentor.findById(id);
    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    
    if (mentor.image?.public_id) {
      await cloudinary.uploader.destroy(mentor.image.public_id);
    }

    
    await Mentor.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete mentor" },
      { status: 500 }
    );
  }
}



export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid mentor id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    await connectDB();

    const mentor = await Mentor.findById(id);
    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

   
    if (
      body.image?.public_id &&
      mentor.image?.public_id &&
      body.image.public_id !== mentor.image.public_id
    ) {
    
      await cloudinary.uploader.destroy(mentor.image.public_id);
    }


    Object.assign(mentor, body);
    await mentor.save();

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("UPDATE mentor error:", error);
    return NextResponse.json(
      { error: "Failed to update mentor" },
      { status: 500 }
    );
  }
}
