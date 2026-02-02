import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    category: String,
    languages: [String],

    about: String,
    story: String,
    mentoringStyle: String,

    pricing: {
      20: Number,
      35: Number,
      60: Number,
    },

    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },

    availability: {
      enabled: { type: Boolean, default: true },

      allowedDurations: {
        type: [Number],
        default: [20, 35, 60],
      },

      workingDays: {
        mon: { type: Boolean, default: true },
        tue: { type: Boolean, default: true },
        wed: { type: Boolean, default: true },
        thu: { type: Boolean, default: true },
        fri: { type: Boolean, default: true },
        sat: { type: Boolean, default: true },
        sun: { type: Boolean, default: true },
      },

      
      timeRanges: [
        {
          start: { type: String, required: true }, 
          end: { type: String, required: true },  
        },
      ],
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Mentor ||
  mongoose.model("Mentor", MentorSchema);
