import React, { useState, useEffect, useRef } from "react";
import Footer from "../../Footer";
import Navbar from "../Navbar";

const PatientChat = () => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch patient information
  const storedPatient = JSON.parse(localStorage.getItem("patient"));
  const patientId = storedPatient?._id;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!patientId) {
      console.error("Patient ID is not available.");
      return;
    }

    const fetchChat = async () => {
      try {
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/chats/patientchat/${patientId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChatId(data._id);
          setMessages(data.messages || []);
        } else {
          console.error("Failed to fetch chat data");
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, [token, patientId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/message/${chatId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Error fetching messages");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId, token]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMessageData = {
      chatId: chatId,
      content: newMessage,
      userId: patientId,
      userType: "Patient",
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://clinic-6-hxpa.onrender.com/message/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMessageData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
      } else {
        console.error("Error sending message:", data.message);
        alert("Error sending message: " + data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="border border-gray-300 rounded-lg max-w-lg w-full bg-white p-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
            Chat with Doctor
          </h2>
          <div className="max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white mb-4">
            {messages?.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender.userType === "Doctor"
                      ? "justify-start"
                      : "justify-end"
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
                      {new Date(msg.createdAt).toLocaleString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
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

          <form onSubmit={sendMessage} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
      </div>
      <Footer />
    </>
  );
};

export default PatientChat;
