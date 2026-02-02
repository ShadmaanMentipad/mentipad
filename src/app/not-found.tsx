"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#F9FBFC] flex items-center justify-center px-4">
      <div className="max-w-[520px] w-full text-center bg-white border border-[#E2E8F0] rounded-[24px] p-[40px]">

     
        <h1 className="text-[64px] font-bold text-[#096CC0] leading-none">
          404
        </h1>

        
        <h2 className="mt-[12px] text-[22px] font-semibold text-[#0F172A]">
          Page not found
        </h2>

      
        <p className="mt-[10px] text-[14px] text-[#475569] leading-[22px]">
          Sorry, the page you’re looking for doesn’t exist, has been removed,
          or the link might be incorrect.
        </p>

        
        <div className="mt-[28px] flex flex-col sm:flex-row gap-[12px] justify-center">

          <Link
            href="/"
            className="
              h-[44px] px-[20px]
              inline-flex items-center justify-center
              rounded-[12px]
              bg-[#096CC0]
              text-white text-[14px] font-semibold
              hover:bg-[#1990CD]
              transition-colors
            "
          >
            Go to Home
          </Link>

          <Link
            href="/find-mentors"
            className="
              h-[44px] px-[20px]
              inline-flex items-center justify-center
              rounded-[12px]
              border border-[#E2E8F0]
              text-[#0F172A] text-[14px] font-medium
              hover:bg-[#096CC0]/5
              transition-colors
            "
          >
            Find Mentors
          </Link>

        </div>
      </div>
    </main>
  );
}
