import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Doctor from "../model/doctor.model.js";
import jwt from "jsonwebtoken";
import Patient from "../model/patient.model.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if doctor already exists
    const existingUser = await Doctor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new doctor
    const newDoctor = new Doctor({
      fullName,
      email,
      password: hashPassword,
    });

    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Error during signup: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid doctor credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // If login is successful, return doctor details (corrected to 'doctor')
    return res.status(200).json({
      message: "Login successful",
      doctor: {
        _id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const allPatient = async (req, res) => {
  const keyWord = req.query.search
    ? {
        $or: [
          { fullName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const patients = await Patient.find(keyWord).select("-password");
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients: ", error);
    res
      .status(500)
      .json({ message: "Error fetching patients", error: error.message });
  }
};

// Fetch specific doctor details by doctorID
export const DocDetails = async (req, res) => {
  const { doctorID } = req.params;

  try {
    // Find the doctor by ID in the database
    const doctor = await Doctor.findById(doctorID);

    // Check if the doctor was found
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Send the doctor details as the response
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    // Handle errors (e.g., invalid ID format)
    res.status(500).json({ message: "Server error" });
  }
};
