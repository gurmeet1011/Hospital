import express from "express";
import {
  bookAppointment,
  getAppointmentById,
  getAvailableSlots,
  getTodaysAppointments,
} from "../controller/appointment.controller.js";
import { authenticateUser } from "../middleware/patientAuth.js";

const router = express.Router();

router.get("/available", getAvailableSlots); // Fetch available slots

router.post("/book", authenticateUser, bookAppointment);
router.get("/today", getTodaysAppointments); // Get all appointments for the single doctor
router.get("/:appointmentId", getAppointmentById);

export default router;
