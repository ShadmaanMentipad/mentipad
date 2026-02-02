"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


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



export default function EditMentorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<any>(null);

  

  useEffect(() => {
    if (!id) return;

    const fetchMentor = async () => {
      try {
        const res = await fetch(`/api/mentors/${id}`);
        const data = await res.json();

        setForm({
          name: data.name || "",
          title: data.title || "",
          category: data.category || "",
          languages: data.languages || [],
          about: data.about || "",
          story: data.story || "",
          mentoringStyle: data.mentoringStyle || "",
          price20: data.pricing?.[20] ?? "",
          price35: data.pricing?.[35] ?? "",
          price60: data.pricing?.[60] ?? "",
          image: null, 

          availability: data.availability ?? {
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
            timeRanges: [{ start: "06:00", end: "10:00" }],
          },

          existingImage: data.image, 
        });
      } catch {
        setError("Failed to load mentor");
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (loading || !form) return null;



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleLanguage = (lang: string) => {
    setForm((prev: any) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l: string) => l !== lang)
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
    setForm((prev: any) => ({
      ...prev,
      availability: {
        ...prev.availability,
        allowedDurations: prev.availability.allowedDurations.includes(d)
          ? prev.availability.allowedDurations.filter((x: number) => x !== d)
          : [...prev.availability.allowedDurations, d],
      },
    }));
  };

  const toggleDay = (day: WorkingDay) => {
    setForm((prev: any) => ({
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

    setForm((prev: any) => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeRanges: ranges,
      },
    }));
  };

  const addTimeRange = () => {
    setForm((prev: any) => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeRanges: [...prev.availability.timeRanges, { start: "", end: "" }],
      },
    }));
  };

  const removeTimeRange = (index: number) => {
    const ranges = form.availability.timeRanges.filter((_: any, i: number) => i !== index);
    setForm((prev: any) => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeRanges: ranges,
      },
    }));
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", form.image);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error();
    return res.json();
  };

 

  const submit = async () => {
    setError("");
    setSaving(true);

    try {
      let imagePayload = form.existingImage;

      if (form.image) {
        imagePayload = await uploadImage();
      }

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
        image: imagePayload,
        availability: form.availability,
      };

      const res = await fetch(`/api/mentors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      router.push(`/mentor/${id}`);
    } catch {
      setError("Failed to update mentor");
    } finally {
      setSaving(false);
    }
  };

 

  return (
    <main className="bg-[#F9FBFC] px-4 sm:px-10 lg:px-20 py-[60px]">
      <div className="max-w-[900px] mx-auto bg-white border border-[#E2E8F0] rounded-[24px] p-[40px]">

        <div className="mb-[30px]">
          <h1 className="text-[24px] font-semibold text-[#0F172A]">
            Edit Mentor
          </h1>
          <p className="text-[#475569] text-[14px] mt-[6px]">
            Update mentor details and availability.
          </p>
        </div>

        {error && <p className="mb-[20px] text-red-600 text-[14px]">{error}</p>}

       
        <Section title="Basic Information">
          <Grid>
            <Input label="Mentor Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Title / Rank" name="title" value={form.title} onChange={handleChange} />
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
                      : "border border-[#E2E8F0] text-[#475569]"
                  }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </Section>

   
        <Section title="Mentor Details">
          <Textarea label="About Mentor" name="about" value={form.about} onChange={handleChange} />
          <Textarea label="Mentor Story" name="story" value={form.story} onChange={handleChange} />
          <Textarea label="Mentoring Style" name="mentoringStyle" value={form.mentoringStyle} onChange={handleChange} />
        </Section>

       
        <Section title="Session Pricing">
          <Grid cols={3}>
            <Input label="20 mins (₹)" name="price20" value={form.price20} onChange={handleChange} />
            <Input label="35 mins (₹)" name="price35" value={form.price35} onChange={handleChange} />
            <Input label="60 mins (₹)" name="price60" value={form.price60} onChange={handleChange} />
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

          {form.availability.timeRanges.map((range: any, i: number) => (
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
            className="text-[#096CC0] text-[13px]"
          >
            + Add another time range
          </button>
        </Section>

       
        <Section title="Mentor Image">
          <input type="file" accept="image/*" onChange={handleImage} />
        </Section>

        <button
          onClick={submit}
          disabled={saving}
          className="w-full h-[48px] rounded-[14px] font-semibold text-white
          bg-[#096CC0] hover:bg-[#1990CD]"
        >
          {saving ? "Saving Changes..." : "Save Changes"}
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
  return <div className={`grid sm:grid-cols-${cols} gap-[16px]`}>{children}</div>;
}

function Input({ label, name, value, onChange }: any) {
  return (
    <div>
      <label className="block text-[13px] text-[#475569] mb-[6px]">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-[42px] px-[14px] rounded-[12px]
        border border-[#E2E8F0] focus:border-[#096CC0] outline-none"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }: any) {
  return (
    <div className="mb-[14px]">
      <label className="block text-[13px] text-[#475569] mb-[6px]">{label}</label>
      <textarea
        name={name}
        rows={4}
        value={value}
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
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
