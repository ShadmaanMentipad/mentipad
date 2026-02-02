export const metadata = {
  title: "Terms & Conditions – Mentipad",
  description:
    "Read the terms and conditions of using Mentipad, our mentorship platform connecting students with experienced educators and professionals.",
};


export default function TermsPage() {
  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[80px] sm:py-[100px] lg:py-[120px]">

      <div className="max-w-[900px] mx-auto bg-white rounded-[16px] sm:rounded-[20px] border border-[#E2E8F0] 
        p-[24px] sm:p-[40px] lg:p-[60px] shadow-sm">

        <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[40px] 
          font-semibold text-[#0F172A] text-center">
          Terms & Conditions
        </h1>

        <div className="mt-[32px] sm:mt-[40px] lg:mt-[50px] 
          space-y-[26px] sm:space-y-[32px] lg:space-y-[36px] 
          text-[#475569] text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px]">

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              User Registration and Roles
            </h2>
            <p>
              Access to Mentipad is provided through secure Google authentication.
              At the time of registration, users must select their role as Mentor or Mentee.
              Roles are fixed for the current version of the platform and cannot be altered subsequently.
              Mentors are expected to maintain at least one active mentorship offering or academic resource to ensure availability and continuity of guidance.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Mentorship Structure and Session Flow
            </h2>
            <p>
              All mentorship interactions are to be scheduled and conducted exclusively through Mentipad.
              Mentees are required to select preferred time slots and complete payment in advance.
              Mentors shall confirm one of the proposed slots or recommend an alternative within 24 hours.
              Sessions may proceed only after formal confirmation on the platform.
              Mentipad does not assume responsibility for sessions arranged or conducted outside the platform framework.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Payments and Platform Fees
            </h2>
            <p>
              Mentipad levies a standard platform fee for each mentorship engagement.
              Mentor remuneration is calculated after applicable deductions and disbursed according to the platform’s defined payout cycle.
              All financial transactions are processed through secure and compliant third-party payment gateways.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Academic Resources and Digital Material
            </h2>
            <p>
              Notes, guides, and other digital materials available on Mentipad are intended strictly for individual, personal use.
              Digital content may be protected through watermarking or similar measures.
              Unauthorized distribution, reproduction, or commercial use of platform materials is prohibited and may invite disciplinary action.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Professional Conduct
            </h2>
            <p>
              Mentors and mentees are expected to uphold professional, respectful, and ethical standards during all interactions.
              Any form of harassment, misrepresentation, exploitation, or academic misconduct will not be tolerated.
              Mentipad reserves the right to restrict or terminate access to the platform for violations of these principles.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Platform Governance
            </h2>
            <p>
              Mentipad retains the right to update platform features, policies, or service structures as required.
              Continued use of the platform constitutes acceptance of revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Disclaimer and Limitation of Liability
            </h2>
            <p>
              Mentorship provided through Mentipad is intended for guidance and educational support.
              Outcomes vary based on individual effort, preparation, and circumstances.
              Mentipad does not guarantee academic rankings, examination results, or career outcomes.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}
