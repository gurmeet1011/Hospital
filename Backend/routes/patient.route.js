import express from "express";
import {
  getPatientDetails,
  login,
  signUp,
  TodayAppointment,
  updateProfilePhoto,
} from "../controller/patient.controller.js";
import Patient from "../model/patient.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// POST route for signup
router.post("/signup", signUp);

// POST route for login
router.post("/login", login);

// GET route for patient details
router.get("/:patientID", getPatientDetails);

// GET route for today's appointments
router.get("/todayAppointments", TodayAppointment);

router.put("/update-profile-photo/:patientID", updateProfilePhoto);

// PUT route to update patient details
router.put("/update/:id", async (req, res) => {
  const { fullName, appointment, medicalHistory, prohibitions } = req.body;
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (fullName) patient.fullName = fullName;
    if (medicalHistory && medicalHistory.length > 0) {
      patient.medicalHistory = [...patient.medicalHistory, ...medicalHistory];
    }
    if (appointment) patient.appointment = appointment;
    if (prohibitions) patient.prohibitions = prohibitions;

    await patient.save();

    res
      .status(200)
      .json({ message: "Patient details updated successfully", patient });
  } catch (error) {
    console.error("Error updating patient details:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST route for forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Patient.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with that email." });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the reset token before storing it
    const hashedResetToken = await bcrypt.hash(resetToken, 10);
    user.passwordResetToken = hashedResetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send password reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.BASE_URL}/patient/reset-password?token=${resetToken}`;

    const mailOptions = {
      to: user.email,
      subject: "Password Reset Request",
      text: `To reset your password, click the link below:\n\n${resetLink}\n\nIf you didn't request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
});

// POST route for password reset
// POST route for password reset
// POST route for password reset
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const patient = await Patient.findOne({ passwordResetToken: token });
    if (!patient) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if the token is expired
    if (Date.now() > patient.passwordResetExpires) {
      return res.status(400).json({ message: "Token has expired" });
    }

    // Hash the reset token provided and compare it to the stored hash
    const isMatch = await bcrypt.compare(token, patient.passwordResetToken);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    patient.password = hashedPassword;
    patient.passwordResetToken = null; // Remove reset token after use
    patient.passwordResetExpires = null; // Remove reset token expiry
    await patient.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while resetting password" });
  }
});

export default router;
