export const metadata = {
  title: "Cancellation & Refunds – Mentipad",
  description:
    "Learn about Mentipad’s cancellation, refund, and rescheduling policies for mentorship sessions booked through the platform.",
};

export default function CancellationRefundsPage() {
  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[80px] sm:py-[100px] lg:py-[120px]">

      <div
        className="max-w-[900px] mx-auto bg-white rounded-[16px] sm:rounded-[20px]
        border border-[#E2E8F0] p-[24px] sm:p-[40px] lg:p-[60px] shadow-sm"
      >
        <h1
          className="text-[24px] sm:text-[28px] lg:text-[32px]
          leading-[32px] sm:leading-[36px] lg:leading-[40px]
          font-semibold text-[#0F172A] text-center"
        >
          Cancellation & Refunds
        </h1>

        <div
          className="mt-[32px] sm:mt-[40px] lg:mt-[50px]
          space-y-[26px] sm:space-y-[32px] lg:space-y-[36px]
          text-[#475569] text-[14px] sm:text-[15px]
          leading-[24px] sm:leading-[26px]"
        >

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px]
              font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Mentor Confirmation Timeline
            </h2>
            <p>
              Once a mentorship session is booked and payment is successfully completed,
              mentors are expected to respond within a period of twenty-four (24) hours.
              The mentor may confirm one of the requested time slots or suggest a suitable
              alternative within a reasonable timeframe to ensure a smooth scheduling process.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px]
              font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Unconfirmed Sessions
            </h2>
            <p>
              If a mentorship session cannot be confirmed after reasonable attempts through
              the Mentipad platform, the booking shall be considered incomplete. In such cases,
              the mentee will be eligible for a full refund of the amount paid. Mentipad reserves
              the right to apply a standard adjustment or internal penalty to mentor accounts
              for repeated unfulfilled confirmations, in accordance with platform policies.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px]
              font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Rescheduling Sessions
            </h2>
            <p>
              All session rescheduling must be performed exclusively within the Mentipad
              platform to remain valid. Sessions that are rescheduled or conducted outside
              the platform are not eligible for payment protection, refunds, or dispute
              resolution support. Using the in-platform rescheduling flow ensures accurate
              records and fair handling for both mentors and mentees.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px]
              font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Platform Discretion
            </h2>
            <p>
              Mentipad reserves the right to assess exceptional circumstances on a case-by-case
              basis and take appropriate action to ensure fairness, transparency, and platform
              integrity. Decisions made by Mentipad in such cases shall be final and binding.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}
