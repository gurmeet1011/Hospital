import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    sender: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      userType: {
        type: String,
        enum: ["Doctor", "Patient"], // Doctor or Patient as the sender
        required: true,
      },
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageModel);
export default Message;
