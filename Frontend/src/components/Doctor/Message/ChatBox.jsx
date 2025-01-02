import React, { useState, useEffect, useRef } from "react";

function ChatBox({ selectedPatientChat, doctorId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(
        `https://hospital-drcp.onrender.com/message/${chatId}`
      );
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
      } else {
        console.error("Error fetching messages:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchPatientDetails = async (patientId) => {
    try {
      const response = await fetch(
        `https://hospital-drcp.onrender.com/patient/${patientId}`
      );
      const data = await response.json();
      if (response.ok) {
        setPatientDetails(data);
      } else {
        console.error("Error fetching patient details:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (selectedPatientChat) {
      fetchMessages(selectedPatientChat._id);

      const patientUser = selectedPatientChat.users.find(
        (user) => user.userType === "Patient"
      );
      if (patientUser) fetchPatientDetails(patientUser.userId);
    }
  }, [selectedPatientChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      chatId: selectedPatientChat._id,
      content: message,
      userId: doctorId,
      userType: "Doctor",
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://hospital-drcp.onrender.com/message/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessages((prevMessages) => [...prevMessages, data]);
        setMessage("");
      } else {
        console.error("Error sending message:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-5 max-w-lg mx-auto bg-gray-100">
      {selectedPatientChat ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Chat with{" "}
            <span className="text-blue-500">
              {patientDetails ? patientDetails.fullName : "Loading..."}
            </span>
          </h2>

          <div className="max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white mb-4">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender.userType === "Doctor"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 mb-2 rounded-lg max-w-[75%] ${
                      msg.sender.userType === "Doctor"
                        ? "bg-blue-500 text-white"
                        : "bg-green-200 text-black"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs text-gray-300">
                      {/* Format the timestamp to show both date and time */}
                      {new Date(msg.createdAt).toLocaleString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No messages yet.</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              required
              className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          Select a patient to view the chat.
        </p>
      )}
    </div>
  );
}

export default ChatBox;
