"use client";

export default function BookingSuccessModal({
  mentorName,
  date,
  onClose,
}: {
  mentorName: string;
  date: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[520px] bg-white rounded-[20px] p-[24px] sm:p-[32px] shadow-lg">

        <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#0F172A]">
          Booking request submitted
        </h2>

        <p className="mt-[12px] sm:mt-[14px] text-[14px] text-[#475569] leading-[22px]">
          Your mentorship session request with{" "}
          <span className="font-medium text-[#0F172A]">
            {mentorName}
          </span>{" "}
          has been successfully submitted.
        </p>

        <p className="mt-[10px] text-[14px] text-[#475569] leading-[22px]">
          You have selected your preferred time slots for{" "}
          <span className="font-medium text-[#0F172A]">
            {new Date(date).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>.
        </p>

        <p className="mt-[10px] text-[14px] text-[#475569] leading-[22px]">
          Our team will review your preferences and coordinate with the mentor to
          confirm the most suitable session time.
        </p>

        <p className="mt-[10px] text-[14px] text-[#475569] leading-[22px]">
          A confirmation email will be sent to you once the session details are finalized.
        </p>

        <button
          onClick={onClose}
          className="mt-[22px] sm:mt-[26px] w-full h-[44px] rounded-[12px]
          bg-[#096CC0] text-white font-semibold hover:bg-[#1990CD] transition-colors"
        >
          Back to mentors
        </button>
      </div>
    </div>
  );
}
