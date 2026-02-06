import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#E2E8F0] shadow-[0_-6px_18px_rgba(0,0,0,0.06)] mt-[40px] sm:mt-[60px] lg:mt-[80px]">

      <div className="w-full min-h-[290px] px-4 sm:px-10 lg:px-20 grid grid-rows-[1fr_auto]">

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 lg:gap-0 py-[40px] lg:py-0">

          {/* LEFT */}
          <div className="flex flex-col items-center max-w-[320px] mx-auto lg:mx-0">
            <Link href="/" className="flex items-center gap-[10px] cursor-pointer">
              <img
                src="/logo.png"
                alt="Mentipad logo"
                className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] translate-y-[-3px]"
              />
              <span
                className="font-bold text-[18px] sm:text-[22px] leading-[28px] sm:leading-[33px] tracking-[-0.5px] text-[#0F172A]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Mentipad
              </span>
            </Link>

            <p className="mt-[8px] text-center text-[#475569] text-[14px] sm:text-[16px] leading-[24px] sm:leading-[28px]">
              1:1 Mentorship by AIIMS alumni and <br />
              top medical professionals.
            </p>
          </div>

          {/* CENTER - SUPPORT */}
          <div className="flex flex-col items-center lg:items-start justify-center justify-self-center">
            <h3 className="text-[#0F172A] text-[18px] sm:text-[22px] leading-[26px] sm:leading-[30px] tracking-[-0.2px] font-semibold">
              Support:
            </h3>

            <div className="mt-[12px] flex flex-col items-center lg:items-start gap-[14px] sm:gap-[16px]">
              <Link
                href="/contact-us"
                className="text-[#475569] text-[14px] sm:text-[16px] hover:text-[#096CC0] transition-colors"
              >
                Contact us
              </Link>

              <Link
                href="/terms-and-conditions"
                className="text-[#475569] text-[14px] sm:text-[16px] hover:text-[#096CC0] transition-colors"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/privacy-policy"
                className="text-[#475569] text-[14px] sm:text-[16px] hover:text-[#096CC0] transition-colors"
              >
                Privacy Policy
              </Link>

              
              <Link
                href="/cancellation-refunds"
                className="text-[#475569] text-[14px] sm:text-[16px] hover:text-[#096CC0] transition-colors"
              >
                Cancellation & Refunds
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center max-w-[360px] mx-auto lg:mx-0 lg:justify-self-end">
            <h3 className="text-[#0F172A] text-[18px] sm:text-[20px] leading-[26px] sm:leading-[30px] tracking-[-0.2px] font-semibold text-center lg:text-left whitespace-normal lg:whitespace-nowrap">
              Want to become a mentor on Mentipad?
            </h3>

            <p className="mt-[6px] text-center text-[#475569] text-[14px] sm:text-[16px] leading-[24px] sm:leading-[28px]">
              Share your experience and guide students <br className="hidden sm:block" />
              through one-on-one sessions.
            </p>

            <Link
              href="https://wa.me/918279489409?text=Hello%20Mentipad%20Team,%0AI%20came%20across%20your%20website%20and%20I%E2%80%99m%20interested%20in%20joining%20as%20a%20mentor%20on%20Mentipad.%0APlease%20guide%20me%20through%20the%20next%20steps.%20Thank%20you."
              target="_blank"
              className="mt-[14px] flex items-center justify-center
              w-[160px] sm:w-[176px] h-[40px]
              border-2 border-[#096CC0]
              rounded-[10px]
              text-[#096CC0] font-semibold text-[14px]
              hover:bg-[#096CC0]/10 transition-colors"
            >
              Join as Mentor
            </Link>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="flex justify-center pb-[18px]">
          <div className="text-[#475569] text-[13px] sm:text-[16px] leading-[22px] sm:leading-[28px] text-center">
            © 2026 Mentipad. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
