import mongoose from "mongoose";

const chatModel = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userType: {
          type: String,
          enum: ["Doctor", "Patient"], // Defines if it's a doctor or a patient
          required: true,
        },
      },
    ],
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // Mark as required
      ref: "Doctor", // Reference to the Doctor model if necessary
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // Reference to the Patient model
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);
export default Chat;
