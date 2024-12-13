import Message from "../model/message.model.js";
import Chat from "../model/chat.model.js";

// Function to send a message
export const sendMessage = async (req, res) => {
  const { chatId, content, userId, userType } = req.body; // Extract data from the request body

  if (!chatId || !content || !userId || !userType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the chat exists
    let chat = await Chat.findById(chatId);

    // If chat does not exist, create a new chat
    if (!chat) {
      chat = await Chat.create({
        chatName: `${
          userType === "Patient" ? "Patient" : "Doctor"
        } - ${userId} Chat`,
        patient: userType === "Patient" ? userId : null,
        doctor: userType === "Doctor" ? userId : null,
      });
    }

    // Create a new message
    const messageData = {
      sender: {
        userId: userId,
        userType: userType,
      },
      content: content,
      chat: chat._id, // Associate the message with the chat
    };

    const message = await Message.create(messageData); // Save the message

    // Populate the sender's info if needed (optional)
    const populatedMessage = await Message.findById(message._id).populate(
      "sender.userId"
    );

    // Return the newly created message
    return res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Error sending message", error });
  }
};

// Function to fetch messages for a specific chat
export const fetchMessages = async (req, res) => {
  const { chatId } = req.params; // Get the chatId from request parameters
  console.log("Received chatId:", chatId);

  if (!chatId) {
    return res.status(400).json({ message: "Chat ID is required" });
  }

  try {
    // Fetch messages associated with the chat
    const messages = await Message.find({ chat: chatId })
      .populate("sender.userId", "name email") // Populate user information from sender
      .sort({ createdAt: 1 }); // Sort messages by creation time (oldest first)

    // Return the fetched messages
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Error fetching messages", error });
  }
};
