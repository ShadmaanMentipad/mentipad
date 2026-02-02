export const metadata = {
  title: "Privacy Policy – Mentipad",
  description:
    "Understand how Mentipad collects, uses, and protects your personal data when you use our mentorship services.",
};


export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[80px] sm:py-[100px] lg:py-[120px]">

      <div className="max-w-[900px] mx-auto bg-white rounded-[16px] sm:rounded-[20px] border border-[#E2E8F0] 
        p-[24px] sm:p-[40px] lg:p-[60px] shadow-sm">

        <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] 
          leading-[32px] sm:leading-[36px] lg:leading-[40px] 
          font-semibold text-[#0F172A] text-center">
          Privacy Policy
        </h1>

        <div className="mt-[32px] sm:mt-[40px] lg:mt-[50px] 
          space-y-[26px] sm:space-y-[32px] lg:space-y-[36px] 
          text-[#475569] text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px]">

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Information We Collect
            </h2>
            <p>
              Mentipad currently uses Google sign-in for account access. During registration and onboarding, we may collect:
              Your name and email address.
              Your selected role (Mentor or Mentee).
              Preferences shared during onboarding, such as exam focus, language, and availability.
              We collect only what is necessary for the platform to function.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              How Your Information Is Used
            </h2>
            <p>
              Your information helps us:
              Match mentees with relevant mentors.
              Schedule and manage mentorship sessions.
              Communicate booking updates and session details.
              Improve platform performance using anonymised insights.
              We do not sell or misuse your personal data.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Payments and Security
            </h2>
            <p>
              All payments are processed through secure third-party payment gateways. Mentipad does not store your card, UPI, or banking details.
              Limited transaction records may be retained for booking confirmation, refunds, and mentor payouts.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Third-Party Services
            </h2>
            <p>
              Mentipad uses trusted third-party tools for:
              Secure login.
              Payment processing.
              Transactional communication.
              These services receive only the minimum data required to operate.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Your Control
            </h2>
            <p>
              You may request access to or deletion of your profile data by contacting us. Certain records may be retained where required for legal or accounting purposes.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Updates
            </h2>
            <p>
              This policy may be updated as the platform evolves. Continued use of Mentipad indicates acceptance of the latest version.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}
