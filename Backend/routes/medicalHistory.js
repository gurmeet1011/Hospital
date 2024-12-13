import express from "express";
import Patient from "../model/patient.model.js";
import Chat from "../model/chat.model.js";
import Message from "../model/message.model.js";

const router = express.Router();

// Get medical history of all patients
router.get("/", async (req, res) => {
  try {
    const showAll = await Patient.find();
    return res.status(200).json(showAll);
  } catch (error) {
    console.error("Error fetching medical history: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete", async (req, res) => {
  const { email } = req.body; // Extract email from the request body

  try {
    // Step 1: Find the patient by email
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Step 2: Delete all chats where the patient is involved
    // Check both the 'patient' field and the 'users' array to find chats involving the patient
    const chatsToDelete = await Chat.find({
      $or: [
        { patient: patient._id }, // if patient is directly referenced in the 'patient' field
        { "users.userId": patient._id }, // if patient is in the 'users' array
      ],
    });

    // If there are chats involving the patient, delete associated messages first
    if (chatsToDelete.length > 0) {
      // Delete associated messages
      await Message.deleteMany({
        chat: { $in: chatsToDelete.map((chat) => chat._id) },
      });

      // Now delete the chats
      await Chat.deleteMany({
        _id: { $in: chatsToDelete.map((chat) => chat._id) },
      });
    }

    // Step 3: Delete the patient record
    await Patient.deleteOne({ email });

    res.status(200).json({
      message:
        "Patient and associated data (chats and messages) deleted successfully",
    });
  } catch (error) {
    console.error("Error during deletion process:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
