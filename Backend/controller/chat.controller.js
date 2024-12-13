import Chat from "../model/chat.model.js";
import Patient from "../model/patient.model.js";

export const accessChat = async (req, res) => {
  const { patientID } = req.params;
  console.log(patientID);

  if (!patientID) {
    return res.status(400).json({ message: "Patient ID is required" });
  }

  try {
    // Check if a chat already exists
    let isChat = await Chat.findOne({
      "users.userId": req.doctor._id,
      "users.userId": patientID,
    })
      .populate("users.userId", "-password")
      .populate("latestMessage");

    if (isChat) {
      return res.status(200).send(isChat);
    } else {
      // If no chat exists, create a new one
      const patient = await Patient.findById(patientID); // Fetch patient details

      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      const chatData = {
        chatName: `${patient.fullName} - ${req.doctor.fullName}`, // Set chat name dynamically
        users: [
          { userId: req.doctor._id, userType: "Doctor" },
          { userId: patientID, userType: "Patient" },
        ],
        doctor: req.doctor._id, // Include the doctor ID here
      };

      const chatCreated = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: chatCreated._id })
        .populate("users.userId", "-password")
        .populate("latestMessage");

      return res.status(200).send(fullChat);
    }
  } catch (error) {
    console.error("Error accessing chat:", error.message);
    return res
      .status(500)
      .json({ message: "Error accessing chat", error: error.message });
  }
};
// Function to fetch all chats for the logged-in doctor
export const fetchChats = async (req, res) => {
  try {
    const doctorId = req.doctor._id; // Get the logged-in doctor ID from request

    // Find all chats where the doctor is a participant
    let results = await Chat.find({
      doctor: doctorId, // Find chats where the doctor is part of the chat
    })
      .populate("patient", "-password") // Populate patient details, exclude password
      .populate("doctor", "-password") // Populate doctor details, exclude password
      .populate("latestMessage") // Populate the latest message
      .sort({ updatedAt: -1 }); // Sort by the most recently updated chat

    // Populate the sender details in the latest message
    results = await Patient.populate(results, {
      path: "latestMessage.sender.userId",
      select: "name email",
    });

    // Send the populated chats as a response
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res
      .status(500)
      .json({ message: "Error fetching chats", error: error.message });
  }
};
export const getPatientChat = async (req, res) => {
  try {
    const { patientID } = req.params;
    const chat = await Chat.findOne({ "users.userId": patientID });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ message: "Server error" });
  }
};
