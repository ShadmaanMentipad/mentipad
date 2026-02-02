export const metadata = {
  title: "Contact Mentipad Team",
  description:
    "Reach out to the Mentipad team for support, partnership, or questions about mentorship and sessions.",
};


export default function ContactPage() {
  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[80px] sm:py-[100px] lg:py-[120px]">

      <div className="max-w-[900px] mx-auto">

       
        <div className="text-center mb-[36px] sm:mb-[50px] lg:mb-[60px]">

          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] 
            leading-[32px] sm:leading-[36px] lg:leading-[40px] 
            font-semibold text-[#0F172A]">
            Contact Us
          </h1>

          <p className="mt-[12px] sm:mt-[14px] text-[#475569] 
            text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px] 
            max-w-[700px] mx-auto">
            We’re here to help. If you have questions, need assistance, or would like to share feedback, please reach out to us via email or WhatsApp. 
            Most queries are responded to within one working day.
          </p>

        </div>

       
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] sm:rounded-[20px] 
          p-[24px] sm:p-[40px] lg:p-[60px] 
          shadow-sm space-y-[28px] sm:space-y-[34px] lg:space-y-[40px] 
          text-[#475569] text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px]">

         
          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] 
              font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              General Support
            </h2>
            <p>
              For help with account setup, mentorship bookings, payments, or access to digital resources, please write to us using your registered email address. 
              This helps us verify your account and respond efficiently.
            </p>
          </div>

       
          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] 
              font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Mentor Applications
            </h2>
            <p>
              If you are interested in becoming a mentor or listing academic notes on Mentipad, please share a brief overview of your background, areas of expertise, 
              and the type of mentorship or resources you wish to offer. Our team will guide you through the onboarding process.
            </p>
          </div>

    
          <div>
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] 
              font-semibold text-[#0F172A] mb-[8px] sm:mb-[10px]">
              Feedback and Suggestions
            </h2>
            <p>
              Mentipad is being built with the student community at its core. We welcome thoughtful feedback and ideas that help improve the quality, safety, 
              and effectiveness of mentorship on the platform.
            </p>
          </div>

        
          <div className="pt-[18px] sm:pt-[20px] border-t border-[#E2E8F0] space-y-[6px]">

            <p>
              📧 Email:{" "}
              <a
                href="mailto:support@mentipad.in"
                className="text-[#096CC0] font-medium hover:underline"
              >
                support@mentipad.in
              </a>
            </p>

            <p>
              📱 WhatsApp:{" "}
              <a
                href="https://wa.me/918279489409"
                target="_blank"
                className="text-[#096CC0] font-medium hover:underline"
              >
                +91 82794 89409
              </a>
            </p>

            <p>
              ⏱ Response Time: Within one working day (Monday–Saturday)
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}
