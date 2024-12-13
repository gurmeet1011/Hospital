import React, { useEffect, useState } from "react";

function ChatPage() {
  const [patient, setPatient] = useState(null);
  const [selectedDoctorChat, setSelectedDoctorChat] = useState(null); // To hold the selected patient's chat

  useEffect(() => {
    const patientData = localStorage.getItem("patient");
    // Log the raw data

    if (patientData) {
      try {
        const parsedData = JSON.parse(patientData);
        setPatient(parsedData);
      } catch (error) {
        console.error("Error parsing doctor data:", error);
      }
    }
  }, []);

  return (
    <div className="bg-gray-200 w-full h-screen relative">
      <div className="grid grid-rows-[60px_auto] min-h-screen gap-4 rounded-lg p-4">
        {/* Header with Search Bar */}
        <div className="bg-white h-[60px] flex justify-between  p-4 items-center rounded shadow">
          <SideDrawer setSelectedDoctorChat={setSelectedDoctorChat} />{" "}
          {/* Pass the setter */}
          <h1 className="text-xl font-bold">Patient Talks</h1>
          {/* Your SVG icon here */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.992 2.992 0 0018 13V8a6 6 0 00-12 0v5c0 1.127-.469 2.12-1.095 2.596L3 17h5m7 0a2 2 0 11-4 0h4z"
            ></path>
          </svg>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-3 gap-4 rounded">
          <div className="bg-white col-span-1 p-4 rounded shadow">
            <MyChats setSelectedDoctorChat={setSelectedDoctorChat} />{" "}
            {/* Ensure doctorId is passed */}
          </div>
          <div className="bg-white col-span-2 p-4 rounded shadow">
            <ChatBox
              selectedDoctorChat={selectedDoctorChat}
              doctorId={doctor?._id} // Pass the doctor ID (or full doctor object)
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
