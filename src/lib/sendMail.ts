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
  const formatSlot = (slot: string) => {
  const parts = slot.split("-");
  if (parts.length < 5) return slot;

  const [year, month, day, timeStr, durationStr] = parts;
  const [hour, minute] = timeStr.split(":").map(Number);
  const duration = parseInt(durationStr, 10);

 
  const start = new Date(+year, +month - 1, +day, hour, minute);
  const end = new Date(start.getTime() + duration * 60000);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return `${formatTime(start)} – ${formatTime(end)}`;
};


const slotDetails = selectedSlots
  .map((slot, i) => `${i + 1}) ${formatSlot(slot)}`)
  .join("<br/>");

const formattedDate = new Date(date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const content = `
  <h2>New Mentorship Session Booking</h2>
  <p><strong>Student Name:</strong> ${studentName}</p>
  <p><strong>Student Email:</strong> ${studentEmail}</p>
  <p><strong>Mentor:</strong> ${mentorName}</p>
  <p><strong>Session Date:</strong> ${formattedDate}</p>
  <p><strong>Session Duration:</strong> ${duration} minutes</p>
  <p><strong>Preferred Time Slots:</strong><br/>${slotDetails}</p>
  <p><strong>Total Amount Paid:</strong> ₹${paidAmount}</p>
  <p style="margin-top: 12px; color: #555;">This is an automated notification. Please log in to the admin dashboard for more details.</p>
`;


  return resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: "New Booking on Mentipad",
    html: content,
  });
}
