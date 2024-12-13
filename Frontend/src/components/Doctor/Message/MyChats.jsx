import React, { useEffect, useState } from "react";

const MyChats = ({ setSelectedPatientChat }) => {
  const [chats, setChats] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const doctorData = localStorage.getItem("doctor");
    if (doctorData) {
      const parsedDoctor = JSON.parse(doctorData);
      setDoctorId(parsedDoctor._id);
    }
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (!doctorId) {
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:4001/chats/fetchchats/${doctorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [doctorId]);

  const handleChatRedirect = async (chat) => {
    const token = localStorage.getItem("token");
    const patientId = chat.users.find(
      (user) => user.userType === "Patient"
    ).userId;

    try {
      const response = await fetch(
        `http://localhost:4001/chats/accesschat/${patientId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`Failed to access chat: ${response.status}`);

      const chatData = await response.json();
      setSelectedPatientChat(chatData);
    } catch (error) {
      console.error("Error accessing chat:", error);
    }
  };

  return (
    <div>
      {chats.length === 0 ? (
        <p>No chats available.</p>
      ) : (
        chats.map((chat) => (
          <div key={chat._id} onClick={() => handleChatRedirect(chat)}>
            <p>{chat.chatName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyChats;
