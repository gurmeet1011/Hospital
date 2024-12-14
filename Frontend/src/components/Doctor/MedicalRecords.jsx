import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import DrNavbar from "./DrNavbar";

function PatientMedicalHistory() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/history`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();

        // Fetch appointments for each patient
        const enrichedPatients = await Promise.all(
          data.map(async (patient) => {
            const nextAppointment = await fetchNextAppointment(
              patient.appointments
            );
            return { ...patient, nextAppointment };
          })
        );

        setPatients(enrichedPatients);
        setLoading(false); // Set loading to false once done
      } catch (err) {
        console.error("Error fetching patients:", err);
        setLoading(false); // Ensure loading is updated even on failure
      }
    };

    fetchPatients();
  }, []);

  const fetchNextAppointment = async (appointmentIds) => {
    if (!appointmentIds || appointmentIds.length === 0) return null;

    try {
      const appointmentDetails = await Promise.all(
        appointmentIds.map((id) =>
          fetch(`https://clinic-6-hxpa.onrender.com/appointments/${id}`).then(
            (res) => res.json()
          )
        )
      );

      // Filter appointments to find the next one in the future
      const futureAppointments = appointmentDetails.filter(
        (appointment) => new Date(appointment.date) > new Date()
      );

      // Sort future appointments by date and pick the earliest one
      futureAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));

      return futureAppointments[0] || null;
    } catch (err) {
      console.error("Error fetching appointments:", err);
      return null;
    }
  };

  const handleDelete = async (email) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the patient with email: ${email}?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/history/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }), // Send the email in the body
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || "Failed to delete patient");
        } else {
          // Remove patient from state after successful deletion
          setPatients(patients.filter((patient) => patient.email !== email));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the patient.");
      }
    }
  };

  return (
    <>
      <DrNavbar />
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl text-center font-bold text-gray-800 mb-8">
          Patient Medical History
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : patients.length === 0 ? (
          <p className="text-center text-gray-500">No patients found.</p>
        ) : (
          <ul className="space-y-6">
            {patients.map((patient) => (
              <li
                key={patient.email}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
                  <div className="mb-4 sm:mb-0 text-center sm:text-left">
                    <img
                      src={`https://clinic-6-hxpa.onrender.com/${patient.profilePhoto}`}
                      className="rounded-full shadow-lg w-32 h-32 object-cover mx-auto sm:mx-0"
                    />
                    <h2 className="text-2xl font-semibold mt-4">
                      {patient.fullName}
                    </h2>
                    <p className="text-gray-500">{patient.email}</p>
                    <p className="text-gray-400">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="w-full sm:w-2/3 mt-4 sm:mt-0">
                    <h3 className="text-xl font-medium text-blue-600">
                      Medical History:
                    </h3>
                    {patient.medicalHistory.length === 0 ? (
                      <p className="text-gray-500">
                        No medical history available.
                      </p>
                    ) : (
                      <ul className="space-y-4 text-gray-600">
                        <li className="border-b pb-4">
                          <p>
                            <strong>Date:</strong>{" "}
                            {new Date(
                              patient.medicalHistory[
                                patient.medicalHistory.length - 1
                              ].date
                            ).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Diagnosis:</strong>{" "}
                            {
                              patient.medicalHistory[
                                patient.medicalHistory.length - 1
                              ].diagnosis
                            }
                          </p>
                          <pre>
                            <strong>Medication:</strong>{" "}
                            {
                              patient.medicalHistory[
                                patient.medicalHistory.length - 1
                              ].medication
                            }
                          </pre>
                        </li>
                      </ul>
                    )}

                    <h3 className="text-xl font-medium text-green-600 mt-6">
                      Next Appointment:
                    </h3>
                    {patient.nextAppointment ? (
                      <div>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(
                            patient.nextAppointment.date
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Time:</strong> {patient.nextAppointment.time}
                        </p>
                        <p>
                          <strong>Doctor:</strong> Dr.{" "}
                          {patient.nextAppointment.doctorName}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">No upcoming appointments.</p>
                    )}

                    <div className="mt-6 flex justify-start space-x-4">
                      <Link
                        to="/updatehistory"
                        state={{ patient }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/single"
                        state={{ patient }}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-green-700 transition"
                      >
                        More
                      </Link>
                      <button
                        className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-red-700 transition"
                        onClick={() => handleDelete(patient.email)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}

export default PatientMedicalHistory;
