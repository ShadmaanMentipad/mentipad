"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NameOnboarding() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { update } = useSession();

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setLoading(true);

   
    const res = await fetch("/api/user/name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    
    await update();

   
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FBFC]">
      <div className="w-full max-w-[420px] bg-white rounded-[16px] p-8 shadow-md">

        <h1 className="text-[22px] font-semibold text-[#0F172A] text-center">
          Welcome to Mentipad 👋
        </h1>

        <p className="text-[#475569] text-center mt-2">
          What should we call you?
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          disabled={loading}
          className="w-full mt-6 h-[44px] px-4
          border border-[#E2E8F0]
          rounded-[10px]
          outline-none
          focus:border-[#096CC0]"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-5 h-[44px]
          bg-[#096CC0]
          rounded-[10px]
          text-white font-semibold
          hover:bg-[#1990CD]
          disabled:opacity-60
          flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? "Saving..." : "Continue"}
        </button>

      </div>
    </div>
  );
}
