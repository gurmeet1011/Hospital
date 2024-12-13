import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Change this to Date type
  timeSlot: { type: String, required: true },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
