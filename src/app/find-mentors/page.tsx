"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Spinner from "@/components/Spinner";

const categories = [
  "All",
  "NEET UG",
  "NEET PG",
  "AIIMS INICET",
  "MBBS PROFESSIONAL EXAMS",
  "BSC NURSING",
  "NORCET",
  "UPSC CMS",
];

export default function FindMentorsPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

 
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("/api/mentors");
        if (!res.ok) throw new Error("Failed to fetch mentors");

        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error("Error loading mentors", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesCategory =
      selectedCategory === "All" || mentor.category === selectedCategory;

    const matchesSearch =
      mentor.name.toLowerCase().includes(search.toLowerCase()) ||
      mentor.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

if (loading) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <Spinner />
    </main>
  );
}

  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[60px] lg:py-[80px]">

    
      <div className="text-center mb-[30px]">
        <h1 className="text-[32px] font-semibold text-[#0F172A]">
          Find Your Mentor
        </h1>
        <p className="mt-[8px] text-[#475569] text-[14px]">
          Search mentors by expertise, exam category, or specialization
        </p>
      </div>

      
      <div className="max-w-[700px] mx-auto mb-[30px] relative">
        <Search
          size={18}
          className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search mentors..."
          className="w-full pl-[42px] pr-[16px] py-[12px]
          rounded-[14px] border border-[#E2E8F0]
          outline-none focus:border-[#096CC0]"
        />
      </div>

    
      <div className="mb-[50px] overflow-x-auto">
        <div className="flex gap-[10px] w-max mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-[16px] py-[8px] rounded-full text-[13px]
              ${
                selectedCategory === cat
                  ? "bg-[#096CC0] text-white"
                  : "border border-[#E2E8F0] text-[#475569] hover:bg-[#096CC0]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] max-w-[1100px] mx-auto">

        {filteredMentors.map((mentor) => (
          <Link
            key={mentor._id}
            href={`/mentor/${mentor._id}`}
            className="bg-white border border-[#E2E8F0]
            rounded-[18px] p-[18px]
            hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-[14px]">
              <img
                src={mentor.image?.url}
                alt={mentor.name}
                className="w-[60px] h-[60px] rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  {mentor.name}
                </h3>
                <p className="text-[13px] text-[#475569]">
                  {mentor.title}
                </p>
              </div>
            </div>

            <div className="mt-[10px]">
              <span className="inline-block px-[12px] py-[5px]
              rounded-full bg-[#096CC0]/10 text-[#096CC0] text-[12px]">
                {mentor.category}
              </span>
            </div>

            <p className="mt-[12px] text-[13px] text-[#475569] line-clamp-2">
              {mentor.about}
            </p>

            <p className="mt-[12px] font-semibold text-[#0F172A] text-[14px]">
              From ₹{mentor.pricing?.[20]}
            </p>
          </Link>
        ))}

        {filteredMentors.length === 0 && (
          <p className="col-span-full text-center text-[#475569]">
            No mentors found.
          </p>
        )}

      </div>
    </main>
  );
}
