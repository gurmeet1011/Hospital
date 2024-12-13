import mongoose from "mongoose";
import Appointment from "../model/appointments.model.js";
import Patient from "../model/patient.model.js"; // Assuming you have a Patient model

// Get available time slots for a specific date
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Prevent booking past dates
    const today = new Date();
    const requestedDate = new Date(date);
    if (requestedDate < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: "Cannot book for past dates" });
    }

    const allSlots = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM",
    ];

    // Check daily appointment count
    const dailyCount = await Appointment.countDocuments({ date });
    if (dailyCount >= 20) {
      return res
        .status(200)
        .json({ slots: [], message: "Daily limit reached" });
    }

    // Find already booked slots for the given date
    const bookedSlots = await Appointment.find({ date }).select(
      "timeSlot -_id"
    );
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.some((b) => b.timeSlot === slot)
    );

    res.status(200).json({ slots: availableSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching slots" });
  }
};

// Book an appointment
export const bookAppointment = async (req, res) => {
  try {
    const { date, timeSlot, patientId } = req.body;

    // Validate inputs
    if (!date || !timeSlot || !patientId) {
      return res
        .status(400)
        .json({ message: "Date, timeSlot, and patientId are required" });
    }

    // Check if the patient already has an appointment at the requested time
    const existingAppointment = await Appointment.findOne({
      patientId,
      date,
      timeSlot,
    });
    if (existingAppointment) {
      return res
        .status(409)
        .json({ message: "You already have an appointment at this time" });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      date,
      timeSlot,
      patientId,
    });

    // Save the appointment to the database
    await newAppointment.save();

    // Update the patient's appointments array
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.appointments.push(newAppointment._id);
    await patient.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Failed to book appointment" });
  }
};

// Get today's appointments with patient details
export const getTodaysAppointments = async (req, res) => {
  try {
    // Get the start and end of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Find today's appointments and populate patient details
    const appointments = await Appointment.find({
      date: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    })
      .populate("patientId", "fullName medicalHistory profilePhoto") // Populate specific fields from the Patient schema
      .sort({
        timeSlot: 1,
      })
      .limit(50); // Optionally limit the results to 50

    // Respond with today's appointments including patient details
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching today's appointments" });
  }
};

// Get appointment details by ID
export const getAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    // Find the appointment by ID and populate patient details
    const appointment = await Appointment.findById(appointmentId).populate(
      "patientId",
      "fullName medicalHistory profilePhoto" // Adjust fields as needed
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Respond with appointment details
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment details:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching appointment details" });
  }
};
