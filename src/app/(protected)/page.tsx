export const metadata = {
  title: "Mentipad – One-on-One Mentorship Platform",
  description:
    "Connect with experienced mentors for NEET, UPSC, INICET, MBBS, Nursing, and more. Personalized guidance to help you excel.",
};

import {
  CheckCircle,
  Users,
  Calendar,
  CreditCard,
  Video,
  Star,
  Clock,
  ShieldCheck,
  Users2,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#F9FBFC]">

     
<section
  className="w-full px-4 sm:px-10 lg:px-20 py-[90px] lg:py-[120px] text-center
  bg-gradient-to-b from-[#EAF4FF] via-[#F3FAFF] to-[#F9FBFC]"
>
  <h1
    className="text-[34px] sm:text-[42px] lg:text-[52px]
    leading-[44px] sm:leading-[52px] lg:leading-[62px]
    font-bold text-[#0F172A]"
  >
    Learn Faster with{" "}
    <span className="bg-gradient-to-r from-[#096CC0] via-[#2DA5AE] to-[#60C064] bg-clip-text text-transparent">
      Expert Mentors
    </span>
  </h1>

  <p
    className="mt-[18px] lg:mt-[22px] text-[#475569]
    text-[15px] sm:text-[16px] lg:text-[18px]
    leading-[24px] lg:leading-[28px] max-w-[720px] mx-auto"
  >
    Book personalized one-on-one sessions with top aspirants and professionals
    for exams, career guidance, and real-world clarity.
  </p>

 
  <div className="mt-[35px] lg:mt-[45px] flex flex-col sm:flex-row items-center justify-center gap-[14px] lg:gap-[18px]">

   
    <Link
      href="/find-mentors"
      className="flex items-center justify-center gap-2
      w-[180px] lg:w-[182px] h-[44px]
      bg-[#096CC0]
      rounded-[10px]
      text-white font-semibold text-[14px] lg:text-[15px]
      hover:bg-[#1990CD] transition-colors"
    >
      Find a Mentor
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </Link>

   
   <Link
  href="https://wa.me/918279489409?text=Hello%20Mentipad%20Team,%0AI%20came%20across%20your%20website%20and%20I%E2%80%99m%20interested%20in%20joining%20as%20a%20mentor%20on%20Mentipad.%0APlease%20guide%20me%20through%20the%20next%20steps.%20Thank%20you."
  target="_blank"

      className="flex items-center gap-2 justify-center
      w-[180px] lg:w-[182px] h-[44px]
      border-2 border-[#096CC0]
      rounded-[10px]
      text-[#096CC0] font-semibold text-[14px] lg:text-[15px]
      hover:bg-[#096CC0]/10 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m12 22l-2-6H2l2 6zm0 0h4m-4-9v-.5c0-1.886 0-2.828-.586-3.414S9.886 8.5 8 8.5s-2.828 0-3.414.586S4 10.614 4 12.5v.5"
        />
        <path d="M19 13a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm-9-9a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
        <path
          strokeLinecap="round"
          d="M14 17.5h6a2 2 0 0 1 2 2v.5a2 2 0 0 1-2 2h-1"
        />
      </svg>
      Join as Mentor
    </Link>

  </div>

  
  <div
    className="mt-[40px] lg:mt-[55px]
    grid grid-cols-2 sm:flex sm:flex-row
    justify-center gap-x-[24px] gap-y-[18px]
    text-[#475569] text-[13px] lg:text-[14px]"
  >
    <div className="flex items-center gap-2 justify-center">
      <CheckCircle size={18} className="text-[#60C064]" />
      Verified Mentors
    </div>

    <div className="flex items-center gap-2 justify-center">
      <CheckCircle size={18} className="text-[#60C064]" />
      Secure Payments
    </div>

    
    <div className="col-span-2 flex items-center gap-2 justify-center sm:col-span-1">
      <CheckCircle size={18} className="text-[#60C064]" />
      One-on-One Sessions
    </div>
  </div>
</section>


      
      <section className="py-[60px] lg:py-[70px]">
        <div className="px-4 sm:px-10 lg:px-20">

          <div className="text-center">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] 
            leading-[36px] lg:leading-[44px] 
            font-semibold text-[#0F172A]">

              How It Works
            </h2>

            <p className="mt-[12px] text-[#475569] text-[14px] lg:text-[15px]">
              Get started with personalized mentorship in 4 simple steps
            </p>
          </div>

          <div className="mt-[40px] lg:mt-[50px] 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] lg:gap-[50px]">

            {[
              { icon: Users, title: "Find a Mentor", desc: "Search and filter mentors based on exam, expertise, and availability" },
              { icon: Calendar, title: "Select a Slot", desc: "Choose a convenient date and time for your one-on-one session" },
              { icon: CreditCard, title: "Complete Payment", desc: "Securely pay for your session and confirm your booking instantly" },
              { icon: Video, title: "Attend the Session", desc: "Join the session using the meeting link shared via email or WhatsApp" },
            ].map((item, i) => (
              <div key={i} className="text-center">

                <div className="mx-auto flex h-[56px] lg:h-[60px] w-[56px] lg:w-[60px] 
                items-center justify-center rounded-full bg-[#096CC0]/10 text-[#096CC0]">

                  <item.icon size={26} />
                </div>

                <h3 className="mt-[16px] lg:mt-[18px] text-[16px] lg:text-[18px] font-semibold text-[#0F172A]">
                  {item.title}
                </h3>

                <p className="mt-[6px] text-[#475569] text-[13px] lg:text-[14px] leading-[22px]">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      
      <section className="py-[90px] lg:py-[190px] bg-[#F9FBFC]">
        <div className="px-4 sm:px-10 lg:px-20">

          <div className="text-center">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] 
            leading-[36px] lg:leading-[44px] font-semibold text-[#0F172A]">

              Why Choose Mentipad?
            </h2>

            <p className="mt-[12px] text-[#475569] max-w-[650px] mx-auto text-[14px] lg:text-[15px]">
              Mentipad connects you with verified mentors to provide focused, one-on-one guidance that truly makes a difference.
            </p>
          </div>

          <div className="mt-[40px] lg:mt-[70px] 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] lg:gap-[40px]">

            {[
              { icon: Star, title: "Verified Mentors", desc: "Learn directly from top aspirants and professionals with proven success." },
              { icon: Clock, title: "Flexible Scheduling", desc: "Book sessions at your convenience based on mentor availability." },
              { icon: ShieldCheck, title: "Secure & Trusted", desc: "Safe payments and verified profiles ensure a reliable experience." },
              { icon: Users2, title: "Personalized Guidance", desc: "One-on-one sessions focused on your specific goals and challenges." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#E2E8F0] rounded-[16px] p-[24px] lg:p-[28px] 
                text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <div className="w-[52px] lg:w-[56px] h-[52px] lg:h-[56px] mx-auto rounded-full 
                bg-[#096CC0]/10 flex items-center justify-center text-[#096CC0]">

                  <item.icon size={26} />
                </div>

                <h3 className="mt-[16px] lg:mt-[18px] text-[16px] lg:text-[18px] font-semibold text-[#0F172A]">
                  {item.title}
                </h3>

                <p className="mt-[8px] text-[#475569] text-[13px] lg:text-[14px] leading-[22px]">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      
      <section className="mb-[80px] lg:mb-[150px] bg-[#F9FBFC]">
        <div className="px-4 sm:px-10 lg:px-20">

          <div className="bg-[#096CC0] rounded-[24px] px-[30px] lg:px-[60px] py-[60px] lg:py-[80px] text-center">

            <h2 className="text-[28px] sm:text-[32px] lg:text-[38px] 
            leading-[36px] lg:leading-[46px] font-semibold text-white">

              Ready to Start Your Journey?
            </h2>

            <p className="mt-[14px] max-w-[620px] mx-auto text-white/85 
            text-[14px] lg:text-[16px] leading-[24px] lg:leading-[26px]">

              Connect with verified mentors and get personalized guidance to achieve your academic and career goals.
            </p>

            <div className="mt-[30px] lg:mt-[40px] flex flex-col sm:flex-row items-center justify-center gap-[14px] lg:gap-[18px]">

              <Link
                href="/find-mentors"
                className="flex items-center justify-center w-[180px] lg:w-[190px] h-[46px]
                bg-white rounded-[10px] text-[#096CC0] font-semibold text-[14px] lg:text-[15px]
                hover:bg-[#F9FBFC] transition-colors"
              >
                Find Your Mentor
              </Link>

             <Link
  href="https://wa.me/918279489409?text=Hello%20Mentipad%20Team,%0AI%20came%20across%20your%20website%20and%20I%E2%80%99m%20interested%20in%20joining%20as%20a%20mentor%20on%20Mentipad.%0APlease%20guide%20me%20through%20the%20next%20steps.%20Thank%20you."
  target="_blank"
                className="flex items-center justify-center w-[180px] lg:w-[190px] h-[46px]
                border-2 border-white rounded-[10px] text-white font-semibold text-[14px] lg:text-[15px]
                hover:bg-white/10 transition-colors"
              >
                Apply as Mentor
              </Link>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
