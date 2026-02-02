"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type WorkingDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const CATEGORY_OPTIONS = [
  "NEET UG",
  "NEET PG",
  "AIIMS INICET",
  "MBBS PROFESSIONAL EXAMS",
  "BSC NURSING",
  "NORCET",
  "UPSC CMS",
];

const LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
];

const DAYS: WorkingDay[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];




export default function AddMentorPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    title: "",
    category: "",
    languages: [] as string[],
    about: "",
    story: "",
    mentoringStyle: "",
    price20: "",
    price35: "",
    price60: "",
    image: null as File | null,

    availability: {
      enabled: true,
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
      timeRanges: [
        { start: "06:00", end: "10:00" },
      ],
    },
  });

 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleLanguage = (lang: string) => {
    setForm(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPG, PNG, or WEBP images are allowed");
      return;
    }

    setError("");
    setForm({ ...form, image: file });
  };

  const toggleDuration = (d: number) => {
    setForm(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        allowedDurations: prev.availability.allowedDurations.includes(d)
          ? prev.availability.allowedDurations.filter(x => x !== d)
          : [...prev.availability.allowedDurations, d],
      },
    }));
  };

const toggleDay = (day: WorkingDay) => {
  setForm(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        workingDays: {
          ...prev.availability.workingDays,
          [day]: !prev.availability.workingDays[day],
        },
      },
    }));
  };

  

  const updateTimeRange = (index: number, field: "start" | "end", value: string) => {
    const ranges = [...form.availability.timeRanges];
    ranges[index] = { ...ranges[index], [field]: value };

    setForm(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeRanges: ranges,
      },
    }));
  };

  const addTimeRange = () => {
    setForm(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeRanges: [...prev.availability.timeRanges, { start: "", end: "" }],
      },
    }));
  };

  const removeTimeRange = (index: number) => {
    const ranges = form.availability.timeRanges.filter((_, i) => i !== index);
    setForm(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeRanges: ranges,
      },
    }));
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", form.image as File);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error("Image upload failed");
    return res.json();
  };

  

  const submit = async () => {
    setError("");

    if (!form.image || !form.category || form.languages.length === 0) {
      setError("Please complete all required fields");
      return;
    }

    setLoading(true);

    try {
      const uploaded = await uploadImage();

      const payload = {
        name: form.name,
        title: form.title,
        category: form.category,
        languages: form.languages,
        about: form.about,
        story: form.story,
        mentoringStyle: form.mentoringStyle,
        pricing: {
          20: Number(form.price20),
          35: Number(form.price35),
          60: Number(form.price60),
        },
        image: {
          url: uploaded.url,
          public_id: uploaded.public_id,
        },
        availability: form.availability,
      };

      const res = await fetch("/api/mentors", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

if (!res.ok) throw new Error();

const createdMentor = await res.json();


router.push(`/mentor/${createdMentor._id}`);

    } catch {
      setError("Failed to add mentor. Please check details.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[60px]">
      <Link
            href="/admin"
            className="text-[14px] text-[#096CC0]"
          >
            ← Back to Admin
          </Link>
      <div className="max-w-[900px] mx-auto bg-white border border-[#E2E8F0] rounded-[24px] p-[40px]">
 
       
        <div className="mb-[30px]">
          <h1 className="text-[24px] font-semibold text-[#0F172A]">Add Mentor</h1>
          <p className="text-[#475569] text-[14px] mt-[6px]">
            Select predefined options wherever possible for accuracy.
          </p>
        </div>

        {error && <p className="mb-[20px] text-red-600 text-[14px]">{error}</p>}

       
        <Section title="Basic Information">
          <Grid>
            <Input label="Mentor Name" name="name" onChange={handleChange} />
            <Input label="Title / Rank" name="title" onChange={handleChange} />
            <Select
              label="Category"
              name="category"
              value={form.category}
              options={CATEGORY_OPTIONS}
              onChange={handleChange}
            />
          </Grid>
        </Section>

       
        <Section title="Languages Spoken">
          <div className="flex flex-wrap gap-[10px]">
            {LANGUAGE_OPTIONS.map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => toggleLanguage(lang)}
                className={`px-[14px] py-[8px] rounded-full text-[13px]
                  ${
                    form.languages.includes(lang)
                      ? "bg-[#096CC0] text-white"
                      : "border border-[#E2E8F0] text-[#475569] hover:bg-[#096CC0]/10"
                  }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </Section>

       
        <Section title="Mentor Details">
          <Textarea label="About Mentor" name="about" onChange={handleChange} />
          <Textarea label="Mentor Story" name="story" onChange={handleChange} />
          <Textarea label="Mentoring Style" name="mentoringStyle" onChange={handleChange} />
        </Section>

        
        <Section title="Session Pricing">
          <Grid cols={3}>
            <Input label="20 mins (₹)" name="price20" onChange={handleChange} />
            <Input label="35 mins (₹)" name="price35" onChange={handleChange} />
            <Input label="60 mins (₹)" name="price60" onChange={handleChange} />
          </Grid>
        </Section>

      
        <Section title="Mentor Availability">

          
          <p className="text-[13px] mb-[6px]">Allowed Durations</p>
          <div className="flex gap-[10px] mb-[16px]">
            {[20, 35, 60].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => toggleDuration(d)}
                className={`px-[14px] py-[6px] rounded-full text-[13px]
                  ${
                    form.availability.allowedDurations.includes(d)
                      ? "bg-[#096CC0] text-white"
                      : "border border-[#E2E8F0] text-[#475569]"
                  }`}
              >
                {d} mins
              </button>
            ))}
          </div>

   
          <p className="text-[13px] mb-[6px]">Working Days</p>
          <div className="flex flex-wrap gap-[10px] mb-[16px]">
            {DAYS.map(day => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-[12px] py-[6px] rounded-full text-[12px]
                  ${
                    form.availability.workingDays[day]
                      ? "bg-[#096CC0] text-white"
                      : "border border-[#E2E8F0] text-[#475569]"
                  }`}
              >
                {day.toUpperCase()}
              </button>
            ))}
          </div>

          
          <p className="text-[13px] mb-[6px]">Available Time Ranges</p>

          {form.availability.timeRanges.map((range, i) => (
            <div key={i} className="flex gap-[10px] items-center mb-[10px]">
              <input
                type="time"
                value={range.start}
                onChange={e => updateTimeRange(i, "start", e.target.value)}
                className="border border-[#E2E8F0] rounded-[10px] px-[10px] h-[38px]"
              />
              <input
                type="time"
                value={range.end}
                onChange={e => updateTimeRange(i, "end", e.target.value)}
                className="border border-[#E2E8F0] rounded-[10px] px-[10px] h-[38px]"
              />
              {form.availability.timeRanges.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTimeRange(i)}
                  className="text-red-500 text-[12px]"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addTimeRange}
            className="text-[#096CC0] text-[13px] mt-[6px]"
          >
            + Add another time range
          </button>
        </Section>

        
        <Section title="Mentor Image">
          <input type="file" accept="image/*" onChange={handleImage} />
        </Section>

        <button
          onClick={submit}
          disabled={loading}
          className="w-full h-[48px] rounded-[14px] font-semibold text-white
          bg-[#096CC0] hover:bg-[#1990CD] transition-colors"
        >
          {loading ? "Adding Mentor..." : "Add Mentor"}
        </button>

      </div>
    </main>
  );
}



function Section({ title, children }: any) {
  return (
    <section className="mb-[32px]">
      <h3 className="font-semibold text-[#0F172A] mb-[14px]">{title}</h3>
      {children}
    </section>
  );
}

function Grid({ children, cols = 2 }: any) {
  return (
    <div className={`grid sm:grid-cols-${cols} gap-[16px]`}>
      {children}
    </div>
  );
}

function Input({ label, name, onChange }: any) {
  return (
    <div>
      <label className="block text-[13px] text-[#475569] mb-[6px]">{label}</label>
      <input
        name={name}
        onChange={onChange}
        className="w-full h-[42px] px-[14px] rounded-[12px]
        border border-[#E2E8F0] focus:border-[#096CC0] outline-none"
      />
    </div>
  );
}

function Textarea({ label, name, onChange }: any) {
  return (
    <div className="mb-[14px]">
      <label className="block text-[13px] text-[#475569] mb-[6px]">{label}</label>
      <textarea
        name={name}
        rows={4}
        onChange={onChange}
        className="w-full px-[14px] py-[10px] rounded-[12px]
        border border-[#E2E8F0] focus:border-[#096CC0] outline-none resize-none"
      />
    </div>
  );
}

function Select({ label, name, value, options, onChange }: any) {
  return (
    <div>
      <label className="block text-[13px] text-[#475569] mb-[6px]">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-[42px] px-[14px] rounded-[12px]
        border border-[#E2E8F0] focus:border-[#096CC0] outline-none bg-white"
      >
        <option value="">Select</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
