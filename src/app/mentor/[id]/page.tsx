"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useParams } from "next/navigation";
import { useSession,signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import BookingSuccessModal from "@/components/BookingSuccessModal";
import loadRazorpayScript from "@/utils/loadRazorpay";
import Spinner from "@/components/Spinner";



function countBookableSlotsForDate(
  dateISO: string,
  timeRanges: { start: string; end: string }[],
  duration: number,
  step = 30
): number {
  const now = new Date();
  let count = 0;

  for (const { start, end } of timeRanges) {
    if (!start || !end) continue;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    let current = new Date(dateISO);
    current.setHours(sh, sm, 0, 0);

    const endTime = new Date(dateISO);
    endTime.setHours(eh, em, 0, 0);

    while (current < endTime) {
      const slotEnd = new Date(current);
      slotEnd.setMinutes(current.getMinutes() + duration);

      if (slotEnd <= endTime && current > now) {
        count++;
      }

      current.setMinutes(current.getMinutes() + step);
    }
  }

  return count;
}


function getNextAvailableDates(
  workingDays: { [key: string]: boolean },
  timeRanges: { start: string; end: string }[],
  duration: number,
  count = 3
) {
  const dates = [];
  const today = new Date();
  let i = 0;

  while (dates.length < count) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const weekday = d
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase() as keyof typeof workingDays;

    const dateISO = d.toISOString().split("T")[0];

    if (!workingDays[weekday]) {
      i++;
      continue;
    }

    
    const slotsCount = countBookableSlotsForDate(
      dateISO,
      timeRanges,
      duration
    );

    if (slotsCount >= 3) {
      dates.push({
        label: d.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        value: dateISO,
        weekday,
      });
    }

    i++;
  }

  return dates;
}



function formatTime(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}


function generateStartTimesFromRanges(
  ranges: { start: string; end: string }[],
  duration: number
) {
  const times: string[] = [];

  ranges.forEach(({ start, end }) => {
    if (!start || !end) return;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    let current = new Date();
    current.setHours(sh, sm, 0, 0);

    const endTime = new Date();
    endTime.setHours(eh, em, 0, 0);

    while (current.getTime() + duration * 60000 <= endTime.getTime()) {
      const h = String(current.getHours()).padStart(2, "0");
      const m = String(current.getMinutes()).padStart(2, "0");
      times.push(`${h}:${m}`);
      current.setMinutes(current.getMinutes() + duration);
    }
  });

  return times;
}


function generateSlots(
  startTimes: string[],
  duration: number,
  selectedDate: string
) {
  const now = new Date();
  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  return startTimes
    .map((time) => {
      const [h, m] = time.split(":").map(Number);

      const start = new Date(selectedDate);
      start.setHours(h, m, 0, 0);

      const end = new Date(start);
      end.setMinutes(start.getMinutes() + duration);

    return {
  label: `${formatTime(start)} – ${formatTime(end)}`,
  value: `${selectedDate}-${time}-${duration}`, 
  start,
};

    })
    .filter((slot) => {
      if (isToday) return slot.start > now;
      return true;
    });
}



export default function MentorDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [duration, setDuration] = useState<number>(0);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [dates, setDates] = useState<any[]>([]);
const [date, setDate] = useState<string>("");
const { data: session,status } = useSession();
const isAdmin = session?.user?.role === "admin";
const [showSuccess, setShowSuccess] = useState(false);
const router = useRouter();
const [paying, setPaying] = useState(false);

const handleBooking = async () => {
  if (!mentor) return;

  if (!session?.user?.email) {
    sessionStorage.setItem(
      "pendingBooking",
      JSON.stringify({ mentorId: mentor._id, date, duration, selectedSlots })
    );
    signIn("google", { callbackUrl: window.location.href });
    return;
  }

  const paidAmount = mentor.pricing?.[duration];
  if (typeof paidAmount !== "number") return alert("Invalid amount");

  setPaying(true);

  try {
    
    const res = await fetch("/api/razorpay-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: paidAmount }),
    });

    if (!res.ok) throw new Error("Order creation failed");
    const order = await res.json();

 
    const loaded = await loadRazorpayScript();
    if (!loaded) throw new Error("Razorpay SDK failed to load");

    
    const razor = new (window as any).Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Mentipad",
      description: `Session with ${mentor.name}`,
      handler: async function (response: any) {
        try {
          await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              studentName: session.user.name,
              studentEmail: session.user.email,
              mentorId: mentor._id,
              mentorName: mentor.name,
              date,
              duration,
              selectedSlots,
              paidAmount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          setShowSuccess(true);
        } catch {
          alert("Booking failed after payment.");
        }
      },
      prefill: {
        name: session.user.name || "",
        email: session.user.email || "",
      },
      theme: { color: "#096CC0" },
      modal: {
        ondismiss: () => setPaying(false),
      },
    });

    razor.open();
  } catch (err) {
    alert((err as any)?.message || "Something went wrong.");
  } finally {
    
  }
};


useEffect(() => {
  if (!session?.user) return;

  const pending = sessionStorage.getItem("pendingBooking");
  if (!pending) return;

  const data = JSON.parse(pending);

  setDate(data.date);
  setDuration(data.duration);
  setSelectedSlots(data.selectedSlots);

  sessionStorage.removeItem("pendingBooking");
}, [session]);




useEffect(() => {
  if (!mentor || !duration) return;

  const availableDates = getNextAvailableDates(
    availability.workingDays,
    availability.timeRanges,
    duration 
  );

  setDates(availableDates);
  setDate(availableDates[0]?.value);
}, [mentor, duration]);



 
useEffect(() => {
  if (!id) return;

  const fetchMentor = async () => {
    try {
      const res = await fetch(`/api/mentors/${id}`);
      const data = await res.json();
      setMentor(data);
    } finally {
      setLoading(false);
    }
  };

  fetchMentor();
}, [id]);

const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this mentor?\nThis action cannot be undone."
  );

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/mentors/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete mentor");
      return;
    }

   
    window.location.href = "/find-mentors";

  } catch {
    alert("Something went wrong");
  }
};



const availability = mentor?.availability ?? {
  allowedDurations: [20, 35, 60],
  workingDays: {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  },
  timeRanges: [],
};


useEffect(() => {
  if (!mentor) return;
  if (!availability.allowedDurations.length) return;

  setDuration((prev) =>
    prev === 0 ? availability.allowedDurations[0] : prev
  );
}, [mentor, availability.allowedDurations]);


if (loading || !mentor) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F9FBFC]">
      <Spinner />
    </main>
  );
}


 
  const selectedDay = new Date(date)
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase();

  const isWorkingDay =
    availability?.workingDays?.[selectedDay] ?? false;

    
 
const startTimes = isWorkingDay
  ? generateStartTimesFromRanges(availability.timeRanges, duration)
  : [];


  const slots = generateSlots(startTimes, duration, date);

  const toggleSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else if (selectedSlots.length < 3) {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  
  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[40px] lg:py-[60px]">
      <Link
        href="/find-mentors"
        className="inline-block mb-[24px] text-[14px] text-[#096CC0]"
      >
        ← Back to mentors
      </Link>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[32px]">

       
        <div className="bg-white border border-[#E2E8F0] rounded-[22px] p-[28px] sm:p-[36px]">

     
          <div className="flex flex-col sm:flex-row gap-[20px] items-center sm:items-start">
            <img
              src={mentor.image?.url}
              className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-full object-cover"
            />

            <div className="text-center sm:text-left">
           <h1 className="
  text-[18px] sm:text-[20px] lg:text-[24px]
  font-semibold text-[#0F172A]
">
  {mentor.name}
</h1>


              <p className="
  text-[13px] sm:text-[14px] lg:text-[15px]
  text-[#475569]
">
  {mentor.title}
</p>


              <span className="inline-block mt-[6px] px-[12px] py-[4px] text-[13px]
                rounded-full bg-[#096CC0]/10 text-[#096CC0] font-medium">
                {mentor.category}
              </span>
            </div>
          </div>

         
          <div className="mt-[28px] space-y-[28px]">

            <section>
             <h3 className="
  font-semibold
  text-[14px] sm:text-[15px]
  text-[#0F172A]
  mb-[6px]
">
  Languages
</h3>

              <div className="flex gap-[10px] flex-wrap">
                {mentor.languages.map((lang: string) => (
                 <span key={lang} className="
  px-[10px] sm:px-[14px]
  py-[4px] sm:py-[6px]
  border border-[#E2E8F0]
  rounded-full
  text-[12px] sm:text-[13px]
  text-[#475569]
">

                    {lang}
                  </span>
                ))}
              </div>
            </section>

            <section>
             <h3 className="
  font-semibold
  text-[14px] sm:text-[15px]
  text-[#0F172A]
  mb-[6px]
">About</h3>
              <p className="
  text-[#475569]
  text-[13px] sm:text-[14px] lg:text-[15px]
  leading-[22px] sm:leading-[24px] lg:leading-[26px]
">
  {mentor.about}
</p>

            </section>

            <section>
              <h3 className="
  font-semibold
  text-[14px] sm:text-[15px]
  text-[#0F172A]
  mb-[6px]
">My Story</h3>
             <p className="
  text-[#475569]
  text-[13px] sm:text-[14px] lg:text-[15px]
  leading-[22px] sm:leading-[24px] lg:leading-[26px]
">{mentor.story}</p>
            </section>

            <section>
              <h3 className="font-semibold mb-[6px]">How I Mentor</h3>
              <p className="
  text-[#475569]
  text-[13px] sm:text-[14px] lg:text-[15px]
  leading-[22px] sm:leading-[24px] lg:leading-[26px]
">{mentor.mentoringStyle}</p>
            </section>
{isAdmin && (
  <div className="mt-[14px] space-y-[10px]">
    <Link
      href={`/admin/edit-mentor/${mentor._id}`}
      className="
        block text-center
        w-full h-[44px] leading-[44px]
        rounded-[12px]
        font-semibold
        text-[#096CC0]
        border border-[#096CC0]
        hover:bg-[#096CC0]/10
      "
    >
      Edit Mentor
    </Link>

    <button
      onClick={handleDelete}
      className="
        w-full h-[44px]
        rounded-[12px]
        font-semibold
        text-red-600
        border border-red-300
        hover:bg-red-50
      "
    >
      Delete Mentor
    </button>
  </div>
)}


          </div>
        </div>

       
        <div className="bg-white border border-[#E2E8F0] rounded-[22px] p-[26px] lg:sticky lg:top-[120px] h-fit">

          <h3 className="text-[18px] font-semibold mb-[16px]">Book Session</h3>

         
          <div className="mb-[18px]">
            <p className="text-[#475569] mb-[8px]">Duration</p>
            <div className="flex gap-[10px] flex-wrap">
              {availability.allowedDurations.map((d: number) => (
                <button
                  key={d}
                  onClick={() => {
                    setDuration(d);
                    setSelectedSlots([]);
                  }}
                  className={`px-[16px] py-[8px] rounded-full text-[13px]
                    ${
                      duration === d
                        ? "bg-[#096CC0] text-white"
                        : "border text-[#475569] hover:bg-[#096CC0]/10"
                    }`}
                >
                  {d} mins
                </button>
              ))}
            </div>
          </div>

       
          <div className="mb-[18px]">
            <p className="flex items-center gap-1 mb-[8px] text-[#475569]">
              <CalendarDays size={16} /> Pick a date
            </p>

            <div className="flex gap-[10px] flex-wrap">
              {dates.map((d) => {
                
              return (
                <button
  key={d.value}
  onClick={() => {
    setDate(d.value);
    setSelectedSlots([]);
  }}
  className={`px-[14px] py-[8px] rounded-[10px] text-[13px]
    ${
      date === d.value
        ? "bg-[#096CC0] text-white"
        : "border hover:bg-[#096CC0]/10"
    }`}
>
  {d.label}
</button>

                );
              })}
            </div>
          </div>

        
<div className="mb-[22px]">

  <p className="font-semibold text-[#0F172A] mb-[4px]">
    Select 3 preferred time slots
  </p>

  <p className="text-[13px] text-[#475569] mb-[12px]">
    Choose in priority order. Mentor will confirm based on availability.
  </p>

 
  <div className="relative">


    <div
      className="
        pointer-events-none
        absolute top-0 left-0 right-0
        h-[24px]
        bg-gradient-to-b from-[#F8FAFC] to-transparent
        z-10
        rounded-t-[16px]
      "
    />

    
    <div
      className="
        pointer-events-none
        absolute bottom-0 left-0 right-0
        h-[24px]
        bg-gradient-to-t from-[#F8FAFC] to-transparent
        z-10
        rounded-b-[16px]
      "
    />

   
    <div
      className="
        max-h-[260px]
        overflow-y-auto
        space-y-[10px]
        p-[12px]
        rounded-[16px]
        border border-[#E2E8F0]
        bg-[#F8FAFC]
        scrollbar-thin
        scrollbar-thumb-[#94A3B8]
        scrollbar-track-[#E2E8F0]/50
      "
    >
      {slots.map((slot) => {
        const index = selectedSlots.indexOf(slot.value);
        const isSelected = index !== -1;

        const priorityLabel =
          index === 0
            ? "1st Preference"
            : index === 1
            ? "2nd Preference"
            : index === 2
            ? "3rd Preference"
            : null;

        return (
          <button
            key={slot.value}
            onClick={() => toggleSlot(slot.value)}
            className={`
              w-full
              flex items-center justify-between
              px-[16px] py-[12px]
              rounded-[14px]
              text-[14px]
              font-medium
              transition-all duration-200
              ${
                isSelected
                  ? `
                    bg-[#096CC0]/10
                    border border-[#096CC0]
                    text-[#096CC0]
                    shadow-[0_0_0_2px_rgba(9,108,192,0.15)]
                  `
                  : `
                    bg-white
                    border border-[#E2E8F0]
                    text-[#0F172A]
                    hover:bg-[#096CC0]/5
                    hover:border-[#096CC0]/40
                  `
              }
            `}
          >
            <span>{slot.label}</span>

            {priorityLabel && (
              <span
                className="
                  text-[10px] sm:text-[11px]
                  font-semibold
                  px-[8px] py-[3px]
                  rounded-full
                  bg-[#096CC0]
                  text-white
                  whitespace-nowrap
                "
              >
                {priorityLabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
</div>


         
          <div className="border-t pt-[14px]">
            <div className="flex justify-between items-center mb-[14px]">
              <span className="text-[#475569]">Total</span>
              <span className="text-[18px] font-semibold text-[#0F172A]">
                ₹{mentor.pricing?.[duration]}
              </span>
            </div>

       <button
  disabled={paying || selectedSlots.length !== 3}
  onClick={handleBooking}
  className={`w-full h-[46px] rounded-[12px] font-semibold ${
    paying
      ? "bg-[#E2E8F0] text-[#94A3B8] cursor-wait"
      : selectedSlots.length === 3
      ? "bg-[#096CC0] text-white hover:bg-[#1990CD]"
      : "bg-[#E2E8F0] text-[#94A3B8]"
  }`}
>
  {paying ? "Processing..." : `Pay ₹${mentor?.pricing?.[duration]}`}
</button>



          </div>
        </div>
      </div>
    {showSuccess && (
  <BookingSuccessModal
    mentorName={mentor.name}
    date={date}
    onClose={() => {
      setShowSuccess(false);
      router.push("/find-mentors");
    }}
  />
)}


    </main>
  );
}
