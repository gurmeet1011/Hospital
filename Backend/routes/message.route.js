import express from "express";
import {
  sendMessage,
  fetchMessages,
} from "../controller/message.controller.js";

const router = express.Router();

// Route to send a message
router.post("/send", sendMessage);

// Route to fetch messages for a specific chat
router.get("/:chatId", fetchMessages);

export default router;
