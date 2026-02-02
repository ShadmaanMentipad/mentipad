import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail({
  studentName,
  studentEmail,
  mentorName,
  date,
  duration,
  selectedSlots,
  paidAmount,
}: {
  studentName: string;
  studentEmail: string;
  mentorName: string;
  date: string;
  duration: number;
  selectedSlots: string[];
  paidAmount: number;
}) {
  const content = `
    <h2>New Booking Received</h2>
    <p><strong>Student:</strong> ${studentName} (${studentEmail})</p>
    <p><strong>Mentor:</strong> ${mentorName}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Duration:</strong> ${duration} mins</p>
    <p><strong>Slots:</strong> ${selectedSlots.join(", ")}</p>
    <p><strong>Amount Paid:</strong> ₹${paidAmount}</p>
  `;

  return resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: "New Booking on Mentipad",
    html: content,
  });
}
