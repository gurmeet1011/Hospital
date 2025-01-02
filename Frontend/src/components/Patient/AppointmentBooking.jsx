import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";

const AppointmentBooking = () => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (date) {
      setLoading(true);
      setError(null);
      fetchAvailableSlots(date);
    }
  }, [date]);

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await fetch(
        `https://hospital-drcp.onrender.com/appointments/available?date=${date}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
      }
      const data = await response.json();
      setAvailableSlots(data.slots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setError("Unable to load available slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !timeSlot) {
      alert("Please select a date and time slot.");
      return;
    }

    setLoading(true);

    // Retrieve patient details from localStorage
    const patientDetails = JSON.parse(localStorage.getItem("patient"));
    const token = localStorage.getItem("token");

    if (!patientDetails || !token) {
      console.error("Patient details or token not found in localStorage.");
      alert("Patient not logged in. Please log in to book an appointment.");
      setLoading(false);
      return;
    }

    const { _id, fullName, email, medicalHistory, profilePhoto } =
      patientDetails;

    const appointmentData = {
      patientId: _id,
      fullName,
      email,
      medicalHistory,
      profilePhoto,
      date: date, // Ensure date and timeSlot are directly part of the appointmentData
      timeSlot: timeSlot,
    };

    try {
      const response = await fetch(
        "https://hospital-drcp.onrender.com/appointments/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appointmentData),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Appointment booked successfully!");
        setDate("");
        setTimeSlot("");
        setAvailableSlots([]);
      } else {
        alert(data.message || "Error booking appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Book an Appointment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Picker */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-400 focus:outline-none shadow-sm"
              />
            </div>

            {/* Time Slot Selector */}
            <div>
              <label
                htmlFor="timeSlot"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Time Slot
              </label>
              <select
                id="timeSlot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-400 focus:outline-none shadow-sm"
              >
                <option value="">-- Select a Time Slot --</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))
                ) : (
                  <option disabled>No slots available</option>
                )}
              </select>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring focus:ring-blue-300 focus:outline-none font-medium shadow-md"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentBooking;
