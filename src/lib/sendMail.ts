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
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #096CC0;">📌 New Booking Alert</h2>

    <p><strong>👤 Student Name:</strong> ${studentName}</p>
    <p><strong>✉️ Student Email:</strong> ${studentEmail}</p>

    <hr style="margin: 20px 0;" />

    <p><strong>🎓 Mentor:</strong> ${mentorName}</p>
    <p><strong>📅 Session Date:</strong> ${date}</p>
    <p><strong>⏱️ Duration:</strong> ${duration} minutes</p>
    <p><strong>🕒 Preferred Time Slots:</strong><br/> ${selectedSlots.map(slot => `• ${slot}`).join("<br/>")}</p>

    <hr style="margin: 20px 0;" />

    <p><strong>💰 Amount Paid:</strong> ₹${paidAmount}</p>

    <p style="margin-top: 30px;">You can view this booking in the admin dashboard.</p>
  </div>
`;


  return resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: "New Booking on Mentipad",
    html: content,
  });
}
