import mongoose from "mongoose";

// Define patient schema
const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "/images/default.jpg", // Path relative to the public folder
    },

    prohibitions: {
      type: String, // Medical prohibitions or restrictions
    },
    // Define appointment as an object, could be updated with new appointment times
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],

    // Store an array of medical history, each entry includes diagnosis and medication details
    medicalHistory: [
      {
        date: {
          type: Date, // Store the date of diagnosis
          required: true,
        },
        diagnosis: {
          type: String, // Description of the diagnosis
          required: true,
        },
        medication: {
          type: String, // Prescribed medication
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

// Create a model based on the schema
const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
