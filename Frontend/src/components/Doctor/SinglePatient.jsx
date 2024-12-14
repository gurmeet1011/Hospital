import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer";
import DrNavbar from "./DrNavbar";

function PatientDetails() {
  const [appointments, setAppointments] = useState([]);
  const location = useLocation();
  const patient = location.state?.patient;
  console.log(patient.appointments);

  // Fetch appointments when the patient data is available
  useEffect(() => {
    const fetchAppointments = async () => {
      if (patient?.appointments?.length > 0) {
        try {
          // Map through the appointment IDs and fetch each one using the ID
          const appointmentResponses = await Promise.all(
            patient.appointments.map((appointmentId) =>
              fetch(
                `https://clinic-6-hxpa.onrender.com//appointments/${appointmentId}`
              )
            )
          );

          // Wait for all fetches to complete and parse the responses
          const appointmentData = await Promise.all(
            appointmentResponses.map((res) => res.json())
          );

          // Sort the appointments by date
          const sortedAppointments = appointmentData.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          setAppointments(sortedAppointments); // Update state with sorted appointments
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      }
    };

    fetchAppointments();
  }, [patient]); // Only run this effect when patient data changes

  // Get the next appointment (if any)
  const nextAppointment = appointments[appointments.length - 1];
  console.log("next", nextAppointment);

  return (
    <>
      <DrNavbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg m-2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Patient Details
          </h2>

          {patient ? (
            <>
              {/* Patient General Information */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  General Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {patient.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {patient.email}
                  </p>
                  <p>
                    <strong>Registered Date:</strong>{" "}
                    {new Date(patient.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Patient Next Appointment */}
              <div className="mb-6">
                <h4 className="font-bold text-green-500">Next Appointment:</h4>
                {nextAppointment ? (
                  <div>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(nextAppointment.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <p>
                      <strong>Time:</strong> {nextAppointment.timeSlot || "N/A"}
                    </p>
                  </div>
                ) : (
                  <p>No upcoming appointments.</p>
                )}
              </div>

              {/* Medical History */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  Medical History
                </h3>
                {patient?.medicalHistory?.length ? (
                  <div className="space-y-4">
                    {patient.medicalHistory.map((history, index) => (
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
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  Prohibitions
                </h3>
                {patient?.prohibitions ? (
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <pre>
                        <strong>Prohibitions:</strong> {patient.prohibitions}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-500">No prohibitions available.</p>
                )}
              </div>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <Link
                  to="/medical-records"
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                >
                  Back
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">
              Patient details not available.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PatientDetails;
