import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Mentor from "@/models/Mentor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET() {
  try {
    await connectDB();

    const mentors = await Mentor.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(mentors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch mentors" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  const requiredFields = [
    "name",
    "title",
    "category",
    "languages",
    "about",
    "story",
    "mentoringStyle",
    "pricing",
    "image",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }

  const mentor = await Mentor.create(body);
  return NextResponse.json(mentor);
}
