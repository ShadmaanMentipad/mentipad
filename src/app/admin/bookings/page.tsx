"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



type Booking = {
  _id: string;
  studentName: string;
  studentEmail: string;
  mentorName: string;
  date: string;
  duration: number;
  selectedSlots: string[];
  createdAt: string;
  paidAmount: number;
};



function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatSlot(slot: string) {
  
  const parts = slot.split("-");
  const time = parts[3];
  const duration = parts[4];

  const [h, m] = time.split(":").map(Number);
  const start = new Date();
  start.setHours(h, m, 0, 0);

  const end = new Date(start);
  end.setMinutes(start.getMinutes() + Number(duration));

  return `${start.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })} – ${end.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
}



export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setBookings(data);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <main className="py-[80px] text-center text-[#475569]">
        Loading bookings…
      </main>
    );
  }

  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-6 md:px-10 lg:px-20 py-[40px] sm:py-[60px]">

      <div className="max-w-[1200px] mx-auto">

       
        <div className="flex items-center justify-between mb-[32px]">
          <div>
            <h1 className="text-[26px] font-semibold text-[#0F172A]">
              Bookings
            </h1>
          </div>

          <Link
            href="/admin"
            className="text-[14px] text-[#096CC0]"
          >
            ← Back to Admin
          </Link>
        </div>

   
        {bookings.length === 0 && (
          <div className="bg-white border rounded-[18px] p-[48px] text-center">
            <p className="text-[#475569]">
              No bookings received yet.
            </p>
          </div>
        )}

       
        <div className="space-y-[24px]">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="
                bg-white
                border border-[#E2E8F0]
                rounded-[22px]
                p-[28px]
              "
            >
           
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px] mb-[20px] flex-wrap">


                <div>
                  <p className="text-[12px] text-[#64748B] mb-[4px]">
                    Student
                  </p>
                  <p className="text-[15px] font-medium text-[#0F172A]">
                    {b.studentName}
                  </p>
                  <p className="text-[13px] text-[#475569]">
                    {b.studentEmail}
                  </p>
                </div>

                <div>
                  <p className="text-[12px] text-[#64748B] mb-[4px]">
                    Mentor
                  </p>
                  <p className="text-[15px] font-medium text-[#0F172A]">
                    {b.mentorName}
                  </p>
                </div>
<div>
  <p className="text-[12px] text-[#64748B] mb-[4px]">
    Session
  </p>
  <p className="text-[15px] font-medium text-[#0F172A]">
    {formatDate(b.date)}
  </p>

  <div className="flex items-center gap-[12px] mt-[4px]">
    <span className="text-[13px] text-[#475569]">
      {b.duration} mins
    </span>

    <span className="text-[13px] font-semibold text-[#0F172A]">
      ₹{b.paidAmount}
    </span>
  </div>
</div>

              </div>

              
              <div className="mb-[18px]">
                <p className="text-[13px] font-semibold text-[#0F172A] mb-[8px]">
                  Preferred Time Slots
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px]">

                  {b.selectedSlots.map((slot, index) => (
                    <div
                      key={slot}
                      className="
                        border border-[#E2E8F0]
                        rounded-[14px]
                        p-[12px]
                        bg-[#F8FAFC]
                      "
                    >
                      <p className="text-[11px] text-[#64748B] mb-[4px]">
                        {index === 0
                          ? "1st Preference"
                          : index === 1
                          ? "2nd Preference"
                          : "3rd Preference"}
                      </p>
                      <p className="text-[14px] font-medium text-[#0F172A]">
                        {formatSlot(slot)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="border-t pt-[14px] flex justify-between items-center">
                <p className="text-[12px] text-[#64748B]">
                  Booked on
                </p>
                <p className="text-[13px] text-[#475569]">
                  {formatDateTime(b.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
