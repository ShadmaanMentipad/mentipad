"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[60px]">
      <div className="max-w-[900px] mx-auto bg-white border rounded-[20px] p-[40px]">

     
        <div className="flex items-center justify-between mb-[24px]">
          <h1 className="text-[24px] font-semibold text-[#0F172A]">
            Admin Panel
          </h1>

          
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="
              flex items-center gap-2
              px-[16px] h-[40px]
              rounded-[10px]
              border border-[#E2E8F0]
              text-[#475569] text-[14px] font-medium
              hover:bg-[#F9FBFC]
              transition-colors
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

       
        <div className="grid sm:grid-cols-2 gap-[20px]">

          <Link
            href="/admin/add-mentor"
            className="
              h-[80px]
              flex items-center justify-center
              rounded-[14px]
              border border-[#E2E8F0]
              font-medium text-[#0F172A]
              hover:bg-[#096CC0]/10
              transition-colors
            "
          >
            ➕ Add Mentor
          </Link>

          <Link
            href="/admin/bookings"
            className="
              h-[80px]
              flex items-center justify-center
              rounded-[14px]
              border border-[#E2E8F0]
              font-medium text-[#0F172A]
              hover:bg-[#096CC0]/10
              transition-colors
            "
          >
            👥 View Bookings
          </Link>

        </div>

      </div>
    </main>
  );
}
