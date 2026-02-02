import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },
    mentorName: { type: String, required: true },

    date: { type: String, required: true },
    duration: { type: Number, required: true },

    selectedSlots: {
      type: [String],
      required: true, 
    },

    
    paidAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
