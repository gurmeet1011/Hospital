import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "./Navbar";
import {
  FaCalendarAlt,
  FaUser,
  FaFileMedical,
  FaExclamationCircle,
} from "react-icons/fa";

function PatientPortal() {
  const [data, setData] = useState(null); // State to hold patient data
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch stored patient from localStorage
  const storedPatient = JSON.parse(localStorage.getItem("patient"));
  const patientID = storedPatient?._id;

  useEffect(() => {
    if (!patientID) return; // Avoid fetching data if patientID is not available

    const fetchPatient = async () => {
      try {
        const response = await fetch(
          `https://clinic-4-egoj.onrender.com/patient/${patientID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }

        const fetchedData = await response.json();
        setData(fetchedData); // Update state with fetched patient data

        // Fetch appointment details
        const appointments = fetchedData.appointments || [];
        console.log("Fetched Appointment IDs:", appointments);

        if (appointments.length > 0) {
          const appointmentResponses = await Promise.all(
            appointments.map((appointment) =>
              fetch(
                `https://clinic-4-egoj.onrender.com/appointments/${appointment._id}`
              )
            )
          );

          const appointmentData = await Promise.all(
            appointmentResponses.map((res) => {
              if (!res.ok) {
                throw new Error("Failed to fetch an appointment.");
              }
              return res.json();
            })
          );

          // Sort appointments by date
          const sortedAppointments = appointmentData.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          setAppointments(sortedAppointments); // Update state with sorted appointments
        }
      } catch (error) {
        console.error("Error fetching patient or appointments:", error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPatient();
  }, [patientID]);

  // Filter upcoming appointments
  const today = new Date();
  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate > today;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Welcome to Your Patient Portal
          </h1>

          {loading && (
            <div className="text-center text-gray-500">Loading...</div>
          )}
          {error && <div className="text-center text-red-500">{error}</div>}

          {data ? (
            <>
              {/* General Information */}
              <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                  <FaUser className="mr-3" /> General Information
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Name:</strong> {data.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {data.email}
                  </p>
                  <p>
                    <strong>Registered Date:</strong>{" "}
                    {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Next Appointment */}
              <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h4 className="text-2xl font-semibold text-green-500 flex items-center">
                  <FaCalendarAlt className="mr-3" /> Next Appointment
                </h4>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        upcomingAppointments[0].date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {upcomingAppointments[0].timeSlot || "N/A"}
                    </p>
                  </div>
                ) : (
                  <p className="text-red-500">No upcoming appointments.</p>
                )}
              </div>

              {/* Medical History */}
              <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                  <FaFileMedical className="mr-3" /> Medical History
                </h3>
                {data?.medicalHistory?.length ? (
                  <div className="space-y-4">
                    {data.medicalHistory.map((history, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-300 rounded-lg bg-gray-50"
                      >
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(history.date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Diagnosis:</strong> {history.diagnosis}
                        </p>
                        <pre>
                          <strong>Medication:</strong> {history.medication}
                        </pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500">No medical history available.</p>
                )}
              </div>

              {/* Prohibitions Information */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                  <FaExclamationCircle className="mr-3" /> Prohibitions
                </h3>
                <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <pre className="text-gray-700">
                    <strong>Prohibitions:</strong>{" "}
                    {data.prohibitions || "None available."}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">
              No patient data available.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PatientPortal;
