import express from "express";
import { protect } from "../middleware/doctorAuth.js";
import {
  accessChat,
  fetchChats,
  getPatientChat,
} from "../controller/chat.controller.js";

const router = express.Router();

// Routes for chat access and fetching chats
router.post("/accesschat/:patientID", protect, accessChat); // patientID from URL params
router.get("/fetchchats/:doctorID", protect, fetchChats); // No changes here
router.get("/patientchat/:patientID", getPatientChat);

export default router;
