import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import DrNavbar from "./DrNavbar";

const TodaysAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [doneAppointments, setDoneAppointments] = useState({}); // Track done appointments

  useEffect(() => {
    // Fetch today's appointments from the backend API
    fetch("http://localhost:4001/appointments/today") // Update with your correct API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    // Retrieve the "done" appointments status from localStorage when the component mounts
    const storedDoneAppointments =
      JSON.parse(localStorage.getItem("doneAppointments")) || {};
    setDoneAppointments(storedDoneAppointments);
  }, []);

  const handleDoneClick = (appointmentId) => {
    // Update the done status
    const newDoneAppointments = {
      ...doneAppointments,
      [appointmentId]: true,
    };

    setDoneAppointments(newDoneAppointments);

    // Store the updated status in localStorage
    localStorage.setItem(
      "doneAppointments",
      JSON.stringify(newDoneAppointments)
    );
  };

  if (loading)
    return (
      <p className="text-center text-xl font-semibold">
        Loading today's appointments...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-xl font-semibold text-red-500">{error}</p>
    );
  if (appointments.length === 0)
    return (
      <p className="text-center text-xl font-semibold">
        No appointments for today
      </p>
    );

  return (
    <>
      <DrNavbar />
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">
          Today's Appointments
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">
                  Patient Name
                </th>
                <th className="px-6 py-4 text-left text-gray-700">
                  Profile Photo
                </th>
                <th className="px-6 py-4 text-left text-gray-700">Time Slot</th>
                <th className="px-6 py-4 text-left text-gray-700">
                  Appointment Date
                </th>
                <th className="px-6 py-4 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {appointment.patientId
                      ? appointment.patientId.fullName
                      : "Unknown Patient"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {appointment.patientId &&
                    appointment.patientId.profilePhoto ? (
                      <img
                        src={`http://localhost:4001/${appointment.patientId.profilePhoto}`} // Update the URL accordingly
                        alt={appointment.patientId.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No Photo</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {appointment.timeSlot}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700 space-x-4">
                    {/* Done Button */}
                    <button
                      onClick={() => handleDoneClick(appointment._id)}
                      disabled={doneAppointments[appointment._id]} // Disable after done
                      className={`px-4 py-2 rounded-lg transition duration-200 ${
                        doneAppointments[appointment._id]
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      }`}
                    >
                      {doneAppointments[appointment._id] ? (
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 inline-block mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Done
                        </span>
                      ) : (
                        "Mark as Done"
                      )}
                    </button>

                    {/* View Details Button */}
                    <Link
                      to="/medical-records"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TodaysAppointments;
