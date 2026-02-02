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
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2>New Mentorship Session Booking</h2>

    <p><strong>Student Name:</strong> ${studentName}</p>
    <p><strong>Student Email:</strong> ${studentEmail}</p>

    <hr style="margin: 20px 0;" />

    <p><strong>Mentor:</strong> ${mentorName}</p>
    <p><strong>Session Date:</strong> ${new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}</p>
    <p><strong>Session Duration:</strong> ${duration} minutes</p>

    <p><strong>Preferred Time Slots:</strong><br/>
      ${selectedSlots
        .map((slot) => {
          const [slotDate, startTime] = slot.split("-");
          const time = new Date(`${slotDate}T${startTime}:00`);
          return `${time.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`;
        })
        .join("<br/>")}
    </p>

    <hr style="margin: 20px 0;" />

    <p><strong>Total Amount Paid:</strong> ₹${paidAmount}</p>

    <p style="margin-top: 30px;">
      This is an automated notification. Please log in to the admin dashboard for more details.
    </p>
  </div>
`;


  return resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: "New Booking on Mentipad",
    html: content,
  });
}
