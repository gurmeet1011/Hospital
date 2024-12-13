import Patient from "../model/patient.model.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import jwt from "jsonwebtoken";

// Set up multer for file storage
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the 'images' directory exists in the 'Frontend/public' folder, if not, create it
const uploadDir = path.join(__dirname, "../public/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store the file in the images folder inside the 'Frontend/public' directory
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Save the file with a unique name based on timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("profilePhoto"); // Handling single file upload

// Sign-up function
export const signUp = async (req, res) => {
  // Handle the file upload
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error during file upload:", err);
      return res.status(400).json({ message: "Error uploading file" });
    }

    try {
      // Destructure fields from the request body
      const { fullName, email, password } = req.body;

      // Validate required fields
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the patient already exists
      const existingUser = await Patient.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Patient already exists with this email" });
      }

      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10);

      // Handle profile photo if uploaded
      let profilePhotoPath = "images/default.jpg"; // Default photo path if no file is uploaded

      // If a file is uploaded, update the path
      if (req.file) {
        profilePhotoPath = `images/${req.file.filename}`; // Store relative file path
      }

      // Create a new patient
      const newPatient = new Patient({
        fullName,
        email,
        password: hashPassword,
        profilePhoto: profilePhotoPath, // Save the profile photo path
      });

      // Save the new patient to the database
      await newPatient.save();

      // Respond with a success message
      res.status(201).json({
        message: "Patient registered successfully",
        patient: {
          fullName,
          email,
          profilePhoto: profilePhotoPath, // Send the profile photo path in the response
        },
      });
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "Invalid patient" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return the patient details along with the profile photo path
    return res.status(200).json({
      message: "Login successful",
      patient: {
        _id: patient._id,
        fullName: patient.fullName,
        email: patient.email,
        medicalHistory: patient.medicalHistory,
        appointment: patient.appointments,
        profilePhoto: patient.profilePhoto, // Send profile photo path
      },
      token,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get patient details
// Get patient details
export const getPatientDetails = async (req, res) => {
  const { patientID } = req.params;

  try {
    const patient = await Patient.findById(patientID).populate("appointments"); // Populate appointments

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Send response once
    res.status(200).json({
      _id: patient._id,
      fullName: patient.fullName,
      email: patient.email,
      medicalHistory: patient.medicalHistory,
      appointments: patient.appointments, // Send populated appointments
      profilePhoto: patient.profilePhoto,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      prohibitions: patient.prohibitions,
    });
  } catch (error) {
    console.error("Error fetching patient details:", error);

    // Send error response
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// Update profile photo
export const updateProfilePhoto = async (req, res) => {
  const { patientID } = req.params;

  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

      // Find the patient and update the profile photo
      const patient = await Patient.findById(patientID);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      // Delete old profile photo if it exists and is not the default photo
      if (patient.profilePhoto !== "images/default.jpg") {
        fs.unlinkSync(path.join(__dirname, "../public", patient.profilePhoto));
      }

      // Update profile photo path
      patient.profilePhoto = `images/${req.file.filename}`;
      await patient.save();

      res.status(200).json({
        message: "Profile photo updated successfully",
        profilePhoto: patient.profilePhoto,
      });
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get today's appointments
export const TodayAppointment = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Find patients with an appointment today
    const patients = await Patient.find({
      "appointment.date": { $gte: startOfToday, $lt: endOfToday },
    });

    res.status(200).json(patients);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching today's appointments", error: err });
  }
};
