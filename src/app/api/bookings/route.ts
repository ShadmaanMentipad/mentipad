import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendBookingEmail } from "@/lib/sendMail";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const bookings = await Booking.find().sort({ createdAt: -1 });

  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const {
    studentName,
    studentEmail,
    mentorId,
    mentorName,
    date,
    duration,
    selectedSlots,
    paidAmount,
  } = body;

  if (
    !studentEmail ||
    !mentorId ||
    !date ||
    !duration ||
    !selectedSlots?.length ||
    typeof paidAmount !== "number"
  ) {
    return NextResponse.json(
      { error: "Invalid booking data" },
      { status: 400 }
    );
  }

  const booking = await Booking.create({
    studentName,
    studentEmail,
    mentorId,
    mentorName,
    date,
    duration,
    selectedSlots,
    paidAmount,
  });

  
  try {
    await sendBookingEmail({
      studentName,
      studentEmail,
      mentorName,
      date,
      duration,
      selectedSlots,
      paidAmount,
    });
  } catch (err) {
    console.error("Email sending failed", err);
  }

  return NextResponse.json(booking);
}
